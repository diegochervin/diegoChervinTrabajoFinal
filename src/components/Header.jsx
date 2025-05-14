import React from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../img/logo.jpeg'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 


const Header = () => {
    return (
   <Navbar bg="black" variant="dark" expand="lg">
  <Container fluid>
    <Link to="/" className="d-flex align-items-center text-decoration-none text-white">
          <img 
            src={logo} 
            alt="logo" 
            style={{ height: '100%', maxHeight: '50px', objectFit: 'contain' }} 
          />
          <Navbar.Brand className="ms-3 mb-0">Ethereal Parfums</Navbar.Brand>
        </Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="/Contact">Contacto</Nav.Link>
        <Nav.Link as={Link} to="/Login">Iniciar Sesion</Nav.Link>
        <Nav.Link as={Link} to="/about">Registrate</Nav.Link>
        <Nav.Link as={Link} to="/carrito" title="Ver carrito">
  <i className="bi bi-cart" style={{ fontSize: '1.5rem', color: 'white' }}></i>
</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
  
</Navbar>
    );
  };

export default Header;