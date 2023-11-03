import React, { useEffect, useState } from "react";
import { addToCartAction } from "../Redux/Action/CartAction";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import imageURl from "../Api/ImageUrl";

import axios from "axios";
import BassURl from "../Api/Api";

function HomeProduct({ data, count }) {
  // add to cart and qty funcationality
  console.log(data)
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  function addtocart() {
    dispatch(addToCartAction(data, qty));
  }
  const cartreducerstate = useSelector((state) => state.addToCartReducer);
  const { cartItems } = cartreducerstate;


  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  console.log(countryData)

  // productColor

  const [colorCode, setcolorCode] = useState('');
  useEffect(() => {

    axios.get(`${BassURl}/product-color/1`).then((res) => {
      return (setcolorCode(res.data.data))
    })
  }, []);
  console.log(colorCode)


  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="col mb-30">
        <div className="product__items">
          <div className="product__items--thumbnail">
            <a className="product__items--link" href={`/product-details/${data?.product_url}`}>
              <img
                className="product__items--img product__primary--img"
                src={`${imageURl}/${data?.header_image}`}
                alt="product-img"
              />
              <img
                className="product__items--img product__secondary--img"
                src={`${imageURl}/${data?.header_image}`}
                alt="product-img"
              />
            </a>
            <div className="product__badge">
              <span className="product__badge--items sale">Sale</span>
            </div>
            <Link
              className="product__add-to__cart--btn__style2"
              to={{
                pathname: `/product-details/${data?.product_url}`,
                state: { data: data?.color_name }
              }}

            >
              <svg
                class="product__items--action__btn--svg"
                xmlns="http://www.w3.org/2000/svg"
                width="22.51"
                height="20.443"
                viewBox="0 0 512 512"
              >
                <path
                  d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                ></path>
                <circle
                  cx="256"
                  cy="256"
                  r="80"
                  fill="none"
                  stroke="currentColor"
                  stroke-miterlimit="10"
                  stroke-width="32"
                ></circle>
              </svg>
              <span className="add__to--cart__text">
                <Link to={{
                  pathname: `/product-details/${data?.product_url}`,
                  state: { data: data }
                }}>Quick Shop</Link>
              </span>
            </Link>
            <ul className="product__items--action__style2">
              <li className="product__items--action__style2--list">
                <Link
                  className="product__items--action__style2--btn"
                  data-open="modal1"
                  to={`/product-details/${data?.product_url}`}
                >
                  <svg
                    className="product__items--action__btn--svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.51"
                    height="20.443"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={32}
                    />
                    <circle
                      cx={256}
                      cy={256}
                      r={80}
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit={10}
                      strokeWidth={32}
                    />
                  </svg>
                  <span className="visually-hidden">Quick View</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="product__items--content text-center">
            <span className="product__items--content__subtitle" style={{ fontWeight: 900 }}>
              {data?.category_title_eng}
            </span> / <span className="product__items--content__subtitle">
              {data?.sub_category_title}
            </span>
            <h3 className="product__items--content__title h4">
              <a href="/product-details">{data?.product_title_eng} - {data?.color_name}</a>
            </h3>

            {countryData === "INR" ? (
              <>
                <div className="product__items--price">
                  <span className="current__price">₹{data?.rupee}</span>

                </div>
              </>
            ) : countryData === "USD" ? (
              <>
                <div className="product__items--price">
                  <span className="current__price">${data?.price}</span>

                </div>
              </>
            ) : (<></>)}
            <ul className="1 HorizontalList HorizontalList--spacingTight colorSwatchMarginStyle index-swatch-class shall-appear ">



            </ul>




          </div>
        </div>
      </div>
    </>
  );
}

export default HomeProduct;
