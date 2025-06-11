import { Link } from "react-router-dom";

function BannerInicio() {
  return (
    <div
      style={{
        width: "100vw",
        height: "53vh", 
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
            objectFit: "cover", 
            display: "block",
            cursor: "pointer",
          }}
        />
      </Link>
    </div>
  );
}

export default BannerInicio;
