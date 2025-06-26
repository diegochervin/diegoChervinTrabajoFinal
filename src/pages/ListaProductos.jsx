import { Table, Button, Spinner, Container, Form, Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { filtrarProductos } from "../util/filtrarProductos";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = "https://6830550bf504aa3c70f76bd5.mockapi.io/perfume";

function ListaProductos() {
  const [listaProductos, setListaProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
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
  const [nuevaMarca, setNuevaMarca] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("");
  const navigate = useNavigate();

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
    setCurrentItem(null);
  };

  const handleCreate = async () => {
    // Aplica valores por defecto y capitalización antes de enviar
    const marcaFinal = capitalizeWords(nuevoProducto.marca === "nueva" ? nuevaMarca : nuevoProducto.marca);
    const tipoFinal = capitalizeWords(nuevoProducto.tipo === "nuevo" ? nuevoTipo : nuevoProducto.tipo);
    const stockFinal = nuevoProducto.stock === "" ? 0 : Number(nuevoProducto.stock);
    const precioFinal = nuevoProducto.precio === "" ? 0.01 : Number(nuevoProducto.precio);

    // Validaciones
    if (!nuevoProducto.nombre.trim()) {
      Swal.fire("Error", "El nombre es obligatorio", "error");
      return;
    }
    if (!marcaFinal) {
      Swal.fire("Error", "La marca es obligatoria", "error");
      return;
    }
    if (!tipoFinal) {
      Swal.fire("Error", "El tipo es obligatorio", "error");
      return;
    }
    if (precioFinal <= 0) {
      Swal.fire("Error", "El precio debe ser mayor a 0", "error");
      return;
    }

    const productoAGuardar = {
      ...nuevoProducto,
      marca: marcaFinal,
      tipo: tipoFinal,
      stock: stockFinal,
      precio: precioFinal,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoAGuardar),
      });
      if (!res.ok) throw new Error("Error al crear item");
      await fetchItems();
      handleCloseModal();
    } catch (error) {
      Swal.fire("Error", "Error creando item", "error");
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (!currentItem?.id) {
      Swal.fire("Error", "El producto no tiene un ID válido. No se puede actualizar.", "error");
      return;
    }

    // Aplica valores por defecto y capitalización antes de enviar
    const marcaFinal = capitalizeWords(nuevoProducto.marca === "nueva" ? nuevaMarca : nuevoProducto.marca);
    const tipoFinal = capitalizeWords(nuevoProducto.tipo === "nuevo" ? nuevoTipo : nuevoProducto.tipo);
    const stockFinal = nuevoProducto.stock === "" ? 0 : Number(nuevoProducto.stock);
    const precioFinal = nuevoProducto.precio === "" ? 0.01 : Number(nuevoProducto.precio);

    // Validaciones
    if (!nuevoProducto.nombre.trim()) {
      Swal.fire("Error", "El nombre es obligatorio", "error");
      return;
    }
    if (!marcaFinal) {
      Swal.fire("Error", "La marca es obligatoria", "error");
      return;
    }
    if (!tipoFinal) {
      Swal.fire("Error", "El tipo es obligatorio", "error");
      return;
    }
    if (precioFinal <= 0) {
      Swal.fire("Error", "El precio debe ser mayor a 0", "error");
      return;
    }

    const id = String(currentItem.id);

    const payload = {
      ...nuevoProducto,
      nombre: nuevoProducto.nombre?.toUpperCase(),
      marca: marcaFinal,
      tipo: tipoFinal,
      stock: stockFinal,
      precio: precioFinal,
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

    try {
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
      Swal.fire("Error", "Error actualizando el producto. Puede que ya no exista o haya un problema en los datos.", "error");
      console.error("Error en handleUpdate:", error);
      handleCloseModal();
      await fetchItems();
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Seguro que quieres eliminar este item?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Error al eliminar item");
        await fetchItems();
        Swal.fire("Eliminado", "El item fue eliminado correctamente.", "success");
      } catch (error) {
        Swal.fire("Error", "Error eliminando item", "error");
        console.error(error);
      }
    }
  };

  const handleGuardarNuevo = () => {
    // Validaciones
    if (!nuevoProducto.nombre.trim()) {
      Swal.fire("Error", "El nombre es obligatorio", "error");
      return;
    }
    if ((!nuevoProducto.marca || nuevoProducto.marca === "nueva") && !nuevaMarca.trim()) {
      Swal.fire("Error", "La marca es obligatoria", "error");
      return;
    }
    if ((!nuevoProducto.tipo || nuevoProducto.tipo === "nuevo") && !nuevoTipo.trim()) {
      Swal.fire("Error", "El tipo es obligatorio", "error");
      return;
    }
    // Si no pone nada en precio, es 0.01
    const precioFinal = nuevoProducto.precio === "" ? 0.01 : Number(nuevoProducto.precio);
    if (precioFinal <= 0) {
      Swal.fire("Error", "El precio debe ser mayor a 0", "error");
      return;
    }

    const marcaFinal = capitalizeWords(nuevoProducto.marca === "nueva" ? nuevaMarca : nuevoProducto.marca);
    const tipoFinal = capitalizeWords(nuevoProducto.tipo === "nuevo" ? nuevoTipo : nuevoProducto.tipo);
    const stockFinal = nuevoProducto.stock === "" ? 0 : Number(nuevoProducto.stock);

    setNuevoProducto((prev) => ({
      ...prev,
      marca: marcaFinal,
      tipo: tipoFinal,
      stock: stockFinal,
      precio: precioFinal,
    }));

    setTimeout(() => {
      if (modalMode === "edit") {
        handleUpdate();
      } else {
        handleCreate();
      }
    }, 0);
  };

  const marcas = Array.from(new Set(listaProductos.map(p => p.marca).filter(Boolean)));
  const tipos = Array.from(new Set(listaProductos.map(p => p.tipo).filter(Boolean)));

  const productosFiltrados = listaProductos.filter(
    p =>
      p.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      (filtroMarca ? p.marca === filtroMarca : true) &&
      (filtroTipo ? p.tipo === filtroTipo : true)
  );

  // Función para capitalizar cada palabra
  function capitalizeWords(str) {
    return str.replace(/\w\S*/g, (w) =>
      w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );
  }

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
      <div className="mb-3 d-flex flex-wrap gap-2 align-items-end">
        <Form.Group>
          <Form.Label>Buscar por nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Buscar..."
            value={filtroNombre}
            onChange={e => setFiltroNombre(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Marca</Form.Label>
          <Form.Select
            value={filtroMarca}
            onChange={e => setFiltroMarca(e.target.value)}
          >
            <option value="">Todas</option>
            {marcas.map(marca => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Tipo</Form.Label>
          <Form.Select
            value={filtroTipo}
            onChange={e => setFiltroTipo(e.target.value)}
          >
            <option value="">Todos</option>
            {tipos.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </Form.Select>
        </Form.Group>
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
            {productosFiltrados.map(producto => (
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
              <Form.Label>Nombre*</Form.Label>
              <Form.Control
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Marca*</Form.Label>
              <Form.Select
                name="marca"
                value={nuevoProducto.marca}
                onChange={e => {
                  setNuevoProducto({ ...nuevoProducto, marca: e.target.value });
                  if (e.target.value !== "nueva") setNuevaMarca("");
                }}
                required
              >
                <option value="">Seleccione marca</option>
                {marcas.map(marca => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
                <option value="nueva">Nueva marca</option>
              </Form.Select>
              {nuevoProducto.marca === "nueva" && (
                <Form.Control
                  className="mt-2"
                  type="text"
                  placeholder="Ingrese nueva marca"
                  value={nuevaMarca}
                  onChange={e => setNuevaMarca(e.target.value)}
                  required
                />
              )}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Precio*</Form.Label>
              <Form.Control
                name="precio"
                type="number"
                min="1"
                value={nuevoProducto.precio}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                name="stock"
                type="number"
                min="0"
                value={nuevoProducto.stock}
                onChange={handleChange}
                placeholder="0"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Tipo*</Form.Label>
              <Form.Select
                name="tipo"
                value={nuevoProducto.tipo}
                onChange={e => {
                  setNuevoProducto({ ...nuevoProducto, tipo: e.target.value });
                  if (e.target.value !== "nuevo") setNuevoTipo("");
                }}
                required
              >
                <option value="">Seleccione tipo</option>
                {tipos.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
                <option value="nuevo">Nuevo tipo</option>
              </Form.Select>
              {nuevoProducto.tipo === "nuevo" && (
                <Form.Control
                  className="mt-2"
                  type="text"
                  placeholder="Ingrese nuevo tipo"
                  value={nuevoTipo}
                  onChange={e => setNuevoTipo(e.target.value)}
                  required
                />
              )}
            </Form.Group>
            {/* Inputs para 3 fotos */}
            <Form.Group className="mb-2">
              <Form.Label>Foto 1 (URL)</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.foto?.[0] || ""}
                onChange={e => {
                  const fotos = Array.isArray(nuevoProducto.foto) ? [...nuevoProducto.foto] : ["", "", ""];
                  fotos[0] = e.target.value;
                  setNuevoProducto({ ...nuevoProducto, foto: fotos });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Foto 2 (URL)</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.foto?.[1] || ""}
                onChange={e => {
                  const fotos = Array.isArray(nuevoProducto.foto) ? [...nuevoProducto.foto] : ["", "", ""];
                  fotos[1] = e.target.value;
                  setNuevoProducto({ ...nuevoProducto, foto: fotos });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Foto 3 (URL)</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.foto?.[2] || ""}
                onChange={e => {
                  const fotos = Array.isArray(nuevoProducto.foto) ? [...nuevoProducto.foto] : ["", "", ""];
                  fotos[2] = e.target.value;
                  setNuevoProducto({ ...nuevoProducto, foto: fotos });
                }}
              />
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
