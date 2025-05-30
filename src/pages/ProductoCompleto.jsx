import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useProductos } from "../context/ProductoContext";


function ProductoCompleto() {
  const { id } = useParams();
  const { productos } = useProductos();
  // Simulamos que los productos están en localStorage
  

  const producto = useMemo(() => productos.find(p => p.id === id), [id, productos]);

  if (!producto) {
    return (
      <div className="container my-5 text-center">
        <h2>Producto no encontrado</h2>
        <p>Es posible que ingresaras un enlace incorrecto o que los datos no estén cargados aún.</p>
      </div>
    );
  }


  return (
    <div className="container my-5">
      <h2>{producto.nombre}</h2>
      <img
        src={producto.foto}
        alt={producto.nombre}
        className="img-fluid mb-3"
      />
      <p><strong>Marca:</strong> {producto.marca}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <p><strong>Clon:</strong> {producto.clon}</p>
      <p><strong>Color:</strong> {producto.color || "No especificado"}</p>
    </div>
  );
}

export default ProductoCompleto;
