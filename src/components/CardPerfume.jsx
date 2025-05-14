import React from 'react';
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; 

const CardPerfume = ({ perfume }) => {
  
  const { marca, nombre, tamano, clon, foto, stock, precio } = perfume; 
  
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
        <Card.Title className="">{nombre}</Card.Title>
        <Card.Text
          className="text-muted"
          style={{
            fontSize: "0.85rem",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {marca}
        </Card.Text>
        <Card.Text className="fw-bold text-primary">U$S {precio}</Card.Text>
        <Card.Text className="text-secondary">Clon: {clon}</Card.Text>
        <Card.Text className="text-warning">Stock: {stock} </Card.Text>
        <Card.Text className="text-warning">Tamaño: {tamano} </Card.Text>
        <Button variant="primary" className="mt-auto">Agregar al carrito</Button>
      </Card.Body>
    </Card>
  );
};

export default CardPerfume;