import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Banner = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    focusOnSelect: true,
    appendDots: (dots) => (
      <div
        style={{
          padding: "30px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "100%",
          background: "black",
          opacity: "50%",
        }}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                padding: "20px",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "100%",
                background: "black",
                opacity: "50%",
              }}
            ></div>
          ),
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          appendDots: (dots) => (
            <div
              style={{
                padding: "15px",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "100%",
                background: "black",
                opacity: "50%",
              }}
            ></div>
          ),
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          appendDots: (dots) => (
            <div
              style={{
                padding: "10px",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "100%",
                background: "black",
                opacity: "50%",
              }}
            ></div>
          ),
        }
      }
    ]
  };
  return (
    <section className="pt-20">
      <div className="container">
        <Slider {...settings}>
          <img
            src="https://img.lazcdn.com/us/domino/40fa2250-564f-48a7-8da9-b9a88f4064c2_BD-1976-688.jpg_2200x2200q80.jpg"
            alt="image"
          />
          <img
            src="https://img.lazcdn.com/us/domino/abee063c-119b-4d45-b67e-b6a94a9757e6_BD-1976-688.jpg_2200x2200q80.jpg"
            alt="image"
          />
          <img
            src="https://img.lazcdn.com/us/domino/c385cceb-ca93-4ace-a6dd-67854ca3dcde_BD-1976-688.jpg_2200x2200q80.jpg"
            alt="image"
          />
          <img
            src="https://img.lazcdn.com/us/domino/31e8b193-53a0-48a9-98e0-e86e6f3c289b_BD-1976-688.jpg_2200x2200q80.jpg"
            alt="image"
          />
        </Slider>
      </div>
    </section>
  );
};

export default Banner;
