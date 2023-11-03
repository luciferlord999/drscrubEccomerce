import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />
      <main className="main__content_wrapper">
        <section className="breadcrumb__section breadcrumb__about_bg">
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="breadcrumb__content text-center">
                  <h1 className="breadcrumb__content--title text-white mb-25">
                    About Us
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about__section section--padding mb-95">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="about__thumb">
                  <div className="">
                    <img
                      className="about__thumb--img border-radius-5 display-block w-100"
                      src="/assets/img/banner/banner8.webp"
                      alt="about-thumb"
                    />
                  </div>
                  {/* <div className="about__thumb--items position__relative">
                    <img
                      className="about__thumb--img border-radius-5 display-block"
                      src="assets/img/other/about-thumb-list2.png"
                      alt="about-thumb"
                    />
                    <div className="banner__bideo--play about__thumb--play">
                      <a
                        className="banner__bideo--play__icon about__thumb--play__icon glightbox"
                        href="https://vimeo.com/115041822"
                        data-gallery="video"
                      >
                        <svg
                          id="play"
                          xmlns="http://www.w3.org/2000/svg"
                          width="40.302"
                          height="40.302"
                          viewBox="0 0 46.302 46.302"
                        >
                          <g
                            id="Group_193"
                            data-name="Group 193"
                            transform="translate(0 0)"
                          >
                            <path
                              id="Path_116"
                              data-name="Path 116"
                              d="M39.521,6.781a23.151,23.151,0,0,0-32.74,32.74,23.151,23.151,0,0,0,32.74-32.74ZM23.151,44.457A21.306,21.306,0,1,1,44.457,23.151,21.33,21.33,0,0,1,23.151,44.457Z"
                              fill="currentColor"
                            />
                            <g
                              id="Group_188"
                              data-name="Group 188"
                              transform="translate(15.588 11.19)"
                            >
                              <g id="Group_187" data-name="Group 187">
                                <path
                                  id="Path_117"
                                  data-name="Path 117"
                                  d="M190.3,133.213l-13.256-8.964a3,3,0,0,0-4.674,2.482v17.929a2.994,2.994,0,0,0,4.674,2.481l13.256-8.964a3,3,0,0,0,0-4.963Zm-1.033,3.435-13.256,8.964a1.151,1.151,0,0,1-1.8-.953V126.73a1.134,1.134,0,0,1,.611-1.017,1.134,1.134,0,0,1,1.185.063l13.256,8.964a1.151,1.151,0,0,1,0,1.907Z"
                                  transform="translate(-172.366 -123.734)"
                                  fill="currentColor"
                                />
                              </g>
                            </g>
                            <g
                              id="Group_190"
                              data-name="Group 190"
                              transform="translate(28.593 5.401)"
                            >
                              <g id="Group_189" data-name="Group 189">
                                <path
                                  id="Path_118"
                                  data-name="Path 118"
                                  d="M328.31,70.492a18.965,18.965,0,0,0-10.886-10.708.922.922,0,1,0-.653,1.725,17.117,17.117,0,0,1,9.825,9.664.922.922,0,1,0,1.714-.682Z"
                                  transform="translate(-316.174 -59.724)"
                                  fill="currentColor"
                                />
                              </g>
                            </g>
                            <g
                              id="Group_192"
                              data-name="Group 192"
                              transform="translate(22.228 4.243)"
                            >
                              <g id="Group_191" data-name="Group 191">
                                <path
                                  id="Path_119"
                                  data-name="Path 119"
                                  d="M249.922,47.187a19.08,19.08,0,0,0-3.2-.27.922.922,0,0,0,0,1.845,17.245,17.245,0,0,1,2.889.243.922.922,0,1,0,.31-1.818Z"
                                  transform="translate(-245.801 -46.917)"
                                  fill="currentColor"
                                />
                              </g>
                            </g>
                          </g>
                        </svg>
                        <span className="visually-hidden">Video Play</span>
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about__content">
                  <span className="about__content--subtitle text__secondary mb-20">
                    {" "}
                    WHY DRSCRUBS
                  </span>
                  <p className="about__content--desc mb-20">
                    I started DRSCRUBS with one goal in mind: to design a
                    uniform that would empower my colleagues and I to feel our
                    best, and by extension, to improve the quality of care for
                    our patients. Since graduating from PA school in 1999, I’ve
                    established broad-reaching relationships from working for a
                    decade in emergency medicine and then transitioning into
                    head of innovation for Medelita. With two decades of
                    tireless work to improve the lives of patients and providing
                    this service for my esteemed colleagues in medicine, I
                    invite you to discover a brand that I feel is truly unique
                    in design, fabric, fit, and performance.
                  </p>

                  <div className="about__author position__relative d-flex align-items-center">
                    <div className="about__author--left">
                      <h4 className="about__author--name">Bruce Sutton</h4>
                      <span className="about__author--rank">Spa Manager</span>
                    </div>
                    <img
                      className="about__author--signature display-block"
                      src="assets/img/icon/signature.png"
                      alt="signature"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Order */}
        <div
          className="counterup__banner--section counterup__banner__bg2"
          id="funfactId"
        >
          <div className="container">
            <div className="row row-cols-1 align-items-center">
              <div className="col">
                <div className="counterup__banner--inner position__relative d-flex align-items-center justify-content-between">
                  <div className="counterup__banner--items text-center">
                    <h2 className="counterup__banner--items__text text-white">
                      YEARS OF <br />
                      FOUNDATION
                    </h2>
                    <span
                      className="counterup__banner--items__number js-counter text-white"
                      data-count={50}
                    >
                      50
                    </span>
                  </div>
                  <div className="counterup__banner--items text-center">
                    <h2 className="counterup__banner--items__text text-white">
                      SKILLED TEAM <br />
                      MEMBERS{" "}
                    </h2>
                    <span
                      className="counterup__banner--items__number js-counter text-white"
                      data-count={100}
                    >
                      100
                    </span>
                  </div>
                  <div className="counterup__banner--items text-center">
                    <h2 className="counterup__banner--items__text text-white">
                      HAPPY <br />
                      CUSTOMERS
                    </h2>
                    <span
                      className="counterup__banner--items__number js-counter text-white"
                      data-count={80}
                    >
                      80
                    </span>
                  </div>
                  <div className="counterup__banner--items text-center">
                    <h2 className="counterup__banner--items__text text-white">
                      MONTHLY <br />
                      ORDERS
                    </h2>
                    <span
                      className="counterup__banner--items__number js-counter text-white"
                      data-count={70}
                    >
                      70
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section
          className="about__section  section--padding"
          style={{ borderBottom: "1px solid black" }}
        >
          <div className="container-fluid mt-2">
            <div className="row p-3">
              <div className="col-lg-4">
                <h6
                  className="mt-2"
                  style={{ borderBottom: "2px solid black" }}
                >
                  {" "}
                  OUR PHILOSOPHY
                </h6>

                <span
                  className="mt-3"
                  style={{ textAlign: "justify", fontSize: "15px" }}
                >
                  We come to work every day because our world revolves around
                  you and the selfless work you do. Our mission is to support
                  you through constant innovation and the highest standard of
                  quality and service.
                </span>
              </div>
              <div className="col-lg-4">
                <h6
                  className="mt-2"
                  style={{ borderBottom: "2px solid black" }}
                >
                  {" "}
                  OUR HISTORY
                </h6>
                <span
                  className="mt-3"
                  style={{ textAlign: "justify", fontSize: "15px" }}
                >
                  Through steadfast commitment to the colleagues we serve, we
                  have established DRSCRUBS as the industry leader for both
                  men’s and women’s lab coats, scrubs and scrub jackets.
                </span>
              </div>
              <div className="col-lg-4">
                <h6
                  className="mt-2"
                  style={{ borderBottom: "2px solid black" }}
                >
                  {" "}
                  OUR FUTURE
                </h6>

                <span
                  className="mt-3"
                  style={{ textAlign: "justify", fontSize: "15px" }}
                >
                  With innovation as our watchword, we have applied an acute
                  understanding of the healthcare landscape and pushed the
                  envelope for what’s possible. We’re always looking ahead.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section style={{ borderBottom: "1px solid black" }}>
          <div className="container-fluid">
            <div className="row text-center">
              <h2 className="mt-5">OUR PHILOSOPHY</h2>
              <span className="mt-3">
                We have always aspired to create a company where talented
                individuals collaborate to deliver extraordinary results that
                reflect the values we place on diverse opinions, experiences and
                backgrounds. Our guiding principles are present in every
                decision and essential to our journey of becoming a responsible
                brand: Featuring elevated design, advanced fabrics, concierge
                service, a strong commitment to our people, and a responsibility
                to our environment.
              </span>
            </div>

            <div className="row p-5">
              <div className="col-lg-6">
                <div className="cards">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcGvAEfkH4l2VNSehQSy4rYMwPqRGxSP2CiA&usqp=CAU"
                    alt="First Image"
                  />
                  <div className="cards-body">
                    <h2 className="cards-title">
                      {" "}
                      <span style={{ borderBottom: "1px solid black" }}>
                        FABRIC
                      </span>{" "}
                    </h2>
                    <p className="cards-text">
                      When you put it on for the first time, you will feel the
                      difference. We have spent over ten years developing and
                      fine-tuning our proprietary fabric, and the countless
                      hours in research and testing is fundamental to the value
                      of our products. The result is cutting-edge performance
                      that enables our customer to excel at their work.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="cards">
                  <img
                    src="https://www.meddeal.in/image/cache/catalog/product/scrub-suit-pink-664x664.jpg"
                    alt="First Image"
                  />
                  <div className="cards-body">
                    <h2 className="cards-title">
                      <span style={{ borderBottom: "1px solid black" }}>
                        FIT
                      </span>
                    </h2>
                    <p className="cards-text">
                      We have taken the traditional medical uniform and upgraded
                      it in every conceivable way. The result is a
                      sophisticated, tailored garment that exudes confidence and
                      professionalism. Gender-specific, slimming, and tasteful,
                      our uniforms provide a polished appearance paired with an
                      ideal range of motion.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-5">
                <div className="cards">
                  <img
                    src="https://www.medelita.com/media/images/about/function.jpg"
                    alt="First Image"
                  />
                  <div className="cards-body">
                    <h2 className="cards-title">
                      <span style={{ borderBottom: "1px solid black" }}>
                        FUNCTION
                      </span>
                    </h2>
                    <p className="cards-text">
                      With years spent on research, development and testing, our
                      proprietary fabric technology keeps you cool, dry and
                      comfortable under pressure, with an exterior that repels
                      fluid, soil, and stains. Our innovative performance fabric
                      has the highest possible rating in the industry when
                      tested for strength, soil release, and fluid repellency,
                      which is why we proudly back up our warranty for a full
                      year. .
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-5">
                <div className="cards">
                  <img
                    src="https://www.medelita.com/media/images/about/custom-embroidery.jpg"
                    alt="First Image"
                  />
                  <div className="cards-body">
                    <h2 className="cards-title">
                      <span style={{ borderBottom: "1px solid black" }}>
                        EMBROIDERY
                      </span>
                    </h2>
                    <p className="cards-text">
                      Wear your credentials proudly using our exceptional
                      in-house embroidery services. With an unrivaled level of
                      excellence and quality, our team of experts conveniently
                      provide custom name and title or logo embroidery for a
                      personalized, impressive uniform that speaks to your
                      professionalism and prestige.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section style={{ borderBottom: "1px solid black" }}>
          <div className="container-fluid">
            <div className="row text-center">
              <h2 className="mt-5">GROUPS & PARTNERSHIPS</h2>
              <span className="mt-3">
                As one of the first medical uniform manufacturers to sell
                direct, we can provide competitive rates, personalizations,
                custom products and extremely rapid lead times. We are the
                exclusive provider of lab coats for the largest integrated
                healthcare system in the world and can extend the same level of
                services and products to organizations of any size.
              </span>
            </div>
          </div>

          <div className="container">
            <div className="row p-5">
              <div className="col-lg-3"></div>
              <div className="col-lg-3">
                <button class="newsletter__popup--subscribe__btn">
                  GROUPS
                </button>
              </div>
              <div className="col-lg-3">
                <button class="newsletter__popup--subscribe__btn">
                  HOSPITALS
                </button>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;
