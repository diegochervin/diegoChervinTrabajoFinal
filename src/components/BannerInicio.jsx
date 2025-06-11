import { Link } from "react-router-dom";

function BannerInicio() {
  return (
    <div
      style={{
        width: "100vw",
        height: "60vh",
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
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            display: "block",
            cursor: "pointer",
          }}
        />
      </Link>
    </div>
  );
}

export default BannerInicio;
