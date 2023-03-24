import types from "../types";
import backend from "../../api";

export const listTodos = () => async (dispatch, getState) => {
  try {
    dispatch({ type: types.FETCH_TODOS_REQUEST });
    const { data } = await backend.get("/task");
    dispatch({ type: types.FETCH_TODOS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: types.FETCH_TODOS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editTodo = (val) => async (dispatch) => {
  try {
    const { data } = await backend.put(`/task/${val.id}`, val);
    dispatch(listTodos());
  } catch (error) {}
};
export const deleteTodo = (val) => async (dispatch) => {
  try {
    await backend.delete(`/task/${val._id}`);
    dispatch(listTodos());
  } catch (error) {}
};

export const addTodo = (val) => async (dispatch) => {
  try {
    const { ...addObj } = val;
    await backend.post(`/task`, addObj);

    dispatch(listTodos());
  } catch (error) {}
};
