import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/Register';
import Contact from './pages/Contact';
import Register from './pages/Register';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Login from './pages/Login';
import Desodorante from './pages/Desodorante';
import BarraProductos from './components/BarraProductos';

function App() {

  return (
    <Router>
      <div>
        <Header/>
        <div className="bg-dark py-2 px-3 flex-row justify-content-center gap-4">
          <BarraProductos />
        </div>
        <Routes>
          <Route path='/' element={<Home/>}  />
          <Route path='/about' element={<About/>}  />
          <Route path='/contact' element={<Contact/>}  />
          <Route path='/carrito' element={<About/>}  />
          <Route path='/login' element={<Login/>}  />
          <Route path='/register' element={<Register/>}  />
          <Route path='/desodorante' element={<Desodorante/>}  />
        </Routes>
        <Footer/>
      </div>
    </Router>
  )
}

export default App