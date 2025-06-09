import { useState, useEffect, useMemo } from "react";
import CardProducto from "../components/CardProducto";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import AsideFiltros from "../components/AsideFiltros";
import { filtrarProductos } from "../util/filtrarProductos";
import { useProductos } from "../context/ProductoContext";


function Perfume() {
  const [perfumes, setPerfume] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setProductos } = useProductos();

  
    const [busqueda, setBusqueda] = useState("");
    const [filtroMarca, setFiltroMarca] = useState("");
    const [filtroStock, setFiltroStock] = useState("");
    const [orden, setOrden] = useState("");
  

    const marcas = useMemo(() => {
      const todas = perfumes.map((b) => b.marca);
      return [...new Set(todas)].sort();
    }, [perfumes]);
  
  
    const productosFiltrados = useMemo(
    () =>
      filtrarProductos(perfumes, {
        busqueda,
        filtroMarca,
        filtroStock,
        orden,
      }),
    [perfumes, busqueda, filtroMarca, filtroStock, orden]
  );



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://etherealparfums.netlify.app/productos_combinados.json"
        );
        const data = await response.json();
        
        const perfumesFiltrados = data.filter(
          (d) => d.tipo.toLowerCase() === "perfume"
        );




        const normalizados = perfumesFiltrados.map((d) => ({
          id: `${d.id}`,
          marca: d.marca,
          nombre: d.nombre.toUpperCase() ||  d.modelo.toUpperCase(),
          precio: d.precio,
          foto: d.foto,
          stock: d.stock ?? "",
          tamano: d.tamano ?? "",
          clon: d.clon ?? null,
          tipo: d.tipo,
           descripcion: d.descripcion ?? ""
        }));
        setPerfume(normalizados);
        setProductos(normalizados);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container fluid className="my-5">
      <h1 className="d-flex justify-content-center align-items-center mb-4">
        Perfumes
      </h1>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          <Col xs={12} md={3}>
            <AsideFiltros
              marcas={marcas}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              filtroMarca={filtroMarca}
              setFiltroMarca={setFiltroMarca}
              filtroStock={filtroStock}
              setFiltroStock={setFiltroStock}
              orden={orden}
              setOrden={setOrden}
            />
          </Col>
          <Col xs={12} md={9}>
            <Row className="g-4">
             {Array.isArray(productosFiltrados) && productosFiltrados.map((producto) => (
  <Col key={producto.id} xs={12} sm={6} md={4} lg={3} xl={3}>
    <CardProducto producto={producto} />
  </Col>
))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );

}

export default Perfume;
