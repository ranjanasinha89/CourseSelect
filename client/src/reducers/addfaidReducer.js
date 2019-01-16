import {
  GET_FAID,
  FAID_LOADING,
  POST_FAID,
  DELETE_FAID
} from "../actions/types";

const initialState = {
  faid: [
    {
      _id: null,
      University_ID: null,
      Name: null,
      Faid: null
    }
  ],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FAID_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FAID:
      return {
        ...state,
        faid: action.payload,
        loading: false
      };
    case POST_FAID:
      return {
        ...state,
        faid: action.payload,
        loading: false
      };
    case DELETE_FAID:
      return {
        ...state,
        faid: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
