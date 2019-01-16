import axios from "axios";
import { GET_TODOS, TODO_LOADING, POST_TODO, DELETE_TODO } from "./types";

export const getToDoByUniId = university_id => dispatch => {
  dispatch(setTodoLoading());
  axios
    .get("/api/todo/" + university_id)
    .then(res => {
      dispatch({
        type: GET_TODOS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_TODOS,
        payload: {}
      })
    );
};

export const postToDoByUniId = todoData => dispatch => {
  axios
    .post("/api/todo/", { todoData })
    .then(res => {
      dispatch({
        type: POST_TODO,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: POST_TODO,
        payload: {}
      })
    );
};

export const deleteByToDoId = (ToDoId, university_id) => dispatch => {
  axios
    .delete("/api/todo/" + ToDoId)
    .then(res => {
      dispatch({
        type: DELETE_TODO,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: DELETE_TODO,
        payload: {}
      })
    );
};

//Course Loading
export const setTodoLoading = () => {
  return {
    type: TODO_LOADING
  };
};
