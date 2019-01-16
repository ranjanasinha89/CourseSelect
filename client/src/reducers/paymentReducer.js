import {
SUBMIT_PAYMENT_FORM,
MODIFY_FINANCIAL_AID,
PAYMENT_LOADING,
POST_CART_TO_PAYMENT
} from "../actions/types";

const initialState = {
  paymentinfo: [
    {
      id: null,
      name: null,
      email: null,
      creditcardnumber: null,
      expirationmonthyear: null,
      ccv: null
    }
  ],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {

    case PAYMENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case MODIFY_FINANCIAL_AID:
      return {
        ...state,
        payment: action.payload,
        loading: false
      };
    case SUBMIT_PAYMENT_FORM:
      return {
        ...state,
        payment: action.payload,
        loading: false
      };
    case POST_CART_TO_PAYMENT:
      return {
        ...state,
        payment: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
