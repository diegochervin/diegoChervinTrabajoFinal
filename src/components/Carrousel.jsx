import Carousel from 'react-bootstrap/Carousel';

function Carrousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <div style={{ height: "30vh", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            className="d-block"
            src="/src/img/perfumes1.webp"
            alt="First slide"
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>
        <Carousel.Caption>
          {/* <h3>First slide label</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ height: "30vh", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            className="d-block"
            src="/src/img/perfumes2.webp"
            alt="Second slide"
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>
        <Carousel.Caption>
          {/* <h3>Second slide label</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ height: "30vh", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            className="d-block"
            src="/src/img/perfumes3.jpg"
            alt="Third slide"
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>
        <Carousel.Caption>
          {/* <h3>Third slide label</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrousel;