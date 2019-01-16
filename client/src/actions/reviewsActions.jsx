import axios from "axios";
import {     GET_REVIEWS,  REVIEWS_LOADING,  POST_REVIEWS,  DELETE_REVIEWS } from "./types";

export const getReviewsByCourseNumber = coursenumber => dispatch => {
  console.log("Reviews search action: ", coursenumber);
  dispatch(setReviewsLoading());
  axios
    .get("/api/reviews/" + coursenumber)
    .then(res => {
      console.log("Reviews found: ", res);
      dispatch({
        type: GET_REVIEWS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_REVIEWS,
        payload: {}
      })
    );
};

export const postReviewsByCourseNumber = reviewsData => dispatch => {
  console.log("In AddReviews action: ", reviewsData);
  axios
    .post("/api/reviews/", { reviewsData })
    .then(res => {
      dispatch({
        type: POST_REVIEWS,
        payload: res.data
      });
    },    () =>{  console.log("postPayment function was Successful!"); }
  )
  .catch(err =>
      dispatch({
        type: POST_REVIEWS,
        payload: {}
      })  ,
    () =>{  console.log("postReviewsByCourseNumber function gave an Error"); }
    );
};

export const deleteReviewsByCourseNumber = (ReviewsId, coursenumber) => dispatch => {
  axios
    .delete("/api/reviews/" + ReviewsId)
    .then(res => {
      dispatch({
        type: DELETE_REVIEWS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: DELETE_REVIEWS,
        payload: {}
      })
    );
};

//Course Loading
export const setReviewsLoading = () => {
  return {
    type: REVIEWS_LOADING
  };
};
