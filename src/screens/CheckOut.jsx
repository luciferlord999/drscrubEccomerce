import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import imageURl from "../Api/ImageUrl";
import axios from "axios";
import BassURl from "../Api/Api";
import Addaddress from "../components/Modal/Addaddress";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { json } from "react-router-dom";
import { useDispatch } from "react-redux";
import { order } from "../Redux/Action/OrderSuccessAction";

function CheckOut() {
  // Retrieve session value
  const sessionValue = JSON.parse(sessionStorage.getItem("userData"));
  const addSizePrice = JSON.parse(localStorage.getItem("add_sizr_price"));

  // Do something with the session value
  // console.log(sessionValue?.id);

  // get user Address
  const [address, setAddress] = useState("");
  useEffect(() => {
    axios.get(`${BassURl}/user-address/${sessionValue?.id}`).then((res) => {
      setAddress(res.data);
    });
  }, []);

  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  const countryName = localStorage.getItem("selectedCountry");

  const addtocartreducer = useSelector((state) => state?.addToCartReducer);
  const { cartItems } = addtocartreducer;
  // subtotal
  var subtotal = cartItems?.reduce(
    (acc, item) => acc + item?.price * item?.qty,
    0
  );

  var grandTotal = 0;
  {
    cartItems.map((item, index) => {
      const embroideryPrice =
        item.emboidery.length > 0 ? item.emboidery[0].price : 0;
      return (grandTotal += embroideryPrice * item?.qty);
    });
  }
  console.log(grandTotal);

  const totalPrice = subtotal + grandTotal;


  // address select

  const [userAddress, setuserAddress] = useState();

  // Add Address

  const [addAddress, setaddAddress] = useState(false);

  useEffect(() => {
    if (addAddress) {
      document.body.classList.add("overlay__active");
    } else {
      document.body.classList.remove("overlay__active");
    }
  }, [addAddress]);

  function add_Address() {
    // console.log("hello");
    setaddAddress(true);
  }

  // check Validation

  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    let valid = true;

    if (!privacyPolicyChecked) {
      toast.error("You must accept the Privacy Policy");
      valid = false;
      window.location.href = "/view-cart";
    } else {
      window.location.href = "/view-cart";
    }

    if (!valid) {
      return;
    }
  };

  //  now use redux to post order info
  const dispatch = useDispatch();
  var coupon_amount = 0;

  // order CheckOut
  const checkOut = () => {
    const orderData = {
      client_id: sessionValue?.id,
      address_id: userAddress,
      product_count: cartItems.length,
      emboidery_price: grandTotal,
      size_price: addSizePrice,
      // order_generate_mode: "online",
      // order_type: "single,",
      coupon_amount: 0,
      coupon_code: "",
      delivery_fee: delivery_fees,
      addon_amount: 0,
      currency: countryData,
      bill_amount: totalPrice + delivery_fees,
      paid_amount: totalPrice + delivery_fees - coupon_amount,
      payment_method: "cod",
      razorpay_order_id: "",
      razorpay_payment_id: "",
      country: countryName,
      order_instructions: "",
      products: cartItems,
    };

    // switch (radioValue) {
    //   case 'online':
    //     let options = {
    //       "key": "rzp_test_jYMYEsyHx3C18V", // Enter the Key ID generated from the Dashboard
    //       "amount": (totalPrice * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //       "currency": "INR",
    //       "name": "Dr Scrub",
    //       "description": "Test Transaction",
    //       "image": "http://aquamart.co.in/assets/img/logo.webp",
    //       // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //       // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    //       'handler': function (response) {
    //         console.log(response.razorpay_payment_id);
    //         //   = response.razorpay_payment_id;
    //         dispatch(order(orderData));
    //         // window.location.href = '/order-success'


    //         // history.push('/order-success')

    //       },
    //       "prefill": {
    //         "name": "navneet",
    //         "email": "neet18101@gmail.com",
    //         "contact": "9889415087"
    //       },
    //       "notes": {
    //         "address": "Razorpay Corporate Office"
    //       },
    //       "theme": {
    //         "color": "#3399cc"
    //       }
    //     }
    //     var rzp1 = new window.Razorpay(options);
    //     rzp1.open();

    //     break;



    //   default:
    //     break;

    // }






    dispatch(order(orderData));
  };

  var delivery_fees = cartItems?.reduce(
    (acc, item) => acc + item?.deliver_fee,
    0
  );
  // Online Payment 

  const [radioValue, setRadioValue] = useState();
  const onChange = (ev) => {
    //save your value here with state variable
    console.log(ev.target.value);
    setRadioValue(ev.target.value);
  };
  return (
    <>
      <Navbar />
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      <section className="checkout-section-2 section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-sm-4 g-3">
            <div className="col-lg-8">
              <div className="left-sidebar-checkout">
                <div className="checkout-detail-box">
                  <ul>
                    <li>
                      <div className="checkout-icon text-center">
                        <i
                          className="fa fa-shopping-cart"
                          aria-hidden="true"
                          style={{ lineHeight: "40px" }}
                        />
                      </div>
                      <div className="checkout-box">
                        <div className="d-flex justify-content-between">
                          <div className="checkout-title">
                            <h4>Delivery Address</h4>
                          </div>
                          <div className="checkout-title">
                            <button
                              class="checkout__discount--code__btn primary__btn border-radius-5"
                              type="submit"
                              onClick={add_Address}
                            >
                              + Add New Address
                            </button>
                          </div>
                        </div>

                        <div className="checkout-detail">
                          <div className="row g-4">
                            {address?.code === 200 ? (
                              address?.data?.map((item) => {
                                return (
                                  <>
                                    <div className="col-xxl-6 col-lg-12 col-md-6 p-3">
                                      <div className="delivery-address-box">
                                        <div>
                                          <div className="form-check">
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name="jack"
                                              id="flexRadioDefault1"
                                              onClick={(e) =>
                                                setuserAddress(item?.id)
                                              }
                                            />
                                          </div>
                                          <div className="label">
                                            <label>{item?.type}</label>
                                          </div>
                                          <ul className="delivery-address-detail">
                                            <li>
                                              <h4 className="fw-500">
                                                {item?.locality}
                                              </h4>
                                            </li>
                                            <li>
                                              <p className="text-content">
                                                <span className="text-title">
                                                  Address :{" "}
                                                </span>
                                                {item?.address}
                                              </p>
                                            </li>
                                            <li>
                                              <h6 className="text-content">
                                                <span className="text-title">
                                                  Pin Code :
                                                </span>

                                                {item?.zip}
                                              </h6>
                                            </li>
                                            <li>
                                              <h6 className="text-content mb-0">
                                                <span className="text-title">
                                                  Phone :
                                                </span>
                                                {item?.temp_mobile}
                                              </h6>
                                            </li>
                                            <li>
                                              <h6 className="text-content mb-0">
                                                <span className="text-title">
                                                  City :
                                                </span>
                                                {item?.city}
                                              </h6>
                                            </li>
                                            <li>
                                              <h6 className="text-content mb-0">
                                                <span className="text-title">
                                                  State :
                                                </span>
                                                {item?.state}
                                              </h6>
                                            </li>
                                            <li>
                                              <h6 className="text-content mb-0">
                                                <span className="text-title">
                                                  Country :
                                                </span>
                                                {item?.country}
                                              </h6>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })
                            ) : (
                              <>
                                <h1>Data No Found</h1>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="checkout-icon text-center">
                        <i
                          class="fas fa-coins"
                          style={{ lineHeight: "40px" }}
                        ></i>
                      </div>
                      <div className="checkout-box">
                        <div className="checkout-title">
                          <h4>Payment Option</h4>
                        </div>
                        <div className="checkout-detail">
                          <div
                            className="accordion accordion-flush custom-accordion"
                            id="accordionFlushExample"
                          >
                            <div className="accordion-item">
                              <div
                                className="accordion-header"
                                id="flush-headingFour"
                              >
                                <div
                                  className="accordion-button collapsed"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseFour"
                                  aria-expanded="false"
                                >
                                  <div className="custom-form-check form-check mb-0">
                                    <label
                                      className="form-check-label"
                                      htmlFor="cash"
                                    >
                                      <input
                                        className="form-check-input mt-0"
                                        type="radio"
                                        name="upi"
                                        value='online'
                                        onChange={onChange}
                                        id="cash"
                                        defaultChecked=""
                                      />{" "}
                                      Pay online
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="flush-collapseFour"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                                style={{}}
                              >
                                <div className="accordion-body">
                                  <p className="cod-review">
                                    Pay digitally with SMS Pay Link. Cash may
                                    not be accepted in COVID restricted areas.{" "}
                                    <a href="javascript:void(0)">Know more.</a>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="right-side-summery-box">
                <div className="summery-box-2">
                  <div className="summery-header">
                    <h3>Order Summery</h3>
                  </div>
                  <ul className="summery-contain">
                    {cartItems?.length > 0 ? (
                      cartItems &&
                      cartItems?.map((data) => {
                        return (
                          <>
                            <li>
                              <img
                                src={`${imageURl}/${data?.image}`}
                                className="img-fluid blur-up lazyloaded checkout-image"
                                alt=""
                              />
                              <h4>
                                {data?.title} <span>X {data?.qty}</span>
                              </h4>
                              <h4 className="price">{data?.price}</h4>
                            </li>
                          </>
                        );
                      })
                    ) : (
                      <>
                        <h1>No data Found</h1>
                      </>
                    )}
                  </ul>
                  <div className="checkout__discount--code mt-3">
                    <form className="d-flex" action="#">
                      <label>
                        <input
                          className="checkout__discount--code__input--field border-radius-5"
                          placeholder="Gift card or discount code"
                          type="text"
                        />
                      </label>
                      <button
                        className="checkout__discount--code__btn primary__btn border-radius-5"
                        type="submit"
                      >
                        Apply
                      </button>
                    </form>
                  </div>

                  <ul className="summery-total">
                    {countryData == "INR" ? (
                      <>
                        <li>
                          <h5>Added Size Price</h5>
                          <h4 className="price">₹ {addSizePrice}</h4>

                        </li>
                        <li>
                          <h5>Shipping</h5>
                          <h4 className="price">₹ {delivery_fees}</h4>
                        </li>

                        <li>
                          <h5>Subtotal</h5>
                          <h4 className="price"> ₹ {totalPrice}</h4>
                        </li>



                        <li className="list-total">
                          <h4>Total (₹)</h4>
                          <h4 className="price">
                            {totalPrice + delivery_fees + addSizePrice}
                          </h4>
                        </li>
                      </>
                    ) : countryData == "USD" ? (
                      <>
                        <li>
                          <h4>Subtotal</h4>
                          <h4 className="price"> $ {totalPrice}</h4>
                        </li>
                        <li>
                          <h4>Shipping</h4>
                          <h4 className="price">$ {delivery_fees}</h4>
                        </li>

                        <li className="list-total">
                          <h4>Total ($)</h4>
                          <h4 className="price">
                            $ {totalPrice + delivery_fees}
                          </h4>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>
                <div className="checkout-offer">
                  <div className="offer-title">
                    <div className="offer-icon">
                      <img
                        src="../assets/images/inner-page/offer.svg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="offer-name">
                      <h6>Available Offers</h6>
                    </div>
                  </div>
                  <ul className="offer-detail">
                    <li>
                      <p>
                        Combo: BB Royal Almond/Badam Californian, Extra Bold 100
                        gm...
                      </p>
                    </li>
                    <li>
                      <p>
                        combo: Royal Cashew Californian, Extra Bold 100 gm + BB
                        Royal Honey 500 gm
                      </p>
                    </li>
                  </ul>
                </div>
                <button
                  className="btn theme-bg-color text-white btn-md w-100 mt-4 fw-bold"
                  onClick={checkOut}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {addAddress ? (
        <Suspense
          fallback={
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <Addaddress hide={setaddAddress} />
        </Suspense>
      ) : null}

      <Footer />
    </>
  );
}

export default CheckOut;
