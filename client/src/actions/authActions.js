import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/verify"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Verify User
export const verifyUser = (verifyingToken, history) => dispatch => {
  axios
    .post("/api/users/verify", verifyingToken)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Signin Google
export const oauthGoogle = data => dispatch => {
  axios
    .post("api/users/oauth/google", {
      access_token: data
    })
    .then(res => {
      // save to local storage

      const { token } = res.data;
      // set token to local storage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Login - Get User Token

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save to local storage

      const { token } = res.data;
      // set token to local storage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Logout functionality
export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Delete auth headher
  setAuthToken(false);
  // Set current user tp {} and isAuth to false
  dispatch(setCurrentUser({}));
};
