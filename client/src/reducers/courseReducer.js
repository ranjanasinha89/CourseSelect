import {
  GET_COURSES,
  COURSE_LOADING,
  GET_COURSE_BY_COURSENUMEBR,
  REMOVE_COURSE_BY_COURSE_NUMBER,
  GET_COURSE_BY_PROFESSOR
} from "../actions/types";

const initialState = {
  courses: [
    {
      id: null,
      name: null,
      coursenumber: null,
      instructor: null,
      description: null,
      location: null,
      schedule: null,
      officehours: null,
      date: null
    }
  ],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COURSE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    case GET_COURSE_BY_COURSENUMEBR:
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    case REMOVE_COURSE_BY_COURSE_NUMBER:
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    case GET_COURSE_BY_PROFESSOR:
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
