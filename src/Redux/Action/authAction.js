import axios from "axios";
import BassURl from "../../Api/Api";
import { toast } from "react-hot-toast";
import { fectaddress } from "./addressAction";

// Define action creator function for registering a user

export const registerUser = (userSignup) => {
  return (dispatch) => {
    dispatch(registerRequest());

    axios
      .post(`${BassURl}/signup`, userSignup)
      .then((res) => {
        if (res.data.code === 200) {
          dispatch(registerSuccess(res.data));
          window.location.href = "/login";
          // sessionStorage.setItem("userData", res.data.data);
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((error) => {
        dispatch(registerFailure(error.message));
      });
  };
};

// Define action creator functions for registering request, success, and failure

export const registerRequest = () => ({
  type: "REGISTER_REQUEST",
});

export const registerSuccess = (userSignup) => ({
  type: "REGISTER_SUCCESS",
  payload: userSignup,
});

export const registerFailure = (error) => ({
  type: "REGISTER_FAILURE",
  payload: error,
});
