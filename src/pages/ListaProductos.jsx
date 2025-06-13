import { Table, Button, Spinner, Container, Form, Modal } from 'react-bootstrap';
import { useState, useEffect, useMemo } from "react";

import { filtrarProductos } from "../util/filtrarProductos";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "https://6830550bf504aa3c70f76bd5.mockapi.io/perfume";

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
  const [modalMode, setModalMode] = useState("create");
  const [currentItem, setCurrentItem] = useState(null);
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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al cargar productos");
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
  foto: Array.isArray(d.foto) ? d.foto : d.foto ? [d.foto] : [],
  descripcion: d.descripcion ?? "",
  otros: d.otros || [],
}));

      setListaProductos(normalizados);
      setCopiaProductos(normalizados);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
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
    setCurrentItem(null);
  };

  const handleCreate = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });
      if (!res.ok) throw new Error("Error al crear item");
      await fetchItems();
      handleCloseModal();
    } catch (error) {
      alert("Error creando item");
      console.error(error);
    }
  };

 const handleUpdate = async () => {
  try {
    if (!currentItem?.id) {
      alert("El producto no tiene un ID válido. No se puede actualizar.");
      return;
    }

    const id = String(currentItem.id);
    const checkRes = await fetch(`${API_URL}/${id}`);
    if (checkRes.status === 404) {
      alert("Este producto ya no existe. Refrescá la página.");
      await fetchItems(); // actualiza la lista en pantalla
      handleCloseModal(); // cierra el modal para que no quede abierto con datos obsoletos
      return;
    }

    // Formatear correctamente el payload
    const payload = {
      nombre: nuevoProducto.nombre?.toUpperCase(),
      marca: nuevoProducto.marca,
      precio: Number(nuevoProducto.precio),
      stock: Number(nuevoProducto.stock),
      tipo: nuevoProducto.tipo,
      descripcion: nuevoProducto.descripcion ?? "",
      clon: nuevoProducto.clon ?? "",
      tamano: nuevoProducto.tamano ?? "",
      foto: Array.isArray(nuevoProducto.foto)
        ? nuevoProducto.foto
        : nuevoProducto.foto
        ? [nuevoProducto.foto]
        : [],
      otros: nuevoProducto.otros ?? [],
    };

    console.log("Enviando PUT a:", `${API_URL}/${id}`);
    console.log("Payload:", payload);

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Error al actualizar item - status: ${res.status}`);
    }

    await fetchItems();
    handleCloseModal();
  } catch (error) {
    alert("Error actualizando el producto. Puede que ya no exista o haya un problema en los datos.");
    console.error("Error en handleUpdate:", error);
    handleCloseModal();
    await fetchItems(); // forzar sincronización con la base
  }
};



  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este item?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Error al eliminar item");
        await fetchItems();
      } catch (error) {
        alert("Error eliminando item");
        console.error(error);
      }
    }
  };

  const handleGuardarNuevo = () => {
    if (modalMode === "edit") {
      handleUpdate();
    } else {
      handleCreate();
    }
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

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Lista de Productos</h1>
      <div className="text-end mb-3">
        <Button variant="primary" onClick={() => {
          setModalMode("create");
          setCurrentItem(null);
          handleShowModal();
        }}>
          Agregar Producto
        </Button>
      </div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.marca}</td>
                <td>${producto.precio}</td>
                <td>{producto.stock}</td>
                <td>{producto.tipo}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => {
                    setModalMode("edit");
                    setCurrentItem(producto);
                    setNuevoProducto(producto);
                    handleShowModal();
                  }}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(producto.id)}>
                    Borrar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "edit" ? "Editar" : "Nuevo"} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={nuevoProducto.nombre} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Marca</Form.Label>
              <Form.Control name="marca" value={nuevoProducto.marca} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control name="precio" value={nuevoProducto.precio} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control name="stock" value={nuevoProducto.stock} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Tipo</Form.Label>
              <Form.Control name="tipo" value={nuevoProducto.tipo} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Foto URL</Form.Label>
              <Form.Control name="foto" value={nuevoProducto.foto} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tamaño</Form.Label>
              <Form.Control name="tamano" value={nuevoProducto.tamano} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Clon</Form.Label>
              <Form.Control name="clon" value={nuevoProducto.clon} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} name="descripcion" value={nuevoProducto.descripcion} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleGuardarNuevo}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ListaProductos;
