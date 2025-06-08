export function filtrarProductos(productos, { busqueda = "", filtroMarca = "", filtroStock = "", filtroTipo = "", orden = "" }) {
  let filtrados = [...(productos || [])];

  if (busqueda.trim() !== "") {
    const texto = busqueda.toLowerCase();
    filtrados = filtrados.filter(p =>
      p.marca.toLowerCase().includes(texto) ||
      p.nombre.toLowerCase().includes(texto) ||
      (p.clon && p.clon.toLowerCase().includes(texto))
    );
  }

  if (filtroMarca !== "") {
    filtrados = filtrados.filter(p => p.marca === filtroMarca);
  }

  if (filtroTipo !== "") {
    filtrados = filtrados.filter(p => p.tipo.toLowerCase() === filtroTipo.toLowerCase());
  }

  if (filtroStock === "S") {
    filtrados = filtrados.filter(p => p.stock > 0);
  }

  switch (orden) {
    case "alfabetoAZ":
      filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    case "alfabetoZA":
      filtrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
      break;
    case "preciomenor":
      filtrados.sort((a, b) => a.precio - b.precio);
      break;
    case "preciomayor":
      filtrados.sort((a, b) => b.precio - a.precio);
      break;
  }

  return filtrados;
}
