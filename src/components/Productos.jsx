import { useState, useEffect } from "react";
import CardProducto from "./CardProducto";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de que Bootstrap esté importado

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://etherealparfums.netlify.app/producto.json");
        const data = await response.json();
        setProductos(data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container fluid className="my-5">
      <h1 className="mb-4">Productos</h1>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <Spinner animation="border" variant="primary" /> {/* Spinner de carga */}
        </div>
      ) : (
        <Row className="g-4">
          {productos.map((producto) => (
            <Col key={producto.id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <CardProducto producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Productos;
