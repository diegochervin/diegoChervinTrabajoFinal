import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { obtenerCantidadTotal } from "../util/carritoUtils";
import CotizacionDolar from "./CotizacionDolar";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [cotizacionDolar, setCotizacionDolar] = useState(null);
  const { user, logout } = useAuth();
  useEffect(() => {
    setCantidadCarrito(obtenerCantidadTotal());

    const handleStorageChange = () => {
      setCantidadCarrito(obtenerCantidadTotal());
    };
    window.addEventListener("carritoActualizado", handleStorageChange);
    return () => {
      window.removeEventListener("carritoActualizado", handleStorageChange);
    };
  }, []);

  return (
    <Navbar bg="black" variant="dark" expand="lg">
      <Container fluid>
        <Link
          to="/"
          className="d-flex align-items-center text-decoration-none text-white"
        >
          <img
            src="/img/logo.jpeg"
            alt="logo"
            style={{ height: "100%", maxHeight: "50px", objectFit: "contain" }}
          />
          <Navbar.Brand className="ms-3 mb-0">Ethereal Parfums</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Navbar.Text className="text-white me-3">
              {cotizacionDolar && (
                <>U$S 1 = ${cotizacionDolar.toLocaleString()}</>
              )}
            </Navbar.Text>

            <CotizacionDolar onCotizacion={setCotizacionDolar} />
            <Nav.Link as={Link} to="/Contact">
              Contacto
            </Nav.Link>
            {user && user.email ? (
              <>
                <Navbar.Text className="text-white me-3">
                  Bienvenido, {user.email}
                </Navbar.Text>
                <Nav.Link onClick={logout}>Cerrar sesión</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/Login">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registrate
                </Nav.Link>
              </>
            )}
            <Nav.Link
              as={Link}
              to="/carrito"
              title="Ver carrito"
              className="position-relative"
            >
              <i
                className="bi bi-cart"
                style={{ fontSize: "1.5rem", color: "white" }}
              ></i>
              {cantidadCarrito > 0 && (
                <span
                  className="position-absolute top-0 start-100 badge rounded-pill bg-danger"
                  style={{
                    transform: "translate(-60%, 0%)",
                    padding: "0.5rem",
                    fontSize: "0.75rem",
                    lineHeight: "1rem",
                  }}
                >
                  {cantidadCarrito}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
