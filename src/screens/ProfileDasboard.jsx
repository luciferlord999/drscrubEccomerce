import React, { Suspense, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { fectaddress } from '../Redux/Action/addressAction';
import { useDispatch, useSelector } from 'react-redux';
import Addaddress from '../components/Modal/Addaddress';
import { fetchOrderById } from '../Redux/Action/GetOrderByClinetAction';
import OrderProductDetails from '../components/Modal/OrderProductDetails';
import axios from 'axios';
import BassURl from '../Api/Api';

function ProfileDasboard() {

    const userData = JSON.parse(sessionStorage.getItem("userData"));
    console.log(userData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fectaddress());
    }, [dispatch]);

    const addressData = useSelector((state) => state.userAddress);
    const { address, isAddressLoading, error } = addressData;

    console.log(address)
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

    // get user orderByID User Id 
    const Client_id = JSON.parse(localStorage.getItem('userData'));
    const userID = Client_id?.id;
    // console.log(userID)


    useEffect(() => {
        const data = 1;
        dispatch(fetchOrderById(userID));
    }, [dispatch]);

    const getOrderById = useSelector((state) => state.getorderbyclientbyid);
    const { orderByIdDetails, isOrderByIdDetailsLoading } = getOrderById;

    // console.log(orderByIdDetails)

    // open orderProductDetails
    const [orderDetailsProduct, setOrderDetailsProduct] = useState(false);
    useEffect(() => {
        if (orderDetailsProduct) {
            document.body.classList.add("mobile_menu_open");
        } else {
            document.body.classList.remove("mobile_menu_open");
        }
    }, [orderDetailsProduct]);

    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch(
                `${BassURl}/user/my-order/${userID}`
            );
            const data = await response.json();
            setOrders(data?.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Filter orders based on status
    const filteredOrders = orders.filter((order) => {
        if (filterStatus === "all") {
            return true;
        }
        return order.order_status === filterStatus;
    });

    // Filter orders based on search term
    const searchedOrders = filteredOrders.filter((order) => {
        if (searchTerm === "") {
            return true;
        }
        return order.order_id.toLowerCase().includes(searchTerm.toLowerCase());
    });
    console.log(orders)






    // console.log(orderbyClient)
    return (
        <>
            <Navbar />
            <section className="breadcrumb__section breadcrumb__about_bg">
                <div className="container">
                    <div className="row row-cols-1">
                        <div className="col">
                            <div className="breadcrumb__content text-center">
                                <h1 className="breadcrumb__content--title text-white mb-25">
                                    User Dashboard
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="user-dashboard-section section-b-space mt-5">
                <div className="container-fluid-lg">
                    <div className="row">
                        <div className="col-xxl-3 col-lg-3">
                            <div className="dashboard-left-sidebar">
                                <div className="close-button d-flex d-lg-none">
                                    <button className="close-sidebar">
                                        <i className="fa-solid fa-xmark" />
                                    </button>
                                </div>
                                <div className="profile-box">
                                    <div className="cover-image">
                                        <img
                                            src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/cover-img.jpg"
                                            className="img-fluid blur-up lazyloaded"
                                            alt=""
                                        />
                                    </div>
                                    <div className="profile-contain">
                                        <div className="profile-image">
                                            <div className="position-relative">
                                                <img
                                                    src="/assets/img/profile.jpg"
                                                    className="blur-up update_img lazyloaded"
                                                    alt=""
                                                />
                                                <div className="cover-icon">
                                                    <i className="fa-solid fa-pen">
                                                        <input type="file" onchange="readURL(this,0)" />
                                                    </i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profile-name">
                                            <h3>{userData?.name}</h3>
                                            <h6 className="text-content">{userData?.email}</h6>
                                        </div>
                                    </div>
                                </div>
                                <ul
                                    className="nav nav-pills user-nav-pills"
                                    id="pills-tab"
                                    role="tablist"
                                >
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-dashboard-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-dashboard"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-dashboard"
                                            aria-selected="false"
                                        >
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
                                                className="feather feather-home"
                                            >
                                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                                <polyline points="9 22 9 12 15 12 15 22" />
                                            </svg>
                                            DashBoard
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-order-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-order"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-order"
                                            aria-selected="false"
                                        >
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
                                                className="feather feather-shopping-bag"
                                            >
                                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                                <line x1={3} y1={6} x2={21} y2={6} />
                                                <path d="M16 10a4 4 0 0 1-8 0" />
                                            </svg>
                                            Order
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-wishlist-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-wishlist"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-wishlist"
                                            aria-selected="false"
                                        >
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
                                                className="feather feather-heart"
                                            >
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                            Wishlist
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-card-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-card"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-card"
                                            aria-selected="false"
                                        >
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
                                                className="feather feather-credit-card"
                                            >
                                                <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
                                                <line x1={1} y1={10} x2={23} y2={10} />
                                            </svg>{" "}
                                            Saved Card
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-address-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-address"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-address"
                                            aria-selected="false"
                                        >
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
                                                className="feather feather-map-pin"
                                            >
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx={12} cy={10} r={3} />
                                            </svg>
                                            Address
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active"
                                            id="pills-profile-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-profile"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-profile"
                                            aria-selected="true"
                                        >
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
                                            Profile
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-security-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-security"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-security"
                                            aria-selected="false"
                                        >
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
                                                className="feather feather-shield"
                                            >
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            </svg>
                                            Privacy
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xxl-9 col-lg-9">
                            <button className="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none">
                                Show Menu
                            </button>
                            <div className="dashboard-right-sidebar">
                                <div className="tab-content" id="pills-tabContent">
                                    <div
                                        className="tab-pane fade"
                                        id="pills-dashboard"
                                        role="tabpanel"
                                        aria-labelledby="pills-dashboard-tab"
                                    >
                                        <div className="dashboard-home">
                                            <div className="title">
                                                <h2>My Dashboard</h2>
                                                {/* <span className="title-leaf">
                                                    <svg className="icon-width bg-gray">
                                                        <use xlinkHref="../assets/svg/leaf.svg#leaf" />
                                                    </svg>
                                                </span> */}
                                            </div>
                                            <div className="dashboard-user-name">
                                                <h6 className="text-content">
                                                    Hello, <b className="text-title">{userData?.name}</b>
                                                </h6>
                                                <p className="text-content">
                                                    From your My Account Dashboard you have the ability to view
                                                    a snapshot of your recent account activity and update your
                                                    account information. Select a link below to view or edit
                                                    information.
                                                </p>
                                            </div>
                                            <div className="total-box">
                                                <div className="row g-sm-4 g-3">
                                                    <div className="col-xxl-6 col-lg-6 col-md-6 col-sm-6">
                                                        <div className="totle-contain">
                                                            <img
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg"
                                                                className="img-1 blur-up lazyloaded"
                                                                alt=""
                                                            />
                                                            <img
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg"
                                                                className="blur-up lazyloaded"
                                                                alt=""
                                                            />
                                                            <div className="totle-detail">
                                                                <h5>Total Order</h5>
                                                                <h3>3658</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-6 col-lg-6 col-md-6 col-sm-6">
                                                        <div className="totle-contain">
                                                            <img
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg"
                                                                className="img-1 blur-up lazyloaded"
                                                                alt=""
                                                            />
                                                            <img
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg"
                                                                className="blur-up lazyloaded"
                                                                alt=""
                                                            />
                                                            <div className="totle-detail">
                                                                <h5>Total Pending Order</h5>
                                                                <h3>254</h3>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="pills-wishlist"
                                        role="tabpanel"
                                        aria-labelledby="pills-wishlist-tab"
                                    >
                                        <div className="dashboard-wishlist">
                                            <div className="title">
                                                <h2>My Wishlist History</h2>
                                                <span className="title-leaf title-leaf-gray">
                                                    <svg className="icon-width bg-gray">
                                                        <use xlinkHref="../assets/svg/leaf.svg#leaf" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="pills-order"
                                        role="tabpanel"
                                        aria-labelledby="pills-order-tab"
                                    >
                                        <div className="dashboard-order">
                                            <div className="title">
                                                <h2>My Orders History</h2>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="card">

                                                        <div className="card-body">
                                                            <div
                                                                id="example_wrapper"
                                                                className="dataTables_wrapper dt-bootstrap5 no-footer"
                                                            >
                                                                <div className="row">
                                                                    <div className="product__view--mode d-flex align-items-center">
                                                                        <div className="col-6">

                                                                            <div className="product__view--mode__list product__short--by align-items-center d-none d-lg-flex">
                                                                                <label className="product__view--label">Sort By :</label>
                                                                                <div className="select shop__header--select">
                                                                                    <select
                                                                                        className="product__view--select"
                                                                                        value={filterStatus}
                                                                                        onChange={(e) => setFilterStatus(e.target.value)}
                                                                                    // value={sortBy}
                                                                                    // onChange={(e) => setSortBy(e.target.value)}
                                                                                    >
                                                                                        <option value="all">All</option>
                                                                                        <option value="new">New</option>
                                                                                        <option value="process">Process</option>
                                                                                        <option value="shipment">Shipment</option>
                                                                                        <option value="cancel">Cancel</option>
                                                                                        <option value="deliver">Delivery</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>




                                                                        </div>
                                                                        <div className="col-6">

                                                                            <div className="product__view--mode__list product__view--search d-none d-lg-block">
                                                                                <form className="product__view--search__form" action="#">
                                                                                    <label>
                                                                                        <input
                                                                                            className="product__view--search__input border-0"
                                                                                            type="text"
                                                                                            placeholder="Search by Order ID"
                                                                                            value={searchTerm}
                                                                                            onChange={(e) => setSearchTerm(e.target.value)}

                                                                                            style={{ border: " 2px solid #000 !important" }}
                                                                                        />
                                                                                    </label>
                                                                                    <button
                                                                                        className="product__view--search__btn"
                                                                                        aria-label="shop button"
                                                                                        type="submit"
                                                                                    >
                                                                                        <svg
                                                                                            className="product__view--search__btn--svg"
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
                                                                                    </button>
                                                                                </form>
                                                                            </div>



                                                                        </div>




                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-12">
                                                                        <table
                                                                            id="example"
                                                                            className="table table-bordered dt-responsive nowrap table-striped align-middle dataTable no-footer dtr-inline"
                                                                            style={{ width: "100%" }}
                                                                            aria-describedby="example_info"
                                                                        >
                                                                            <thead>
                                                                                <tr>

                                                                                    <th
                                                                                        data-ordering="false"
                                                                                        className="sorting"
                                                                                        tabIndex={0}
                                                                                        aria-controls="example"
                                                                                        rowSpan={1}
                                                                                        colSpan={1}
                                                                                        style={{ width: "54.4px" }}
                                                                                        aria-label="SR No.: activate to sort column ascending"
                                                                                    >
                                                                                        SR No.
                                                                                    </th>
                                                                                    <th
                                                                                        data-ordering="false"
                                                                                        className="sorting"
                                                                                        tabIndex={0}
                                                                                        aria-controls="example"
                                                                                        rowSpan={1}
                                                                                        colSpan={1}
                                                                                        style={{ width: "44.4px" }}
                                                                                        aria-label="ID: activate to sort column ascending"
                                                                                    >
                                                                                        ORDER ID
                                                                                    </th>

                                                                                    <th
                                                                                        data-ordering="false"
                                                                                        className="sorting"
                                                                                        tabIndex={0}
                                                                                        aria-controls="example"
                                                                                        rowSpan={1}
                                                                                        colSpan={1}
                                                                                        style={{ width: "312.4px" }}
                                                                                        aria-label="Title: activate to sort column ascending"
                                                                                    >
                                                                                        ADDRESS
                                                                                    </th>

                                                                                    <th
                                                                                        className="sorting"
                                                                                        tabIndex={0}
                                                                                        aria-controls="example"
                                                                                        rowSpan={1}
                                                                                        colSpan={1}
                                                                                        style={{ width: "100.4px" }}
                                                                                        aria-label="Assigned To: activate to sort column ascending"
                                                                                    >
                                                                                        ORDER STATUS
                                                                                    </th>
                                                                                    <th
                                                                                        className="sorting"
                                                                                        tabIndex={0}
                                                                                        aria-controls="example"
                                                                                        rowSpan={1}
                                                                                        colSpan={1}
                                                                                        style={{ width: "92.4px" }}
                                                                                        aria-label="Created By: activate to sort column ascending"
                                                                                    >
                                                                                        DATE
                                                                                    </th>
                                                                                    <th
                                                                                        className="sorting"
                                                                                        tabIndex={0}
                                                                                        aria-controls="example"
                                                                                        rowSpan={1}
                                                                                        colSpan={1}
                                                                                        style={{ width: "99.4px" }}
                                                                                        aria-label="Create Date: activate to sort column ascending"
                                                                                    >
                                                                                        ACTION
                                                                                    </th>

                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {

                                                                                    searchedOrders?.map((item, index) => {
                                                                                        return (<>
                                                                                            <tr className="odd">

                                                                                                <td className='text-center'>{index + 1}</td>

                                                                                                <td className="sorting_1 text-center">{item?.order_id}</td>
                                                                                                <td className='text-center'>
                                                                                                    {item?.locality}
                                                                                                </td>
                                                                                                {
                                                                                                    item?.order_status === 'new' ? (<>
                                                                                                        <td className='text-center'>
                                                                                                            <span className="p-2 badge bg-info">New Order</span>

                                                                                                            {/* <span className="percentage disable">new</span> */}
                                                                                                        </td>
                                                                                                    </>) : item?.order_staus === "process" ? (<>
                                                                                                        <td className='text-center'>  <span className="badge bg-yellow">Process</span> </td>
                                                                                                    </>) : item?.order_staus === "deliver" ? (<>

                                                                                                        <td className='text-center'>   <span className="badge bg-success">Delivery</span> </td>
                                                                                                    </>) : item?.order_status === 'shipments' ? (<>
                                                                                                        <td className='text-center'>


                                                                                                            <span className="p-2 badge bg-warning">Shipment Order</span>





                                                                                                        </td>
                                                                                                    </>) : item?.order_status === 'cancel' ? (<>
                                                                                                        <td className='text-center'>   <span className="badge bg-success">Delivery</span> </td>
                                                                                                    </>) : (<>
                                                                                                        <td className='text-center'>   <span className="badge bg-success">Delivery</span> </td>
                                                                                                    </>)
                                                                                                }
                                                                                                <td className='text-center'>{item?.date_time}</td>
                                                                                                {/* <td>{item?.}</td> */}
                                                                                                <td className='text-center'>

                                                                                                    <span className="badge badge-outline-info">
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                                                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                                                                        </svg>





                                                                                                    </span>







                                                                                                </td>

                                                                                            </tr>


                                                                                        </>)
                                                                                    })
                                                                                }


                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*end col*/}
                                            </div>


                                        </div>
                                    </div>

                                    <div
                                        className="tab-pane fade show "
                                        id="pills-address"
                                        role="tabpanel"
                                        aria-labelledby="pills-address-tab"
                                    >
                                        <div className="dashboard-address">
                                            <div className="title title-flex">
                                                <div>
                                                    <h2>My Address Book</h2>

                                                </div>
                                                <button
                                                    className="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#add-address"
                                                    onClick={add_Address}
                                                >
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
                                                        className="feather feather-plus me-2"
                                                    >
                                                        <line x1={12} y1={5} x2={12} y2={19} />
                                                        <line x1={5} y1={12} x2={19} y2={12} />
                                                    </svg>{" "}
                                                    Add New Address
                                                </button>
                                            </div>
                                            <div className="row g-sm-4 g-3">

                                                {
                                                    isAddressLoading ? (<>
                                                        <div className="loader1">
                                                            <div />
                                                            <div />
                                                            <div />
                                                            <div />
                                                            <div />
                                                            <div />
                                                            <div />
                                                            <div />
                                                        </div>



                                                    </>) : (<>

                                                        {
                                                            address && address?.map((data, index) => {
                                                                return (<>

                                                                    <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6 p-3">
                                                                        <div className="address-box">
                                                                            <div>
                                                                                <div className="form-check">
                                                                                    <input
                                                                                        className="form-check-input"
                                                                                        type="radio"
                                                                                        name="jack"
                                                                                        id="flexRadioDefault2"
                                                                                        defaultChecked=""
                                                                                    />
                                                                                </div>
                                                                                <div className="label">
                                                                                    <label>{data?.type}</label>
                                                                                </div>
                                                                                <div className="table-responsive address-table p-2">
                                                                                    <table className="table">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td colSpan={2}>{data?.locality}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>Address :</td>
                                                                                                <td>
                                                                                                    <p>{data?.address}</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>city:</td>
                                                                                                <td>{data?.city}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>Zip Code :</td>
                                                                                                <td>{data?.zip}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>Phone :</td>
                                                                                                <td>{userData?.mobile}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>Locality :</td>
                                                                                                <td>{data?.locality}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>State :</td>
                                                                                                <td>{data?.state}</td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                            <div className="button-group">
                                                                                <button
                                                                                    className="btn btn-sm add-button w-100"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#editProfile"
                                                                                >
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
                                                                                        className="feather feather-edit"
                                                                                    >
                                                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                                                    </svg>
                                                                                    Edit
                                                                                </button>
                                                                                <button
                                                                                    className="btn btn-sm add-button w-100"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#removeProfile"
                                                                                >
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
                                                                                        className="feather feather-trash-2"
                                                                                    >
                                                                                        <polyline points="3 6 5 6 21 6" />
                                                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                                        <line x1={10} y1={11} x2={10} y2={17} />
                                                                                        <line x1={14} y1={11} x2={14} y2={17} />
                                                                                    </svg>
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </>)
                                                            })
                                                        }









                                                    </>)
                                                }


                                            </div>
                                        </div>
                                    </div>


                                    <div
                                        className="tab-pane fade show"
                                        id="pills-card"
                                        role="tabpanel"
                                        aria-labelledby="pills-card-tab"
                                    >
                                        <div className="dashboard-card">
                                            <div className="title title-flex">
                                                <div>
                                                    <h2>My Card Details</h2>
                                                    <span className="title-leaf">
                                                        <svg className="icon-width bg-gray">
                                                            <use xlinkHref="../assets/svg/leaf.svg#leaf" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <button
                                                    className="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#editCard"
                                                >
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
                                                        className="feather feather-plus me-2"
                                                    >
                                                        <line x1={12} y1={5} x2={12} y2={19} />
                                                        <line x1={5} y1={12} x2={19} y2={12} />
                                                    </svg>{" "}
                                                    Add New Card
                                                </button>
                                            </div>
                                            <div className="row g-4">
                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                                                    <div className="payment-card-detail">
                                                        <div className="card-details">
                                                            <div className="card-number">
                                                                <h4>XXXX - XXXX - XXXX - 2548</h4>
                                                            </div>
                                                            <div className="valid-detail">
                                                                <div className="title">
                                                                    <span>valid</span>
                                                                    <span>thru</span>
                                                                </div>
                                                                <div className="date">
                                                                    <h3>08/05</h3>
                                                                </div>
                                                                <div className="primary">
                                                                    <span className="badge bg-pill badge-light">
                                                                        primary
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="name-detail">
                                                                <div className="name">
                                                                    <h5>Audrey Carol</h5>
                                                                </div>
                                                                <div className="card-img">
                                                                    <img
                                                                        src="../assets/images/payment-icon/1.jpg"
                                                                        className="img-fluid blur-up lazyloaded"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="edit-card">
                                                            <a
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#editCard"
                                                                href=""
                                                            >
                                                                <i className="far fa-edit" /> edit
                                                            </a>
                                                            <a
                                                                href=""
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#removeProfile"
                                                            >
                                                                <i className="far fa-minus-square" /> delete
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="edit-card-mobile">
                                                        <a
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#editCard"
                                                            href=""
                                                        >
                                                            <i className="far fa-edit" /> edit
                                                        </a>
                                                        <a href="">
                                                            <i className="far fa-minus-square" />
                                                            delete
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                                                    <div className="payment-card-detail">
                                                        <div className="card-details card-visa">
                                                            <div className="card-number">
                                                                <h4>XXXX - XXXX - XXXX - 1536</h4>
                                                            </div>
                                                            <div className="valid-detail">
                                                                <div className="title">
                                                                    <span>valid</span>
                                                                    <span>thru</span>
                                                                </div>
                                                                <div className="date">
                                                                    <h3>12/23</h3>
                                                                </div>
                                                                <div className="primary">
                                                                    <span className="badge bg-pill badge-light">
                                                                        primary
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="name-detail">
                                                                <div className="name">
                                                                    <h5>Leah Heather</h5>
                                                                </div>
                                                                <div className="card-img">
                                                                    <img
                                                                        src="../assets/images/payment-icon/2.jpg"
                                                                        className="img-fluid blur-up lazyloaded"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="edit-card">
                                                            <a
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#editCard"
                                                                href=""
                                                            >
                                                                <i className="far fa-edit" /> edit
                                                            </a>
                                                            <a
                                                                href=""
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#removeProfile"
                                                            >
                                                                <i className="far fa-minus-square" /> delete
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="edit-card-mobile">
                                                        <a
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#editCard"
                                                            href=""
                                                        >
                                                            <i className="far fa-edit" /> edit
                                                        </a>
                                                        <a href="">
                                                            <i className="far fa-minus-square" />
                                                            delete
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                                                    <div className="payment-card-detail">
                                                        <div className="card-details dabit-card">
                                                            <div className="card-number">
                                                                <h4>XXXX - XXXX - XXXX - 1366</h4>
                                                            </div>
                                                            <div className="valid-detail">
                                                                <div className="title">
                                                                    <span>valid</span>
                                                                    <span>thru</span>
                                                                </div>
                                                                <div className="date">
                                                                    <h3>05/21</h3>
                                                                </div>
                                                                <div className="primary">
                                                                    <span className="badge bg-pill badge-light">
                                                                        primary
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="name-detail">
                                                                <div className="name">
                                                                    <h5>mark jecno</h5>
                                                                </div>
                                                                <div className="card-img">
                                                                    <img
                                                                        src="../assets/images/payment-icon/3.jpg"
                                                                        className="img-fluid blur-up lazyloaded"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="edit-card">
                                                            <a
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#editCard"
                                                                href=""
                                                            >
                                                                <i className="far fa-edit" /> edit
                                                            </a>
                                                            <a
                                                                href=""
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#removeProfile"
                                                            >
                                                                <i className="far fa-minus-square" /> delete
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="edit-card-mobile">
                                                        <a
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#editCard"
                                                            href=""
                                                        >
                                                            <i className="far fa-edit" /> edit
                                                        </a>
                                                        <a href="">
                                                            <i className="far fa-minus-square" />
                                                            delete
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade show active"
                                        id="pills-profile"
                                        role="tabpanel"
                                        aria-labelledby="pills-profile-tab"
                                    >
                                        <div className="dashboard-profile">
                                            <div className="title">
                                                <h2>My Profile</h2>
                                                {/* <span className="title-leaf">
                                                    <svg className="icon-width bg-gray">
                                                        <use xlinkHref="../assets/svg/leaf.svg#leaf" />
                                                    </svg>
                                                </span> */}
                                            </div>
                                            <div className="profile-detail dashboard-bg-box">
                                                <div className="dashboard-title">
                                                    <h3>Profile Name</h3>
                                                </div>
                                                <div className="profile-name-detail">
                                                    <div className="d-sm-flex align-items-center d-block">
                                                        <h3>{userData?.name}</h3>

                                                    </div>
                                                    <a
                                                        href=""
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#editProfile"
                                                    >
                                                        Edit
                                                    </a>
                                                </div>
                                                <div className="location-profile">
                                                    <ul>
                                                        <li>
                                                            <div className="location-box">
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
                                                                    className="feather feather-map-pin"
                                                                >
                                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                                    <circle cx={12} cy={10} r={3} />
                                                                </svg>
                                                                <h6>Downers Grove, IL</h6>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="location-box">
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
                                                                    className="feather feather-mail"
                                                                >
                                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                                    <polyline points="22,6 12,13 2,6" />
                                                                </svg>
                                                                <h6>{userData?.email}</h6>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="location-box">
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
                                                                    className="feather feather-check-square"
                                                                >
                                                                    <polyline points="9 11 12 14 22 4" />
                                                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                                                </svg>
                                                                <h6>Licensed for 2 years</h6>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="profile-description">
                                                    <p>
                                                        Residences can be classified by and how they are connected
                                                        to neighbouring residences and land. Different types of
                                                        housing tenure can be used for the same physical type.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="profile-about dashboard-bg-box">
                                                <div className="row">
                                                    <div className="col-xxl-7">
                                                        <div className="dashboard-title mb-3">
                                                            <h3>Profile About</h3>
                                                        </div>
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <tbody>

                                                                    <tr>
                                                                        <td>Phone Number :</td>
                                                                        <td>
                                                                            <a href="">
                                                                                {userData?.mobile}
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Address :</td>
                                                                        <td>549 Sulphur Springs Road, Downers, IL</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="dashboard-title mb-3">
                                                            <h3>Login Details</h3>
                                                        </div>
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Email :</td>
                                                                        <td>
                                                                            <a href="">
                                                                                {userData?.email}
                                                                                <span
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#editProfile"
                                                                                >
                                                                                    Edit
                                                                                </span>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Password :</td>
                                                                        <td>
                                                                            <a href="">
                                                                                ●●●●●●
                                                                                <span
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#editProfile"
                                                                                >
                                                                                    Edit
                                                                                </span>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-5">
                                                        <div className="profile-image">
                                                            <img
                                                                src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/dashboard-profile.png"
                                                                className="img-fluid blur-up lazyloaded"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade show"
                                        id="pills-security"
                                        role="tabpanel"
                                        aria-labelledby="pills-security-tab"
                                    >
                                        <div className="dashboard-privacy">
                                            <div className="dashboard-bg-box">
                                                <div className="dashboard-title mb-4">
                                                    <h3>Privacy</h3>
                                                </div>
                                                <div className="privacy-box">
                                                    <div className="d-flex align-items-start">
                                                        <h6>Allows others to see my profile</h6>
                                                        <div className="form-check form-switch switch-radio ms-auto">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                role="switch"
                                                                id="redio"
                                                                aria-checked="false"
                                                            />
                                                            <label className="form-check-label" htmlFor="redio" />
                                                        </div>
                                                    </div>
                                                    <p className="text-content">
                                                        all peoples will be able to see my profile
                                                    </p>
                                                </div>
                                                <div className="privacy-box">
                                                    <div className="d-flex align-items-start">
                                                        <h6>
                                                            who has save this profile only that people see my
                                                            profile
                                                        </h6>
                                                        <div className="form-check form-switch switch-radio ms-auto">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                role="switch"
                                                                id="redio2"
                                                                aria-checked="false"
                                                            />
                                                            <label className="form-check-label" htmlFor="redio2" />
                                                        </div>
                                                    </div>
                                                    <p className="text-content">
                                                        all peoples will not be able to see my profile
                                                    </p>
                                                </div>
                                                <button className="btn theme-bg-color btn-md fw-bold mt-4 text-white">
                                                    Save Changes
                                                </button>
                                            </div>
                                            <div className="dashboard-bg-box mt-4">
                                                <div className="dashboard-title mb-4">
                                                    <h3>Account settings</h3>
                                                </div>
                                                <div className="privacy-box">
                                                    <div className="d-flex align-items-start">
                                                        <h6>Deleting Your Account Will Permanently</h6>
                                                        <div className="form-check form-switch switch-radio ms-auto">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                role="switch"
                                                                id="redio3"
                                                                aria-checked="false"
                                                            />
                                                            <label className="form-check-label" htmlFor="redio3" />
                                                        </div>
                                                    </div>
                                                    <p className="text-content">
                                                        Once your account is deleted, you will be logged out and
                                                        will be unable to log in back.
                                                    </p>
                                                </div>
                                                <div className="privacy-box">
                                                    <div className="d-flex align-items-start">
                                                        <h6>Deleting Your Account Will Temporary</h6>
                                                        <div className="form-check form-switch switch-radio ms-auto">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                role="switch"
                                                                id="redio4"
                                                                aria-checked="false"
                                                            />
                                                            <label className="form-check-label" htmlFor="redio4" />
                                                        </div>
                                                    </div>
                                                    <p className="text-content">
                                                        Once your account is deleted, you will be logged out and
                                                        you will be create new account
                                                    </p>
                                                </div>
                                                <button className="btn theme-bg-color btn-md fw-bold mt-4 text-white">
                                                    Delete My Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
            {orderDetailsProduct ? <OrderProductDetails hide={setOrderDetailsProduct} data={orderbyClient} /> : null}









        </>
    )
}

export default ProfileDasboard