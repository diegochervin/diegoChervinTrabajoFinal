function BannerInicio() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
        background: "#fff",
        width: "100vw",
        overflow: "hidden",
        marginLeft: "calc(-50vw + 50%)", 
      }}
    >
      <img
        src="/img/perfumes1.webp"
        alt="Banner 1"
        style={{ width: "25%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <img
        src="/img/perfumes2.webp"
        alt="Banner 2"
        style={{ width: "25%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <img
        src="/img/perfumes3.jpg"
        alt="Banner 3"
        style={{ width: "25%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <img
        src="/img/perfumes4.webp"
        alt="Banner 4"
        style={{ width: "25%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

export default BannerInicio;