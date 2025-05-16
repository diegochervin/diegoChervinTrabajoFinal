import React from 'react';
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de que Bootstrap esté importado


const CardProducto = ({ producto }) => {
  
  const { id, marca, nombre, tamano, clon, foto, stock, precio, color } = producto; // Desestructuración de producto
  
  return (
    <Card className="h-100 shadow-sm">
      <div className="d-flex justify-content-center align-items-center p-3" style={{ height: "180px" }}>
        <Card.Img 
          src={foto}
          alt={nombre}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title>{nombre}</Card.Title>
        <Card.Text className="text-muted">{marca}</Card.Text>
        <Card.Text className="fw-bold text-primary">U$S {precio}</Card.Text>
        {clon && <Card.Text className="text-secondary">Clon: {clon}</Card.Text>}
        <Card.Text className="text-warning">Stock: {stock}</Card.Text>
        {tamano && <Card.Text className="text-warning">Tamaño: {tamano}</Card.Text>}
        {color && <Card.Text className="text-info">Color: {color}</Card.Text>}
        <Button variant="primary" className="mt-auto">Agregar al carrito</Button>
      </Card.Body>
    </Card>
  );
};

export default CardProducto;