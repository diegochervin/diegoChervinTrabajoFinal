import { useState, useEffect } from "react";
import CardProducto from "../components/CardProducto";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Perfume() {
  const [perfumes, setPerfume] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://etherealparfums.netlify.app/producto.json"
        );
        const data = await response.json();
        // Normalizar los datos para que coincidan con CardProducto
        const tipo = "perfume";
        const normalizados = data.map((d) => ({
          id: `${tipo}-${d.id}`,
          marca: d.marca,
          nombre: d.nombre,
          precio: d.precio,
          foto: d.foto,
          stock: d.stock ?? "",
          tamano: d.tamano ?? "",
          clon: d.clon ?? "",
          color: d.color ?? "",
          tipo: d.tipo,
        }));
        setPerfume(normalizados);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container fluid className="my-5">
      <h1 className="d-flex justify-content-center align-items-center mb-4">
        Perfumes
      </h1>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="g-4">
          {perfumes.map((producto) => (
            <Col key={producto.id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <CardProducto producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Perfume;
