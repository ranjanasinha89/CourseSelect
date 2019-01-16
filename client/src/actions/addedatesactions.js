import axios from "axios";
import { GET_EDATES, EDATES_LOADING, POST_EDATES } from "./types";
import {DELETE_EDATES} from "./types";

export const getEdatesByUniId = university_id => dispatch => {
  dispatch(setedatesLoading());
  axios
    .get("/api/edates/" + university_id)
    .then(res => {
      dispatch({
        type: GET_EDATES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_EDATES,
        payload: {}
      })
    );
};

export const postEdatesByUniId = edatesData => dispatch => {
  axios
    .post("/api/edates/", { edatesData })
    .then(res => {
      dispatch({
        type: POST_EDATES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: POST_EDATES,
        payload: {}
      })
    );
};

export const deleteByEdatesId = (EdatesId, university_id) => dispatch => {
  axios
    .delete("/api/edates/" + EdatesId)
    .then(res => {
      dispatch({
        type: DELETE_EDATES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: DELETE_EDATES,
        payload: {}
      })
    );
};

//Course Loading
export const setedatesLoading = () => {
  return {
    type: EDATES_LOADING
  };
};
