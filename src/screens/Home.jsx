import React, { Suspense, useEffect, useRef, useState } from "react";
import BannerSlider from "../components/BannerSlider";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

import { addToCartAction } from "../Redux/Action/CartAction";
import HomeProduct from "../components/HomeProduct";
import CustomStyle from "../components/CustomStyle";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { fetchProducts } from "../Redux/Action/getItemAction";
import BassURl from "../Api/Api";
import axios from "axios";
import imageURl from "../Api/ImageUrl";
import { fetchslider } from "../Redux/Action/getSliderAction";
import { fetchAllProducts } from "../Redux/Action/getAllProductAction";
import CountryModal from "../components/Modal/CountryModal";

function Home() {


  const dispatch = useDispatch();

  // Fetch data using Redux Thunk action
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Access data from Redux store
  const tags = useSelector((state) => state.products);
  const countryData = localStorage.getItem("currency");

  // Fetch data using React Query

  const { data, isLoading, isError } = useQuery("products", () => {
    return axios.get(`${BassURl}/all-tags`);
  });
  // Access fetched data

  // Access data from Redux store

  const Skeleton = () => {
    return <div className="skeleton">{/* Skeleton content */}</div>;
  };

  // api Call slider

  useEffect(() => {
    dispatch(fetchslider());
  }, [dispatch]);

  // Access data from Redux store
  const SliderData = useSelector((state) => state.sliders);
  const { slider, isSliderLoading, error } = SliderData;




  // fetch All Product

  // Fetch data using Redux Thunk action
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Access data from Redux store
  const allProducts = useSelector((state) => state.allproducts);
  const { allproducts, isProductLoading, } = allProducts;

  // console.log(allproducts);







  const [colorCode, setcolorCode] = useState('');
  useEffect(() => {

    axios.get(`${BassURl}/product-color/1`).then((res) => {
      return (setcolorCode(res.data.data))
    });

  }, [])
  // console.log(colorCode)


  return (
    <>
      <Navbar />
      <main className="main__content_wrapper">
        {/* Start slider section */}
        {isSliderLoading ? (
          <>
            <div id="preloader">
              <div id="ctn-preloader" className="ctn-preloader">
                <div className="animation-preloader">
                  <div className="spinner" />
                  <div className="txt-loading">
                    <span data-text-preloader="L" className="letters-loading">
                      L
                    </span>
                    <span data-text-preloader="O" className="letters-loading">
                      O
                    </span>
                    <span data-text-preloader="A" className="letters-loading">
                      A
                    </span>
                    <span data-text-preloader="D" className="letters-loading">
                      D
                    </span>
                    <span data-text-preloader="I" className="letters-loading">
                      I
                    </span>
                    <span data-text-preloader="N" className="letters-loading">
                      N
                    </span>
                    <span data-text-preloader="G" className="letters-loading">
                      G
                    </span>
                  </div>
                </div>
                <div className="loader-section section-left" />
                <div className="loader-section section-right" />
              </div>
            </div>
          </>
        ) : (
          <>
            <BannerSlider
              slider={slider.data}
              spaceBetween={30}
              slidesPerView={1}
            />
          </>
        )}

        <section className="banner__section banner__style2 section--padding color-scheme-2">
          <div className="section__heading text-center mb-35">
            <h2 className="section__heading--maintitle style2">
              Shop by Categories
            </h2>
          </div>
          <div className="container-fluid">
            <div className="row mb--n28">
              {isLoading ? (
                <>
                  <div className="col-lg-4">
                    <Skeleton />
                  </div>
                  <div className="col-lg-4">
                    <Skeleton />
                  </div>
                  <div className="col-lg-4">
                    <Skeleton />
                  </div>
                </>
              ) : (
                <>
                  {data?.data?.data?.map((items) => {
                    return (
                      <>
                        <div className="col-lg-4">
                          <div className="banner__items position__relative">
                            <Link
                              to={`/shop/${items?.tag_url}`}
                              className="banner__items--thumbnail"
                            >
                              <img
                                className="banner__items--thumbnail__img banner__img--max__height"
                                src={`${imageURl}/${items?.tag_image}`}
                                alt="banner-img"
                              />
                              <div className="banner__items--content style2">
                                <h3 className="banner__items--content__title style2">
                                  {items?.tag_eng}
                                </h3>
                                <span className="banner__items--content__link style2">
                                  SHOP NOW
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </section>

        <section className="product__section section--padding color-scheme-2 pt-0">
          <div className="container-fluid">
            <div className="section__heading text-center mb-35">
              <h2 className="section__heading--maintitle style2">
                Look like a Superhero
              </h2>
            </div>
            <div className="product__section--inner">
              <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 mb--n30">
                {
                  isProductLoading ? (<>
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>


                  </>) : (

                    <>

                      {allproducts &&
                        allproducts?.map((data, index) => {

                          return (
                            <>
                              <div key={index}>
                                <Suspense
                                  fallback={
                                    <>
                                      <div className="container">
                                        <div className="text-center p-0 ">
                                          <div
                                            className="spinner-border mt-10"
                                            style={{
                                              margin: "250px auto",
                                              color: "#170080ed !important",
                                            }}
                                            role="status"
                                          >
                                            {/* <span className="sr-only">Loading...</span> */}
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  }
                                >

                                  <HomeProduct data={data} count={index + 1} />
                                </Suspense>
                              </div>
                            </>
                          );
                        })}

                    </>
                  )
                }

              </div>
            </div>
          </div>
        </section>
        {/* End product section */}
        {/* Start banner section */}
        <section className="banner__section banner__discount section--padding color-scheme-2 pt-0">
          <div className="container-fluid">
            <div className="banner__discount--inner position__relative">
              <div className="row row-cols-sm-2 row-cols-1">
                <div className="col">
                  <div className="banner__items banner__discount--items position__relative">
                    <a className="banner__items--thumbnail" href="">
                      <img
                        className="banner__items--thumbnail__img"
                        src="assets/img/banner/offer.gif"
                        alt="banner-img"
                      />
                    </a>
                  </div>
                </div>
                <div className="col">
                  <div className="banner__items banner__discount--items position__relative">
                    <a className="banner__items--thumbnail" href="">
                      <img
                        className="banner__items--thumbnail__img"
                        src="assets/img/banner/offer1.gif"
                        alt="banner-img"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="banner__discount--content text-center">
                <span className="banner__discount--content__subtitle">
                  Collection 2023
                </span>
                <h2 className="banner__discount--content__title h3">
                  Get 35% Diseount For <br />
                  Couple Special
                </h2>
                <a className="banner__discount--content__link" href="">
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* End banner section */}

        {/* Start brand logo section */}
        <div
          className="counterup__banner--section counterup__banner__bg2"
          id="funfactId"
        >
          <div className="container">
            <div className="row row-cols-1 align-items-center">
              <div className="col-lg-12 text-center">
                <div className="counterup__banner--inner position__relative ">
                  <div className="counterup__banner--items text-center">
                    <h2 className="counterup__banner--items__text text-white">
                      HEROIC
                      NUMBER
                    </h2>
                    <span
                      className="counterup__banner--items__number js-counter text-white"
                      data-count={50}
                    >
                      2532456 PCS
                    </span>
                    <p className="text-white">
                      Of medical apparel supplied to DR SCRUBS
                      <br /> (That's almost filling up 3 olympic swimming pools)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
        {/* End brand logo section */}

        {/* Start testimonial section */}
        <section className="testimonial__section testimonial__bg position__relative section--padding color-scheme-2">
          <div className="container">
            <div className="testimonial__bg--inner testimonial__activation--column1 swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial__items--style2 testimonial__items text-center">
                    <div className="testimonial__items--style2__thumbnail mb-10">
                      <img
                        className="testimonial__items--style2__thumbnail--img border-radius-50"
                        src="assets/img/other/testimonial-thumb1.png"
                        alt="testimonial-img"
                      />
                    </div>
                    <div className="testimonial__items--content">
                      <h2 className="testimonial__items--title text-white h3">
                        Richard Anderson
                      </h2>
                      <span className="testimonial__items--subtitle text-white">
                        Nevada, USA
                      </span>
                      <p className="testimonial__items--desc style2 text-white">
                        Lorem ipsum dolor sit amet, consectetur adipisicin elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim
                      </p>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial__items--style2 testimonial__items text-center">
                    <div className="testimonial__items--style2__thumbnail mb-10">
                      <img
                        className="testimonial__items--style2__thumbnail--img border-radius-50"
                        src="assets/img/other/testimonial-thumb2.png"
                        alt="testimonial-img"
                      />
                    </div>
                    <div className="testimonial__items--content">
                      <h2 className="testimonial__items--title text-white h3">
                        Nike Mardson
                      </h2>
                      <span className="testimonial__items--subtitle text-white">
                        fashion
                      </span>
                      <p className="testimonial__items--desc style2 text-white">
                        Lorem ipsum dolor sit amet, consectetur adipisicin elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim
                      </p>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial__items--style2 testimonial__items text-center">
                    <div className="testimonial__items--style2__thumbnail mb-10">
                      <img
                        className="testimonial__items--style2__thumbnail--img border-radius-50"
                        src="assets/img/other/testimonial-thumb3.png"
                        alt="testimonial-img"
                      />
                    </div>
                    <div className="testimonial__items--content">
                      <h2 className="testimonial__items--title text-white h3">
                        Nike Mardson
                      </h2>
                      <span className="testimonial__items--subtitle text-white">
                        fashion
                      </span>
                      <p className="testimonial__items--desc style2 text-white">
                        Lorem ipsum dolor sit amet, consectetur adipisicin elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="testimonial__pagination style2 swiper-pagination" />
            </div>
          </div>
        </section>
        {/* End testimonial section */}
        {/* Start blog section */}
      </main>
      {/* <CartSlider /> */}
      <CountryModal />

      <Footer />
    </>
  );
}

export default Home;
