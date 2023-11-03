import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import CartProducts from "./CartProducts";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CartSlider({ hide }) {
  const navigate = useNavigate()
  function hidess() {
    hide(false);
  }

  // get cartItem

  const addtocartreducer = useSelector((state) => state?.addToCartReducer);
  const { cartItems } = addtocartreducer;

  //   Sub total
  var subtotal = cartItems?.reduce(
    (acc, item) => acc + item?.price * item?.qty,
    0
  );

  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  const addSizePrice = JSON.parse(localStorage.getItem("add_sizr_price"));

  // Handle total price when emboidery added
  let totalPrice = 0;
  cartItems.forEach((item) => {
    const embroideryPrice = item?.emboidery?.length > 0 ? item.emboidery[0].price : 0;
    const itemTotalPrice = item.price + embroideryPrice;
    totalPrice += itemTotalPrice;
  });
  console.log(totalPrice)

  // I agree with the Privacy and Policy

  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    let valid = true;


    if (!privacyPolicyChecked) {
      toast.error('You must accept the Privacy Policy')
      valid = false;

    } else {

      navigate('/view-cart')
    }

    if (!valid) {
      return;
    }
  };



  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 5, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="offCanvas__minicart color-scheme-2"
      >
        <div className="minicart__header ">
          <div className="minicart__header--top d-flex justify-content-between align-items-center">
            <h2 className="minicart__title h3"> Shopping Cart</h2>
            <button
              className="minicart__close--btn"
              aria-label="minicart close button"
              data-offcanvas=""
              onClick={hidess}
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
        {cartItems && cartItems?.length > 0 ? (
          <>
            <div className="minicart__product">
              {cartItems &&
                cartItems?.map((item, index) => {
                  return (
                    <>
                      <div key={index}>
                        <CartProducts item={item} />
                      </div>
                    </>
                  );
                })}
            </div>
            <div className="minicart__amount">
              {/* <div className="minicart__amount_list d-flex justify-content-between">
                <span>Sub Total:</span>
                <span>
                  <b>$ {subtotal}</b>
                </span>
              </div> */}
              <div className="minicart__amount_list d-flex justify-content-between">
                <span>Total:</span>
                {
                  countryData === 'INR' ? (<>
                    {
                      <span>
                        <b>₹ {totalPrice + addSizePrice}</b>
                      </span>

                    }

                  </>) : (<>
                    {
                      cartItems?.map((data) => {
                        return (<>

                          {
                            data?.emboidery.length > 0 ? (
                              <>
                                <span>
                                  <b>$ {subtotal + data?.emboidery[0].price}</b>
                                </span>


                              </>) : (<>
                                <span>
                                  <b>$ {subtotal}</b>
                                </span>


                              </>)
                          }


                        </>)
                      })
                    }

                  </>)
                }

              </div>
            </div>
            <div className="minicart__conditions text-center">
              <input
                className="minicart__conditions--input"
                id="accept"
                type="checkbox"
                checked={privacyPolicyChecked}
                onChange={(e) => setPrivacyPolicyChecked(e.target.checked)}

              />
              <label className="minicart__conditions--label" htmlFor="accept">
                I agree with the{" "}
                <a
                  className="minicart__conditions--link"
                  href="privacy-policy.html"
                >
                  Privacy and Policy
                </a>
              </label>
            </div>
            <div className="minicart__button d-flex justify-content-center text-center" >
              <a
                className="primary__btn minicart__button--link"
                onClick={handleSubmit}



              >
                View cart
              </a>
              {/* <a
                className="primary__btn minicart__button--link"
                href="checkout.html"
              >
                Checkout
              </a> */}
            </div>
          </>
        ) : (
          <>
            <div className="EmptyCart text-center mt-5">
              <img
                src="/assets/img/no-cart.gif"
                className="EmptyCartImg"
                alt=""
                style={{ marginTop: "50%" }}
              />
              <p className="EmptyCartPara"> Add Some Product To Your Cart</p>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

export default CartSlider;
