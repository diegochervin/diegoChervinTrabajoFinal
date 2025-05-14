import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; 


const CardDesodorante = ({ desodorante }) => {
  const { MARCA, MODELO, PRECIO, FOTO } = desodorante;

  return (
    <Card className="h-100 shadow-sm">
      <div className="d-flex justify-content-center align-items-center p-3" style={{ height: "180px" }}>
        <Card.Img 
          src={FOTO}
          alt={MODELO}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title>{MODELO}</Card.Title>
        <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
          {MARCA}
        </Card.Text>
        <Card.Text className="fw-bold text-primary">U$S {PRECIO}</Card.Text>
        <Button variant="primary" className="mt-auto">Agregar al carrito</Button>
      </Card.Body>
    </Card>
  );
};

export default CardDesodorante;
