import React from "react";
import imageURl from "../Api/ImageUrl";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../Redux/Action/CartAction";
import store from "../Redux/Store";
import EmboideryAdded from "./EmboideryAdded";

function ViewCartInner({ data }) {
  console.log(data);
  const dispatch = useDispatch();

  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  console.log(countryData)

  const addSizePrice = JSON.parse(localStorage.getItem("add_sizr_price"));

  const addtocartreducer = useSelector((state) => state?.addToCartReducer);
  const { cartItems } = addtocartreducer;

  // get emboiderPrice

  let total = 0;
  data?.emboidery?.length > 0
    ? data.emboidery?.map((items) => {
      return (total += items?.price);
    })
    : "";

  // IncreaseQty
  const increaseQuantity = (item, qty) => {
    const newQty = qty + 1;
    const price = total * newQty;
    console.log(price);

    console.log(item, newQty);
    if (5 <= qty) {
      return;
    }
    const updatedItem = {
      ...item,
      qty: newQty,
    };
    dispatch(addToCartAction(updatedItem, newQty, price));
  };

  // decreaseQuantity

  const decreaseQuantity = (item, qty) => {
    const newQty = qty - 1;
    const price = total * newQty;
    console.log(price);
    console.log(item, newQty, price);
    if (1 >= qty) {
      return;
    }
    const updatedItem = {
      ...item,
      qty: newQty,
    };

    dispatch(addToCartAction(updatedItem, newQty, price));
  };

  console.log(total);

  //   Sub total

  // const allTotal = total + subtotal;
  // console.log(allTotal);

  const embroideryPrice =
    data.emboidery.length > 0 ? data.emboidery[0].price : 0;
  const dataTotal = embroideryPrice * data.qty;
  console.log(dataTotal);

  // cartItems.forEach((item) => {
  //     const embroideryPrice = item.emboidery.length > 0 ? item.emboidery[0].price : '';
  //     addOnData = embroideryPrice
  // });
  // console.log(addOnData)

  return (
    <>
      <tr className="cart__table--body__items">
        <td className="cart__table--body__list">
          <div className="cart__product d-flex align-items-center">
            <button
              className="cart__remove--btn"
              aria-label="search button"
              type="button"
            >
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16px"
                height="16px"
              >
                <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
              </svg>
            </button>
            <div className="cart__thumbnail">
              <a href="product-details.html">
                <img
                  className="border-radius-5"
                  src={`${imageURl}/${data?.image}`}
                  alt="cart-product"
                />
              </a>
            </div>
            <div className="cart__content">
              <h4 className="cart__content--title">
                <a href="product-details.html">{data?.title}</a>
              </h4>
              <span className="cart__content--variant">
                COLOR: {data?.color_name}
              </span>
              <span className="cart__content--variant">Size:{data?.size}</span>
            </div>
          </div>
        </td>
        <td className="cart__table--body__list">
          {countryData === 'INR' ? (
            <>
              <span className="cart__price">₹ {data?.price}</span>
            </>
          ) : countryData === 'USD' ? (
            <>
              <span className="cart__price"> $ {data?.price}</span>
            </>
          ) : (
            <>
              <span className="cart__price"> ₹ {data?.price}</span>
            </>
          )}
        </td>
        <td className="cart__table--body__list">
          {countryData === 'INR' ? (
            <>
              <span>
                <b>
                  {" "}
                  {data?.emboidery?.length > 0 ? (
                    <EmboideryAdded emboideryData={data?.emboidery} />
                  ) : (
                    ""
                  )}{" "}
                </b>
              </span>
            </>
          ) : countryData === 'USD' ? (
            <>
              <span>
                <b>
                  {" "}
                  {data?.emboidery?.length > 0 ? (
                    <> Emboidery Added</>
                  ) : (
                    ""
                  )}{" "}
                </b>
              </span>
            </>
          ) : (
            <>
              Emboidery Added
            </>
          )}
        </td>
        <td className="cart__table--body__list">
          <div className="quantity__box">
            <button
              type="button"
              className="quantity__value quickview__value--quantity decrease"
              aria-label="quantity value"
              value="Decrease Value"
              onClick={() => decreaseQuantity(data, data.qty)}
            >
              -
            </button>
            <label>
              <input
                type="number"
                className="quantity__number quickview__value--number"
                value={data?.qty}
                data-counter=""
              />
            </label>
            <button
              type="button"
              className="quantity__value quickview__value--quantity increase"
              aria-label="quantity value"
              value="Increase Value"
              onClick={() => increaseQuantity(data, data.qty)}
            >
              +
            </button>
          </div>
        </td>
        <td className="cart__table--body__list">
          {countryData === 'INR' ? (
            <> ₹ {data?.price * data?.qty + dataTotal + addSizePrice}</>
          ) : countryData === 'USD' ? (
            <> $  {data?.price * data?.qty + dataTotal + addSizePrice}</>
          ) : (
            <></>
          )}
        </td>
      </tr>
    </>
  );
}

export default ViewCartInner;
