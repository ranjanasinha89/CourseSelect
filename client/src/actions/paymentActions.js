import axios from "axios";
import {
  SUBMIT_PAYMENT_FORM,
  MODIFY_FINANCIAL_AID,
  PAYMENT_LOADING,
  POST_CART_TO_PAYMENT
} from "./types";

//Get Courses
export const postPayment = (email, paymentinfo) => dispatch => {
  axios
    .post("/api/payment" + email, { paymentinfo })
    .then(res =>
      dispatch({
        type: SUBMIT_PAYMENT_FORM,
        payload: res.data
      }) ,
    () =>{  console.log("postPayment function was Successful!"); }
    )
    .catch(err =>
      dispatch({
        type: SUBMIT_PAYMENT_FORM,
        payload: {}
      })  ,
    () =>{  console.log("postPayment function gave an Error"); }
    );
};


//Get Courses
export const getFinancialAid = (email) => dispatch => {
  dispatch(setPaymentLoading());
  axios
    .get("/api/payment")
    .then(res =>
      dispatch({
        type: MODIFY_FINANCIAL_AID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: MODIFY_FINANCIAL_AID,
        payload: {}
      })
    );
};

// Add course to cart
export const postCartToPayment = (email, paymentinfo ) => dispatch => {
  axios
    .post("/api/payment" + email, { paymentinfo })
    .then(res =>
      dispatch({
        type: POST_CART_TO_PAYMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: POST_CART_TO_PAYMENT,
        payload: {}
      })
    );
};


//Course Loading
export const setPaymentLoading = () => {
  return {
    type: PAYMENT_LOADING
  };
};
