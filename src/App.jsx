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
import ListaProductos from "./pages/ListaProductos";
import { AuthProvider } from "./context/AuthContext";
import RutaPrivadaAdmin from "./components/RutaPrivadaAdmin";
import BannerInicio from "./components/BannerInicio";
import CarrouselMarcas from "./components/CarrouselMarcas";

function App() {
  return (
    <Router>
      <ProductoProvider>
        <AuthProvider>
          <div>
            <Header />
            <BannerInicio />
            
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
              <Route path="/editproductos" element={
                <RutaPrivadaAdmin>
                  <ListaProductos />
                </RutaPrivadaAdmin>
              }/>
            </Routes>
            <CarrouselMarcas />
            <Footer />
          </div>
        </AuthProvider>
      </ProductoProvider>
    </Router>
  );
}

export default App;
