import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Banner = () => {
  const [bannerImages, setBannerImages] = useState([])

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

  useEffect(() => {
    function fetchbannerimage() {
      axios.get("http://localhost:8899/banner/fetchallbanner").then((res) => {
        setBannerImages(res.data.data)
      })
    }
    fetchbannerimage();
  }, [])

  return (
    <section className="pt-20">
      <div className="container">
        <Slider {...settings}>
          {
            bannerImages.map((item)=>(
              <img src={item.image} alt="banner" />
            ))
          }
        </Slider>
      </div>
    </section>
  );
};

export default Banner;
