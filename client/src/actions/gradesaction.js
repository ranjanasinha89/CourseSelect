import axios from "axios";
import {
  GET_GRADE,
  GRADE_LOADING,
  POST_GRADE,
  GET_GRADE_FOR_STUDENT
} from "./types";

export const getGrade = coursenumber => dispatch => {
  console.log("In getGrade: ", coursenumber);
  dispatch(setGradeLoading());
  axios
    .get("/api/grade/" + coursenumber)
    .then(res => {
      console.log("In Grade: ", res);
      dispatch({
        type: GET_GRADE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_GRADE,
        payload: {}
      })
    );
};

export const getGradeForStudent = studentid => dispatch => {
  console.log("In getGrade: ", studentid);
  dispatch(setGradeLoading());
  axios
    .get("/api/gradeforstudent/" + studentid)
    .then(res => {
      console.log("In Grade: ", res);
      dispatch({
        type: GET_GRADE_FOR_STUDENT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_GRADE_FOR_STUDENT,
        payload: {}
      })
    );
};

export const postGrade = gradeObj => dispatch => {
  console.log("Gradeobj: ", gradeObj);
  axios
    .post("/api/grade/", { gradeObj })
    .then(res => {
      dispatch({
        type: POST_GRADE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: POST_GRADE,
        payload: {}
      })
    );
};

//Course Loading
export const setGradeLoading = () => {
  return {
    type: GRADE_LOADING
  };
};
