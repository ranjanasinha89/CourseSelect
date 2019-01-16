import axios from "axios";
import { GET_HOLDS, HOLDS_LOADING, POST_HOLDS, DELETE_HOLDS } from "./types";

export const getHoldsByUniId = university_id => dispatch => {
  dispatch(setHoldsLoading());
  axios
    .get("/api/holds/" + university_id)
    .then(res => {
      dispatch({
        type: GET_HOLDS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_HOLDS,
        payload: {}
      })
    );
};

export const postHoldsByUniId = holdsData => dispatch => {
  console.log("In hold action: ", holdsData);
  axios
    .post("/api/holds/", { holdsData })
    .then(res => {
      dispatch({
        type: POST_HOLDS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: POST_HOLDS,
        payload: {}
      })
    );
};

export const deleteByHoldsId = (HoldsId, university_id) => dispatch => {
  axios
    .delete("/api/holds/" + HoldsId)
    .then(res => {
      dispatch({
        type: DELETE_HOLDS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: DELETE_HOLDS,
        payload: {}
      })
    );
};

//Course Loading
export const setHoldsLoading = () => {
  return {
    type: HOLDS_LOADING
  };
};
