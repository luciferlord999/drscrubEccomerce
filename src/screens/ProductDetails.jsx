import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../components/Carousel.css";
import Footer from "../components/Footer";
import { Link, json, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import BassURl from "../Api/Api";
import imageURl from "../Api/ImageUrl";
import ColorCode from "../components/ColorCode";
import { fetchProductById } from "../Redux/Action/getProductDetailByIdAction";
const ShoulderModal = lazy(() => import("../components/Modal/ShoulderModal"));
const AddEmbroideryModal = lazy(() =>
  import("../components/Modal/AddEmbroideryModal")
);
const SizeChartMen = lazy(() => import("../components/Modal/SizeChartMen"));
import ProductImage from "../components/ProductImage";
import { addToCartAction } from "../Redux/Action/CartAction";
import {
  addToEmboidary,
  deleteFromEmboidary,
} from "../Redux/Action/AddEmboidaryAction";

function TabPanel(props) {
  const { children, activeTab, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={activeTab !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {activeTab === index && <div>{children}</div>}
    </div>
  );
}

function ProductDetails() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // get props data which come from link react-router-dom

  const location = useLocation();
  const colorName = location.state;
  const dispatch = useDispatch();

  // console.log(location)

  // Shoulder
  const [shoulderShow, SetShoulderShow] = useState(false);
  // update body class when Show changes
  useEffect(() => {
    if (shoulderShow) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [shoulderShow]);

  function shoulderModel() {
    SetShoulderShow(true);
  }

  // Size Chart
  const [sizeChartMen, SetSizeChartMen] = useState(false);
  // update body class when Show changes
  useEffect(() => {
    if (sizeChartMen) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [sizeChartMen]);

  function ChartMen() {
    SetSizeChartMen(true);
  }

  // Add Emboidery

  const [addEmboidery, setaddEmboidery] = useState(false);

  useEffect(() => {
    if (addEmboidery) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [addEmboidery]);

  function add_emboidery() {
    // console.log("hello");
    setaddEmboidery(true);
  }

  // increase size price funcationality

  const [sizePrice, setSizePrice] = useState('');

  useEffect(() => {

    axios.get(`${BassURl}/all-size`).then((res) => {
      setSizePrice(res.data.data)
    })

  }, []);

  console.log(sizePrice);


  const [selectSize, setSelectSize] = useState('standard');
  // alert(selectSize);

  // form values & and funcationality
  let initialValues = {
    size: "",
    // customSize: {
    //   shoulder: "",
    //   chest: "",
    //   bust: "",
    //   underbust: "",
    //   waist: "",
    //   hip: "",
    //   upperArm: "",
    //   hsptobust: "",
    //   hpstowaist: "",
    //   hpstoknee: "",
    // },
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    // console.log(formValues);
  };
  // console.log(formValues)

  // get Custome Size

  const [customeSize, setcustomeSize] = useState([]);

  const CustomehandleChange = (e) => {
    const { name, value } = e.target;
    setcustomeSize({
      ...customeSize,

      [name]: value,

      // [name]: value,
    });
    // console.log(formValues);
  };

  console.log(customeSize, 'customeSize');
  // localStorage.setItem('customSize',customeSize);
  // // Nav Tabs

  // pricedata
  const [splitValues, setSplitValues] = useState([]);

  useEffect(() => {
    if (formValues?.size != '') {
      const parts = formValues?.size.split('-');
      setSplitValues(parts);
    } else {
      setSplitValues([]);
    }
  }, [formValues]);
  console.log(splitValues[0]);

  const [addSizePrice, setAddSizePrice] = useState(0)
  const sizePriceData = () => {

    sizePrice?.standard?.map((items, index) => {
      if (items?.title === splitValues[0]) {
        localStorage.setItem('add_sizr_price', JSON.stringify(items?.add_prce))
        return setAddSizePrice(items?.add_prce)


      }
    })
  }
  useEffect(() => {

    sizePriceData();

  }, [splitValues[0]])
  console.log(addSizePrice);
















  const [activeTab, setActiveTab] = useState(1); // State to keep track of active tab

  // Function to handle tab click
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  // Add To Cart Product Funcationality
  console.log(activeTab)

  // get params

  const { productUrl } = useParams();
  const queryParams = new URLSearchParams(window.location.search)
  const term = queryParams.get("color")
  // const location = queryParams.get("location")

  console.log(term);
  const countryData = JSON.parse(localStorage.getItem('currencyTop'));
  // console.log(countryData)

  useEffect(() => {
    const data = 1;
    dispatch(fetchProductById(productUrl,term));
  }, [dispatch, countryData]);

  const getProductById = useSelector((state) => state.productByID);
  const { productDetails, isProductLoading, error } = getProductById;
  // console.log(productDetails?.data?.id);
  // getColor Api


  // get Code Api ==||===>||===>||===>

  const getEmbroideryData = JSON.parse(localStorage.getItem("emboidery"));

  // add to cart Funcationality

  const [qty, setQty] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  const addtocartreducer = useSelector((state) => state?.addToCartReducer);
  const { cartItems } = addtocartreducer;

  const addtoemboidaryreducer = useSelector(
    (state) => state?.addemboidaryReducer
  );
  const { emboidary } = addtoemboidaryreducer;
  // find proudct  particular emboidary
  const filteredData = emboidary.filter((item) => item?.pro_id == productDetails?.data?.id);
  // console.log(filteredData, "product");

  const emboidaryPrice = filteredData?.length > 0 ? (filteredData?.map((data) => { return (data?.price) })) : 0;
  console.log(emboidaryPrice)



  let priceEmboidary = emboidaryPrice[0]
  // console.log(priceEmboidary)

  // price: productDetails?.data?.rupee,
  // dollar_price: productDetails?.data?.price,

  function addtocart(e) {
    e.preventDefault();
    // window.scrollTo(0, 0);
    if (formValues?.size != "" || customeSize != "") {
      // Valid selection, proceed with form submission
      if (countryData === 'INR') {
        const productData = {
          title: productDetails?.data?.product_title_eng,
          color_name: productDetails?.data?.color_name,
          color_id: productDetails.data.color,
          sku_number: productDetails?.data?.sku_number,
          pro_id: productDetails?.data?.pro_id,
          image: productDetails?.data?.image,
          price: productDetails?.data?.product_price_rupee,
          qty: 1,
          deliver_fee: productDetails?.data?.delivery_charges_rupee,
          size: formValues?.size,
          customeSize: customeSize,
          emboidery: filteredData,
          emboidery_price: priceEmboidary,
        };
        dispatch(addToCartAction(productData, qty, priceEmboidary));
      } else if (countryData === "USD") {
        const productData = {
          title: productDetails?.data?.product_title_eng,
          sku_number: productDetails?.data?.sku_number,
          color_name: productDetails?.data?.color_name,
          color_id: productDetails?.data?.color,
          id: productDetails?.data?.id,
          image: productDetails?.data?.image,
          price: productDetails?.data?.product_price_dollar,
          pro_id: productDetails?.data?.pro_id,
          qty: 1,
          deliver_fee: productDetails?.data?.delivery_charges_doller,
          size: formValues?.size,
          customeSize: customeSize,
          emboidery: filteredData,
          emboidery_price: priceEmboidary,
        };
        dispatch(addToCartAction(productData, qty, priceEmboidary));
      } else {
        toast.error("Please select Your Country ");
      }

      // console.log(productData)

      // ...
    } else {
      // No selection, display an error message or take appropriate action
      toast.error("Please select size");
    }
  }

  // remove emboidery

  //   get dtate

  // const emboideryIcon= JSON.parse(localStorage.get('emboidery'));
  // const emboideryBoth= JSON.parse(localStorage.get('emboidery'));

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const deleteEmboidary = (item) => {
    dispatch(deleteFromEmboidary(item));
    localStorage.removeItem("cartItems");
    localStorage.removeItem("emboidary");
  };

  // get api

  const [standedSize, setStandedSize] = useState();
  const [customSizeApi, setCustomSizeApi] = useState();
  useEffect(() => {
    axios.get(`${BassURl}/all-size`).then((res) => {
      setStandedSize(res.data.data?.standard);
      setCustomSizeApi(res.data.data?.custom);
    });
  }, []);
  // encaspulating loop
  const elements = [];

  const renderLoop = (count) => {
    const elements = [];
    for (let i = 0; i <= count; i++) {
      elements.push(i);
    }
    return elements;
  };
  const dynamicValue = 100;

  return (
    <>
      <Navbar />
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      {isProductLoading ? (
        <>
          <div class="loader1">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          {/*  dangerouslySetInnerHTML={{
                    __html: data?.description,
                  }} */}

          <section className="product__details--section section--padding">
            <div className="container">
              <div className="row row-cols-lg-2 row-cols-md-2">
                <div className="col">
                  <div className="product__details--media">
                    <div className="product__media--preview ">
                      <div className="product__media--preview__items">
                        {productDetails?.gallery?.length > 0 ? (
                          <>
                            <ProductImage images={productDetails?.gallery} />
                          </>
                        ) : (
                          <>
                            <div className="text-center align-center d-flex">
                              <a
                                className="product__media--preview__items--link glightbox"
                                data-gallery="product-media-preview"
                                href={productDetails?.data?.image}
                              >
                                <img
                                  className="product__media--preview__items--img"
                                  src={`${imageURl}/${productDetails?.data?.image}`}
                                  alt="product-media-img"
                                  style={{ width: "100%" }}
                                />
                              </a>
                            </div>
                          </>
                        )}
                        {/* <Slider {...settings}>

                          <a
                            className="product__media--preview__items--link glightbox"
                            data-gallery="product-media-preview"
                            href={productDetails?.data?.image}
                          >
                            <img
                              className="product__media--preview__items--img"
                              src={`${imageURl}/${productDetails?.data?.image}`}
                              alt="product-media-img"
                              style={{ width: "100%" }}
                            />
                          </a>
                          <div className="product__media--view__icon">
                            <a
                              className="product__media--view__icon--link glightbox"
                              href={productDetails?.data?.image}
                              data-gallery="product-media-preview"
                            >
                              <svg
                                className="product__media--view__icon--svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="22.51"
                                height="22.443"
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
                            </a>
                          </div>


                        </Slider> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="product__details--info">
                    <form action="#">
                      <h2 className="product__details--info__title mb-15">
                        {productDetails?.data?.product_title_eng} -{" "}
                        {productDetails?.data?.color_name}
                      </h2>
                      <div className="product__details--info__price mb-10">

                        {
                          countryData === 'INR' ? (<>

                            <span className="current__price">
                              ₹ {productDetails?.data?.rupee}
                            </span>
                          </>) : (<>
                            <>
                              <span className="current__price">
                                ${productDetails?.data?.price}
                              </span>
                            </>
                          </>)
                        }


                        {/* <span className="price__divided" />
                    <span className="old__price">$178</span> */}
                      </div>
                      <div className="product__details--info__rating d-flex align-items-center mb-15">
                        <ul className="rating d-flex justify-content-center">
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14.105"
                                height="14.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14.105"
                                height="14.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14.105"
                                height="14.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14.105"
                                height="14.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14.105"
                                height="14.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                        </ul>
                        <span className="product__items--rating__count--number">
                          (24)
                        </span>
                      </div>
                      <p
                        className="product__details--info__desc mb-15"
                        dangerouslySetInnerHTML={{
                          __html: productDetails?.data?.product_properties,
                        }}
                      ></p>
                      <div className="product__variant">
                        <div className="product__variant--list mb-10">
                          <fieldset className="variant__input--fieldset">
                            <legend className="product__variant--title mb-8">
                              Color : {productDetails?.data?.color_name}
                            </legend>
                            <ColorCode
                              color={productDetails?.available_color}
                              colorActive={productDetails?.data?.color_name}


                            />
                          </fieldset>
                        </div>

                        <div className="d-flex">
                          <span
                            className="select-label fnt-xs my-auto mr-md-4 mr-3"
                            style={{ fontWeight: "600" }}

                          >
                            Select Size :
                          </span>

                          <ul
                            className="nav nav-pills mb-3  d-flex justify-content-xl-between  size_option"
                            id="pills-tab"
                            role="tablist"
                          >
                            <li
                              className="nav-item size_padding"
                              role="presentation"
                            >
                              <a
                                href=""
                                className="nav-link active"
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                                onClick={() => setSelectSize('standard')}
                              >
                                {" "}
                                Standard Size
                              </a>
                              {/* <label>
                            <input
                              className="gx-5"
                              type="radio"
                              name="options"
                              id="option1"
                            />
                            Standard Size
                          </label> */}
                            </li>
                            <li className="nav-item" role="presentation">
                              <a
                                className="nav-link"
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                                onClick={() => setSelectSize('custom')}
                              >
                                Custome Size
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="tab-content" id="pills-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="pills-home-tab"
                          >
                            <div className="row">
                              <div className="col-md-10">
                                <p className="text-des-s">
                                  Size charts vary across brands{" "}
                                  <a
                                    className="learn-link"
                                    href="javascript:void(0)"
                                    data-toggle="modal"
                                    data-target=".js-size-chart-modal-wrp"
                                    onClick={ChartMen}
                                  >
                                    size chart
                                  </a>
                                  .
                                </p>
                              </div>
                            </div>
                            <div className="measures-drop-wrp d-flex flex-md-wrap pt-3 pdt-size-select">
                              {standedSize &&
                                standedSize?.map((items) => {
                                  return (
                                    <>




                                      <div className="size text-center">
                                        <span className="size-hd">
                                          {items?.title}
                                        </span>
                                        <span className="size-number">
                                          <input
                                            className="size-select"
                                            id={`size${items?.start_value}`}
                                            type="radio"
                                            name="size"
                                            value={`${items?.title}-${items?.start_value}`}
                                            // checked={selectedOption === 'XS-0'}

                                            onChange={handleChange}
                                            defaultValue="XS-0"
                                          />
                                          <label
                                            className="size-number__label"
                                            htmlFor={`size${items?.start_value}`}
                                          >
                                            {items?.start_value}
                                          </label>
                                        </span>
                                        <span className="size-number">
                                          <input
                                            className="size-select"
                                            id={`size${items?.end_value}`}
                                            type="radio"
                                            name="size"
                                            value={`${items?.title}-${items?.end_value}`}
                                            // checked={selectedOption === 'XS-2'}
                                            onChange={handleChange}
                                            defaultValue="XS-2"
                                          />
                                          <label
                                            className="size-number__label"
                                            htmlFor={`size${items?.end_value}`}
                                          >
                                            {items?.end_value}
                                          </label>
                                        </span>
                                      </div>

                                    </>
                                  );
                                })}
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                          >
                            <p className="text-des">
                              <a
                                className="learn-link"
                                href="#"
                                data-toggle="modal"
                                data-target="#howToMeasurePd"
                              >
                                How to Measure
                              </a>
                            </p>
                            <p className="customFeeText fnt-xxs pt-2 less-than-three-orders-guest-only">
                              Measurements to be provided in inches
                            </p>

                            <div className="row">
                              <div className="col-12">
                                <div
                                  className="measures-drop-wrp d-flex flex-wrap pt-4"
                                  id="mandatorySizeOptions"
                                >
                                  {customSizeApi &&
                                    customSizeApi?.map((items, index) => {
                                      return (
                                        <>
                                          <div className="drop-container mb-2 mb-md-3">
                                            <div className="drop-title">
                                              <span className="selection-label">
                                                {items?.title}
                                              </span>
                                              <i
                                                className="icon-info"
                                                onClick={shoulderModel}
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  shape-rendering="geometricPrecision"
                                                  text-rendering="geometricPrecision"
                                                  image-rendering="optimizeQuality"
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  viewBox="0 0 512 512"
                                                >
                                                  <path d="M256 0c70.69 0 134.7 28.66 181.02 74.98C483.34 121.31 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.7 483.34 326.69 512 256 512c-70.69 0-134.69-28.66-181.02-74.98C28.66 390.7 0 326.69 0 256c0-70.69 28.66-134.69 74.98-181.02C121.31 28.66 185.31 0 256 0zm-21.91 302.69v-2.07c.16-13.72 1.51-24.59 4.15-32.67 2.59-8.08 6.32-14.65 11.18-19.63 4.87-5.02 10.72-9.58 17.56-13.72 4.4-2.8 8.39-5.9 11.91-9.37 3.52-3.42 6.32-7.41 8.38-11.91 2.07-4.46 3.11-9.42 3.11-14.91 0-6.53-1.55-12.18-4.66-16.99-3.05-4.77-7.19-8.44-12.27-11.08-5.13-2.59-10.82-3.89-17.09-3.89-5.65 0-11.03 1.15-16.21 3.53-5.12 2.33-9.42 6-12.79 10.97-3.36 4.98-5.33 11.35-5.85 19.11h-33.56c.53-13.21 3.89-24.39 10.05-33.55 6.21-9.16 14.4-16.11 24.55-20.82 10.2-4.71 21.49-7.04 33.81-7.04 13.57 0 25.38 2.48 35.52 7.56 10.15 5.02 18.08 12.06 23.72 21.08 5.59 9 8.44 19.47 8.44 31.48 0 8.23-1.29 15.64-3.88 22.21-2.59 6.58-6.22 12.48-10.98 17.61-4.77 5.18-10.41 9.73-17.03 13.67-6.27 3.94-11.35 7.97-15.18 12.17-3.88 4.19-6.68 9.17-8.44 14.86-1.76 5.74-2.75 12.84-2.9 21.33v2.07h-31.54zm16.68 70.67c-6.06 0-11.24-2.18-15.59-6.48-4.34-4.29-6.47-9.53-6.47-15.63 0-6.01 2.12-11.19 6.47-15.49 4.35-4.3 9.53-6.47 15.59-6.47 5.95 0 11.12 2.19 15.48 6.47 4.39 4.31 6.58 9.48 6.58 15.49 0 4.04-1.05 7.76-3.06 11.08-2.02 3.35-4.66 6.07-7.97 8.03-3.31 1.96-6.99 3-11.03 3z" />
                                                </svg>
                                              </i>

                                              <div className="select-style">
                                                <div className="select_wrap">
                                                  <select
                                                    className="txt-gry-12 select_box selectized"
                                                    x-data-name={items?.title}
                                                    x-data-optional="false"
                                                    value={
                                                      customeSize.items?.title
                                                    }
                                                    onChange={
                                                      CustomehandleChange
                                                    }
                                                    name={items?.title}
                                                  >
                                                    <option
                                                      // disabled=""
                                                      onChange={
                                                        CustomehandleChange
                                                      }
                                                      selected="selected"
                                                    >
                                                      select
                                                    </option>
                                                    {renderLoop(
                                                      dynamicValue
                                                    ).map((element) => (
                                                      <option value={element}>
                                                        {element}"
                                                      </option>
                                                    ))}

                                                    {/* <option value={14}>14"</option>
                                                  <option value={15}>15"</option>
                                                  <option value={16}>16"</option>
                                                  <option value={17}>17"</option>
                                                  <option value={18}>18"</option>
                                                  <option value={19}>19"</option>
                                                  <option value={20}>20"</option>
                                                  <option value={21}>21"</option>
                                                  <option value={22}>22"</option>
                                                  <option value={23}>23"</option>
                                                  <option value={24}>24"</option>
                                                  <option value={25}>25"</option> */}
                                                  </select>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                </div>

                                {/* <div
                                  className="drop-wrp d-flex flex-wrap pt-2 optionalArea"
                                  id="optionalSizeOptions"
                                >
                                  <div className="drop-container mb-2 mb-md-3">
                                    <div className="drop-title">
                                      <span className="selection-label">
                                        HPS to Bust Point{" "}
                                      </span>
                                      <i className="icon-info">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          shape-rendering="geometricPrecision"
                                          text-rendering="geometricPrecision"
                                          image-rendering="optimizeQuality"
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          viewBox="0 0 512 512"
                                        >
                                          <path d="M256 0c70.69 0 134.7 28.66 181.02 74.98C483.34 121.31 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.7 483.34 326.69 512 256 512c-70.69 0-134.69-28.66-181.02-74.98C28.66 390.7 0 326.69 0 256c0-70.69 28.66-134.69 74.98-181.02C121.31 28.66 185.31 0 256 0zm-21.91 302.69v-2.07c.16-13.72 1.51-24.59 4.15-32.67 2.59-8.08 6.32-14.65 11.18-19.63 4.87-5.02 10.72-9.58 17.56-13.72 4.4-2.8 8.39-5.9 11.91-9.37 3.52-3.42 6.32-7.41 8.38-11.91 2.07-4.46 3.11-9.42 3.11-14.91 0-6.53-1.55-12.18-4.66-16.99-3.05-4.77-7.19-8.44-12.27-11.08-5.13-2.59-10.82-3.89-17.09-3.89-5.65 0-11.03 1.15-16.21 3.53-5.12 2.33-9.42 6-12.79 10.97-3.36 4.98-5.33 11.35-5.85 19.11h-33.56c.53-13.21 3.89-24.39 10.05-33.55 6.21-9.16 14.4-16.11 24.55-20.82 10.2-4.71 21.49-7.04 33.81-7.04 13.57 0 25.38 2.48 35.52 7.56 10.15 5.02 18.08 12.06 23.72 21.08 5.59 9 8.44 19.47 8.44 31.48 0 8.23-1.29 15.64-3.88 22.21-2.59 6.58-6.22 12.48-10.98 17.61-4.77 5.18-10.41 9.73-17.03 13.67-6.27 3.94-11.35 7.97-15.18 12.17-3.88 4.19-6.68 9.17-8.44 14.86-1.76 5.74-2.75 12.84-2.9 21.33v2.07h-31.54zm16.68 70.67c-6.06 0-11.24-2.18-15.59-6.48-4.34-4.29-6.47-9.53-6.47-15.63 0-6.01 2.12-11.19 6.47-15.49 4.35-4.3 9.53-6.47 15.59-6.47 5.95 0 11.12 2.19 15.48 6.47 4.39 4.31 6.58 9.48 6.58 15.49 0 4.04-1.05 7.76-3.06 11.08-2.02 3.35-4.66 6.07-7.97 8.03-3.31 1.96-6.99 3-11.03 3z" />
                                        </svg>
                                      </i>
                                      <div className="select-style">
                                        <div className="select_wrap">
                                          <select
                                            className="txt-gry-12 select_box selectized"
                                            x-data-name="HPS to Bust Point *"
                                            x-data-optional="true"
                                            value={customeSize.hsptobust} onChange={CustomehandleChange}
                                            name="hsptobust"
                                          >
                                            <option
                                              disabled=""
                                              onChange={CustomehandleChange}
                                              selected="selected"
                                            >
                                              select
                                            </option>
                                            <option value={5}>5"</option>
                                            <option value={6}>6"</option>
                                            <option value={7}>7"</option>
                                            <option value={8}>8"</option>
                                            <option value={9}>9"</option>
                                            <option value={10}>10"</option>
                                            <option value={11}>11"</option>
                                            <option value={12}>12"</option>
                                            <option value={13}>13"</option>
                                            <option value={14}>14"</option>
                                            <option value={15}>15"</option>
                                            <option value={16}>16"</option>
                                            <option value={17}>17"</option>
                                            <option value={18}>18"</option>
                                            <option value={19}>19"</option>
                                            <option value={20}>20"</option>
                                            <option value={21}>21"</option>
                                            <option value={22}>22"</option>
                                            <option value={23}>23"</option>
                                            <option value={24}>24"</option>
                                            <option value={25}>25"</option>
                                            <option value={26}>26"</option>
                                            <option value={27}>27"</option>
                                            <option value={28}>28"</option>
                                            <option value={29}>29"</option>
                                            <option value={30}>30"</option>
                                            <option value={31}>31"</option>
                                            <option value={32}>32"</option>
                                            <option value={33}>33"</option>
                                            <option value={34}>34"</option>
                                            <option value={35}>35"</option>
                                            <option value={36}>36"</option>
                                            <option value={37}>37"</option>
                                            <option value={38}>38"</option>
                                            <option value={39}>39"</option>
                                            <option value={40}>40"</option>
                                            <option value={41}>41"</option>
                                            <option value={42}>42"</option>
                                            <option value={43}>43"</option>
                                            <option value={44}>44"</option>
                                            <option value={45}>45"</option>
                                            <option value={46}>46"</option>
                                            <option value={47}>47"</option>
                                            <option value={48}>48"</option>
                                            <option value={49}>49"</option>
                                            <option value={50}>50"</option>
                                            <option value={51}>51"</option>
                                            <option value={52}>52"</option>
                                            <option value={53}>53"</option>
                                            <option value={54}>54"</option>
                                            <option value={55}>55"</option>
                                            <option value={56}>56"</option>
                                            <option value={57}>57"</option>
                                            <option value={58}>58"</option>
                                            <option value={59}>59"</option>
                                            <option value={60}>60"</option>
                                            <option value={61}>61"</option>
                                            <option value={62}>62"</option>
                                            <option value={63}>63"</option>
                                            <option value={64}>64"</option>
                                            <option value={65}>65"</option>
                                            <option value={66}>66"</option>
                                            <option value={67}>67"</option>
                                            <option value={68}>68"</option>
                                            <option value={69}>69"</option>
                                            <option value={70}>70"</option>
                                            <option value={71}>71"</option>
                                            <option value={72}>72"</option>
                                            <option value={73}>73"</option>
                                            <option value={74}>74"</option>
                                            <option value={75}>75"</option>
                                            <option value={76}>76"</option>
                                            <option value={77}>77"</option>
                                            <option value={78}>78"</option>
                                            <option value={79}>79"</option>
                                            <option value={80}>80"</option>
                                            <option value={81}>81"</option>
                                            <option value={82}>82"</option>
                                            <option value={83}>83"</option>
                                            <option value={84}>84"</option>
                                            <option value={85}>85"</option>
                                            <option value={86}>86"</option>
                                            <option value={87}>87"</option>
                                            <option value={88}>88"</option>
                                            <option value={89}>89"</option>
                                            <option value={90}>90"</option>
                                            <option value={91}>91"</option>
                                            <option value={92}>92"</option>
                                            <option value={93}>93"</option>
                                            <option value={94}>94"</option>
                                            <option value={95}>95"</option>
                                            <option value={96}>96"</option>
                                            <option value={97}>97"</option>
                                            <option value={98}>98"</option>
                                            <option value={99}>99"</option>
                                            <option value={100}>100"</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </div> */}
                              </div>
                            </div>
                          </div>
                          {/* <div
                        className="tab-pane fade"
                        id="pills-contact"
                        role="tabpanel"
                        aria-labelledby="pills-contact-tab"
                      >
                        fdghdfghdfghdfghdfghdfghfdghfgh
                      </div> */}
                          {
                            // console.log(selectSize)

                            selectSize == 'standard' ? (<>
                              {
                                addSizePrice !== 0 ? (<>

                                  <h6>Add Size Price : <span style={{ color: "green", fontWeight: "600" }}> {addSizePrice}</span></h6>
                                </>) : (<></>)
                              }


                            </>) : (<></>)






                          }

                        </div>
                        {localStorage.getItem("emboidary") ? (
                          filteredData.length > 0 ? (
                            filteredData?.map((item) => {
                              return item?.pro_id == productDetails?.data?.id ? (
                                <>
                                  <div className="d-flex justify-content-between ">
                                    <label
                                      className="p-2"
                                      style={{
                                        textDecoration: "underline",
                                        padding: "5px",
                                      }}
                                    >
                                      <input
                                        className="m-2"
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                      />
                                      Added Emboidery
                                    </label>

                                    <div
                                      className="removeEmboidery"
                                      onClick={() => deleteEmboidary(item)}
                                    >
                                      <a title="remove">
                                        <i>
                                          {" "}
                                          <img
                                            className="w-50"
                                            src="/assets/img/remove.png"
                                            width={50}
                                            alt=""
                                            srcset=""
                                          />
                                        </i>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-md-12">

                                        {
                                          countryData === 'INR' ? (<>

                                            <div>Type :- {item?.type}</div>
                                            <div>First name :- {item?.myname}</div>
                                            <div>
                                              secondLine :- {item?.secondLine}
                                            </div>
                                            <div>
                                              Placemnet :- {item?.namePlacemnet}``
                                            </div>
                                            <div>Price :- ₹ {item?.price}</div>


                                          </>) : (<>

                                            <div>Type :- {item?.type}</div>
                                            <div>First name :- {item?.myname}</div>
                                            <div>
                                              secondLine :- {item?.secondLine}
                                            </div>
                                            <div>
                                              Placemnet :- {item?.namePlacemnet}
                                            </div>
                                            <div>Price :- $ {item?.price}</div>



                                          </>)
                                        }

                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="product__variant--list mb-15 text-center">
                                    <Link
                                      className="variant__buy--now__btn primary__btn "
                                      style={{
                                        background: "#fff",
                                        color: "black",
                                        border: "1px solid black",
                                      }}
                                      onClick={add_emboidery}
                                    >
                                      Add Emboidery
                                    </Link>
                                  </div>
                                </>
                              );
                            })
                          ) : (
                            <>
                              <div className="product__variant--list mb-15 text-center">
                                <Link
                                  className="variant__buy--now__btn primary__btn "
                                  style={{
                                    background: "#fff",
                                    color: "black",
                                    border: "1px solid black",
                                  }}
                                  onClick={add_emboidery}
                                >
                                  Add Emboidery
                                </Link>
                              </div>
                            </>
                          )
                        ) : (
                          <>
                            {" "}
                            <div className="product__variant--list mb-15 text-center">
                              <Link
                                className="variant__buy--now__btn primary__btn "
                                style={{
                                  background: "#fff",
                                  color: "black",
                                  border: "1px solid black",
                                }}
                                onClick={add_emboidery}
                              >
                                Add Emboidery
                              </Link>
                            </div>
                          </>
                        )}

                        <div
                          className="product__variant--list mb-15 text-center"
                          onClick={addtocart}
                        >
                          <button className="variant__buy--now__btn primary__btn ">
                            Buy it now
                          </button>
                        </div>

                        <span
                          className="select-label fnt-xs my-auto mr-md-4 mr-3 mt-5"
                          style={{ fontWeight: "600" }}
                        >
                          Product Details :
                        </span>

                        <section
                          className="product__details--tab__section mt-5"
                          style={{ paddingTop: "20px !important" }}
                        >
                          <div className="container">
                            <div className="row row-cols-1">
                              <div className="col">
                                <ul className="product__details--tab d-flex mb-30">
                                  <li
                                    className={`  nav-tab product__details--tab__list ${activeTab === 1 ? "active" : ""
                                      }`}
                                    onClick={() => handleTabClick(1)}
                                    data-toggle="tab"
                                    data-target="#description"
                                  >
                                    Description
                                  </li>
                                  <li
                                    className={`nav-tab product__details--tab__list ${activeTab === 2 ? "active" : ""
                                      }`}
                                    onClick={() => handleTabClick(2)}
                                    data-toggle="tab"
                                    data-target="#reviews"
                                  >
                                    Details
                                  </li>
                                  <li
                                    className={`nav-tab product__details--tab__list ${activeTab === 3 ? "active" : ""
                                      }`}
                                    onClick={() => handleTabClick(3)}
                                    data-toggle="tab"
                                    data-target="#information"
                                  >
                                    Fabric
                                  </li>
                                </ul>
                                <div className="product__details--tab__inner border-radius-10">
                                  <div className="tab_content">
                                    {activeTab === 1 && (
                                      <div
                                        id="description"
                                        className="tab_pane active show"
                                      >
                                        <div className="product__tab--content">
                                          <div className="product__tab--content__step mb-30">
                                            <h2 className="product__tab--content__title h4 mb-10">
                                              Desccription
                                            </h2>
                                            <p className="product__tab--content__desc">
                                              Lorem ipsum dolor sit, amet
                                              consectetur adipisicing elit. Nam
                                              provident sequi, nemo sapiente
                                              culpa nostrum rem eum perferendis
                                              quibusdam, magnam a vitae
                                              corporis! Magnam enim modi, illo
                                              harum suscipit tempore aut dolore
                                              doloribus deserunt voluptatum
                                              illum, est porro? Ducimus dolore
                                              accusamus impedit ipsum maiores,
                                              ea iusto temporibus numquam eaque
                                              mollitia fugiat laborum dolor
                                              tempora eligendi voluptatem quis
                                              necessitatibus nam ab?
                                            </p>
                                          </div>
                                          <div className="product__tab--content__step">
                                            <h4 className="product__tab--content__title mb-10">
                                              More Details
                                            </h4>
                                            <ul>
                                              <li className="product__tab--content__list">
                                                <svg
                                                  className="product__tab--content__list--icon"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="22.51"
                                                  height="20.443"
                                                  viewBox="0 0 512 512"
                                                >
                                                  <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={48}
                                                    d="M268 112l144 144-144 144M392 256H100"
                                                  />
                                                </svg>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Laboriosam, dolorum?
                                              </li>
                                              <li className="product__tab--content__list">
                                                <svg
                                                  className="product__tab--content__list--icon"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="22.51"
                                                  height="20.443"
                                                  viewBox="0 0 512 512"
                                                >
                                                  <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={48}
                                                    d="M268 112l144 144-144 144M392 256H100"
                                                  />
                                                </svg>
                                                Magnam enim modi, illo harum
                                                suscipit tempore aut dolore?
                                              </li>
                                              <li className="product__tab--content__list">
                                                <svg
                                                  className="product__tab--content__list--icon"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="22.51"
                                                  height="20.443"
                                                  viewBox="0 0 512 512"
                                                >
                                                  <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={48}
                                                    d="M268 112l144 144-144 144M392 256H100"
                                                  />
                                                </svg>
                                                Numquam eaque mollitia fugiat
                                                laborum dolor tempora;
                                              </li>
                                              <li className="product__tab--content__list">
                                                <svg
                                                  className="product__tab--content__list--icon"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="22.51"
                                                  height="20.443"
                                                  viewBox="0 0 512 512"
                                                >
                                                  <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={48}
                                                    d="M268 112l144 144-144 144M392 256H100"
                                                  />
                                                </svg>
                                                Sit amet consectetur adipisicing
                                                elit. Quo delectus repellat
                                                facere maiores.
                                              </li>
                                              <li className="product__tab--content__list">
                                                <svg
                                                  className="product__tab--content__list--icon"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="22.51"
                                                  height="20.443"
                                                  viewBox="0 0 512 512"
                                                >
                                                  <path
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={48}
                                                    d="M268 112l144 144-144 144M392 256H100"
                                                  />
                                                </svg>
                                                Repellendus itaque sit quia
                                                consequuntur, unde veritatis.
                                                dolorum?
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {activeTab === 2 && <p> Lorem ipsum dolor sit, amet
                                      consectetur adipisicing elit. Nam
                                      provident sequi, nemo sapiente
                                      culpa nostrum rem eum perferendis
                                      quibusdam, magnam a vitae
                                      corporis! Magnam enim modi, illo
                                      harum suscipit tempore aut dolore
                                      doloribus deserunt voluptatum
                                      illum, est porro? Ducimus dolore
                                      accusamus impedit ipsum maiores,
                                      ea iusto temporibus numquam eaque
                                      mollitia fugiat laborum dolor
                                      tempora eligendi voluptatem quis
                                      necessitatibus nam ab?</p>}

                                    {activeTab === 3 && <h6> Lorem ipsum dolor sit, amet
                                      consectetur adipisicing elit. Nam
                                      provident sequi, nemo sapiente
                                      culpa nostrum rem eum perferendis
                                      quibusdam, magnam a vitae
                                      corporis! Magnam enim modi, illo
                                      harum suscipit tempore aut dolore
                                      doloribus deserunt voluptatum
                                      illum, est porro? Ducimus dolore
                                      accusamus impedit ipsum maiores,
                                      ea iusto temporibus numquam eaque
                                      mollitia fugiat laborum dolor
                                      tempora eligendi voluptatem quis
                                      necessitatibus nam ab?</h6>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {shoulderShow ? (
            <Suspense
              fallback={
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
            >
              <ShoulderModal hide={SetShoulderShow} />
            </Suspense>
          ) : null}
          {sizeChartMen ? (
            <Suspense
              fallback={
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
            >
              <SizeChartMen hide={SetSizeChartMen} />
            </Suspense>
          ) : null}
          {addEmboidery ? (
            <Suspense
              fallback={
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
            >
              <AddEmbroideryModal
                data={productDetails}
                hide={setaddEmboidery}
              />
            </Suspense>
          ) : null}

          <Footer />
        </>
      )}
    </>
  );
}

export default ProductDetails;
