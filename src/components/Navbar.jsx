import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartSlider from "./CartSlider";
import SignupModel from "./SignupModel";
import Country from "./Modal/Country";
import { useQuery } from "react-query";
import axios from "axios";
import BassURl from "../Api/Api";
import { useDispatch } from "react-redux";
import GetIPaddress from "./getIPaddress";
import { motion } from "framer-motion";
import Flag from "react-world-flags";

function Navbar() {
  const [isNavHidden, setIsNavHidden] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsNavHidden(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show Cart Slider
  const [show, setShow] = useState(false);
  function onShow() {
    setShow(true);
  }
  // Show Login Model
  const [loginShow, SetLoginShow] = useState(false);
  // update body class when Show changes
  useEffect(() => {
    if (loginShow) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [loginShow]);
  function loginModelShow() {
    SetLoginShow(true);
  }
  // total number of item in cart

  const addtocartreducer = useSelector((state) => state?.addToCartReducer);
  const { cartItems } = addtocartreducer;

  // country code
  // Show Login Model
  const [countryShow, setCountryShow] = useState(false);
  // update body class when Show changes
  useEffect(() => {
    if (countryShow) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [countryShow]);

  function countryModelShow() {
    setCountryShow(true);
  }
  //  get  coutry using user ipaddress
  const [country, setCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [countryFlag, setCountryFlag] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  useEffect(() => {
    const storedCountry = localStorage.getItem("selectedCountry");
    if (storedCountry) {
      setSelectedCountry(storedCountry);
      setCountry(storedCountry);
      setCurrency(getCurrency(storedCountry));
      fetchCountryFlag(storedCountry);
    } else {
      fetchCountry();
    }
  }, []);

  const fetchCountry = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      const retrievedCountry = response.data.country_name;
      setSelectedCountry(retrievedCountry);
      setCountry(retrievedCountry);
      setCurrency(getCurrency(retrievedCountry));
      fetchCountryFlag(retrievedCountry);
      localStorage.setItem("selectedCountry", retrievedCountry);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrency = (country) => {
    return country === "India" ? "INR" : "USD";
  };
  localStorage.setItem("currencyTop", JSON.stringify(currency));

  // const fetchCountryFlag = async (countryName) => {
  //   try {
  //     const response = await axios.get(
  //       `https://restcountries.com/v3/name/${countryName}`
  //     );
  //     const countryData = response.data[0];
  //     setCountryFlag(countryData.flags.png);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleCountryChange = (event) => {
    const newSelectedCountry = event.target.value;
    const newCurrency = getCurrency(newSelectedCountry);
    setSelectedCountry(newSelectedCountry);
    setCountry(newSelectedCountry);
    setCurrency(getCurrency(newSelectedCountry));
    fetchCountryFlag(newSelectedCountry);
    localStorage.setItem("selectedCountry", newSelectedCountry);
    localStorage.setItem("currencyTop", JSON.stringify(newCurrency));
    window.location.reload();
  };

  const fetchCountryFlag = async (countryName) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/name/${countryName}?fullText=true`
      );
      const countryData = response.data[0];
      setCountryCode(countryData.alpha2Code);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    const countryCode = event.target.value;
    console.log(countryCode);
    // setSelectedCountryCode(countryCode);
    localStorage.setItem("selectedCountryCode", countryCode);
    if (countryCode === "IN") {
      setCurrency("INR");

      localStorage.setItem("currency", JSON.stringify(currency));
      setTimeout(() => {
        handleModalClose();
      }, 1000);
      // setmanualySelectedCountry(true)
    } else {
      // localStorage.setItem('selectedCountryCode', selectedCountryCode);
      setCurrency("USD");
      localStorage.setItem("currency", JSON.stringify(currency));
      // setmanualySelectedCountry(true)
      setTimeout(() => {
        handleModalClose();
      }, 1000);
    }
    setShouldAutoSelectCountry(false);
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  };

  // const handleCountryChange = (e) => {
  //   const countryCode = e.target.value;
  //   setSelectedCountryCode(countryCode);
  //   if (countryCode === 'IN') {
  //     setCurrency('INR');
  //     localStorage.setItem('currency', JSON.stringify(currency));
  //   } else {
  //     setCurrency('USD');
  //     localStorage.setItem('currency', JSON.stringify(currency));
  //   }
  //   setManualSelection(true);
  // };

  // update body class when Show changes
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("offCanvas__minicart_active");
    } else {
      document.body.classList.remove("offCanvas__minicart_active");
    }
  }, [showModal]);

  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  // console.log(countryData);

  // console.log(userData);

  const logOut = () => {
    sessionStorage.removeItem("userData");
    window.location.reload();
  };
  const [openMobile, setopenMobile] = useState(false);
  useEffect(() => {
    if (openMobile) {
      document.body.classList.add("mobile_menu_open");
    } else {
      document.body.classList.remove("mobile_menu_open");
    }
  }, [openMobile]);

  function openMobileMenu() {
    setopenMobile(true);
  }

  // all tags api here

  const { data, isLoading, isError } = useQuery("tags", () => {
    return axios.get(`${BassURl}/all-tags`);
  });

  // create category

  const [Category, setCategory] = useState([]);

  const [subCategory, setsubCategory] = useState([]);
  useEffect(() => {
    axios.get(`${BassURl}/all-categories-and-sub-category`).then((res) => {
      setCategory(res.data.data.category);
      setsubCategory(res.data.data.sub_category);
    });
  }, []);

  // console.log(subCategory, "hello");

  // Call sub category ID

  const [ShopByColor, setShopByColor] = useState();
  useEffect(() => {
    axios.get(`${BassURl}/all-color`).then((res) => {
      setShopByColor(res.data.data);
    });
  }, []);
  console.log(ShopByColor);

  // userData  was logined or not

  return (
    <>
      <GetIPaddress />
      <header className="header__section color-scheme-2">
        <div className="header__topbar bg__secondary">
          <div className="container-fluid">
            <div className="header__topbar--inner d-flex align-items-center justify-content-between">
              <div className="header__shipping">
                <p className="header__shipping--text text-white">
                  Free shipping for orders over $59 !
                </p>
              </div>
              <div className="language__currency d-none d-lg-block">
                <ul className="d-flex align-items-center">
                  <li className="header__shipping--text text-white">
                    <img
                      className="header__shipping--text__icon"
                      src="/assets/img/icon/bus.png"
                      alt="bus-icon"
                    />
                    {userData && userData != null ? (
                      <>
                        {" "}
                        <Link to="/user-dashboard" className="trackYourOrder">
                          Track Your Order
                        </Link>
                      </>
                    ) : (
                      <>
                        {" "}
                        <Link to="/login" className="trackYourOrder">
                          Track Your Order
                        </Link>
                      </>
                    )}
                  </li>

                  <li
                    className="language__currency--list"
                    onClick={handleModalOpen}
                  >
                    {country ? (
                      <>
                        <a className="account__currency--link text-white">
                          {country && (
                            <Flag
                              code={countryCode}
                              fallback={<span>Country Flag</span>}
                              height="30"
                              width="30"
                            />
                          )}

                          <span style={{ padding: "10px" }}>{country}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11.797"
                            height="9.05"
                            viewBox="0 0 9.797 6.05"
                          >
                            <path
                              d="M14.646,8.59,10.9,12.329,7.151,8.59,6,9.741l4.9,4.9,4.9-4.9Z"
                              transform="translate(-6 -8.59)"
                              fill="currentColor"
                              opacity="0.7"
                            />
                          </svg>
                        </a>
                        {/*
                        <img src={country?.country_flag} alt="Country Flag" />
                        <p>Currency: {country.currencies[0]}</p> */}
                      </>
                    ) : (
                      <p>Loading country information...</p>
                    )}

                    {/* {countryData == 1 ? (
                      <>

                      </>
                    ) : countryData == 2 ? (
                      <>
                        {" "}
                        <a
                          className="account__currency--link text-white"

                        >
                          <img src={currenyimage?.image} alt="currency" />
                          <span>{currenyimage?.name}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11.797"
                            height="9.05"
                            viewBox="0 0 9.797 6.05"
                          >
                            <path
                              d="M14.646,8.59,10.9,12.329,7.151,8.59,6,9.741l4.9,4.9,4.9-4.9Z"
                              transform="translate(-6 -8.59)"
                              fill="currentColor"
                              opacity="0.7"
                            />
                          </svg>
                        </a>
                      </>
                    ) : (
                      <>
                        <a
                          className="account__currency--link text-white"
                          href="#"
                        >
                          <img
                            src="/assets/img/flag/india.svg"
                            alt="currency"
                          />
                          <span>IN</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11.797"
                            height="9.05"
                            viewBox="0 0 9.797 6.05"
                          >
                            <path
                              d="M14.646,8.59,10.9,12.329,7.151,8.59,6,9.741l4.9,4.9,4.9-4.9Z"
                              transform="translate(-6 -8.59)"
                              fill="currentColor"
                              opacity="0.7"
                            />
                          </svg>
                        </a>
                      </>
                    )} */}

                    <div className="dropdown__currency">
                      <ul>
                        <li className="currency__items">
                          <a className="currency__text" href="#">
                            CAD
                          </a>
                        </li>
                        <li className="currency__items">
                          <a className="currency__text" href="#">
                            CNY
                          </a>
                        </li>
                        <li className="currency__items">
                          <a className="currency__text" href="#">
                            EUR
                          </a>
                        </li>
                        <li className="currency__items">
                          <a className="currency__text" href="#">
                            GBP
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`main__header header__sticky ${
            isNavHidden ? " main__header header__sticky  sticky" : ""
          }`}
        >
          <div className="container-fluid">
            <div className="main__header--inner position__relative d-flex justify-content-between align-items-center">
              <div
                className="offcanvas__header--menu__open"
                onClick={openMobileMenu}
              >
                <a
                  className="offcanvas__header--menu__open--btn"
                  data-offcanvas=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ionicon offcanvas__header--menu__open--svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeMiterlimit={10}
                      strokeWidth={32}
                      d="M80 160h352M80 256h352M80 352h352"
                    />
                  </svg>
                  <span className="visually-hidden">Menu Open</span>
                </a>
              </div>
              <div className="main__logo">
                <h1 className="main__logo--title">
                  <a className="main__logo--link" href="/">
                    {/* <img
                      className="main__logo--img"
                      src="assets/img/logo/nav-log2.png"
                      alt="logo-img"
                    /> */}
                    <h2>Dr Scrubs</h2>
                  </a>
                </h1>
              </div>
              <div className="header__menu d-none d-lg-block">
                <nav className="header__menu--navigation">
                  <ul className="d-flex">
                    <li className="header__menu--items d-none d-xl-block">
                      <Link className="header__menu--link" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="header__menu--items mega__menu--items">
                      <Link
                        className="header__menu--link"
                        to="/category-product"
                      >
                        Women
                        <svg
                          className="menu__arrowdown--icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height="7.41"
                          viewBox="0 0 12 7.41"
                        >
                          <path
                            d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                            transform="translate(-6 -8.59)"
                            fill="currentColor"
                            opacity="0.7"
                          />
                        </svg>
                      </Link>
                      <ul className="header__mega--menu d-flex">
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Women Home
                          </span>
                          <ul className="header__mega--sub__menu">
                            {data?.data?.data?.map((item, index) => {
                              return (
                                <>
                                  <li className="header__mega--sub__menu_li">
                                    <Link
                                      className="header__mega--sub__menu--title"
                                      to={`/shop/${item?.tag_url}`}
                                    >
                                      {item?.tag_eng}
                                    </Link>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </li>
                        {Category &&
                          Category?.map((item, key) => {
                            return (
                              <>
                                <li className="header__mega--menu__li">
                                  <span className="header__mega--subtitle">
                                    {item?.category_title_eng}
                                  </span>
                                  <ul className="header__mega--sub__menu">
                                    {subCategory?.map((data, key) => {
                                      if (data?.category_id === item?.id) {
                                        return (
                                          <>
                                            <li className="header__mega--sub__menu_li">
                                              <a
                                                className="header__mega--sub__menu--title"
                                                href={`/collection/${data?.sub_category_url}`}
                                              >
                                                {data?.sub_category_title}
                                              </a>
                                            </li>
                                          </>
                                        );
                                      }
                                    })}
                                  </ul>
                                </li>
                              </>
                            );
                          })}

                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Shop By Color
                          </span>
                          <ul className="header__mega--sub__menu">
                            {ShopByColor?.map((data, index) => {
                              return (
                                <>
                                  <li className="header__mega--sub__menu_li">
                                    <a
                                      className="header__mega--sub__menu--title"
                                      href={`/shop-by-color/women/${data?.color_url}`}
                                    >
                                      {data?.color_name}
                                    </a>
                                    <div
                                      className="headercolor"
                                      style={{
                                        backgroundColor: `${data?.color_code}`,
                                      }}
                                    ></div>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="header__menu--items mega__menu--items">
                      <Link
                        className="header__menu--link"
                        to="/category-product"
                      >
                        Men
                        <svg
                          className="menu__arrowdown--icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height="7.41"
                          viewBox="0 0 12 7.41"
                        >
                          <path
                            d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                            transform="translate(-6 -8.59)"
                            fill="currentColor"
                            opacity="0.7"
                          />
                        </svg>
                      </Link>
                      <ul className="header__mega--menu d-flex">
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Men Home
                          </span>
                          <ul className="header__mega--sub__menu">
                            {data?.data?.data?.map((item, index) => {
                              return (
                                <>
                                  <li className="header__mega--sub__menu_li">
                                    <Link
                                      className="header__mega--sub__menu--title"
                                      to={`/shop/${item?.tag_url}`}
                                    >
                                      {item?.tag_eng}
                                    </Link>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </li>
                        {Category &&
                          Category?.map((item, key) => {
                            return (
                              <>
                                <li className="header__mega--menu__li">
                                  <span className="header__mega--subtitle">
                                    {item?.category_title_eng}
                                  </span>
                                  <ul className="header__mega--sub__menu">
                                    {subCategory?.map((data, key) => {
                                      if (data?.category_id === item?.id) {
                                        return (
                                          <>
                                            <li className="header__mega--sub__menu_li">
                                              <a
                                                className="header__mega--sub__menu--title"
                                                href={`/collection/men/${data?.sub_category_url}`}
                                              >
                                                {data?.sub_category_title}
                                              </a>
                                            </li>
                                          </>
                                        );
                                      }
                                    })}
                                  </ul>
                                </li>
                              </>
                            );
                          })}
                        {/* <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Lab Coats
                          </span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <a
                                className="header__mega--sub__menu--title"
                                href="/category-product"
                              >
                                Premium Stretch
                              </a>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Premium
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Performance
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">Scrubs</span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Scrub Tops
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <a
                                className="header__mega--sub__menu--title"
                                href="my-account-2.html"
                              >
                                Scrub Pants
                              </a>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Scrub Jackets
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Accessories
                          </span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Face Masks
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Stethoscopes
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Gift Cards
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Outerwear
                          </span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Strata Vest
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <a
                                className="header__mega--sub__menu--title"
                                href="my-account-2.html"
                              >
                                Strata Jacket
                              </a>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Quantum Jacket
                              </Link>
                            </li>
                          </ul>
                        </li>

                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Apparel
                          </span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Polos
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <a
                                className="header__mega--sub__menu--title"
                                href="my-account-2.html"
                              >
                                Underscrubs
                              </a>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Performance Tees
                              </Link>
                            </li>
                          </ul>
                        </li> */}

                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Shop By Color
                          </span>
                          <ul className="header__mega--sub__menu">
                            {ShopByColor?.map((data, index) => {
                              return (
                                <>
                                  <li className="header__mega--sub__menu_li">
                                    <Link
                                      className="header__mega--sub__menu--title"
                                      to={`/shop-by-color/men/${data?.color_url}`}
                                    >
                                      {data?.color_name}
                                    </Link>
                                    <div
                                      className="headercolor"
                                      style={{
                                        backgroundColor: `${data?.color_code}`,
                                      }}
                                    ></div>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="header__menu--items mega__menu--items">
                      <Link
                        className="header__menu--link"
                        to="/category-product"
                      >
                        Collection
                        <svg
                          className="menu__arrowdown--icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height="7.41"
                          viewBox="0 0 12 7.41"
                        >
                          <path
                            d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                            transform="translate(-6 -8.59)"
                            fill="currentColor"
                            opacity="0.7"
                          />
                        </svg>
                      </Link>
                      <ul className="header__mega--menu d-flex">
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Lab Coats
                          </span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Premium Stretch
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Premium
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Performance
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Student
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Slim Fit
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Petite Fit
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Embroidered Lab Coats
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">Scrubs</span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Scrubs Tops
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Scrubs Pants
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Blue Scrubs
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Grey Scrubs
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Black Scrubs
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Sangria Scrubs
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Ocean Scrubs
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Surgical Green Scrubs
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Gifts By Occasion{" "}
                          </span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Doctor's Day
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Graduation
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                White Coat Ceremony
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Match Day
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Back to School
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                PA Week
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                NP Week
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Jacketsand Vests
                          </span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Strata Fleece
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Quantum Jacket
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/category-product"
                              >
                                Scrub Jackets
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="header__menu--items mega__menu--items">
                      <Link
                        className="header__menu--link"
                        to="/category-product"
                      >
                        About us
                        <svg
                          className="menu__arrowdown--icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height="7.41"
                          viewBox="0 0 12 7.41"
                        >
                          <path
                            d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                            transform="translate(-6 -8.59)"
                            fill="currentColor"
                            opacity="0.7"
                          />
                        </svg>
                      </Link>
                      <ul className="header__mega--menu d-flex">
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Services
                          </span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/group-rates"
                              >
                                Group Rates
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/at-home-try-on"
                              >
                                At-Home-Try-On
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/international-guide"
                              >
                                International Guide
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/shipping-returns"
                              >
                                Shipping & Returns
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/faqs"
                              >
                                FAQs
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Product
                          </span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/fabric-technology"
                              >
                                Fabric Technology
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/custom-embroidery"
                              >
                                Custom Embroidery
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/custom-uniforms"
                              >
                                Custom Uniforms
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/size-guid"
                              >
                                Size Guide
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/care-guide"
                              >
                                Care Guide
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Company{" "}
                          </span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us"
                              >
                                About us
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/our-story"
                              >
                                Our Story
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/press"
                              >
                                Press
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/partners"
                              >
                                Partners
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/careers"
                              >
                                Careers
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="header__mega--menu__li">
                          <span className="header__mega--subtitle">
                            Community
                          </span>
                          <ul className="header__mega--sub__menu">
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/ambassadors"
                              >
                                Ambassadors
                              </Link>
                            </li>
                            <li className="header__mega--sub__menu_li">
                              <Link
                                className="header__mega--sub__menu--title"
                                to="/about-us/community-news"
                              >
                                Community News
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>

                    <li className="header__menu--items">
                      <a className="header__menu--link" href="#">
                        Accessories
                        <svg
                          className="menu__arrowdown--icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height="7.41"
                          viewBox="0 0 12 7.41"
                        >
                          <path
                            d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                            transform="translate(-6 -8.59)"
                            fill="currentColor"
                            opacity="0.7"
                          />
                        </svg>
                      </a>
                      <ul className="header__sub--menu">
                        <li className="header__sub--menu__items">
                          <Link
                            to="/category-product"
                            className="header__sub--menu__link"
                          >
                            Reversible Scrub Caps
                          </Link>
                        </li>
                        <li className="header__sub--menu__items">
                          <Link
                            to="/category-product"
                            className="header__sub--menu__link"
                          >
                            Super Scribs Caps
                          </Link>
                          <Link
                            to="/category-product"
                            className="header__sub--menu__link"
                          >
                            Spark Scrubs Caps
                          </Link>
                          <Link
                            to="/category-product"
                            className="header__sub--menu__link"
                          >
                            Medical Prints
                          </Link>
                          <Link
                            to="/category-product"
                            className="header__sub--menu__link"
                          >
                            Cartoon Prints
                          </Link>

                          <Link
                            to="/category-product"
                            className="header__sub--menu__link"
                          >
                            T.V Series Prints
                          </Link>
                        </li>
                        <li className="header__sub--menu__items">
                          <Link
                            to="/category-product"
                            className="header__sub--menu__link"
                          >
                            Ankle Socks
                          </Link>
                        </li>
                        <li className="header__sub--menu__items">
                          <Link
                            to="/category-product"
                            className="header__sub--menu__link"
                          >
                            3 Ply Mask
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* <li className="header__menu--items">
                      <a className="header__menu--link" href="#">
                        Our Story
                        <svg
                          className="menu__arrowdown--icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width={12}
                          height="7.41"
                          viewBox="0 0 12 7.41"
                        >
                          <path
                            d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                            transform="translate(-6 -8.59)"
                            fill="currentColor"
                            opacity="0.7"
                          />
                        </svg>
                      </a>
                      <ul className="header__sub--menu">
                       
                        <li className="header__sub--menu__items">
                          <Link
                            to="/category-product"
                            className="header__sub--menu__link"
                          >
                            Eco Flex
                          </Link>
                        </li>
                      </ul>
                    </li> */}

                    {/* <li className="header__menu--items d-none d-xl-block">
                      <Link className="header__menu--link" to="/create-your-own-scrub">
                        Make Own Scrubs
                      </Link>
                    </li> */}
                  </ul>
                </nav>
              </div>
              <div className="header__account header__account2">
                <ul className="d-flex">
                  <li className="header__account--items header__account2--items header__account--search__items d-sm-none">
                    <a
                      className="header__account--btn search__open--btn"
                      data-offcanvas=""
                    >
                      <svg
                        className="header__search--button__svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26.51"
                        height="23.443"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                          fill="none"
                          stroke="currentColor"
                          strokeMiterlimit={10}
                          strokeWidth={32}
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit={10}
                          strokeWidth={32}
                          d="M338.29 338.29L448 448"
                        />
                      </svg>
                      <span className="visually-hidden">search btn</span>
                    </a>
                  </li>
                  {userData && userData != null ? (
                    <>
                      <li className="right-side onhover-dropdown">
                        <div className="delivery-login-box">
                          <div className="delivery-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-user"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx={12} cy={7} r={4} />
                            </svg>
                          </div>
                          <div className="delivery-detail">
                            <h6>Hello,{userData?.first_name} </h6>
                          </div>
                        </div>
                        <div className="onhover-div onhover-div-login">
                          <ul className="user-box-name">
                            <li className="product-box-contain pb-2">
                              <i />
                              <Link to="/user-dashboard">Dashboard</Link>
                            </li>

                            <li className="product-box-contain">
                              <Link onClick={logOut}>Log Out</Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="header__account--items header__account2--items">
                        <a className="header__account--btn" href="/login">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26.51"
                            height="23.443"
                            viewBox="0 0 512 512"
                          >
                            <path
                              d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={32}
                            />
                            <path
                              d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                              fill="none"
                              stroke="currentColor"
                              strokeMiterlimit={10}
                              strokeWidth={32}
                            />
                          </svg>
                          <span className="visually-hidden">Account</span>
                        </a>
                      </li>
                    </>
                  )}

                  {/* <li className="header__account--items header__account2--items d-none d-lg-block">
                    <a className="header__account--btn" href="wishlist.html">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28.51"
                        height="23.443"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={32}
                        />
                      </svg>
                      <span className="items__count wishlist style2">0</span>
                    </a>
                  </li> */}
                  <li className="header__account--items header__account2--items">
                    <a
                      className="header__account--btn minicart__open--btn"
                      data-offcanvas=""
                      onClick={onShow}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26.51"
                        height="23.443"
                        viewBox="0 0 14.706 13.534"
                      >
                        <g transform="translate(0 0)">
                          <g>
                            <path
                              data-name="Path 16787"
                              d="M4.738,472.271h7.814a.434.434,0,0,0,.414-.328l1.723-6.316a.466.466,0,0,0-.071-.4.424.424,0,0,0-.344-.179H3.745L3.437,463.6a.435.435,0,0,0-.421-.353H.431a.451.451,0,0,0,0,.9h2.24c.054.257,1.474,6.946,1.555,7.33a1.36,1.36,0,0,0-.779,1.242,1.326,1.326,0,0,0,1.293,1.354h7.812a.452.452,0,0,0,0-.9H4.74a.451.451,0,0,1,0-.9Zm8.966-6.317-1.477,5.414H5.085l-1.149-5.414Z"
                              transform="translate(0 -463.248)"
                              fill="currentColor"
                            />
                            <path
                              data-name="Path 16788"
                              d="M5.5,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,5.5,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,6.793,478.352Z"
                              transform="translate(-1.191 -466.622)"
                              fill="currentColor"
                            />
                            <path
                              data-name="Path 16789"
                              d="M13.273,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,13.273,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,14.566,478.352Z"
                              transform="translate(-2.875 -466.622)"
                              fill="currentColor"
                            />
                          </g>
                        </g>
                      </svg>
                      <span className="items__count style2">
                        {cartItems && cartItems.length}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Start Offcanvas header menu */}
        <div
          className={`${
            openMobile
              ? "offcanvas__header color-scheme-2 open"
              : "offcanvas__header color-scheme-2"
          }`}
        >
          <div className="offcanvas__inner">
            <div className="offcanvas__logo">
              <a className="offcanvas__logo_link" href="/">
                {/* <img
                  src="assets/img/logo/nav-log2.png"
                  alt="Grocee Logo"
                  width={158}
                  height={36}
                /> */}
                <h2>Dr Scrubs</h2>
              </a>
              <button
                className="offcanvas__close--btn"
                data-offcanvas=""
                onClick={() => setopenMobile(false)}
              >
                close
              </button>
            </div>
            <nav className="offcanvas__menu">
              <ul className="offcanvas__menu_ul">
                <li className="offcanvas__menu_li">
                  <a className="offcanvas__menu_item" href="/">
                    Home
                  </a>
                  {/* <ul className="offcanvas__sub_menu" style={{ display: 'none', boxSizing: 'border-box' }}>
                    <li className="offcanvas__sub_menu_li"><a href="index.html" className="offcanvas__sub_menu_item">Home One</a></li>
                    <li className="offcanvas__sub_menu_li"><a href="index-2.html" className="offcanvas__sub_menu_item">Home Two</a></li>
                    <li className="offcanvas__sub_menu_li"><a href="index-3.html" className="offcanvas__sub_menu_item">Home Three</a></li>
                  </ul>
                  <button className="offcanvas__sub_menu_toggle" />*/}
                </li>
                <li className="offcanvas__menu_li">
                  <a className="offcanvas__menu_item" href="#">
                    Shop
                  </a>
                  <ul
                    className="offcanvas__sub_menu"
                    style={{ boxSizing: "border-box", display: "none" }}
                  >
                    <li className="offcanvas__sub_menu_li">
                      <a href="#" className="offcanvas__sub_menu_item">
                        Column One
                      </a>
                      <ul
                        className="offcanvas__sub_menu"
                        style={{ boxSizing: "border-box", display: "none" }}
                      >
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="shop.html"
                          >
                            Shop Left Sidebar
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="shop-right-sidebar.html"
                          >
                            Shop Right Sidebar
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="shop-grid.html"
                          >
                            Shop Grid
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="shop-grid-list.html"
                          >
                            Shop Grid List
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="shop-list.html"
                          >
                            Shop List
                          </a>
                        </li>
                      </ul>
                      <button className="offcanvas__sub_menu_toggle" />
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <a href="#" className="offcanvas__sub_menu_item">
                        Column Two
                      </a>
                      <ul
                        className="offcanvas__sub_menu"
                        style={{ boxSizing: "border-box", display: "none" }}
                      >
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="product-details.html"
                          >
                            Product Details
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="product-video.html"
                          >
                            Video Product
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="product-details.html"
                          >
                            Variable Product
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="product-left-sidebar.html"
                          >
                            Product Left Sidebar
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="product-gallery.html"
                          >
                            Product Gallery
                          </a>
                        </li>
                      </ul>
                      <button className="offcanvas__sub_menu_toggle" />
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <a href="#" className="offcanvas__sub_menu_item">
                        Column Three
                      </a>
                      <ul
                        className="offcanvas__sub_menu"
                        style={{ boxSizing: "border-box", display: "none" }}
                      >
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="my-account.html"
                          >
                            My Account
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="my-account-2.html"
                          >
                            My Account 2
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="404.html"
                          >
                            404 Page
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="login.html"
                          >
                            Login Page
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="faq.html"
                          >
                            Faq Page
                          </a>
                        </li>
                      </ul>
                      <button className="offcanvas__sub_menu_toggle" />
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <a href="#" className="offcanvas__sub_menu_item">
                        Column Three
                      </a>
                      <ul
                        className="offcanvas__sub_menu"
                        style={{ boxSizing: "border-box", display: "none" }}
                      >
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="compare.html"
                          >
                            Compare Pages
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="checkout.html"
                          >
                            Checkout page
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="checkout-2.html"
                          >
                            Checkout Style 2
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="checkout-3.html"
                          >
                            Checkout Style 3
                          </a>
                        </li>
                        <li className="offcanvas__sub_menu_li">
                          <a
                            className="offcanvas__sub_menu_item"
                            href="checkout-4.html"
                          >
                            Checkout Style 4
                          </a>
                        </li>
                      </ul>
                      <button className="offcanvas__sub_menu_toggle" />
                    </li>
                  </ul>
                  <button className="offcanvas__sub_menu_toggle" />
                </li>
                <li className="offcanvas__menu_li">
                  <a className="offcanvas__menu_item" href="#">
                    Blog
                  </a>
                  <ul
                    className="offcanvas__sub_menu"
                    style={{ boxSizing: "border-box", display: "none" }}
                  >
                    <li className="offcanvas__sub_menu_li">
                      <a href="blog.html" className="offcanvas__sub_menu_item">
                        Blog Grid
                      </a>
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <a
                        href="blog-details.html"
                        className="offcanvas__sub_menu_item"
                      >
                        Blog Details
                      </a>
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <a
                        href="blog-left-sidebar.html"
                        className="offcanvas__sub_menu_item"
                      >
                        Blog Left Sidebar
                      </a>
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <a
                        href="blog-right-sidebar.html"
                        className="offcanvas__sub_menu_item"
                      >
                        Blog Right Sidebar
                      </a>
                    </li>
                  </ul>
                  <button className="offcanvas__sub_menu_toggle" />
                </li>
                <li className="offcanvas__menu_li">
                  <a className="offcanvas__menu_item" href="#">
                    Pages
                  </a>
                  <ul
                    className="offcanvas__sub_menu"
                    style={{ boxSizing: "border-box", display: "none" }}
                  >
                    <li className="offcanvas__sub_menu_li">
                      <a href="about.html" className="offcanvas__sub_menu_item">
                        About Us
                      </a>
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <a
                        href="contact.html"
                        className="offcanvas__sub_menu_item"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <a href="cart.html" className="offcanvas__sub_menu_item">
                        Cart Page
                      </a>
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <a
                        href="portfolio.html"
                        className="offcanvas__sub_menu_item"
                      >
                        Portfolio Page
                      </a>
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <a
                        href="wishlist.html"
                        className="offcanvas__sub_menu_item"
                      >
                        Wishlist Page
                      </a>
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <a href="login.html" className="offcanvas__sub_menu_item">
                        Login Page
                      </a>
                    </li>
                    <li className="offcanvas__sub_menu_li">
                      <a href="404.html" className="offcanvas__sub_menu_item">
                        Error Page
                      </a>
                    </li>
                  </ul>
                  <button className="offcanvas__sub_menu_toggle" />
                </li>
                <li className="offcanvas__menu_li">
                  <a className="offcanvas__menu_item" href="about.html">
                    About
                  </a>
                </li>
                <li className="offcanvas__menu_li">
                  <a className="offcanvas__menu_item" href="contact.html">
                    Contact
                  </a>
                </li>
              </ul>
              <div className="offcanvas__account--items">
                <a
                  className="offcanvas__account--items__btn d-flex align-items-center"
                  href="login.html"
                >
                  <span className="offcanvas__account--items__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20.51"
                      height="19.443"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={32}
                      />
                      <path
                        d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        strokeWidth={32}
                      />
                    </svg>
                  </span>
                  <span className="offcanvas__account--items__label">
                    Login / Register
                  </span>
                </a>
              </div>
              <div className="language__currency">
                <ul className="d-flex align-items-center">
                  <li className="language__currency--list">
                    <a className="offcanvas__language--switcher" href="#">
                      <img
                        className="language__switcher--icon__img"
                        src="assets/img/icon/language-icon.png"
                        alt="currency"
                      />
                      <span>English</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11.797"
                        height="9.05"
                        viewBox="0 0 9.797 6.05"
                      >
                        <path
                          d="M14.646,8.59,10.9,12.329,7.151,8.59,6,9.741l4.9,4.9,4.9-4.9Z"
                          transform="translate(-6 -8.59)"
                          fill="currentColor"
                          opacity="0.7"
                        />
                      </svg>
                    </a>
                    <div className="offcanvas__dropdown--language">
                      <ul>
                        <li className="language__items">
                          <a className="language__text" href="#">
                            France
                          </a>
                        </li>
                        <li className="language__items">
                          <a className="language__text" href="#">
                            Russia
                          </a>
                        </li>
                        <li className="language__items">
                          <a className="language__text" href="#">
                            Spanish
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="language__currency--list">
                    <a className="offcanvas__account--currency__menu" href="#">
                      <img src="assets/img/icon/usd-icon.png" alt="currency" />
                      <span>$ US Dollar</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11.797"
                        height="9.05"
                        viewBox="0 0 9.797 6.05"
                      >
                        <path
                          d="M14.646,8.59,10.9,12.329,7.151,8.59,6,9.741l4.9,4.9,4.9-4.9Z"
                          transform="translate(-6 -8.59)"
                          fill="currentColor"
                          opacity="0.7"
                        />
                      </svg>
                    </a>
                    <div className="offcanvas__account--currency__submenu">
                      <ul>
                        <li className="currency__items">
                          <a className="currency__text" href="#">
                            CAD
                          </a>
                        </li>
                        <li className="currency__items">
                          <a className="currency__text" href="#">
                            CNY
                          </a>
                        </li>
                        <li className="currency__items">
                          <a className="currency__text" href="#">
                            EUR
                          </a>
                        </li>
                        <li className="currency__items">
                          <a className="currency__text" href="#">
                            GBP
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        {/* End Offcanvas header menu */}
        {/* Start Offcanvas stikcy toolbar */}
        <div className="offcanvas__stikcy--toolbar color-scheme-2">
          <ul className="d-flex justify-content-between">
            <li className="offcanvas__stikcy--toolbar__list">
              <a className="offcanvas__stikcy--toolbar__btn" href="/">
                <span className="offcanvas__stikcy--toolbar__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="21.51"
                    height="21.443"
                    viewBox="0 0 22 17"
                  >
                    <path
                      fill="currentColor"
                      d="M20.9141 7.93359c.1406.11719.2109.26953.2109.45703 0 .14063-.0469.25782-.1406.35157l-.3516.42187c-.1172.14063-.2578.21094-.4219.21094-.1406 0-.2578-.04688-.3515-.14062l-.9844-.77344V15c0 .3047-.1172.5625-.3516.7734-.2109.2344-.4687.3516-.7734.3516h-4.5c-.3047 0-.5742-.1172-.8086-.3516-.2109-.2109-.3164-.4687-.3164-.7734v-3.6562h-2.25V15c0 .3047-.11719.5625-.35156.7734-.21094.2344-.46875.3516-.77344.3516h-4.5c-.30469 0-.57422-.1172-.80859-.3516-.21094-.2109-.31641-.4687-.31641-.7734V8.46094l-.94922.77344c-.11719.09374-.24609.14062-.38672.14062-.16406 0-.30468-.07031-.42187-.21094l-.35157-.42187C.921875 8.625.875 8.50781.875 8.39062c0-.1875.070312-.33984.21094-.45703L9.73438.832031C10.1094.527344 10.5312.375 11 .375s.8906.152344 1.2656.457031l8.6485 7.101559zm-3.7266 6.50391V7.05469L11 1.99219l-6.1875 5.0625v7.38281h3.375v-3.6563c0-.3046.10547-.5624.31641-.7734.23437-.23436.5039-.35155.80859-.35155h3.375c.3047 0 .5625.11719.7734.35155.2344.211.3516.4688.3516.7734v3.6563h3.375z"
                    />
                  </svg>
                </span>
                <span className="offcanvas__stikcy--toolbar__label">Home</span>
              </a>
            </li>
            <li className="offcanvas__stikcy--toolbar__list">
              <a
                className="offcanvas__stikcy--toolbar__btn"
                href="/category-product"
              >
                <span className="offcanvas__stikcy--toolbar__icon">
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18.51"
                    height="17.443"
                    viewBox="0 0 448 512"
                  >
                    <path d="M416 32H32A32 32 0 0 0 0 64v384a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V64a32 32 0 0 0-32-32zm-16 48v152H248V80zm-200 0v152H48V80zM48 432V280h152v152zm200 0V280h152v152z" />
                  </svg>
                </span>
                <span className="offcanvas__stikcy--toolbar__label">Shop</span>
              </a>
            </li>
            <li className="offcanvas__stikcy--toolbar__list">
              <a
                className="offcanvas__stikcy--toolbar__btn search__open--btn"
                data-offcanvas=""
              >
                <span className="offcanvas__stikcy--toolbar__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.51"
                    height="20.443"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit={10}
                      strokeWidth={32}
                    />
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeMiterlimit={10}
                      strokeWidth={32}
                      d="M338.29 338.29L448 448"
                    />
                  </svg>
                </span>
                <span className="offcanvas__stikcy--toolbar__label">
                  Search
                </span>
              </a>
            </li>
            <li className="offcanvas__stikcy--toolbar__list">
              <a
                className="offcanvas__stikcy--toolbar__btn minicart__open--btn"
                data-offcanvas=""
              >
                <span className="offcanvas__stikcy--toolbar__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18.51"
                    height="15.443"
                    viewBox="0 0 18.51 15.443"
                  >
                    <path
                      d="M79.963,138.379l-13.358,0-.56-1.927a.871.871,0,0,0-.6-.592l-1.961-.529a.91.91,0,0,0-.226-.03.864.864,0,0,0-.226,1.7l1.491.4,3.026,10.919a1.277,1.277,0,1,0,1.844,1.144.358.358,0,0,0,0-.049h6.163c0,.017,0,.034,0,.049a1.277,1.277,0,1,0,1.434-1.267c-1.531-.247-7.783-.55-7.783-.55l-.205-.8h7.8a.9.9,0,0,0,.863-.651l1.688-5.943h.62a.936.936,0,1,0,0-1.872Zm-9.934,6.474H68.568c-.04,0-.1.008-.125-.085-.034-.118-.082-.283-.082-.283l-1.146-4.037a.061.061,0,0,1,.011-.057.064.064,0,0,1,.053-.025h1.777a.064.064,0,0,1,.063.051l.969,4.34,0,.013a.058.058,0,0,1,0,.019A.063.063,0,0,1,70.03,144.853Zm3.731-4.41-.789,4.359a.066.066,0,0,1-.063.051h-1.1a.064.064,0,0,1-.063-.051l-.789-4.357a.064.064,0,0,1,.013-.055.07.07,0,0,1,.051-.025H73.7a.06.06,0,0,1,.051.025A.064.064,0,0,1,73.76,140.443Zm3.737,0L76.26,144.8a.068.068,0,0,1-.063.049H74.684a.063.063,0,0,1-.051-.025.064.064,0,0,1-.013-.055l.973-4.357a.066.066,0,0,1,.063-.051h1.777a.071.071,0,0,1,.053.025A.076.076,0,0,1,77.5,140.448Z"
                      transform="translate(-62.393 -135.3)"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="offcanvas__stikcy--toolbar__label">Cart</span>
                <span className="items__count">3</span>
              </a>
            </li>
            <li className="offcanvas__stikcy--toolbar__list">
              <a
                className="offcanvas__stikcy--toolbar__btn"
                href="wishlist.html"
              >
                <span className="offcanvas__stikcy--toolbar__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18.541"
                    height="15.557"
                    viewBox="0 0 18.541 15.557"
                  >
                    <path
                      d="M71.775,135.51a5.153,5.153,0,0,1,1.267-1.524,4.986,4.986,0,0,1,6.584.358,4.728,4.728,0,0,1,1.174,4.914,10.458,10.458,0,0,1-2.132,3.808,22.591,22.591,0,0,1-5.4,4.558c-.445.282-.9.549-1.356.812a.306.306,0,0,1-.254.013,25.491,25.491,0,0,1-6.279-4.8,11.648,11.648,0,0,1-2.52-4.009,4.957,4.957,0,0,1,.028-3.787,4.629,4.629,0,0,1,3.744-2.863,4.782,4.782,0,0,1,5.086,2.447c.013.019.025.034.057.076Z"
                      transform="translate(-62.498 -132.915)"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="offcanvas__stikcy--toolbar__label">
                  Wishlist
                </span>
                <span className="items__count">3</span>
              </a>
            </li>
          </ul>
        </div>
        {/* End Offcanvas stikcy toolbar */}
        {/* Start offCanvas minicart */}
        <div className="offCanvas__minicart color-scheme-2">
          <div className="minicart__header">
            <div className="minicart__header--top d-flex justify-content-between align-items-center">
              <h2 className="minicart__title h3">Shopping Cart</h2>
              <button
                className="minicart__close--btn"
                aria-label="minicart close button"
                data-offcanvas=""
              >
                <svg
                  className="minicart__close--icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={32}
                    d="M368 368L144 144M368 144L144 368"
                  />
                </svg>
              </button>
            </div>
            <p className="minicart__header--desc">
              Clothing and fashion products are limited
            </p>
          </div>
          <div className="minicart__product">
            <div className="minicart__product--items d-flex">
              <div className="minicart__thumb">
                <a href="/category-product">
                  <img src="assets/img/product/product1.png" alt="prduct-img" />
                </a>
              </div>
              <div className="minicart__text">
                <h3 className="minicart__subtitle h4">
                  <a href="/category-product">Oversize Cotton Dress</a>
                </h3>
                <span className="color__variant">
                  <b>Color:</b> Beige
                </span>
                <div className="minicart__price">
                  <span className="current__price">$125.00</span>
                  <span className="old__price">$140.00</span>
                </div>
                <div className="minicart__text--footer d-flex align-items-center">
                  <div className="quantity__box minicart__quantity">
                    <button
                      type="button"
                      className="quantity__value decrease"
                      value="Decrease Value"
                    >
                      -
                    </button>
                    <label>
                      <input
                        type="number"
                        className="quantity__number"
                        defaultValue={1}
                        data-counter=""
                      />
                    </label>
                    <button
                      type="button"
                      className="quantity__value increase"
                      value="Increase Value"
                    >
                      +
                    </button>
                  </div>
                  <button className="minicart__product--remove">Remove</button>
                </div>
              </div>
            </div>
            <div className="minicart__product--items d-flex">
              <div className="minicart__thumb">
                <a href="/category-product">
                  <img src="assets/img/product/product2.png" alt="prduct-img" />
                </a>
              </div>
              <div className="minicart__text">
                <h3 className="minicart__subtitle h4">
                  <a href="/category-product">Boxy Denim Jacket</a>
                </h3>
                <span className="color__variant">
                  <b>Color:</b> Green
                </span>
                <div className="minicart__price">
                  <span className="current__price">$115.00</span>
                  <span className="old__price">$130.00</span>
                </div>
                <div className="minicart__text--footer d-flex align-items-center">
                  <div className="quantity__box minicart__quantity">
                    <button
                      type="button"
                      className="quantity__value decrease"
                      value="Decrease Value"
                    >
                      -
                    </button>
                    <label>
                      <input
                        type="number"
                        className="quantity__number"
                        defaultValue={1}
                        data-counter=""
                      />
                    </label>
                    <button
                      type="button"
                      className="quantity__value increase"
                      value="Increase Value"
                    >
                      +
                    </button>
                  </div>
                  <button className="minicart__product--remove">Remove</button>
                </div>
              </div>
            </div>
          </div>
          <div className="minicart__amount">
            <div className="minicart__amount_list d-flex justify-content-between">
              <span>Sub Total:</span>
              <span>
                <b>$240.00</b>
              </span>
            </div>
            <div className="minicart__amount_list d-flex justify-content-between">
              <span>Total:</span>
              <span>
                <b>$240.00</b>
              </span>
            </div>
          </div>
          <div className="minicart__conditions text-center">
            <input
              className="minicart__conditions--input"
              id="accept"
              type="checkbox"
            />
            <label className="minicart__conditions--label" htmlFor="accept">
              I agree with the
              <a
                className="minicart__conditions--link"
                href="privacy-policy.html"
              >
                Privacy and Policy
              </a>
            </label>
          </div>
          <div className="minicart__button d-flex justify-content-center">
            <a className="primary__btn minicart__button--link" href="cart.html">
              View cart
            </a>
            <a
              className="primary__btn minicart__button--link"
              href="checkout.html"
            >
              Checkout
            </a>
          </div>
        </div>
        {/* End offCanvas minicart */}
        {/* Start serch box area */}
        <div className="predictive__search--box color-scheme-2">
          <div className="predictive__search--box__inner">
            <h2 className="predictive__search--title">Search Products</h2>
            <form className="predictive__search--form" action="#">
              <label>
                <input
                  className="predictive__search--input"
                  placeholder="Search Here"
                  type="text"
                />
              </label>
              <button className="predictive__search--button">
                <svg
                  className="header__search--button__svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30.51"
                  height="25.443"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit={10}
                    strokeWidth={32}
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit={10}
                    strokeWidth={32}
                    d="M338.29 338.29L448 448"
                  />
                </svg>
              </button>
            </form>
          </div>
          <button
            className="predictive__search--close__btn"
            aria-label="search close button"
            data-offcanvas=""
          >
            <svg
              className="predictive__search--close__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="40.51"
              height="30.443"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M368 368L144 144M368 144L144 368"
              />
            </svg>
          </button>
        </div>
        {/* End serch box area */}
      </header>

      {showModal && (
        <motion.div
          initial={{ opacity: 0, y: 1 }}
          animate={{ opacity: 5, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="newsletter__popup newsletter__show"
          data-animation="slideInUp"
        >
          <div id="boxes" className="newsletter__popup--inner">
            <button
              className="newsletter__popup--close__btn"
              aria-label="search close button"
              onClick={handleModalClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={28}
                height={28}
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={32}
                  d="M368 368L144 144M368 144L144 368"
                />
              </svg>
            </button>
            <div className="box newsletter__popup--box d-flex align-items-center">
              <div
                className="country-modal__content"
                style={{ overflowX: "hidden" }}
              >
                <div className="row">
                  <div className="container">
                    <div className="col-lg-12 m-5">
                      <ul id="countrylist">
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="united-states"
                            value="us"
                            checked={selectedCountry === "us"}
                            onChange={handleCountryChange}
                            defaultValue="us"
                          />
                          <label htmlFor="united-states">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/unitedstatesofamerica.svg"
                              src="/assets/img/flag/unitedstatesofamerica.svg"
                            />
                            United States
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            value="arg"
                            checked={selectedCountry === "arg"}
                            onChange={handleCountryChange}
                            defaultValue="arg"
                            id="argentina"
                          />
                          <label htmlFor="argentina">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/argentina.svg"
                              src="/assets/img/flag/argentina.svg"
                            />
                            Argentina
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="australia"
                            value="aus"
                            checked={selectedCountry === "aus"}
                            onChange={handleCountryChange}
                          />
                          <label htmlFor="australia">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/australia.svg"
                              src="/assets/img/flag/australia.svg"
                            />
                            Australia
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="belgium"
                            value="bel"
                            checked={selectedCountry === "bel"}
                            onChange={handleCountryChange}
                            defaultValue="belgium"
                          />
                          <label htmlFor="belgium">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/belgium.svg"
                              src="/assets/img/flag/belgium.svg"
                            />
                            Belgium
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="brazil"
                            value="bra"
                            checked={selectedCountry === "bra"}
                            onChange={handleCountryChange}
                            defaultValue="brazil"
                          />
                          <label htmlFor="brazil">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/brazil.svg"
                              src="/assets/img/flag/brazil.svg"
                            />
                            Brazil
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="canada"
                            value="can"
                            checked={selectedCountry === "cana"}
                            onChange={handleCountryChange}
                            defaultValue="canada"
                          />
                          <label htmlFor="canada">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/canada.svg"
                              src="/assets/img/flag/canada.svg"
                            />
                            Canada
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="china"
                            value="china"
                            checked={selectedCountry === "china"}
                            onChange={handleCountryChange}
                            defaultValue="china"
                          />
                          <label htmlFor="china">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/china.svg"
                              src="/assets/img/flag/china.svg"
                            />
                            China
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="denmark"
                            value="denmark"
                            checked={selectedCountry === "denmark"}
                            onChange={handleCountryChange}
                            defaultValue="denmark"
                          />
                          <label htmlFor="denmark">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/denmark.svg"
                              src="/assets/img/flag/denmark.svg"
                            />
                            Denmark
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="finland"
                            value="finland"
                            checked={selectedCountry === "finland"}
                            onChange={handleCountryChange}
                            defaultValue="finland"
                          />
                          <label htmlFor="finland">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/finland.svg"
                              src="/assets/img/flag/finland.svg"
                            />
                            Finland
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="france"
                            value="france"
                            checked={selectedCountry === "france"}
                            onChange={handleCountryChange}
                            defaultValue="france"
                          />
                          <label htmlFor="france">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/france.svg"
                              src="/assets/img/flag/france.svg"
                            />
                            France
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="germany"
                            value="germany"
                            checked={selectedCountry === "germany"}
                            onChange={handleCountryChange}
                            defaultValue="germany"
                          />
                          <label htmlFor="germany">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/germany.svg"
                              src="/assets/img/flag/germany.svg"
                            />
                            Germany
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="greece"
                            value="greece"
                            checked={selectedCountry === "greece"}
                            onChange={handleCountryChange}
                            defaultValue="greece"
                          />
                          <label htmlFor="greece">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/greece.svg"
                              src="/assets/img/flag/greece.svg"
                            />
                            Greece
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="hong kong"
                            value="hongKong"
                            checked={selectedCountry === "hongKong"}
                            onChange={handleCountryChange}
                            defaultValue="hong kong"
                          />
                          <label htmlFor="hong kong">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/hongkong.svg"
                              src="/assets/img/flag/hongkong.svg"
                            />
                            Hong Kong
                          </label>
                        </li>
                        <li
                          id="indiacountry"
                          className="indiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="india"
                            value="India"
                            checked={selectedCountry === "inr"}
                            onChange={handleCountryChange}
                            defaultValue="india"
                          />
                          <label htmlFor="india">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/india.svg"
                              src="/assets/img/flag/india.svg"
                            />
                            India
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="italy"
                            value="italy"
                            checked={selectedCountry === "italy"}
                            onChange={handleCountryChange}
                            defaultValue="italy"
                          />
                          <label htmlFor="italy">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/italy.svg"
                              src="/assets/img/flag/italy.svg"
                            />
                            Italy
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="japan"
                            value="japan"
                            checked={selectedCountry === "japan"}
                            onChange={handleCountryChange}
                            defaultValue="japan"
                          />
                          <label htmlFor="japan">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/japan.svg"
                              src="/assets/img/flag/japan.svg"
                            />
                            Japan
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="mexico"
                            value="mexico"
                            checked={selectedCountry === "mexico"}
                            onChange={handleCountryChange}
                            defaultValue="mexico"
                          />
                          <label htmlFor="mexico">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/mexico.svg"
                              src="/assets/img/flag/mexico.svg"
                            />
                            Mexico
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="netherlands"
                            value="netherlands"
                            checked={selectedCountry === "netherlands"}
                            onChange={handleCountryChange}
                            defaultValue="netherlands"
                          />
                          <label htmlFor="netherlands">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/netherlands.svg"
                              src="/assets/img/flag/netherlands.svg"
                            />
                            Netherlands
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="newzealand"
                            value="newzealand"
                            checked={selectedCountry === "newzealand"}
                            onChange={handleCountryChange}
                            defaultValue="newzealand"
                          />
                          <label htmlFor="newzealand">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/newzealand.svg"
                              src="/assets/img/flag/newzealand.svg"
                            />
                            New Zealand
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="poland"
                            value="poland"
                            checked={selectedCountry === "poland"}
                            onChange={handleCountryChange}
                            defaultValue="poland"
                          />
                          <label htmlFor="poland">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/poland.svg"
                              src="/assets/img/flag/poland.svg"
                            />
                            Poland
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="portugal"
                            value="portugal"
                            checked={selectedCountry === "portugal"}
                            onChange={handleCountryChange}
                            defaultValue="portugal"
                          />
                          <label htmlFor="portugal">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/portugal.svg"
                              src="/assets/img/flag/portugal.svg"
                            />
                            Portugal
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="qatar"
                            value="qatar"
                            checked={selectedCountry === "qatar"}
                            onChange={handleCountryChange}
                            defaultValue="qatar"
                          />
                          <label htmlFor="qatar">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/qatar.svg"
                              src="/assets/img/flag/qatar.svg"
                            />
                            Qatar
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="saudi-arabia"
                            value="saudi-arabia"
                            checked={selectedCountry === "saudi-arabia"}
                            onChange={handleCountryChange}
                            defaultValue="saudi arabia"
                          />
                          <label htmlFor="saudi-arabia">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/saudiarabia.svg"
                              src="/assets/img/flag/saudiarabia.svg"
                            />
                            Saudi Arabia
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="singapore"
                            value="singapore"
                            checked={selectedCountry === "singapore"}
                            onChange={handleCountryChange}
                            defaultValue="singapore"
                          />
                          <label htmlFor="singapore">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/singapore.svg"
                              src="/assets/img/flag/singapore.svg"
                            />
                            Singapore
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="south-korea"
                            value="south-korea"
                            checked={selectedCountry === "south-korea"}
                            onChange={handleCountryChange}
                            defaultValue="south korea"
                          />
                          <label htmlFor="south-korea">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/southkorea.svg"
                              src="/assets/img/flag/southkorea.svg"
                            />
                            South Korea
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="spain"
                            value="spain"
                            checked={selectedCountry === "spain"}
                            onChange={handleCountryChange}
                            defaultValue="spain"
                          />
                          <label htmlFor="spain">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/spain.svg"
                              src="/assets/img/flag/spain.svg"
                            />
                            Spain
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="sweden"
                            value="sweden"
                            checked={selectedCountry === "sweden"}
                            onChange={handleCountryChange}
                            defaultValue="spain"
                          />
                          <label htmlFor="sweden">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/sweden.svg"
                              src="/assets/img/flag/sweden.svg"
                            />
                            Sweden
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="uae"
                            defaultValue="uae"
                          />
                          <label htmlFor="uae">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/uae.svg"
                              src="/assets/img/flag/uae.svg"
                            />
                            UAE
                          </label>
                        </li>
                        <li
                          className="nonindiacountries"
                          onChange={handleCountryChange}
                        >
                          <input
                            type="radio"
                            name="country-select"
                            id="united-kingdom"
                            defaultValue="united kingdom"
                          />
                          <label htmlFor="united-kingdom">
                            <img
                              className="flag"
                              modal-lazy-load="/assets/img/flag/unitedkingdom.svg"
                              src="/assets/img/flag/unitedkingdom.svg"
                            />
                            United Kingdom
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {show ? <CartSlider hide={setShow} /> : null}
      {loginShow ? <SignupModel hide={SetLoginShow} /> : null}
    </>
  );
}

export default Navbar;
