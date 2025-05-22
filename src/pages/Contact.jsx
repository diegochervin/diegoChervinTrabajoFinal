import { Container, Form, Button, Row, Col } from "react-bootstrap";

function Contact() {
  return (
    <Container fluid className="py-4">
      <h2 className="text-center mb-4">Contacto</h2>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Tu nombre" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="tu@email.com" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
