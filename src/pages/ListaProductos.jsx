import { Table, Button, Spinner, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { useState, useEffect, useMemo } from "react";

import { filtrarProductos } from "../util/filtrarProductos";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  const [showModal, setShowModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    marca: "",
    nombre: "",
    precio: "",
    foto: "",
    stock: "",
    tamano: "",
    clon: "",
    tipo: "",
    descripcion: "",
    otros: [],
  });
  const [nuevoOtro, setNuevoOtro] = useState({ clave: "", valor: "" });
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

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNuevoProducto({
      marca: "",
      nombre: "",
      precio: "",
      foto: "",
      stock: "",
      tamano: "",
      clon: "",
      tipo: "",
      descripcion: "",
      otros: [],
    });
    setNuevoOtro({ clave: "", valor: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOtro = () => {
    if (nuevoOtro.clave && nuevoOtro.valor) {
      setNuevoProducto((prev) => ({
        ...prev,
        otros: [...prev.otros, { clave: nuevoOtro.clave, valor: nuevoOtro.valor }],
      }));
      setNuevoOtro({ clave: "", valor: "" });
    }
  };

  const handleRemoveOtro = (index) => {
    setNuevoProducto((prev) => ({
      ...prev,
      otros: prev.otros.filter((_, i) => i !== index),
    }));
  };

  const handleGuardarNuevo = () => {
    const nuevoId =
      listaProductos.length > 0
        ? Math.max(...listaProductos.map((p) => Number(p.id))) + 1
        : 1;
    const productoFinal = {
      id: nuevoId,
      ...nuevoProducto,
      precio: Number(nuevoProducto.precio),
      stock: Number(nuevoProducto.stock),
      otros: nuevoProducto.otros,
    };
    setListaProductos((prev) => [...prev, productoFinal]);
    setProductoEditandoId(nuevoId);
    handleCloseModal();
  };

  return (
    <Container fluid className="my-5">
      <h1 className="mb-4 text-center">Lista de Productos</h1>

      <div className="text-end mb-3">
        <Button variant="primary" onClick={handleShowModal}>
          Agregar Producto
        </Button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Marca</Form.Label>
              <Form.Control name="marca" value={nuevoProducto.marca} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={nuevoProducto.nombre} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control name="precio" type="number" value={nuevoProducto.precio} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Foto (URL)</Form.Label>
              <Form.Control name="foto" value={nuevoProducto.foto} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control name="stock" type="number" value={nuevoProducto.stock} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Tamaño</Form.Label>
              <Form.Control name="tamano" value={nuevoProducto.tamano} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Clon</Form.Label>
              <Form.Control name="clon" value={nuevoProducto.clon} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Tipo</Form.Label>
              <Form.Control name="tipo" value={nuevoProducto.tipo} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control name="descripcion" value={nuevoProducto.descripcion} onChange={handleChange} />
            </Form.Group>
            <hr />
            <Form.Label>Otros atributos</Form.Label>
            <div className="d-flex mb-2">
              <Form.Control
                placeholder="Clave (ej: color)"
                value={nuevoOtro.clave}
                onChange={e => setNuevoOtro({ ...nuevoOtro, clave: e.target.value })}
                className="me-2"
              />
              <Form.Control
                placeholder="Valor (ej: rojo)"
                value={nuevoOtro.valor}
                onChange={e => setNuevoOtro({ ...nuevoOtro, valor: e.target.value })}
                className="me-2"
              />
              <Button variant="success" onClick={handleAddOtro}>+</Button>
            </div>
            {nuevoProducto.otros.length > 0 && (
              <ul>
                {nuevoProducto.otros.map((otro, idx) => (
                  <li key={idx}>
                    {otro.clave}: {otro.valor}{" "}
                    <Button size="sm" variant="danger" onClick={() => handleRemoveOtro(idx)}>x</Button>
                  </li>
                ))}
              </ul>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarNuevo}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {/* Filtros arriba */}
          <Form className="mb-3 d-flex flex-wrap gap-2 align-items-end">
            <Form.Group>
              <Form.Label>Buscar</Form.Label>
              <Form.Control
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar producto..."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Marca</Form.Label>
              <Form.Select
                value={filtroMarca}
                onChange={(e) => setFiltroMarca(e.target.value)}
              >
                <option value="">Todas</option>
                {marcas.map((marca) => (
                  <option key={marca} value={marca}>
                    {marca}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Select
                value={filtroStock}
                onChange={(e) => setFiltroStock(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="conStock">Con stock</option>
                <option value="sinStock">Sin stock</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="">Todos</option>
                {tipos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Orden</Form.Label>
              <Form.Select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
              >
                <option value="">Sin orden</option>
                <option value="precioAsc">Precio ↑</option>
                <option value="precioDesc">Precio ↓</option>
                <option value="stockAsc">Stock ↑</option>
                <option value="stockDesc">Stock ↓</option>
              </Form.Select>
            </Form.Group>
          </Form>

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
        </>
      )}
    </Container>
  );
}

export default ListaProductos;