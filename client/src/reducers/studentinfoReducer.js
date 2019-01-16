import {
  GET_STUDENTINFO,
  STUDENTINFO_LOADING,
  GET_STUDENTINFO_BY_NAME,
  POST_COURSE_TO_CART,
  REMOVE_COURSE_FROM_CART,
  REMOVE_COURSE_FROM_STUDENT,
  GET_STUDENT_FOR_COURSE
} from "../actions/types";

const initialState = {
  studentinfo: [
    {
      id: null,
      name: null,
      major: null,
      type: null,
      studentid: null,
      gpa: null,
      coursesselected: [
        {
          name: null,
          coursenumber: null,
          instructor: null,
          description: null,
          location: null,
          schedule: null
        }
      ],
      coursesincart: [
        {
          name: null,
          coursenumber: null,
          instructor: null,
          description: null,
          location: null,
          schedule: null
        }
      ]
    }
  ],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STUDENTINFO_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_STUDENTINFO:
      return {
        ...state,
        studentinfo: action.payload,
        loading: false
      };
    case GET_STUDENTINFO_BY_NAME:
      return {
        ...state,
        studentinfo: action.payload,
        loading: false
      };
    case POST_COURSE_TO_CART:
      return {
        ...state,
        studentinfo: action.payload,
        loading: false
      };
    case REMOVE_COURSE_FROM_CART:
      return {
        ...state,
        studentinfo: action.payload,
        loading: false
      };
    case REMOVE_COURSE_FROM_STUDENT:
      return {
        ...state,
        studentinfo: action.payload,
        loading: false
      };
    case GET_STUDENT_FOR_COURSE:
      return {
        ...state,
        studentinfo: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
