import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BarraProductos = () => {
  const { user } = useAuth();
  return (
    <Nav className="flex-row justify-content-center gap-4">
      <Nav.Link as={Link} to="/" className="text-white">
        Perfumes
      </Nav.Link>
      <Nav.Link as={Link} to="/Desodorante" className="text-white">
        Desodorantes
      </Nav.Link>
         {user && user.email === "admin@1" && (
        <Nav.Link as={Link} to="/editproductos" className="text-white">
          Editar Lista de Productos
        </Nav.Link>
      )}
    </Nav>

    //
  );
};

export default BarraProductos;
