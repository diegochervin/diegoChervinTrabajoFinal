// Normaliza una sola propiedad de texto (capitaliza y limpia espacios)
const normalizarTexto = (texto) => {
    if (!texto || typeof texto !== "string") return "";
    const limpio = texto.trim().toLowerCase();
    return limpio.charAt(0).toUpperCase() + limpio.slice(1);
  };
  
  // Normaliza un solo producto
  export const normalizarProducto = (producto) => ({
    ...producto,
    marca: normalizarTexto(producto.marca),
    modelo: producto.modelo ? producto.modelo.trim() : "",
  });
  
  // Normaliza un array completo de productos
  export const normalizarProductos = (productos) =>
    productos.map((producto) => normalizarProducto(producto));
  