import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ICarouselProps {
  children: React.ReactNode;
}

const Carousel: React.FC<ICarouselProps> = ({ children }) => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    centerPadding: "60px",
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: false,
  };
  return <Slider {...settings}>{children}</Slider>;
};

export default Carousel;
