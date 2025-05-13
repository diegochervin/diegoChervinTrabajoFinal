import React from "react";
import { Container } from "react-bootstrap";
import Productos from "../components/Productos"; // Asegúrate de que la ruta sea correcta




const Home=()=>
    {
        return(
<Container  className="mt-4">
       <Productos/>
</Container>
        );
    };

export default Home;