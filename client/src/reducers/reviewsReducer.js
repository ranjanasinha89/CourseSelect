import {
    GET_REVIEWS,
    REVIEWS_LOADING,
    POST_REVIEWS,
    DELETE_REVIEWS
  } from "../actions/types";

  const initialState = {
    reviews: [
      {
        _id: null,
        studentname: null,
        Reviews_Comment: null,
        rating: null
      }
    ],
    loading: false
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case REVIEWS_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_REVIEWS:
        return {
          ...state,
          reviews: action.payload,
          loading: false
        };
      case POST_REVIEWS:
        return {
          ...state,
          reviews: action.payload,
          loading: false
        };
      case DELETE_REVIEWS:
        return {
          ...state,
          reviews: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }
