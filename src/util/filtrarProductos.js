// src/utils/filtrarProductos.js
export function filtrarProductos(productos, { busqueda = "", filtroMarca = "", filtroStock = "", orden = "" }) {
    let filtrados = [...(productos || [])];
  
    // Búsqueda general
    if (busqueda.trim() !== "") {
      const texto = busqueda.toLowerCase();
      filtrados = filtrados.filter(bat =>
        bat.marca.toLowerCase().includes(texto) ||
        bat.nombre.toLowerCase().includes(texto) ||
        (bat.clon && bat.clon.toLowerCase().includes(texto))
      );
    }
  
    // Filtro por marca
    if (filtroMarca !== "") {
      filtrados = filtrados.filter(bat => bat.marca === filtroMarca);
    }
  
    // Filtro por stock
    if (filtroStock === "S") {
      filtrados = filtrados.filter(bat => bat.stock > 0);
    }
  
    // Orden
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
      default:
        break;
    }
  
    return filtrados;
}
