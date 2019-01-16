import {
    GET_HOLDS,
    HOLDS_LOADING,
    POST_HOLDS,
    DELETE_HOLDS
  } from "../actions/types";
  
  const initialState = {
    holds: [
      {
        _id: null,
        University_ID: null,
        Holds_Comment: null
      }
    ],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case HOLDS_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_HOLDS:
        return {
          ...state,
          holds: action.payload,
          loading: false
        };
      case POST_HOLDS:
        return {
          ...state,
          holds: action.payload,
          loading: false
        };
      case DELETE_HOLDS:
        return {
          ...state,
          holds: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }
  