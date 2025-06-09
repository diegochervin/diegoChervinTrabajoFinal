
import { createContext, useContext, useState } from "react";

const ProductoContext = createContext();

export const useProductos = () => useContext(ProductoContext);

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);

  return (
    <ProductoContext.Provider value={{ productos, setProductos }}>
      {children}
    </ProductoContext.Provider>
  );
}
