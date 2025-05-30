import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { agregarAlCarrito, obtenerCarrito } from "../util/carritoUtils";
import { useNavigate } from "react-router-dom";

const CardProducto = ({ producto }) => {
  const { id, marca, nombre, tamano, clon, foto, stock, precio, color, tipo } =
    producto;
  const [cantidad, setCantidad] = useState(1);
  const Navigate = useNavigate();
  const handleVerDetalle = () => {
    Navigate(`/producto/${producto.id}`);
  };

  const handleAgregarAlCarrito = () => {
    if (cantidad > 0 && cantidad <= producto.stock) {
      const carritoActual = obtenerCarrito();
      const resultado = agregarAlCarrito(producto, cantidad, carritoActual);
      console.log("Producto agregado al carrito:", producto.nombre);
      console.log("Cantidad:", cantidad);
      console.log("Carrito actual:", resultado.carrito);
    } else if (cantidad > producto.stock) {
      console.log("No hay suficiente stock");
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <div
        className="d-flex justify-content-center align-items-center p-3"
        style={{ height: "180px" }}
      >
        <Card.Img
          src={Array.isArray(foto) ? foto[0] : foto}
          alt={nombre}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <Card.Body className="d-flex flex-column" style={{ minHeight: "260px" }}>
        <Card.Title style={{ textTransform: "uppercase", fontWeight: "bold", minHeight: "48px" }}>
          {nombre}
        </Card.Title>
        <Card.Text className="text-muted">{marca}</Card.Text>
        <Card.Text className="fw-bold text-primary">U$S {precio}</Card.Text>
        {clon && <Card.Text className="text-secondary">Clon: {clon}</Card.Text>}
        <Card.Text className="text-warning">Stock: {stock}</Card.Text>
        {tamano && (
          <Card.Text className="text-warning">Tamaño: {tamano}</Card.Text>
        )}
        {color && <Card.Text className="text-info">Color: {color}</Card.Text>}
        <Button variant="secondary" onClick={handleVerDetalle}>
          Ver detalle
        </Button>
        <div className="d-flex align-items-center gap-2 mb-2">
          <h3 className="mb-0" style={{ fontSize: "1.1rem" }}>
            Cantidad:{" "}
          </h3>
          <input
            type="number"
            min="1"
            max={producto.stock}
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="flex-grow-1"
            style={{
              borderRadius: "10px",
              padding: "0.375rem 0.75rem",
              border: "1px solid #ced4da",
            }}
          />
        </div>

        <Button
          variant="primary"
          disabled={producto.stock === 0}
          onClick={handleAgregarAlCarrito}
        >
          {producto.stock > 0 ? "Agregar al Carrito" : "Sin stock"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardProducto;
