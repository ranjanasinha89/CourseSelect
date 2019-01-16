import axios from "axios";
import {
  GET_STUDENTINFO,
  STUDENTINFO_LOADING,
  POST_COURSE_TO_CART,
  REMOVE_COURSE_FROM_CART,
  REMOVE_COURSE_FROM_STUDENT,
  GET_STUDENT_FOR_COURSE
} from "./types";

//Get Courses
export const getStudentinfo = () => dispatch => {
  dispatch(setStudentInfoLoading());
  axios
    .get("/api/studentsinfo")
    .then(res =>
      dispatch({
        type: GET_STUDENTINFO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STUDENTINFO,
        payload: {}
      })
    );
};

export const getStudentsForCourses = coursenumber => dispatch => {
  dispatch(setStudentInfoLoading());
  axios
    .get("/api/studentforcourse/" + coursenumber)
    .then(res => {
      dispatch({
        type: GET_STUDENT_FOR_COURSE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_STUDENT_FOR_COURSE,
        payload: {}
      })
    );
};

export const postCourses = (username, courses) => dispatch => {
  console.log("Found post Courses: ", username);
  console.log("Also the courses: ", courses);
  axios.post("/api/postcoursestostudent/" + username, { courses });
};

//Get StudentInfo by name
export const getStudentInfoByName = username => dispatch => {
  console.log("In the action.");
  axios
    .get("/api/studentinfobyname/" + username)
    .then(res =>
      dispatch({
        type: GET_STUDENTINFO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STUDENTINFO,
        payload: {}
      })
    );
};

// Add course to cart
export const postCourseToCart = (studentid, course) => dispatch => {
  axios
    .post("/api/studentinfobyname/" + studentid, { course })
    .then(res =>
      dispatch({
        type: POST_COURSE_TO_CART,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: POST_COURSE_TO_CART,
        payload: {}
      })
    );
};

//Remove from cart
export const removeCourseFromCart = (studentid, course) => dispatch => {
  axios
    .delete("api/studentinfobyname/" + studentid, {
      data: { courseid: course._id, flag: "cart" }
    })
    .then(res =>
      dispatch({
        type: REMOVE_COURSE_FROM_CART,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: REMOVE_COURSE_FROM_CART,
        payload: {}
      })
    );
};

//Remove from profile
export const removeCourseFromStudent = (studentid, course) => dispatch => {
  axios
    .delete("api/studentinfobyname/" + studentid, {
      data: { courseid: course._id, flag: "profile" }
    })
    .then(res =>
      dispatch({
        type: REMOVE_COURSE_FROM_STUDENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: REMOVE_COURSE_FROM_STUDENT,
        payload: {}
      })
    );
};

//Swap Course
export const swapCourse = (studentid, course, swapcourseid) => dispatch => {
  axios.post("api/studentinfobyname/swapcourse/" + studentid, {
    course,
    swapcourseid
  });
};
//Course Loading
export const setStudentInfoLoading = () => {
  return {
    type: STUDENTINFO_LOADING
  };
};
