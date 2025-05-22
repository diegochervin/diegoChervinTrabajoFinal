import { Container, Button } from "react-bootstrap";
import {
  obtenerCarrito,
  guardarCarrito,
  agregarAlCarrito,
  restarDelCarrito,
} from "../util/carritoUtils";
import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Carrito() {
  const [carrito, setCarrito] = useState(() => obtenerCarrito());

  const actualizarCarrito = (nuevo) => {
    guardarCarrito(nuevo);
    setCarrito(nuevo);
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    actualizarCarrito(nuevoCarrito);

    Toastify({
      text: "Producto eliminado",
      duration: 2000,
      gravity: "top",
      position: "right",
      backgroundColor: "#dc3545",
    }).showToast();
  };

  const vaciarCarrito = () => {
    Swal.fire({
      title: "¿Estás segura?",
      text: "Se eliminarán todos los productos del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        actualizarCarrito([]);
        Toastify({
          text: "Carrito vaciado",
          duration: 2000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ffc107",
        }).showToast();
      }
    });
  };

  const pagar = () => {
    Swal.fire({
      title: "¡Gracias por tu compra!",
      text: `Total: $${totalCarrito.toLocaleString()}`,
      icon: "success",
    });
    actualizarCarrito([]);
  };

  const totalCarrito = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Tu carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-center">Tu carrito está vacío</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>Foto</th>
                  <th>Nombre</th>
                  <th>Precio unitario</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.foto}
                        alt={item.nombre}
                        className="rounded"
                        style={{ width: 60, height: 60, objectFit: "cover" }}
                      />
                    </td>
                    <td>{item.nombre}</td>
                    <td>U$S {item.precio.toFixed(2)}</td>
                    <td>{item.cantidad}</td>
                    <td>U$S {(item.precio * item.cantidad).toFixed(2)}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-1 flex-wrap">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => eliminarDelCarrito(item.id)}
                        >
                          Eliminar
                        </Button>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => {
                            const { carrito: nuevo } = agregarAlCarrito(
                              item,
                              1,
                              carrito,
                              false
                            );
                            actualizarCarrito(nuevo);
                          }}
                        >
                          +1
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={async () => {
                            const nuevo = await restarDelCarrito(
                              item.id,
                              carrito
                            );
                            if (Array.isArray(nuevo)) {
                              actualizarCarrito(nuevo);
                            }
                          }}
                        >
                          -1
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <hr />
          <h3 className="text-end text-success fw-bold">
            Total a pagar: ${totalCarrito.toLocaleString()}
          </h3>

          <div className="d-flex justify-content-end gap-3 mt-3">
            <Button variant="warning" onClick={vaciarCarrito}>
              Vaciar carrito
            </Button>
            <Button variant="primary" onClick={pagar}>
              Pagar
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Carrito;
