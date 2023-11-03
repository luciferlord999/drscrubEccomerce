import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.min.css";
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/pagination/pagination.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import BassURl from "../Api/Api";
import imageURl from "../Api/ImageUrl";

SwiperCore.use([Navigation, Pagination]);

//  fetch api slider

function BannerSlider({ slider, spaceBetween, slidesPerView }) {
  console.log(slider);
  return (
    <>
      <section className="hero__slider--section color-scheme-2">
        <div className="hero__slider--inner hero__slider--activation swiper">
          <div className="hero__slider--wrapper swiper-wrapper">
            <Swiper
              spaceBetween={spaceBetween}
              slidesPerView={slidesPerView}
              navigation
              autoplay
              pagination={{ clickable: true }}
            >
              {slider?.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="hero__slider--items home2__slider--bg"
                    style={{
                      backgroundImage: `url(${imageURl}/${slide.slider_image})`,
                      height: "70vh",
                    }}
                  >
                    <div className="container-fluid">
                      <div className="hero__slider--items__inner hero__slider--bg2__inner">
                        <div className="row row-cols-1">
                          <div className="col">
                            <div className="slider__content"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}

export default BannerSlider;
