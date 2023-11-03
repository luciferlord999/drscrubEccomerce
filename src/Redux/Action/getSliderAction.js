// const BassURl = `https://drscrubsadmin.digitalnawab.com/api`;
// export default BassURl;

import axios from "axios";
import BassURl from "../../Api/Api";
// async thunk to fetch slider
export const fetchslider = () => async (dispatch) => {
  try {
    // Dispatch an action to indicate the start of the API request
    dispatch({ type: "FETCH_SLIDER_REQUEST" });

    // Call the API service to fetch slider
    const slider = await axios.get(`${BassURl}/all-slider`).then((res) => {
      return res.data;
    });

    // Dispatch the success action with fetched data
    dispatch(fetchsliderSuccess(slider));
  } catch (error) {
    // Dispatch the failure action with error message
    dispatch(fetchsliderFailure(error.message));
  }
};

export const fetchsliderSuccess = (slider) => ({
  type: "FETCH_SLIDER_SUCCESS",
  payload: slider,
});

export const fetchsliderFailure = (error) => ({
  type: "FETCH_SLIDER_FAILURE",
  payload: error,
});


