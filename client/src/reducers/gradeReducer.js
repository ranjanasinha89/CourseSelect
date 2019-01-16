import {
  GET_GRADE,
  GRADE_LOADING,
  POST_GRADE,
  GET_GRADE_FOR_STUDENT
} from "../actions/types";

const initialState = {
  grades: [
    {
      _id: null,
      studentid: null,
      coursenumber: null,
      grade: null
    }
  ],
  loading: false
};

export default function(state = initialState, action) {
  //   console.log("GradeReducer:", action);
  switch (action.type) {
    case GRADE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_GRADE:
      return {
        ...state,
        grades: action.payload,
        loading: false
      };
    case POST_GRADE:
      return {
        ...state,
        grades: action.payload,
        loading: false
      };
    case GET_GRADE_FOR_STUDENT:
      return {
        ...state,
        grades: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
