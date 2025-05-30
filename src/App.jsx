import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Desodorante from "./pages/Desodorante";
import BarraProductos from "./components/BarraProductos";
import Carrito from "./pages/Carrito";
import ProductoCompleto from "./pages/ProductoCompleto";
import { ProductoProvider } from "./context/ProductoContext";


function App() {
  return (
   <ProductoProvider>
  

    <Router>
      <div>
        <Header />
        <div className="bg-dark py-2 px-3flex-row justify-content-center gap-4">
          <BarraProductos />
          
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/desodorante" element={<Desodorante />} />
          <Route path="/producto/:id" element={<ProductoCompleto />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    </ProductoProvider>
  );
}

export default App;
