import { useState } from 'react';
import NavBar from './components/Header';
import Home from './pages/Home';
import About from './pages/Register';
import Contact from './pages/Contact';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Login from './components/Login';


function App() {

  return (
    
      <Router>
        <div>
          <NavBar/>
          <Routes>
              <Route path='/' element={<Home/>}  />
              <Route path='/about' element={<About/>}  />
              <Route path='/contact' element={<Contact/>}  />
              <Route path='/carrito' element={<About/>}  />
              <Route path='/login' element={<Login/>}  />
              <Route path='/register' element={<About/>}  />
          </Routes>
          <Footer/>
        </div>
      </Router>
    
    
  )
}

export default App