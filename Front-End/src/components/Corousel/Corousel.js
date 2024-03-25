//import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Corousel.css";
import sprite from "../../SVG/sprite.svg";
import { useEffect, useState } from "react";

const images = [
  "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back06.jpg",
  "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back07.jpg",
  "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back04.jpg",
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const autoPlayInterval = setInterval(nextSlide, 3000);
    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [3000]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="carousel">
      <button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
        &lt;
      </button>
      <img
        src={images[activeIndex]}
        alt={`Slide ${activeIndex}`}
        className="carousel__img"
      />
      <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
        &gt;
      </button>
    </div>
  );
};
export default Carousel;