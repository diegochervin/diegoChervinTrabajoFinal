import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col, InputGroup,} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import registro from "../img/registro.webp";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
  });

  const [passwords, setPassword] = useState(false);
  const [confirmarPasswords, setConfirmarPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow">
            <Card.Body className="p-0">
              <Row className="g-0 flex-column flex-md-row" style={{ minHeight: "100%" }}>
                <Col
                  md={6}
                  className="order-2 order-md-1 d-flex flex-column justify-content-center p-5"
                >
                  <h2 className="text-center mb-4">Registrarse</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={passwords ? "text" : "password"}
                          name="password"
                          placeholder="Contraseña"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          autoComplete="new-password"
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setPassword(!passwords)}
                          type="button"
                        >
                          <i className={`bi bi-eye${passwords ? "-slash" : ""}`}></i>
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Repetir Contraseña</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={confirmarPasswords ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Repetir contraseña"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          autoComplete="new-password"
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setConfirmarPassword(!confirmarPasswords)}
                          type="button"
                        >
                          <i className={`bi bi-eye${confirmarPasswords ? "-slash" : ""}`}></i>
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Check
                        type="checkbox"
                        name="newsletter"
                        label="Suscribirse al newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                      Registrarse
                    </Button>
                  </Form>
                </Col>

                <Col
                  md={6}
                  className="order-1 order-md-2 d-flex"
                  style={{ minHeight: "400px" }}
                >
                  <img
                    src={registro}
                    alt="Foto de registro"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
