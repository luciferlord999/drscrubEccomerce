import React, { useEffect, useState } from "react";
import BannerSlider from "../components/BannerSlider";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../Redux/Action/authAction";


function SignupPage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const slides = [
    {
      title: "Slide 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/assets/img/banner/banner-1.webp",
    },
    {
      title: "Slide 2",
      description: "Pellentesque eget nunc eget lorem convallis ullamcorper.",
      image: "/assets/img/banner/banner-2.webp",
    },
  ];

  // using Distach and use selector

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSignup);

  // Signup Form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    isValidForm: false,
    errors: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      termsAccepted: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false); // add state for show/hide password
  const [showConfrimPassword, setConfrimPassword] = useState(false); // add state for show/hide confrim password




  // toggle show/hide password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfrimPassword = () => {
    setConfrimPassword(!showConfrimPassword);
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: fieldValue,
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  const validateForm = () => {
    // Regular expression for Indian phone number validation
    const phoneRegExp = /^((\+|0{0,2})91(\s|-)?)?[789]\d{9}$/;
    // Regular expression for password validation
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const {
      username,
      email,
      phoneNumber,
      password,
      confirmPassword,
      termsAccepted,
    } = formData;
    const errors = {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      termsAccepted: "",
    };
    let isValid = true;

    if (!username) {
      isValid = false;
      errors.username = "Username is required";
    }

    if (!email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
      errors.email = "Please enter a valid email address";
    }

    if (!phoneNumber) {
      isValid = false;
      errors.phoneNumber = "Phone Number is required";
    } else if (!phoneRegExp.test(phoneNumber)) {
      isValid = false;
      errors.phoneNumber = "Please enter a valid Indian phone number";
    }

    if (!password) {
      isValid = false;
      errors.password = "Password is required";
    } else if (!passwordRegExp.test(password)) {
      isValid = false;
      errors.password =
        "Password must contain at least 8 characters with at least one letter and one number";
    }

    if (!confirmPassword) {
      isValid = false;
      errors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      isValid = false;
      errors.confirmPassword = "Passwords do not match";
    }

    if (!termsAccepted) {
      isValid = false;
      errors.termsAccepted = "Please accept the terms and conditions";
    }

    setFormData((prevState) => ({
      ...prevState,
      isValidForm: isValid,
      errors: {
        ...prevState.errors,
        ...errors,
      },
    }));

    return isValid;
  };

  // Here i




  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setFormData((prevState) => ({ ...prevState, isValidForm: true }));
      console.log(formData);
      dispatch(registerUser(formData));


    }
  };

  const {
    username,
    email,
    phoneNumber,
    password,
    confirmPassword,
    termsAccepted,
    isValidForm,
    errors,
  } = formData;

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Navbar />

      <main className="main__content_wrapper">
        <section className="breadcrumb__section breadcrumb__bg">
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="breadcrumb__content text-center">
                  <h1 className="breadcrumb__content--title text-white mb-25">
                    Sign-Up
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="login__section section--padding">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="login__section--inner">
                <div className="row row-cols-md-2 row-cols-1">
                  <div className="col">
                    <div className="account__login">
                      <img
                        src="https://cdn.shopify.com/s/files/1/0088/5650/2335/files/6419-5419_CARI-6319-5319_TEAL_01_1_5833e140-d49b-437f-b3bb-4c78c0b1e03e_1080x.jpg?v=1677624384"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="account__login register">
                      <div className="account__login--header mb-25">
                        <h2 className="account__login--header__title h3 mb-10">
                          Create an Account
                        </h2>
                        <p className="account__login--header__desc">
                          Register here if you are a new customer
                        </p>
                      </div>
                      <div className="account__login--inner">
                        <input
                          className="account__login--input"
                          type="text"
                          name="username"
                          value={username}
                          onChange={handleChange}
                          placeholder="Username"
                        />

                        {errors.username && (
                          <p className="error">{errors.username}</p>
                        )}

                        <input
                          className="account__login--input"
                          type="text"
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          maxLength={10}
                          minLength={10}
                        />

                        {errors.phoneNumber && (
                          <p className="error">{errors.phoneNumber}</p>
                        )}
                        <input
                          className="account__login--input"
                          type="email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          placeholder="Email"
                        />

                        {errors.email && (
                          <p className="error">{errors.email}</p>
                        )}

                        <input
                          className="account__login--input"

                          type={showPassword ? 'text' : 'password'} // change input type based on showPassword state
                          value={password}
                          name="password"
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        <span className="showPassword" onClick={handleTogglePassword}>  {showPassword ? <img src="/assets/img/eye.svg" alt="" srcset="" /> : <img src="/assets/img/eyeclosed.svg" />}</span>


                        {errors.password && (
                          <p className="error">{errors.password}</p>
                        )}

                        <input
                          className="account__login--input"
                          type={showConfrimPassword ? 'text' : 'password'} // change input type based on showPassword state

                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                        />

                        <span className="showPassword" onClick={handleToggleConfrimPassword}>  {showConfrimPassword ? <img src="/assets/img/eye.svg" alt="" srcset="" /> : <img src="/assets/img/eyeclosed.svg" />}</span>

                        {errors.confirmPassword && (
                          <p className="error">{errors.confirmPassword}</p>
                        )}

                        <div className="account__login--remember position__relative mb-5">
                          <input
                            className="checkout__checkbox--input"
                            type="checkbox"
                            name="termsAccepted"
                            checked={termsAccepted}
                            onChange={handleChange}
                          />
                          <span className="checkout__checkbox--checkmark" />
                          <label
                            className="checkout__checkbox--label login__remember--label"
                            htmlFor="check2"
                          >
                            I have read and agree to the terms &amp;
                            conditions
                          </label>
                        </div>
                        {errors.termsAccepted && (
                          <p className="error">{errors.termsAccepted}</p>
                        )}

                        <button
                          className="account__login--btn primary__btn mb-10"
                          type="submit"
                        >
                          Submit &amp; Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <section className="shipping__section2 shipping__style3 section--padding pt-0">
          <div className="container">
            <div className="shipping__section2--inner shipping__style3--inner d-flex justify-content-between">
              <div className="shipping__items2 d-flex align-items-center">
                <div className="shipping__items2--icon">
                  <img src="assets/img/other/shipping1.png" alt="" />
                </div>
                <div className="shipping__items2--content">
                  <h2 className="shipping__items2--content__title h3">
                    Shipping
                  </h2>
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
                  <h2 className="shipping__items2--content__title h3">
                    Payment
                  </h2>
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
                  <h2 className="shipping__items2--content__title h3">
                    Return
                  </h2>
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
                  <h2 className="shipping__items2--content__title h3">
                    Support
                  </h2>
                  <p className="shipping__items2--content__desc">
                    From handpicked sellers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />



    </>
  );
}

export default SignupPage;
