import { useParams } from "react-router-dom";
import { useProductos } from "../context/ProductoContext";
import { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Image, Button } from "react-bootstrap";
import { agregarAlCarrito, obtenerCarrito } from "../util/carritoUtils";

const ProductoCompleto = () => {
  const { id } = useParams();
  const { productos } = useProductos();
  const [producto, setProducto] = useState(null);
  const [fotoSeleccionada, setFotoSeleccionada] = useState(0);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const encontrado = productos.find((p) => p.id === (typeof id === 'string' && /^\d+$/.test(id) ? Number(id) : id));
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

  // Siempre trabajamos con array para las fotos
  const fotos = Array.isArray(producto.foto) ? producto.foto : [producto.foto];

  // Propiedades que ya mostramos explícitamente
  const propiedadesFijas = [
    "id",
    "nombre",
    "marca",
    "foto",
    "precio",
    "stock",
    "clon",
    "tamano",
    "color",
    "tipo",
  ];

  // Obtenemos las propiedades extras que tengan valor y no estén en fijas
  const propiedadesExtras = Object.entries(producto).filter(
    ([key, value]) =>
      !propiedadesFijas.includes(key) &&
      value !== null &&
      value !== undefined &&
      (typeof value !== "string" || value.trim() !== "") // no strings vacías
  );

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

          {/* Miniaturas debajo del carrusel */}
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
          {producto.clon && <p>Clon de: {producto.clon}</p>}
          {producto.tamano && <p>Tamaño: {producto.tamano} ml</p>}
          <p>Stock: {producto.stock}</p>
          {producto.color && <p>Color: {producto.color}</p>}

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

          {/* Render dinámico de propiedades extras */}
          {propiedadesExtras.map(([key, value]) => {
            // Si es array de fotos, renderizar como carousel o galería pequeña
            if (Array.isArray(value) && value.every((v) => typeof v === "string" && (v.startsWith("http") || v.startsWith("/")))) {
              return (
                <div key={key} className="mt-4">
                  <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                  <Carousel
                    indicators={false}
                    controls={value.length > 1}
                    interval={null}
                    slide={false}
                  >
                    {value.map((imgUrl, idx) => (
                      <Carousel.Item key={idx}>
                        <img
                          className="d-block w-100"
                          src={imgUrl}
                          alt={`${key} ${idx + 1}`}
                          style={{ objectFit: "contain", maxHeight: "300px" }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              );
            }

            // Si es array de texto o números, mostrar como lista simple
            if (Array.isArray(value)) {
              return (
                <div key={key} className="mt-4">
                  <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                  <ul>
                    {value.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            }

            // Si es texto largo, mostrar párrafo
            if (typeof value === "string" && value.length > 100) {
              return (
                <div key={key} className="mt-4">
                  <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                  <p style={{ whiteSpace: "pre-line" }}>{value}</p>
                </div>
              );
            }

            // Por defecto mostrar texto simple
            return (
              <div key={key} className="mt-4">
                <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                <p>{value}</p>
              </div>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductoCompleto;
