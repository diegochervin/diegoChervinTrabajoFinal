import { useState, useEffect } from "react";
import CardDesodorante from "./CardDesodorante";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; 

function Desodorante() {
  const [desodorantes, setDesodorante] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://etherealparfums.netlify.app/desodorante.json");
        const data = await response.json();
        setDesodorante(data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container fluid className="my-5">
      <h1 className="d-flex justify-content-center align-items-center mb-4">Desodorantes</h1>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <Spinner animation="border" variant="primary" /> {/* Spinner de carga */}
        </div>
      ) : (
        <Row className="g-4">
          {desodorantes.map((desodorante) => (
            <Col key={desodorante.id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <CardDesodorante desodorante={desodorante} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Desodorante;
