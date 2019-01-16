import { SET_CURRENT_USER, VERIFY_USER } from "../actions/types";
import isEmpty from "../validation/is_empty";
const initialState = {
  isAuthenticated: false,
  user: {},
  token: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VERIFY_USER:
      return {
        ...state,
        token: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
