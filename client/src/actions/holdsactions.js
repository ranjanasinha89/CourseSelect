import axios from "axios";
import { GET_USERS, USER_LOADING } from "./types";

export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get("/api/users")
    .then(res => {
      console.log("In Action holds: ", res);
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: {}
      })
    );
};

//Course Loading
export const setUsersLoading = () => {
  return {
    type: USER_LOADING
  };
};
