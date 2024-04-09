import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Corousel.css";
import corousel_1 from '../../images/corousel_1.jpg';
import corousel_2 from '../../images/corousel_2.png';
import corousel_3 from '../../images/corousel_3.jpg';
import corousel_4 from '../../images/corousel_4.jpg';

import { useEffect, useState } from "react";

const images = [
  corousel_1,
  corousel_2,
  corousel_3,
  corousel_4
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