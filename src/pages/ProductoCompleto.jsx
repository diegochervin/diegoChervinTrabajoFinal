import { useParams } from "react-router-dom";
import { useProductos } from "../context/ProductoContext";
import { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Image, Button } from "react-bootstrap";
import { agregarAlCarrito, obtenerCarrito } from "../util/carritoUtils";
import { etiquetasAmigables } from "../util/normalizar";

const ProductoCompleto = () => {
  const { id } = useParams();
  const { productos } = useProductos();
  const [producto, setProducto] = useState(null);
  const [fotoSeleccionada, setFotoSeleccionada] = useState(0);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const encontrado = productos.find((p) => String(p.id) === String(id));
    setProducto(encontrado);
  }, [id, productos]);

  const handleAgregarAlCarrito = () => {
    if (cantidad > 0 && cantidad <= producto.stock) {
      const carritoActual = obtenerCarrito();
      const resultado = agregarAlCarrito(producto, cantidad, carritoActual);
      console.log("Producto agregado al carrito:", producto.nombre);
      console.log("Cantidad:", cantidad);
      console.log("Carrito actual:", resultado.carrito);
    } else if (cantidad > producto.stock) {
      console.log("No hay suficiente stock");
    }
  };

  if (!producto) return <div>Producto no encontrado</div>;

  const fotos = Array.isArray(producto.foto) ? producto.foto : [producto.foto];

  // Campos a excluir del listado dinámico
  const clavesExcluidas = ["id", "foto"];

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Carousel
            activeIndex={fotoSeleccionada}
            onSelect={(selectedIndex) => setFotoSeleccionada(selectedIndex)}
            interval={null}
          >
            {fotos.map((foto, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={foto}
                  alt={`Foto ${index + 1}`}
                  style={{ objectFit: "contain", maxHeight: "500px" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">
            {fotos.map((foto, index) => (
              <Image
                key={index}
                src={foto}
                thumbnail
                onClick={() => setFotoSeleccionada(index)}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  border: fotoSeleccionada === index ? "2px solid #007bff" : "",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </Col>

        <Col md={6}>
          <h2 className="text-uppercase fw-bold">{producto.nombre}</h2>
          <p className="text-muted">{producto.marca}</p>
          <h4 className="text-primary">U$S {producto.precio}</h4>

          {/* Campos dinámicos: se muestran todos excepto los excluidos */}
          <div className="mt-3">
            {Object.entries(producto).map(([key, value]) => {
              if (clavesExcluidas.includes(key)) return null;
              if (Array.isArray(value)) return null;
              if (value === null || value === undefined || value === "") return null;
              if (key === "precio" || key === "marca" || key==="nombre") return null;
              
              return (
                <p key={key}>
                  <strong>{etiquetasAmigables[key] || key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {value}
                </p>
              );
            })}

          </div>

          <div className="d-flex align-items-center gap-2 mb-2">
            <h3 className="mb-0" style={{ fontSize: "1.1rem" }}>
              Cantidad:{" "}
            </h3>
            <input
              type="number"
              min="1"
              max={producto.stock}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="justify-content-start"
              style={{
                borderRadius: "10px",
                padding: "0.375rem 0.75rem",
                border: "1px solid #ced4da",
              }}
            />
          </div>

          <Button
            variant="primary"
            disabled={producto.stock === 0}
            onClick={handleAgregarAlCarrito}
          >
            {producto.stock > 0 ? "Agregar al Carrito" : "Sin stock"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductoCompleto;
