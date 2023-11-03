import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/Action/loginAction';
import { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';



function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const user = useSelector((state) => state.userLogin);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");
        const storedRememberMe = localStorage.getItem("rememberMe");
        if (storedEmail && storedPassword && storedRememberMe) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleInputChange = (event) => {
        console.log(event);
        const target = event.target;
        const name = target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "rememberMe") {
            setRememberMe(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        // Perform login logic here
        const loginData = {
            email, password,
            name: "navneet"
        }
        // if (location.state && location.state.from === 'checkout') {
        //     navigate(-1); // Redirect to previous checkout page
        // } else {
        //     navigate('/'); // Redirect to home page
        // }
        dispatch(loginUser(loginData, navigate, location));
        // Redirect logic based on previous page
        // ...
        // If rememberMe is checked, store the email and password in local storage
        if (rememberMe) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("rememberMe", true);
        } else {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            localStorage.removeItem("rememberMe");
        }
    };






    return (
        <>
            <Navbar />
            <div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
            <main className="main__content_wrapper">
                {/* Start breadcrumb section */}
                <section className="breadcrumb__section breadcrumb__bg">
                    <div className="container">
                        <div className="row row-cols-1">
                            <div className="col">
                                <div className="breadcrumb__content text-center">
                                    <h1 className="breadcrumb__content--title text-white mb-25">
                                        Sign In
                                    </h1>
                                    <ul className="breadcrumb__content--menu d-flex justify-content-center">
                                        <li className="breadcrumb__content--menu__items">
                                            <a className="text-white" href="/">
                                                Home
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End breadcrumb section */}
                {/* Start login section  */}
                <div className="login__section section--padding">
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <div className="login__section--inner">
                                <div className="row row-cols-md-2 row-cols-1">
                                    <div className="col">
                                        <div className="account__login register">
                                            <div className="account__login--header mb-25">
                                            </div>
                                            <div className="account__login--inner loginPage">
                                                <div className='imgLogin'>
                                                    <img src="https://img.freepik.com/premium-vector/doctor-surgeon-concept_108855-4197.jpg?w=540" alt="" srcset="" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="account__login">
                                            <div className="account__login--header mb-25">
                                                <h2 className="account__login--header__title h3 mb-10">
                                                    Login
                                                </h2>
                                                <p className="account__login--header__desc">
                                                    Login if you area a returning customer.
                                                </p>
                                            </div>
                                            <div className="account__login--inner">

                                                <input
                                                    className="account__login--input"
                                                    placeholder="Email Addres"
                                                    name="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    className="account__login--input"
                                                    placeholder="Password"
                                                    name="password"
                                                    type="password"
                                                    value={password}
                                                    onChange={handleInputChange}
                                                />

                                                <div className="account__login--remember__forgot mb-15 d-flex justify-content-between align-items-center">
                                                    <div className="account__login--remember position__relative">
                                                        <input
                                                            className="checkout__checkbox--input"
                                                            id="check1"
                                                            type="checkbox"
                                                            name="rememberMe"
                                                            checked={rememberMe}
                                                            onChange={handleInputChange}
                                                        />

                                                        <span className="checkout__checkbox--checkmark" />
                                                        <label
                                                            className="checkout__checkbox--label login__remember--label"
                                                            htmlFor="check1"
                                                        >
                                                            Remember me
                                                        </label>
                                                    </div>
                                                    <button className="account__login--forgot" type="submit">
                                                        Forgot Your Password?
                                                    </button>
                                                </div>





                                                <button
                                                    className="account__login--btn primary__btn"
                                                    type="submit"
                                                >
                                                    Login
                                                </button>
                                                {/* <div className="account__login--divide">
                                                    <span className="account__login--divide__text">OR</span>
                                                </div>
                                                <div className="account__social d-flex justify-content-center mb-15">
                                                    <a
                                                        className="account__social--link facebook"
                                                        target="_blank"
                                                        href="https://www.facebook.com/"
                                                    >
                                                        Facebook
                                                    </a>
                                                    <a
                                                        className="account__social--link google"
                                                        target="_blank"
                                                        href="https://www.google.com/"
                                                    >
                                                        Google
                                                    </a>
                                                    <a
                                                        className="account__social--link twitter"
                                                        target="_blank"
                                                        href="https://twitter.com/"
                                                    >
                                                        Twitter
                                                    </a>
                                                </div> */}
                                                <p className="account__login--signup__text">
                                                    Don,t Have an Account?{" "}
                                                    <a href="/sign-up">Sign up now</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* End login section  */}
                {/* Start shipping section */}
                <section className="shipping__section2 shipping__style3 section--padding pt-0">
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

export default Login