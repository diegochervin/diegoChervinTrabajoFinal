import Swal from 'sweetalert2';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

// Función para obtener el carrito del localStorage
export const obtenerCarrito = () => {
  const carritoGuardado = localStorage.getItem("carrito");
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
};

// Función para guardar el carrito en localStorage
export const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Función para agregar producto al carrito
export const agregarAlCarrito = (producto, cantidad, carritoActual) => {
  // Verificar que la cantidad sea válida
  if (cantidad <= 0) {
    Swal.fire({
      title: `No es posible agregar ${cantidad} unidades.`,
      timer: 3500,
      icon: "error"
    });
    return { carrito: carritoActual, agregado: false };
  }

  // Verificar stock disponible
  if (cantidad > producto.stock) {
    Swal.fire({
      title: `No es posible agregar ${cantidad} unidades. Solo tenemos ${producto.stock} en stock.`,
      timer: 3500,
      icon: "error"
    });
    return { carrito: carritoActual, agregado: false };
  }

  // Buscar si el producto ya está en el carrito
  const productoEnCarrito = carritoActual.find(item => item.id === producto.id);
  const nuevoCarrito = [...carritoActual];

  if (!productoEnCarrito) {
    // Si no está en el carrito, agregarlo
    nuevoCarrito.push({
      ...producto,
      id: producto.id || producto.ID,
      nombre: producto.nombre || producto.MODELO,
      cantidad: cantidad
    });

    Toastify({
      text: `Se han agregado ${cantidad} unidades de ${producto.nombre}.`,
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
  } else {
    // Verificar si la cantidad total no excede el stock
    if ((cantidad + productoEnCarrito.cantidad) > producto.stock) {
      Swal.fire({
        title: `No es posible agregar ${cantidad} unidades. Ya tienes ${productoEnCarrito.cantidad} en el carrito y solo tenemos ${producto.stock} en stock.`,
        timer: 3500,
        icon: "error"
      });
      return { carrito: carritoActual, agregado: false };
    }

    // Actualizar cantidad del producto existente
    const index = nuevoCarrito.findIndex(item => item.id === producto.id);
    nuevoCarrito[index] = {
      ...productoEnCarrito,
      cantidad: productoEnCarrito.cantidad + cantidad
    };

    Toastify({
      text: `Se han agregado ${cantidad} unidades adicionales de ${producto.nombre}. Ahora tienes ${productoEnCarrito.cantidad + cantidad} en total.`,
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
  }

  // Guardar el carrito actualizado
  guardarCarrito(nuevoCarrito);
  console.log("Producto agregado al carrito:", producto, "Cantidad:", cantidad);
  return { carrito: nuevoCarrito, agregado: true };
}; 

export const restarDelCarrito = async (productoId, carritoActual) => {
  const nuevoCarrito = [...carritoActual];
  const index = nuevoCarrito.findIndex(item => item.id === productoId);

  if (index === -1) return carritoActual;

  if (nuevoCarrito[index].cantidad > 1) {
    nuevoCarrito[index].cantidad -= 1;
  } else {
    // Confirmar si se elimina el producto
    const confirmacion = await Swal.fire({
      title: `¿Eliminar "${nuevoCarrito[index].nombre}" del carrito?`,
      text: "La cantidad va a ser 0. ¿Deseás eliminarlo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      nuevoCarrito.splice(index, 1);
    } else {
      return carritoActual; // Si cancela, no cambia nada
    }
  }

  guardarCarrito(nuevoCarrito);
  return nuevoCarrito;
};