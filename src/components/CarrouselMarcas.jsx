import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const logos = [
  "/src/img/marcas/rave.png",
  "/src/img/marcas/rasasi.png",
  "/src/img/marcas/alharamain.png",
  "/src/img/marcas/maisonalhambra.png",
  "/src/img/marcas/afnan.png",
  "/src/img/marcas/lataffa.png",
  "/src/img/marcas/armaf.png",
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1200 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1200, min: 900 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

function CarrouselMarcas() {
  return (
    <div style={{ background: "#fff", padding: "1rem 0" }}>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={1800}
        arrows={false}
        showDots={false}
        draggable
        swipeable
        containerClass="carousel-container"
        itemClass="d-flex justify-content-center align-items-center"
      >
        {logos.map((src, idx) => (
          <div key={idx} style={{ height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src={src}
              alt={`Logo marca ${idx + 1}`}
              style={{
                maxHeight: 70,
                maxWidth: "90%",
                objectFit: "contain",
                filter: "grayscale(1)",
                opacity: 0.8,
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarrouselMarcas;