import React from "react";
import { Container } from "react-bootstrap";
import Productos from "../components/Perfumes"; 
import Nav from "../components/BarraProductos";
import { Link } from "react-router-dom";



const Home=()=>
    {
        return(
<Container  className="mt-4">
    <Nav> </Nav>
       <Productos/>
</Container>
        );
    };

export default Home;