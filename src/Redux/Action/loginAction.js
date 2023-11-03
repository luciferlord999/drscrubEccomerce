import axios from "axios";
import BassURl from "../../Api/Api";
import { toast } from "react-hot-toast";
// Define action creator function for login a user

export const loginUser = (userLogin, navigate, location) => {
  console.log(location);
  return (dispatch) => {
    dispatch(loginRequest());

    dispatch(loginSuccess(userLogin));

    axios
      .post(`${BassURl}/login`, userLogin)
      .then((res) => {
        if (res.data.code === 200) {
          // Redirect logic based on previous page
          if (location.state && location.state.from === "check-out") {
            window.localStorage.setItem(
              "userData",
              JSON.stringify(res.data.data)
            );
            sessionStorage.setItem("userData", JSON.stringify(res.data.data));
            dispatch(loginSuccess(res.data));
            alert("hello");
            navigate(-1); // Redirect to previous checkout page
          } else {
            window.localStorage.setItem(
              "userData",
              JSON.stringify(res.data.data)
            );
            sessionStorage.setItem("userData", JSON.stringify(res.data.data));
            dispatch(loginSuccess(res.data));
            navigate("/"); // Redirect to home page
          }

          // setTimeout(() => {
          //   window.location.href = "/";
          // }, 1000);
        } else if (res.data.code === 400) {
          toast.error(res.data.msg);
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };
};

// Define action creator functions for login request, success, and failure

export const loginRequest = () => ({
  type: "LOGIN_REQUEST",
});

export const loginSuccess = (userLogin) => ({
  type: "LOGIN_SUCCESS",
  payload: userLogin,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
