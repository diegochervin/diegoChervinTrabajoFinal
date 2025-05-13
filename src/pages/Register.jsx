import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, InputGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log( formData);
  };

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <Row>
                <Col md={6} className="order-2 order-md-1">
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
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Contraseña"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                        >
                          <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                        </Button>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Repetir Contraseña</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Repetir contraseña"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          type="button"
                        >
                          <i className={`bi bi-eye${showConfirmPassword ? '-slash' : ''}`}></i>
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

                <Col md={6} className="order-1 order-md-2 d-flex align-items-center justify-content-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    alt="Registration illustration"
                    className="img-fluid"
                    style={{ maxHeight: '400px' }}
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