import { useState, useEffect } from "react";
import CardProducto from "../components/CardProducto";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Desodorante() {
  const [desodorantes, setDesodorante] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://etherealparfums.netlify.app/desodorante.json"
        );
        const data = await response.json();
        // Normalizar los datos para que coincidan con CardProducto
        const tipo = "desodorante";
        const normalizados = data.map((d) => ({
          id: `${tipo}-${d.ID}`,
          marca: d.MARCA,
          nombre: d.MODELO,
          precio: d.PRECIO,
          foto: d.FOTO,
          stock: d.STOCK ?? "10",
          tamano: d.TAMANO ?? "",
          clon: d.CLON ?? "",
          color: d.COLOR ?? "",
          tipo: d.TIPO,
        }));
        setDesodorante(normalizados);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container fluid className="my-5">
      <h1 className="d-flex justify-content-center align-items-center mb-4">
        Desodorantes
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
          {desodorantes.map((producto) => (
            <Col key={producto.id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <CardProducto producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Desodorante;
