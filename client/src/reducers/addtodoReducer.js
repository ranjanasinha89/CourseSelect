import {
  GET_TODOS,
  TODO_LOADING,
  POST_TODO,
  DELETE_TODO
} from "../actions/types";

const initialState = {
  todos: [
    {
      _id: null,
      University_ID: null,
      Todo_Comment: null
    }
  ],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TODO_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false
      };
    case POST_TODO:
      return {
        ...state,
        todos: action.payload,
        loading: false
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
