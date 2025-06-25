import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

const API_URL = "https://68489b9bec44b9f349416b0e.mockapi.io/api/clientes";

const ProductCRUD = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); 
  const [currentItem, setCurrentItem] = useState({ name: "", description: "", foto: [] });
  const [foto1, setFoto1] = useState("");
  const [foto2, setFoto2] = useState("");
  const [foto3, setFoto3] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener items");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      alert("Error cargando datos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const construirItemConFotos = () => {
    const fotos = [foto1, foto2, foto3].filter(f => f.trim() !== "");
    return { ...currentItem, foto: fotos };
  };

  const handleCreate = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(construirItemConFotos()),
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
      const res = await fetch(`${API_URL}/${currentItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(construirItemConFotos()),
      });
      if (!res.ok) throw new Error("Error al actualizar item");
      await fetchItems();
      handleCloseModal();
    } catch (error) {
      alert("Error actualizando item");
      console.error(error);
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

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentItem({ name: "", description: "", foto: [] });
    setFoto1("");
    setFoto2("");
    setFoto3("");
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setCurrentItem(item);
    setFoto1(item.foto?.[0] || "");
    setFoto2(item.foto?.[1] || "");
    setFoto3(item.foto?.[2] || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h1>Clase 11</h1>

      <Button variant="primary" onClick={openCreateModal} className="mb-3">
        Crear nuevo item
      </Button>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
  <tr>
    <th>Nombre</th>
    <th>Marca</th>
    <th>Precio</th>
    <th>Stock</th>
    <th>Tipo</th>
    <th>Fotos</th>  {/* Nueva columna para fotos */}
    <th>Acciones</th>
  </tr>
</thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No hay items
                </td>
              </tr>
            )}
            {items.map(item => (
    <tr key={item.id}>
      <td>{item.nombre}</td>
      <td>{item.marca}</td>
      <td>${item.precio}</td>
      <td>{item.stock}</td>
      <td>{item.tipo}</td>
      <td>
        {Array.isArray(item.foto) && item.foto.map((url, idx) =>
    url ? (
      <img
        key={idx}
        src={url}
        alt={`Foto ${idx + 1}`}
        style={{ height: "50px", marginRight: "5px", borderRadius: "4px" }}
      />
    ) : null
  )}
      </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => openEditModal(item)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "create" ? "Crear nuevo item" : "Editar item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese nombre"
                name="name"
                value={currentItem.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese descripción"
                name="description"
                value={currentItem.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Foto URL 1</Form.Label>
              <Form.Control
                type="text"
                value={foto1}
                onChange={(e) => setFoto1(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Foto URL 2</Form.Label>
              <Form.Control
                type="text"
                value={foto2}
                onChange={(e) => setFoto2(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Foto URL 3</Form.Label>
              <Form.Control
                type="text"
                value={foto3}
                onChange={(e) => setFoto3(e.target.value)}
              />
            </Form.Group>

            <div className="mb-3 d-flex">
              {[foto1, foto2, foto3].map((f, i) =>
                f ? <img key={i} src={f} alt="preview" height={80} className="me-2" /> : null
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={modalMode === "create" ? handleCreate : handleUpdate}
            disabled={!currentItem.name || !currentItem.description}
          >
            {modalMode === "create" ? "Crear" : "Actualizar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductCRUD;
