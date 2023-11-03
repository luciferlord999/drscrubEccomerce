import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, deleteFromCart } from "../Redux/Action/CartAction";
import imageURl from "../Api/ImageUrl";

function CartProducts({ item }) {
  const cartreducerstate = useSelector((state) => state.addToCartReducer);
  const dispatch = useDispatch();
  console.log(item)

  const { cartItems } = cartreducerstate;

  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  const addSizePrice = JSON.parse(localStorage.getItem("add_sizr_price"));


  return (
    <>
      <div className="minicart__product--items d-flex">
        <div className="minicart__thumb">
          <a href="product-details.html">
            <img src={`${imageURl}/${item?.image}`} alt="prduct-img" />
          </a>
        </div>
        <div className="minicart__text">
          <h3 className="minicart__subtitle h4">
            <a href="product-details.html">{item?.title}</a>
          </h3>
          <span className="color__variant">
            <b>Color:</b> {item?.color_name}
          </span>
          <div className="minicart__price">
            {countryData === "INR" ? (<>

              <span className="current__price"> ₹ {item?.price}</span>


            </>) : (<>
              <span className="current__price"> $ {item?.price}</span>


            </>)}


          </div>

          <div className="">
            {
              item?.emboidery?.length > 0 ? (<>
                <label htmlFor="">

                  <input type="checkbox" checked />
                  Emboidery : {item?.emboidery?.map((data) => {
                    return (<><span style={{ color: "green" }}>{data?.price}</span></>)
                  })}


                </label>
              </>) : ('')
            }
            <label htmlFor="">

              <input type="checkbox" checked />
              AddSizePrice : <span style={{ color: "green" }}>{addSizePrice}</span>


            </label>
           

            {/* <span className="old__price">$140.00</span> */}
          </div>
          <div className="minicart__text--footer d-flex align-items-center">
            {/* <div className="quantity__box minicart__quantity">
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
            </div> */}
            <button
              className="minicart__product--remove"
              onClick={() => {
                dispatch(deleteFromCart(item));
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProducts;
