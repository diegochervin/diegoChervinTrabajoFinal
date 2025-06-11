import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function BannerInicio() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Ejecutar al inicio
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: isMobile ? "60vh" : "53vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Link to="/perfumes">
        <img
          src="/img/afnanfebrero.jpg"
          alt="Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: isMobile ? "cover" : "contain",
            display: "block",
            cursor: "pointer",
          }}
        />
      </Link>
    </div>
  );
}

export default BannerInicio;
