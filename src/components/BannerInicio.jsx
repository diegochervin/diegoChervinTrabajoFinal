import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BannerInicio() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageSrc = isMobile
    ? "/img/banner_home_mobile.png"
    : "/img/afnanfebrero.jpg";

  return (
    <div style={{ width: "100vw", overflow: "hidden" }}>
      <Link to="/perfumes">
        <img
          src={imageSrc}
          alt="Banner"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            cursor: "pointer",
          }}
        />
      </Link>
    </div>
  );
}

export default BannerInicio;
