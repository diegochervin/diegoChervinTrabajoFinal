import React from "react";
import Perfumes from "./Perfumes";
import BannerInicio from "../components/BannerInicio";
import BarraProductos from "../components/BarraProductos";


const Home = () => {
  return (
     <>
       <div className="bg-dark py-2 px-3 flex-row justify-content-center gap-4">
        {/* <BarraProductos /> */}
      </div>
      <BannerInicio />


     
    </>
  );
};

export default Home;
