import axios from "axios";
import {
GET_TAGS,
GET_TAGS_SUCCESS,
GET_TAGS_ERROR
} from "./types";

// Get All Todos
export const getTags = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TAGS,
    });
    const res = await axios.get("/api/tags");

    dispatch({
      type: GET_TAGS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_TAGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

