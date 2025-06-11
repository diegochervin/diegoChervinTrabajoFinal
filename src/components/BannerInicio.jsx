function BannerInicio() {
  return (
    <div
      style={{
        width: "100vw",
        height: "80vh",
        backgroundColor: "#000", // Fondo neutro si sobran márgenes
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <img
        src="/img/afnanfebrero.jpg"
        alt="Banner"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}

export default BannerInicio;