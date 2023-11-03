import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { json } from "react-router-dom";
import { addToEmboidary } from "../../Redux/Action/AddEmboidaryAction";
import { useDispatch } from "react-redux";

function AddEmbroideryModal({ hide, data }) {
  function Hidden() {
    hide(false);
  }


  const dispatch = useDispatch();
  const countryData = JSON.parse(localStorage.getItem("currencyTop"));

  console.log(countryData)

  // check which aacordion is selected
  const [activeAccordion, setActiveAccordion] = useState(null);
  console.log(activeAccordion);

  const [namePlacements, setNamePlacements] = useState('');
  const [iconsPlacement, setIconsPlacement] = useState('');
  const [bothPlacement, setBothPlacement] = useState('');


  console.log(bothPlacement)

  const namePlacementsHandleChange = (event) => {
    setNamePlacements(event.target.value);
  };
  const iconsPlacementsHandleChange = (event) => {
    setIconsPlacement(event.target.value);
  };
  const bothPlacementsHandleChange = (event) => {
    setBothPlacement(event.target.value);
  };


  // form values & and funcationality

  const [formData, setFormData] = useState({

    pro_id: data?.data?.id,
    price: 250,
    type: 'Name',
    myname: "",
    secondLine: "",
    namePlacemnet: "Left Chest",
    color: "",
    font: "",

  });
  let iconPrice = 0
  const Iconprice = countryData === 'INR'  ? (<>{(iconPrice += 500)}</>) : (iconPrice += 7);
  let RupesPrice = 0;
  let Rupess = countryData === 'INR'   ? (RupesPrice += 250) : (RupesPrice += 4);
  console.log(Rupess)

  const [iconLogo, seticonLogo] = useState({
    pro_id: data?.data?.pro_id,
    type: 'logo',
    iconPlacement: "Right Chest",
    icon: "",
    price: Iconprice,
    upload: "",
  });

  const iconLogoHandleChange = () => {
    const { name, value } = event.target;
    seticonLogo({
      ...iconLogo,
      ...iconLogo.name,
      [name]: value,
      // iconLogo: {
      //   ...iconLogo.name,
      //   [name]: value,
      // },
    });
  };

  const iconLogoSave = (e) => {
    e.preventDefault();
    if (iconLogo?.icon != '') {
      if (countryData === 'INR') {
        const iconData = {
          pro_id: data?.data?.id,
          type: 'logo',
          iconPlacement: "Right Chest",
          icon: "",
          price: Rupess,
          upload: "",

        }
        console.log(iconData)
        dispatch(addToEmboidary(iconData));
        // localStorage.setItem('iconLogo', JSON.stringify(iconLogo));
        Hidden();

      } else {
        const iconData = {
          pro_id: data?.data?.id,
          type: 'logo',
          iconPlacement: "Right Chest",
          icon: "",
          price: Rupess,
          upload: "",

        }
        dispatch(addToEmboidary(iconData));
        // localStorage.setItem('iconLogo', JSON.stringify(iconLogo));
        Hidden();
      }

    }
    else {

      if (countryData === 'USD') {
        const iconData = {
          pro_id: data?.data?.id,
          type: 'logo',
          iconPlacement: "Right Chest",
          icon: "",
          price: Iconprice,
          upload: "",

        }
        dispatch(addToEmboidary(iconData));
        // localStorage.setItem('iconLogo', JSON.stringify(iconLogo));
        Hidden();

      } else {
        const iconData = {
          pro_id: data?.data?.id,
          type: 'logo',
          iconPlacement: "Right Chest",
          icon: "",
          price: Iconprice,
          upload: "",

        }
        dispatch(addToEmboidary(iconData));
        // localStorage.setItem('iconLogo', JSON.stringify(iconLogo));
        Hidden();
      }
    }

    // console.log(iconLogo);f


  };

  console.log(iconLogo);






  const [bothData, setbothData] = useState({
    pro_id: data?.data?.id,
    price: 700,
    type: 'Both',
    myname: "",
    secondLine: "",
    namePlacemnet: "Left Chest",
    colors: "",
    font: "",
    iconPlacement: "right chest",
    icons: "",
    uploads: "",
    imgs: ""
  });

  const bothHandleChange = (event) => {

    const { name, value } = event.target;
    setbothData({
      ...bothData,
      [name]: value,

      // iconLogo: {
      //   ...iconLogo.name,
      //   [name]: value,
      // },
    });
  };

  let bothiconPrice = 0
  const bothIconprice = countryData == 'INR' ? (
    bothiconPrice += 700

  ) : (bothiconPrice += 9);

  console.log(bothiconPrice)


  const bothDataSave = () => {

    let allData = {
      pro_id: data?.data?.id,
      type: 'Both',
      iconPlacement: "Right Chest",
      icon: iconLogo.icon,
      price: bothIconprice,
      upload: iconLogo.upload,
      myname: formData?.myname,
      secondLine: formData?.secondLine,
      namePlacemnet: "Left Chest",
      color: formData?.color,
      font: formData?.font
    }
    console.log(allData)

    dispatch(addToEmboidary(allData));
    // Hidden();
    // e.preventDefault();

    // localStorage.setItem('bothData', JSON.stringify(iconLogo));

  };



  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      ...formData.name,
      [name]: value,

    });

    // Update the nested state with the new value

    // } else {
    //   setFormData({
    //     ...formData,
    //     name: {
    //       ...formData.name,
    //       [name]: value,
    //     },
    //     iconLogo: {
    //       ...formData.name,
    //       [name]: value,
    //     },
    //     both: {
    //       // ...formData.name,
    //       // [name]: value,
    //     },
    //   });
    // }
  }

  console.log(formData);

  const saveData = (e) => {
    e.preventDefault();
    dispatch(addToEmboidary(formData));
    // localStorage.setItem('emboidery', JSON.stringify(formData));
    setTimeout(function () {
      Hidden();

    }, 1)
  };

  useEffect(() => {
    document
      .getElementById("customFile")
      .addEventListener("change", function (e) {
        var fileName = e.target.files[0].name;
        document.querySelector(".custom-file-label").innerText = fileName;
      });
  }, []);





  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 1 }}
        animate={{ opacity: 5, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="newsletter__popup newsletter__show"
        data-animation="slideInUp"
      >
        <div id="boxes" className="newsletter__popup--inner  addEmboidery">
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
          <div className="box newsletter__popup--box d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 text-center">
                  <h3
                    className="mt-3"
                    style={{ borderBottom: "1px solid black" }}
                  >
                    Add Your Custom
                  </h3>
                  <div className="position-relative w-100">

                    <img
                      className="mt-5"
                      src="/assets/img/scrub.png"
                      alt=""
                      style={{ background: `${data?.data?.color_code}` }}
                    />
                    <div className="position-absolute absolute-top">
                      <div className="row">
                        {
                          activeAccordion === 1 ? (<>
                            {
                              namePlacements == 2 ? (<>
                                <div className="col-6 text-left imge_changes ">
                                  <label className="fontSize" htmlFor="" style={{ color: `${formData?.color}` }}>{formData?.myname}</label>
                                  <label className="optionalSize" htmlFor="">{formData?.secondLine}</label>
                                </div>
                                <div className="col-6 text-left imge_changes">
                                </div>

                              </>) : namePlacements == 3 ? (<>
                                <div className="col-6 text-right imge_changes">
                                </div>
                                <div className="col-6 text-right imge_changes ">
                                  <label className="fontSize" htmlFor="" style={{ color: `${formData?.color}` }}>{formData?.myname}</label>
                                  <label className="optionalSize" htmlFor="">{formData?.secondLine}</label>
                                </div>

                              </>) : (<></>)
                            }

                          </>) : (activeAccordion === 2 ? (<>
                            {
                              iconsPlacement == 2 ? (<>

                                <div className="col-6 text-left imge_changes">
                                  {iconLogo?.icon != "" ? (<>
                                    <img src={iconLogo.icon} alt="" width={40} height={40} />
                                  </>) : (<>
                                  </>)}
                                </div>
                                <div className="col-6 text-left imge_changes">
                                </div>


                              </>) : iconsPlacement == 3 ? (<>
                                <div className="col-6 text-left imge_changes">
                                </div>
                                <div className="col-6 text-right imge_changes">
                                  {iconLogo?.icon != "" ? (<>
                                    <img src={iconLogo.icon} alt="" width={40} height={40} />
                                  </>) : (<>
                                  </>)}
                                </div>



                              </>) : (<></>)
                            }



                          </>) : (activeAccordion === 3 ? (<>
                            {
                              bothPlacement == 2 ? (<>
                                <div className="col-12 text-right imge_changes">
                                  <img src={iconLogo.icon} alt="" width={40} height={40} />
                                  <label className="fontSize" htmlFor="" style={{ color: `${bothData?.color}` }}>{bothData?.myname}</label>
                                  <label className="optionalSizes" htmlFor="">{bothData?.secondLine}</label>


                                </div>


                              </>) : bothPlacement == 3 ? (<>
                                <div className="col-12 text-left imge_changes">
                                  <img src={iconLogo.icon} alt="" width={40} height={40} />
                                  <label className="fontSize" htmlFor="" style={{ color: `${bothData?.color}` }}>{bothData?.myname}</label>
                                  <label className="optionalSizes" htmlFor="">{bothData?.secondLine}</label>
                                </div>







                              </>) : (<></>)
                            }


                          </>) : (<>
                          </>)))
                        }
                      </div>
                    </div>
                    <div className="position-absolute-shoulder">
                      {
                        activeAccordion === 1 ? (<>
                          {
                            namePlacements == 4 ? (<>

                              <div className="col-12 text-left imge_changes ">
                                <label className="fontSizes" htmlFor="" style={{ color: `${formData?.color}` }}>{formData?.myname}</label>
                                <label className="optionalSizes" htmlFor="">{formData?.secondLine}</label>
                              </div>
                            </>) : (<>
                            </>)
                          }
                        </>) : (<></>)

                      }
                    </div>
                    <div className="position-absolute-left-shoulder">
                      {
                        activeAccordion === 1 ? (<>
                          {
                            namePlacements == 5 ? (<>

                              <div className="col-12 text-left imge_changes ">
                                <label className="fontSizes" htmlFor="" style={{ color: `${formData?.color}` }}>{formData?.myname}</label>
                                <label className="optionalSizes" htmlFor="">{formData?.secondLine}</label>
                              </div>
                            </>) : (<>
                            </>)
                          }
                        </>) : (<></>)

                      }
                    </div>


                    <div className="position-absolute-icon-shoulder">
                      {
                        activeAccordion === 2 ? (<>
                          {
                            iconsPlacement == 4 ? (<>

                              <div className="col-12 text-left imge_changes">
                                {iconLogo?.icon != "" ? (<>
                                  <img src={iconLogo.icon} alt="" width={40} height={40} />
                                </>) : (<>
                                </>)}
                              </div>

                            </>) : (<>
                            </>)
                          }
                        </>) : (<></>)
                      }
                    </div>
                    <div className="position-absolute-icon-left-shoulder">
                      {
                        activeAccordion === 2 ? (<>
                          {
                            iconsPlacement == 5 ? (<>

                              <div className="col-12 text-left imge_changes">
                                {iconLogo?.icon != "" ? (<>
                                  <img src={iconLogo.icon} alt="" width={40} height={40} />
                                </>) : (<>
                                </>)}
                              </div>

                            </>) : (<>
                            </>)
                          }
                        </>) : (<></>)
                      }
                    </div>

                    <div className="position-absolute-text-icon-right-shoulder">
                      {
                        activeAccordion === 3 ? (<>
                          {
                            bothPlacement == 4 ? (<>

                              <div className="col-12 text-right imge_changes">
                                <img src={iconLogo.icon} alt="" width={40} height={40} />
                                <label className="fontSize" htmlFor="" style={{ color: `${bothData?.color}` }}>{bothData?.myname}</label>
                                <label className="optionalSizes" htmlFor="">{bothData?.secondLine}</label>
                              </div>


                            </>) : (<>
                            </>)
                          }
                        </>) : (<></>)
                      }
                    </div>
                    <div className="position-absolute-text-icon-left-shoulder">
                      {
                        activeAccordion === 3 ? (<>
                          {
                            bothPlacement == 5 ? (<>

                              <div className="col-12 text-right imge_changes">
                                <img src={iconLogo.icon} alt="" width={40} height={40} />
                                <label className="fontSize" htmlFor="" style={{ color: `${bothData?.color}` }}>{bothData?.myname}</label>
                                <label className="optionalSizes" htmlFor="">{bothData?.secondLine}</label>
                              </div>

                            </>) : (<>
                            </>)
                          }
                        </>) : (<></>)
                      }
                    </div>



                  </div>
                </div>
                <div className="col-lg-7 mt-5">
                  <div className="shop__sidebar--widget widget__area d-none d-lg-block">
                    <div className="single__widget widget__bg">
                      <h2 className="widget__title h3">Select </h2>

                      <div
                        className="accordion accordion-flush"
                        id="accordionFlushExample"
                      >
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="flush-headingOne"
                          >
                            <button
                              className="accordion-button collapsed position-relative"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                              onClick={() => setActiveAccordion(1)}
                            >
                              <span
                                className="float-left"
                                style={{ fontSize: "15px", fontWeight: "500" }}
                              >
                                MY NAME
                              </span>
                              <span
                                className="position-absolute"
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "500",
                                  right: "40px",
                                }}
                              >
                                RS.250.00
                              </span>
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body">
                              <div className="container">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <form
                                      onSubmit={saveData}
                                      className="contact__form--inner"
                                    >
                                      <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                          <div className="contact__form--list mb-20">
                                            <label
                                              className="contact__form--label"
                                              htmlFor="input1"
                                            >
                                              Name Placement
                                              <span className="contact__form--label__star">
                                                *
                                              </span>
                                            </label>
                                            <div className="header__search--widget header__sticky--none">
                                              <form className="header__search--form" action="#">
                                                <div className="header__select--categories select">
                                                  <select className="header__select--inner" value={namePlacements} onChange={namePlacementsHandleChange}>
                                                    <option selected="" value={1}>
                                                      Select Name Placement
                                                    </option>
                                                    <option value={2}>Right Chest</option>
                                                    <option value={3}>Left Chest </option>
                                                    <option value={4}>Right Shoulder </option>
                                                    <option value={5}>Left Shoulder </option>
                                                  </select>
                                                </div>
                                              </form>
                                            </div>

                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="contact__form--list mb-20">
                                            <label
                                              className="contact__form--label"
                                              htmlFor="input2"
                                            >
                                              MY NAME
                                              <span className="contact__form--label__star">
                                                *
                                              </span>
                                            </label>
                                            <input
                                              className="contact__form--input"
                                              name="myname"
                                              value={formData.myname}
                                              onChange={handleInputChange}
                                              id="input2"
                                              placeholder="Frist Line"
                                              type="text"
                                            />
                                            <input
                                              className="contact__form--input mt-2"
                                              name="secondLine"
                                              value={formData.secondLine}
                                              onChange={handleInputChange}
                                              id="input2"
                                              placeholder="Second Line (Optional)"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="contact__form--list mb-20">
                                            <label
                                              className="contact__form--label"
                                              htmlFor="input3"
                                            >
                                              Color
                                              <span className="contact__form--label__star">
                                                *
                                              </span>
                                            </label>
                                            <div className="product__variant--list mb-10">
                                              <fieldset className="variant__input--fieldset colorChoose">
                                                <input
                                                  id="color-red1"
                                                  name="color"
                                                  value="red"
                                                  checked={
                                                    formData.color ===
                                                    "red"
                                                  }
                                                  type="radio"
                                                  onChange={handleInputChange}
                                                  defaultChecked={false}
                                                />
                                                <label
                                                  className="variant__color--value red"
                                                  htmlFor="color-red1"
                                                  title="Red"
                                                  style={{ background: "red" }}
                                                ></label>
                                                <input
                                                  id="color-red2"
                                                  name="color"
                                                  value="black"
                                                  checked={
                                                    formData.color ===
                                                    "black"
                                                  }
                                                  type="radio"
                                                  onChange={handleInputChange}
                                                  defaultChecked={false}
                                                />
                                                <label
                                                  className="variant__color--value red"
                                                  htmlFor="color-red2"
                                                  title="Black"
                                                  style={{
                                                    background: "black",
                                                  }}
                                                ></label>
                                                <input
                                                  id="color-red3"
                                                  name="color"
                                                  value="#1c393d"
                                                  checked={
                                                    formData.color ===
                                                    "#1c393d"
                                                  }
                                                  type="radio"
                                                  onChange={handleInputChange}
                                                  defaultChecked={false}
                                                />

                                                <label
                                                  className="variant__color--value red"
                                                  htmlFor="color-red3"
                                                  title="Pink"
                                                  style={{
                                                    background: "#1c393d",
                                                  }}
                                                ></label>
                                                <input
                                                  id="color-red4"
                                                  name="color"
                                                  value="rgb(29 145 25)"
                                                  checked={
                                                    formData.color ===
                                                    "rgb(29 145 25)"
                                                  }
                                                  type="radio"
                                                  onChange={handleInputChange}
                                                  defaultChecked={false}
                                                />
                                                <label
                                                  className="variant__color--value red"
                                                  htmlFor="color-red4"
                                                  title="Orange"
                                                  style={{
                                                    background:
                                                      "rgb(29 145 25)",
                                                  }}
                                                ></label>
                                              </fieldset>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="contact__form--list mb-20">
                                            <label
                                              className="contact__form--label"
                                              htmlFor="input4"
                                            >
                                              FONT{" "}
                                              <span className="contact__form--label__star">
                                                *
                                              </span>
                                            </label>
                                            <div className="radio-tabs">
                                              <input
                                                type="radio"
                                                name="font"
                                                value={"block"}
                                                checked={
                                                  formData.font === "block"
                                                }
                                                onChange={handleInputChange}
                                                id="tab1"
                                                defaultChecked={false}
                                              />
                                              <label
                                                htmlFor="tab1"
                                                className=""
                                                style={{ margin: "10px" }}
                                              >
                                                Block
                                              </label>
                                              <input
                                                type="radio"
                                                name="font"
                                                id="tab2"
                                                value={"script"}
                                                defaultChecked={false}
                                                checked={
                                                  formData.font ===
                                                  "script"
                                                }
                                                onChange={handleInputChange}
                                              />
                                              <label htmlFor="tab2">
                                                <span>
                                                  {" "}
                                                  <i>Script</i>{" "}
                                                </span>
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <button
                                        className="contact__form--btn primary__btn"
                                        onClick={saveData}
                                      >
                                        ADD
                                      </button>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="flush-headingTwo"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseTwo"
                              aria-expanded="false"
                              aria-controls="flush-collapseTwo"
                              onClick={() => setActiveAccordion(2)}
                            >
                              <span
                                className="float-left"
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "500",
                                }}
                              >
                                {" "}
                                ICON/LOGO{" "}
                              </span>

                              <span
                                className="position-absolute"
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "500",
                                  right: "40px",
                                }}
                              >
                                RS.250.00 - RS.500.00
                              </span>
                            </button>
                          </h2>
                          <div
                            id="flush-collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingTwo"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body">
                              <div className="container">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <form
                                      onSubmit={iconLogoSave}
                                      className="contact__form--inner"
                                    >
                                      <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                          <div className="contact__form--list mb-20">
                                            <div className="header__search--widget header__sticky--none">
                                              <form className="header__search--form" action="#">
                                                <div className="header__select--categories select">
                                                  <select className="header__select--inner" value={iconsPlacement} onChange={iconsPlacementsHandleChange}>
                                                    <option selected="" value={1}>
                                                      Select Icons Placement
                                                    </option>
                                                    <option value={2}>Right Chest</option>
                                                    <option value={3}>Left Chest </option>
                                                    <option value={4}>Right Shoulder </option>
                                                    <option value={5}>Left Shoulder </option>
                                                  </select>
                                                </div>
                                              </form>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="contact__form--list mb-20">
                                            <label
                                              className="contact__form--label"
                                              htmlFor="input2"
                                            >
                                              ICON (RS. 250.00)
                                              <span className="contact__form--label__star">
                                                *
                                              </span>
                                            </label>

                                            <div className="row">
                                              <div className="col-lg-12">
                                                <ul className="cb_flex">
                                                  <li>
                                                    <input type="hidden" name="img" onChange={
                                                      iconLogoHandleChange
                                                    } value={'https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/scalpel_100x.png?v=129112810492729138041674194264'} />
                                                    <input
                                                      type="radio"
                                                      name="icon"
                                                      value="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/scalpel_100x.png?v=129112810492729138041674194264"
                                                      checked={
                                                        iconLogo
                                                          .icon === "scalpel"
                                                      }
                                                      onChange={
                                                        iconLogoHandleChange
                                                      }
                                                      defaultChecked={false}
                                                      id="cb1"
                                                    />
                                                    <label
                                                      htmlFor="cb1"
                                                      className="cb1"
                                                    >
                                                      <img src="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/scalpel_100x.png?v=129112810492729138041674194264" />
                                                    </label>
                                                  </li>
                                                  <li>
                                                    <input
                                                      type="radio"
                                                      name="icon"
                                                      value="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/new-caduceus_100x.png?v=49101863882549526131674194264"
                                                      checked={
                                                        iconLogo
                                                          .icon ===
                                                        "new caduceus"
                                                      }
                                                      onChange={
                                                        iconLogoHandleChange
                                                      }
                                                      defaultChecked={false}
                                                      id="cb2"
                                                    />
                                                    <label
                                                      htmlFor="cb2"
                                                      className="cb1"
                                                    >
                                                      <img src="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/new-caduceus_100x.png?v=49101863882549526131674194264" />
                                                    </label>
                                                  </li>
                                                  <li>
                                                    <input
                                                      type="radio"
                                                      name="icon"
                                                      value="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/heart_100x.png?v=159239876480726717301674194264"
                                                      checked={
                                                        iconLogo
                                                          .icon === "heart"
                                                      }
                                                      onChange={
                                                        iconLogoHandleChange
                                                      }
                                                      defaultChecked={false}
                                                      id="cb3"
                                                    />
                                                    <label
                                                      htmlFor="cb3"
                                                      className="cb1"
                                                    >
                                                      <img src="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/heart_100x.png?v=159239876480726717301674194264" />
                                                    </label>
                                                  </li>
                                                  <li>
                                                    <input
                                                      type="radio"
                                                      name="icon"
                                                      value="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/tooth_100x.png?v=44524661349645450621674194264"
                                                      checked={
                                                        iconLogo
                                                          .icon === "TOOTH"
                                                      }
                                                      onChange={
                                                        iconLogoHandleChange
                                                      }
                                                      defaultChecked={false}
                                                      id="cb4"
                                                    />
                                                    <label
                                                      htmlFor="cb4"
                                                      className="cb1"
                                                    >
                                                      <img src="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/tooth_100x.png?v=44524661349645450621674194264" />
                                                    </label>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="contact__form--list mb-20">
                                            <label
                                              className="contact__form--label"
                                              htmlFor="input2"
                                            >
                                              UPLOAD YOUR OWN LOGO (RS. 500.00)
                                              <span className="contact__form--label__star">
                                                *
                                              </span>
                                            </label>

                                            <div className="row">
                                              <div className="col-lg-12">
                                                <div className="custom-file">
                                                  <input
                                                    type="file"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                  />
                                                  <label
                                                    className="custom-file-label"
                                                    htmlFor="customFile"
                                                  >
                                                    Upload Your Logo
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <button
                                        className="contact__form--btn primary__btn"
                                        onClick={iconLogoSave}
                                      >
                                        ADD
                                      </button>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="flush-headingThree"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseThree"
                              aria-expanded="false"
                              aria-controls="flush-collapseThree"
                              onClick={() => setActiveAccordion(3)}
                            >
                              <span
                                className="float-left"
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "500",
                                }}
                              >
                                {" "}
                                Name And Icon (Both)
                              </span>

                              <span
                                className="position-absolute"
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "500",
                                  right: "40px",
                                }}
                              >
                                RS.450.00 - RS.700.00
                              </span>
                            </button>
                          </h2>
                          <div
                            id="flush-collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingThree"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body">
                              <div className="container">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <form
                                      onSubmit={bothDataSave}
                                      className="contact__form--inner"
                                    >
                                      <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                          <div className="contact__form--list mb-20">

                                            <div className="header__search--widget header__sticky--none">
                                              <label
                                                className="contact__form--label"
                                                htmlFor="input1"
                                              >
                                                Name & Icons Placement
                                                <span className="contact__form--label__star">
                                                  *
                                                </span>
                                              </label>
                                              <form className="header__search--form" action="#">
                                                <div className="header__select--categories select">

                                                  <select className="header__select--inner" value={bothPlacement} onChange={bothPlacementsHandleChange}>
                                                    <option selected="" value={1}>
                                                      Select Icons Placement
                                                    </option>
                                                    <option value={2}>Right Chest</option>
                                                    <option value={3}>Left Chest </option>
                                                    <option value={4}>Right Shoulder </option>
                                                    <option value={5}>Left Shoulder </option>
                                                  </select>
                                                </div>
                                              </form>
                                            </div>

                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="contact__form--list mb-20">
                                            <label
                                              className="contact__form--label"
                                              htmlFor="input2"
                                            >
                                              MY NAME
                                              <span className="contact__form--label__star">
                                                *
                                              </span>
                                            </label>
                                            <input
                                              className="contact__form--input"
                                              name="myname"
                                              value={bothData.myname}
                                              onChange={bothHandleChange}
                                              id="input2"
                                              placeholder="Frist Line"
                                              type="text"
                                            />
                                            <input
                                              className="contact__form--input mt-2"
                                              name="secondLine"
                                              value={bothData.secondLine}
                                              onChange={bothHandleChange}
                                              id="input2"
                                              placeholder="Second Line (Optional)"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        {/* <div className="col-lg-6 col-md-6">
                                          <div className="contact__form--list mb-20">
                                            <label
                                              className="contact__form--label"
                                              htmlFor="input3"
                                            >
                                              Color
                                              <span className="contact__form--label__star">
                                                *
                                              </span>
                                            </label>
                                            <div className="product__variant--list mb-10">
                                              <fieldset className="variant__input--fieldset colorChoose">
                                                <input
                                                  id="color-red1"
                                                  name="color"
                                                  value="red"
                                                  checked={
                                                    bothData.color ===
                                                    "red"
                                                  }
                                                  type="radio"
                                                  onChange={bothHandleChange}
                                                  defaultChecked={false}
                                                />
                                                <label
                                                  className="variant__color--value red"
                                                  htmlFor="color-red1"
                                                  title="Red"
                                                  style={{ background: "red" }}
                                                ></label>
                                                <input
                                                  id="color-red2"
                                                  name="color"
                                                  value="black"
                                                  checked={
                                                    bothData.color ===
                                                    "black"
                                                  }
                                                  type="radio"
                                                  onChange={bothHandleChange}
                                                  defaultChecked={false}
                                                />
                                                <label
                                                  className="variant__color--value red"
                                                  htmlFor="color-red2"
                                                  title="Black"
                                                  style={{
                                                    background: "black",
                                                  }}
                                                ></label>
                                                <input
                                                  id="color-red3"
                                                  name="color"
                                                  value="#1c393d"
                                                  checked={
                                                    bothData.color ===
                                                    "#1c393d"
                                                  }
                                                  type="radio"
                                                  onChange={bothHandleChange}
                                                  defaultChecked={false}
                                                />

                                                <label
                                                  className="variant__color--value red"
                                                  htmlFor="color-red3"
                                                  title="Pink"
                                                  style={{
                                                    background: "#1c393d",
                                                  }}
                                                ></label>
                                                <input
                                                  id="color-red4"
                                                  name="color"
                                                  value="rgb(186 167 211)"
                                                  checked={
                                                    bothData.color ===
                                                    "rgb(186 167 211)"
                                                  }
                                                  type="radio"
                                                  onChange={bothHandleChange}
                                                  defaultChecked={false}
                                                />
                                                <label
                                                  className="variant__color--value red"
                                                  htmlFor="color-red4"
                                                  title="Orange"
                                                  style={{
                                                    background:
                                                      "rgb(186 167 211)",
                                                  }}
                                                ></label>
                                              </fieldset>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                          <div className="contact__form--list mb-20">
                                            <label
                                              className="contact__form--label"
                                              htmlFor="input4"
                                            >
                                              FONT{" "}
                                              <span className="contact__form--label__star">
                                                *
                                              </span>
                                            </label>
                                            <div className="radio-tabs">
                                              <input
                                                type="radio"
                                                name="font"
                                                value={"block"}
                                                checked={
                                                  bothData.font === "block"
                                                }
                                                onChange={bothHandleChange}
                                                id="tab1"
                                                defaultChecked={false}
                                              />
                                              <label
                                                htmlFor="tab1"
                                                className=""
                                                style={{ margin: "10px" }}
                                              >
                                                Block
                                              </label>
                                              <input
                                                type="radio"
                                                name="font"
                                                id="tab2"
                                                value={"script"}
                                                defaultChecked={false}
                                                checked={
                                                  bothData.font ===
                                                  "script"
                                                }
                                                onChange={bothHandleChange}
                                              />
                                              <label htmlFor="tab2">
                                                <span>
                                                  {" "}
                                                  <i>Script</i>{" "}
                                                </span>
                                              </label>
                                            </div>
                                          </div>
                                        </div> */}
                                      </div>

                                      <div className="row">
                                        {/* <div className="col-lg-6 col-md-6">
                                          <div className="contact__form--list mb-20">
                                            <label
                                              className="contact__form--label"
                                              htmlFor="input1"
                                            >
                                              Icon Placement
                                              <span className="contact__form--label__star">
                                                *
                                              </span>
                                            </label>
                                            <input
                                              className="contact__form--input"
                                              name="firstname"
                                              id="input1"
                                              value={"Right Chest"}
                                              placeholder="Your First Name"
                                              disabled
                                              type="text"
                                            />
                                          </div>
                                        </div>*/}
                                        <div className="col-lg-12 col-md-6">
                                          <div className="contact__form--list mb-20">
                                            <label
                                              className="contact__form--label"
                                              htmlFor="input2"
                                            >
                                              ICON (RS. 250.00)
                                              <span className="contact__form--label__star">
                                                * {bothData?.icons}
                                              </span>
                                            </label>

                                            <div className="row">
                                              <div className="col-lg-12">
                                                <form
                                                  onSubmit={iconLogoSave}
                                                  className="contact__form--inner"
                                                >
                                                  <div className="row">

                                                    <div className="col-lg-12 col-md-6">
                                                      <div className="contact__form--list mb-20">


                                                        <div className="row">
                                                          <div className="col-lg-12">
                                                            <ul className="cb_flex">
                                                              <li>
                                                                <input type="hidden" name="img" onChange={
                                                                  iconLogoHandleChange
                                                                } value={'https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/scalpel_100x.png?v=129112810492729138041674194264'} />
                                                                <input
                                                                  type="radio"
                                                                  name="icon"
                                                                  value="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/scalpel_100x.png?v=129112810492729138041674194264"
                                                                  checked={
                                                                    iconLogo
                                                                      .icon === "scalpel"
                                                                  }
                                                                  onChange={
                                                                    iconLogoHandleChange
                                                                  }
                                                                  defaultChecked={false}
                                                                  id="cb1"
                                                                />
                                                                <label
                                                                  htmlFor="cb1"
                                                                  className="cb1"
                                                                >
                                                                  <img src="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/scalpel_100x.png?v=129112810492729138041674194264" />
                                                                </label>
                                                              </li>
                                                              <li>
                                                                <input
                                                                  type="radio"
                                                                  name="icon"
                                                                  value="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/new-caduceus_100x.png?v=49101863882549526131674194264"
                                                                  checked={
                                                                    iconLogo
                                                                      .icon ===
                                                                    "new caduceus"
                                                                  }
                                                                  onChange={
                                                                    iconLogoHandleChange
                                                                  }
                                                                  defaultChecked={false}
                                                                  id="cb2"
                                                                />
                                                                <label
                                                                  htmlFor="cb2"
                                                                  className="cb1"
                                                                >
                                                                  <img src="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/new-caduceus_100x.png?v=49101863882549526131674194264" />
                                                                </label>
                                                              </li>
                                                              <li>
                                                                <input
                                                                  type="radio"
                                                                  name="icon"
                                                                  value="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/heart_100x.png?v=159239876480726717301674194264"
                                                                  checked={
                                                                    iconLogo
                                                                      .icon === "heart"
                                                                  }
                                                                  onChange={
                                                                    iconLogoHandleChange
                                                                  }
                                                                  defaultChecked={false}
                                                                  id="cb3"
                                                                />
                                                                <label
                                                                  htmlFor="cb3"
                                                                  className="cb1"
                                                                >
                                                                  <img src="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/heart_100x.png?v=159239876480726717301674194264" />
                                                                </label>
                                                              </li>
                                                              <li>
                                                                <input
                                                                  type="radio"
                                                                  name="icon"
                                                                  value="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/tooth_100x.png?v=44524661349645450621674194264"
                                                                  checked={
                                                                    iconLogo
                                                                      .icon === "TOOTH"
                                                                  }
                                                                  onChange={
                                                                    iconLogoHandleChange
                                                                  }
                                                                  defaultChecked={false}
                                                                  id="cb4"
                                                                />
                                                                <label
                                                                  htmlFor="cb4"
                                                                  className="cb1"
                                                                >
                                                                  <img src="https://cdn.shopify.com/s/files/1/0562/9247/5063/t/80/assets/tooth_100x.png?v=44524661349645450621674194264" />
                                                                </label>
                                                              </li>
                                                            </ul>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                      <div className="contact__form--list mb-20">
                                                        <label
                                                          className="contact__form--label"
                                                          htmlFor="input2"
                                                        >
                                                          UPLOAD YOUR OWN LOGO (RS. 500.00)
                                                          <span className="contact__form--label__star">
                                                            *
                                                          </span>
                                                        </label>

                                                        <div className="row">
                                                          <div className="col-lg-12">
                                                            <div className="custom-file">
                                                              <input
                                                                type="file"
                                                                className="custom-file-input"
                                                                id="customFile"
                                                              />
                                                              <label
                                                                className="custom-file-label"
                                                                htmlFor="customFile"
                                                              >
                                                                Upload Your Logo
                                                              </label>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <button
                                                    className="contact__form--btn primary__btn"
                                                    onClick={iconLogoSave}
                                                  >
                                                    ADD
                                                  </button>
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                     
                                      </div>
                                      
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
  );
}

export default AddEmbroideryModal;
