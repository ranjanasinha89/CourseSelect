import {
    GET_EDATES,
    EDATES_LOADING,
    POST_EDATES,
    DELETE_EDATES
  } from "../actions/types";
  
  const initialState = {
    edates: [
      {
        _id: null,
        University_ID: null,
        edates: null
      }
    ],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case EDATES_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_EDATES:
        return {
          ...state,
          edates: action.payload,
          loading: false
        };
      case POST_EDATES:
        return {
          ...state,
          edates: action.payload,
          loading: false
        };
      case DELETE_EDATES:
        return {
          ...state,
          edates: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }
  