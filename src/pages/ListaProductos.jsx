import { Table, Button, Spinner, Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useEffect, useMemo, useNavigate } from "react";
import AsideFiltros from "../components/AsideFiltros";
import { filtrarProductos } from "../util/filtrarProductos";
import { useAuth } from "../context/AuthContext";


function ListaProductos() {
  const [listaProductos, setListaProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroStock, setFiltroStock] = useState("");
  const [orden, setOrden] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [productoEditandoId, setProductoEditandoId] = useState(null);
  const [copiaProductos, setCopiaProductos] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => 
    {
    logout();
    navigate("/");
  };

  const marcas = useMemo(() => {
    const todas = listaProductos.map((p) => p.marca);
    return [...new Set(todas)].sort();
  }, [listaProductos]);

  const tipos = useMemo(() => {
    const todos = listaProductos.map((p) => p.tipo);
    return [...new Set(todos.filter(Boolean))].sort();
  }, [listaProductos]);

  const productosFiltrados = useMemo(
    () =>
      filtrarProductos(listaProductos, {
        busqueda,
        filtroMarca,
        filtroStock,
        filtroTipo,
        orden,
      }),
    [listaProductos, busqueda, filtroMarca, filtroStock, filtroTipo, orden]
  );

  useEffect(() => {
    const dataLocal = localStorage.getItem("productos");
    if (dataLocal) {
      setListaProductos(JSON.parse(dataLocal));
      setCopiaProductos(JSON.parse(dataLocal));
      setLoading(false);
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://etherealparfums.netlify.app/productos_combinados.json"
          );
          const data = await response.json();

          const normalizados = data.map((d) => ({
            id: d.id,
            marca: d.marca,
            nombre: (d.nombre || d.modelo)?.toUpperCase(),
            precio: d.precio,
            stock: d.stock ?? "10",
            tamano: d.tamano ?? "",
            clon: d.clon ?? null,
            tipo: d.tipo,
          }));

          setListaProductos(normalizados);
          setCopiaProductos(normalizados);
          localStorage.setItem("productos", JSON.stringify(normalizados));
        } catch (error) {
          console.error("Error al cargar productos:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("productos", JSON.stringify(listaProductos));
    }
  }, [listaProductos, loading]);

  const actualizarCampo = (id, campo, valor) => {
    setListaProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [campo]: valor } : p))
    );
  };

  const cancelarEdicion = (id) => {
    const original = copiaProductos.find((p) => p.id === id);
    setListaProductos((prev) =>
      prev.map((p) => (p.id === id ? original : p))
    );
    setProductoEditandoId(null);
  };

  const agregarNuevoProducto = () => {
    const nuevoId =
  listaProductos.length > 0
    ? Math.max(...listaProductos.map((p) => Number(p.id))) + 1
    : 1;

const nuevo = {
  id: nuevoId,
  nombre: "",
  marca: "",
  precio: 0,
  stock: 0,
  tipo: tipos[0] || "",
};
    setListaProductos((prev) => [...prev, nuevo]);
    setProductoEditandoId(nuevo.id);
  };

  return (
    <Container fluid className="my-5">
      <h1 className="mb-4 text-center">Lista de Productos</h1>

      <div className="text-end mb-3">
        <Button variant="primary" onClick={agregarNuevoProducto}>
          Agregar Producto
        </Button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
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
              tipos={tipos}
              filtroTipo={filtroTipo}
              setFiltroTipo={setFiltroTipo}
            />
          </Col>
          <Col xs={12} md={9}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Tipo</th>
                  <th style={{ width: '150px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>

                    <td>
                      {productoEditandoId === producto.id ? (
                        <Form.Control
                          type="text"
                          value={producto.nombre}
                          onChange={(e) =>
                            actualizarCampo(producto.id, "nombre", e.target.value)
                          }
                        />
                      ) : (
                        producto.nombre
                      )}
                    </td>

                    <td>
                      {productoEditandoId === producto.id ? (
                        <Form.Control
                          type="number"
                          value={producto.precio}
                          onChange={(e) =>
                            actualizarCampo(producto.id, "precio", Number(e.target.value))
                          }
                        />
                      ) : (
                        `$${producto.precio.toFixed(2)}`
                      )}
                    </td>

                    <td>
                      {productoEditandoId === producto.id ? (
                        <Form.Control
                          type="number"
                          value={producto.stock}
                          onChange={(e) =>
                            actualizarCampo(producto.id, "stock", Number(e.target.value))
                          }
                        />
                      ) : (
                        producto.stock
                      )}
                    </td>

                    <td>
                      {productoEditandoId === producto.id ? (
                        <Form.Select
                          value={producto.tipo}
                          onChange={(e) =>
                            actualizarCampo(producto.id, "tipo", e.target.value)
                          }
                        >
                          {tipos.map((tipo) => (
                            <option key={tipo} value={tipo}>
                              {tipo}
                            </option>
                          ))}
                        </Form.Select>
                      ) : (
                        producto.tipo
                      )}
                    </td>

                    <td>
                      {productoEditandoId === producto.id ? (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => setProductoEditandoId(null)}
                          >
                            Guardar
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => cancelarEdicion(producto.id)}
                          >
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => setProductoEditandoId(producto.id)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              setListaProductos((prev) =>
                                prev.filter((p) => p.id !== producto.id)
                              )
                            }
                          >
                            Borrar
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ListaProductos;