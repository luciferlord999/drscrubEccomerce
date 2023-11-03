import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios';
import BassURl from '../Api/Api';


function Invoice() {
    const { order_id } = useParams();
    console.log(order_id);


    const [orderInvoice, setOrderInvoice] = useState('');
    useEffect(() => {

        axios.get(`${BassURl}/user/order-invoice/${order_id}`).then((res) => {
            setOrderInvoice(res.data.data)
        })

    }, []);
    console.log(orderInvoice?.order?.order_id);

    const handlePrint = () => {
        window.print();
    };



    return (
        <>
            {/* <Navbar /> */}

            <section className="theme-invoice-2">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-6 col-xl-8 mx-auto my-3">
                            <div className="invoice-wrapper" style={{ width: '700px' }}>
                                <div className="invoice-header">
                                    <div className="header-contain">
                                        <div className="header-left">
                                            <img src="/assets/img/drsrub.png" alt="" />
                                        </div>
                                        <div className="header-right">
                                            <h3>INVOICE</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="invoice-body">
                                    <div className="top-sec">
                                        <div className="address-detail">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="details-box">
                                                        <div className="address-box">
                                                            <ul>
                                                                <li>{orderInvoice?.order?.location}</li>
                                                                <li>{orderInvoice?.order?.locality}</li>
                                                                <li>{orderInvoice?.order?.address}</li>
                                                                <li>{orderInvoice?.order?.city} - {orderInvoice?.order?.zip}</li>

                                                                <li>{orderInvoice?.order?.state}</li>
                                                            </ul>
                                                        </div>
                                                        <div className="address-box">
                                                            <ul>
                                                                <li className="theme-color">
                                                                    Issue Date :{" "}
                                                                    <span className="text-content">{orderInvoice?.order?.date_time}</span>
                                                                </li>
                                                                <li className="theme-color">
                                                                    Invoice No :{" "}
                                                                    <span className="text-content">{orderInvoice?.order?.invoice_id}</span>
                                                                </li>
                                                                <li className="theme-color">
                                                                    Email :{" "}
                                                                    <span className="text-content">{orderInvoice?.order?.email}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="body-date">
                                        <ul>
                                            <li className="text-content">
                                                <span className="theme-color">Name :</span> {orderInvoice?.order?.first_name}  {orderInvoice?.order?.last_name}
                                            </li>
                                            <li className="text-content">
                                                <span className="theme-color">Mobile No. : </span> {orderInvoice?.order?.mobile}
                                            </li>
                                            <li className="text-content">
                                                <span className="theme-color">Order ID : </span> {orderInvoice?.order?.order_id}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="table-responsive table-borderless">
                                        <table className="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th className="text-start">Item detail</th>
                                                    <th>Qty</th>
                                                    <th>Price</th>
                                                    <th>Amout</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    orderInvoice?.order_item?.map((data, index) => {
                                                        return (<>
                                                            <tr>
                                                                <td className="text-content">{index + 1}</td>
                                                                <td>
                                                                    <ul className="table-details">
                                                                        <li className="text-title">
                                                                            {data?.product_name}
                                                                        </li>

                                                                    </ul>
                                                                </td>
                                                                <td>{data?.qty}</td>
                                                                <td>{data?.price}</td>
                                                                <td>{data?.total_price}</td>
                                                            </tr>


                                                        </>)
                                                    })
                                                }


                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan={5}>
                                                        <ul className="table-price">
                                                            <li>GRAND TOTAL</li>
                                                            <li className="theme-color">{orderInvoice?.order?.bill_amount}</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                <div className="invoice-footer pt-0">
                                    <div className="button-group">
                                        <ul>
                                            {/* <li>
                                                <button
                                                    className="btn theme-bg-color text-white rounded"
                                                    onclick="window.print();"
                                                >
                                                    Export As PDF
                                                </button>
                                            </li> */}
                                            <li>
                                                <button
                                                    className="btn text-white print-button rounded ms-2"
                                                    onClick={handlePrint}
                                                >
                                                    Print
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}

export default Invoice