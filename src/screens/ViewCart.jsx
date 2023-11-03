import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useSelector } from "react-redux";
import imageURl from '../Api/ImageUrl';
import ViewCartInner from '../components/ViewCartInner';
import Footer from '../components/Footer'
import axios from 'axios';
import BassURl from '../Api/Api';
import { Link } from 'react-router-dom';

function ViewCart() {

  const addtocartreducer = useSelector((state) => state?.addToCartReducer);
  const { cartItems } = addtocartreducer;


  // currency check 

  const countryData = JSON.parse(localStorage.getItem("currencyTop"));
  const addSizePrice = JSON.parse(localStorage.getItem("add_sizr_price"));



  var grandTotal = 0;
  {
    cartItems.map((item, index) => {
      const embroideryPrice = item.emboidery.length > 0 ? item.emboidery[0].price : 0;
      return grandTotal += (embroideryPrice) * item?.qty;

    })
  }
  console.log(grandTotal)



  var subtotal = cartItems?.reduce(
    (acc, item) => acc + item?.price * item?.qty,
    0
  );
  const totalPrice = subtotal + grandTotal
  const [CheckOut, setCheckOut] = useState();
  useEffect(() => {


  }, []);
  const emboidery = JSON.parse(localStorage.getItem("emboidery"));
  const checkoutData = {
    data: cartItems,
    total: subtotal,
    emboidery: emboidery

  }


  // Handle total price when emboidery added
  let login = JSON.parse(sessionStorage.getItem('userData'));
  console.log(login);

  let deliver_fee = 0;

  {
    cartItems.map((item, index) => {

      return deliver_fee += (item?.deliver_fee);

    })
  }

  console.log(deliver_fee)


  return (
    <>
      <Navbar />
      <main className="main__content_wrapper">
        {/* Start breadcrumb section */}
        <section className="breadcrumb__section breadcrumb__bg">
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="breadcrumb__content text-center">
                  <h1 className="breadcrumb__content--title text-white mb-25">
                    Shopping Cart
                  </h1>
                  <ul className="breadcrumb__content--menu d-flex justify-content-center">
                    <li className="breadcrumb__content--menu__items">
                      <a className="text-white" href="index.html">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb__content--menu__items">
                      <span className="text-white">Shopping Cart</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* cart section start */}
        <section className="cart__section section--padding">
          <div className="container-fluid">
            <div className="cart__section--inner">
              <form action="#">
                <h2 className="cart__title mb-40">Shopping Cart</h2>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="cart__table">
                      <table className="cart__table--inner">
                        <thead className="cart__table--header">
                          <tr className="cart__table--header__items">
                            <th className="cart__table--header__list">Product</th>
                            <th className="cart__table--header__list">Price</th>
                            <th className="cart__table--header__list">Add On</th>
                            <th className="cart__table--header__list">Quantity</th>
                            <th className="cart__table--header__list">Total</th>
                          </tr>
                        </thead>
                        <tbody className="cart__table--body">

                          {
                            cartItems && cartItems?.map((item) => {
                              return <ViewCartInner data={item} key={item.id} />
                            })
                          }



                        </tbody>
                      </table>
                      <div className="continue__shopping d-flex justify-content-between">
                        <a className="continue__shopping--link" href="/">
                          Continue shopping
                        </a>
                        <button className="continue__shopping--clear" type="submit">
                          Clear Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="cart__summary border-radius-10">
                      <div className="coupon__code mb-30">
                        <h3 className="coupon__code--title">Coupon</h3>
                        <p className="coupon__code--desc">
                          Enter your coupon code if you have one.
                        </p>
                        <div className="coupon__code--field d-flex">
                          <label>
                            <input
                              className="coupon__code--field__input border-radius-5"
                              placeholder="Coupon code"
                              type="text"
                            />
                          </label>
                          <button
                            className="coupon__code--field__btn primary__btn"
                            type="submit"
                          >
                            Apply Coupon
                          </button>
                        </div>
                      </div>
                      <div className="cart__note mb-20">
                        <h3 className="cart__note--title">Note</h3>
                        <p className="cart__note--desc">
                          Add special instructions for your seller...
                        </p>
                        <textarea
                          className="cart__note--textarea border-radius-5"
                          defaultValue={""}
                        />
                      </div>
                      <div className="cart__summary--total mb-20">
                        <table className="cart__summary--total__table">
                          <tbody>

                            {
                              countryData === 'INR' ? (<>
                                <tr className="cart__summary--total__list">
                                  <td className="cart__summary--total__title text-left">
                                    DELIVERY CHARGE
                                  </td>
                                  <td className="cart__summary--amount text-right">
                                    ₹ {deliver_fee}
                                  </td>
                                </tr>

                                <tr className="cart__summary--total__list">
                                  <td className="cart__summary--total__title text-left">
                                    SUBTOTAL
                                  </td>
                                  <td className="cart__summary--amount text-right">
                                    ₹ {totalPrice + addSizePrice + deliver_fee}
                                  </td>
                                </tr>
                              </>) : (<>
                                <tr className="cart__summary--total__list">
                                  <td className="cart__summary--total__title text-left">
                                    SUBTOTAL
                                  </td>
                                  <td className="cart__summary--amount text-right">
                                    $ {totalPrice + addSizePrice}
                                  </td>
                                </tr>



                              </>)
                            }

                          </tbody>
                        </table>
                      </div>
                      <div className="cart__summary--footer">
                        <p className="cart__summary--footer__desc">
                          Shipping &amp; taxes calculated at checkout
                        </p>
                        <ul className="d-flex justify-content-between">


                          <li>
                            <Link
                              className="cart__summary--footer__btn primary__btn checkout"
                              to={'/check-out'}

                            >
                              Check Out
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        {/* cart section end */}
        {/* Start product section */}

        {/* End product section */}
        {/* Start brand logo section */}

        {/* End brand logo section */}
        {/* Start shipping section */}
        <section className="shipping__section2 shipping__style3 section--padding">
          <div className="container">
            <div className="shipping__section2--inner shipping__style3--inner d-flex justify-content-between">
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping1.png" alt="" />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">Shipping</h2>
                  <p className="shipping__items2--content__desc">
                    From handpicked sellers
                  </p>
                </div>
              </div>
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping2.png" alt="" />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">Payment</h2>
                  <p className="shipping__items2--content__desc">
                    From handpicked sellers
                  </p>
                </div>
              </div>
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping3.png" alt="" />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">Return</h2>
                  <p className="shipping__items2--content__desc">
                    From handpicked sellers
                  </p>
                </div>
              </div>
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping4.png" alt="" />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">Support</h2>
                  <p className="shipping__items2--content__desc">
                    From handpicked sellers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End shipping section */}
      </main>

      <Footer />





    </>
  )
}

export default ViewCart