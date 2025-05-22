import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const BarraProductos = () => {
  return (
    <Nav className="flex-row justify-content-center gap-4">
      <Nav.Link as={Link} to="/" className="text-white">
        Perfumes
      </Nav.Link>
      <Nav.Link as={Link} to="/Desodorante" className="text-white">
        Desodorantes
      </Nav.Link>
    </Nav>

    //
  );
};

export default BarraProductos;
