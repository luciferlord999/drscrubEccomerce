import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import axios from 'axios';
import BassURl from '../../Api/Api';
import { toast } from 'react-hot-toast';



function Addaddress({ hide }) {

    function Hidden() {
        hide(false);
    }
    const sessionValue = JSON.parse(sessionStorage.getItem('userData'));


    const [formData, setFormData] = useState({
        city: "",
        state: "",
        country: "",
        zip: "",
        temp_mobile: "",
        locality: "",
        type: "",



    });
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            ...formData.name,
            [name]: value,

        });

        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${formData?.zip}`);
            const { city, state } = response.data;
            setCity(city);
            setState(state);
        } catch (error) {
            console.log(error);
        }
    }






    const saveAddress = () => {
        console.log(formData)
        let newAddress = {
            city: formData.city,
            state: formData.state,
            country: formData.country,
            zip: formData.zip,
            temp_mobile: formData.temp_mobile,
            locality: formData.locality,
            type: formData.type,
            client_id: sessionValue.id


        }
        axios.post(`${BassURl}/new-address`, newAddress).then((res) => {
            if (res.data.code === 200) {
                toast.success(res?.data?.msg)
                hide(false);
            }

        });

        // window.location.reload(true);

    }






    return (
        <>

            <motion.div
                initial={{ opacity: 0, y: 1 }}
                animate={{ opacity: 5, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="newsletter__popup newsletter__show"
                data-animation="slideInUp"
            >
                <div id="boxes" className="newsletter__popup--inner">
                    <button
                        className="newsletter__popup--close__btn"
                        aria-label="search close button"
                        onClick={Hidden}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={28}
                            height={28}
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
                    <div className="box newsletter__popup--box  align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-5">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14233.080924879716!2d80.95393665!3d26.894917599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1686141477972!5m2!1sen!2sin" width={300} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />


                                </div>
                                <div className="col-7">

                                    <div className="checkout__page--area">
                                        <div className="container">
                                            <div className="checkout__page--inner ">
                                                <main className="main__content_wrapper">
                                                    <form action="#">

                                                        <div className="checkout__content--step section__shipping--address">
                                                            <div className="section__header mb-25 text-center">
                                                                <h3 className="section__header--title">Add Address </h3>
                                                            </div>
                                                            <div className="section__shipping--address__content">
                                                                <div className="row">

                                                                    <div className="col-lg-6 mb-12">
                                                                        <div className="checkout__input--list">
                                                                            <label>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="type"
                                                                                    name='type'
                                                                                    value={formData.type}
                                                                                    onChange={handleInputChange}
                                                                                    type="text"
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 mb-12">
                                                                        <div className="checkout__input--list">
                                                                            <label>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="Mobile Number"
                                                                                    name='temp_mobile'
                                                                                    value={formData.temp_mobile}
                                                                                    onChange={handleInputChange}
                                                                                    type="text"
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 mb-12">
                                                                        <div className="checkout__input--list">
                                                                            <label>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="locality"
                                                                                    name='locality'
                                                                                    value={formData.locality}
                                                                                    onChange={handleInputChange}
                                                                                    type="text"
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6 mb-12">
                                                                        <div className="checkout__input--list">
                                                                            <label>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="zip"
                                                                                    name='zip'
                                                                                    value={formData.zip}
                                                                                    onChange={handleInputChange}
                                                                                    type="text"
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6 mb-12">
                                                                        <div className="checkout__input--list">
                                                                            <label>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="city "
                                                                                    name='city'
                                                                                    value={city}
                                                                                    onChange={handleInputChange}
                                                                                    type="text"
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-6 mb-12">
                                                                        <div className="checkout__input--list">
                                                                            <label>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="state"
                                                                                    name='state'
                                                                                    value={formData.state}
                                                                                    onChange={handleInputChange}
                                                                                    type="text"
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-6 mb-12">
                                                                        <div className="checkout__input--list ">
                                                                            <label>
                                                                                <input
                                                                                    className="checkout__input--field border-radius-5"
                                                                                    placeholder="country"
                                                                                    name='country'
                                                                                    value={formData.country}
                                                                                    onChange={handleInputChange}
                                                                                    type="text"
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                    </div>




                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="checkout__content--step__footer d-flex align-items-center p-2">
                                                            <a
                                                                className="continue__shipping--btn primary__btn border-radius-5"
                                                                onClick={saveAddress}

                                                            >
                                                                Submit
                                                            </a>

                                                        </div>
                                                    </form>
                                                </main>

                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>







        </>
    )
}

export default Addaddress