import axios from "axios";
import { GET_FAID, FAID_LOADING, POST_FAID } from "./types";
import { DELETE_FAID } from "./types";

export const getFaidByUniId = university_id => dispatch => {
  // console.log("In get action for FInancial ID", university_id);
  dispatch(setFaidLoading());
  axios
    .get("/api/faid/" + university_id)
    .then(res => {
      dispatch({
        type: GET_FAID,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_FAID,
        payload: {}
      })
    );
};

export const postFaidByUniId = faidData => dispatch => {
  axios
    .post("/api/faid/", { faidData })
    .then(res => {
      dispatch({
        type: POST_FAID,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: POST_FAID,
        payload: {}
      })
    );
};

export const deleteByFaidId = (FaidId, university_id) => dispatch => {
  axios
    .delete("/api/faid/" + FaidId)
    .then(res => {
      dispatch({
        type: DELETE_FAID,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: DELETE_FAID,
        payload: {}
      })
    );
};

//Course Loading
export const setFaidLoading = () => {
  return {
    type: FAID_LOADING
  };
};
