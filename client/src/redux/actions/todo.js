import axios from 'axios';
import {
  GET_TODOS,
  GET_TODOS_SUCCESS,
  GET_TODOS_ERROR,
  GET_TODO,
  GET_TODO_SUCCESS,
  GET_TODO_ERROR,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
  TOGGLE_COMPLETE_TODO,
  TOGGLE_COMPLETE_SUCCESS,
  TOGGLE_COMPLETE_ERROR
} from './types';
import { toast } from 'react-toastify';
import { loadUser } from './auth';

// Get All Todos
export const getTodos = () => async (dispatch) => {
  try {
    dispatch(loadUser());
    dispatch({
      type: GET_TODOS
    });
    const res = await axios.get('/api/todos');

    dispatch({
      type: GET_TODOS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_TODOS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Todo
export const getTodo = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TODO
    });
    const res = await axios.get(`/api/todos/${id}`);

    dispatch({
      type: GET_TODO_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add todo
export const addTodo = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    dispatch({
      type: ADD_TODO
    });
    const res = await axios.post('/api/todos', formData, config);

    dispatch({
      type: ADD_TODO_SUCCESS,
      payload: res.data
    });

    toast.success('Todo added successfully');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    dispatch({
      type: ADD_TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete todo
export const deleteTodo = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_TODO
    });
    await axios.delete(`/api/todos/${id}`);

    dispatch({
      type: DELETE_TODO_SUCCESS,
      payload: id
    });

    toast.success('Todo deleted successfully');
  } catch (err) {
    dispatch({
      type: DELETE_TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Todo
export const updateTodo = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    dispatch({
      type: UPDATE_TODO
    });
    const res = await axios.put(`/api/todos/${id}`, formData, config);

    dispatch({
      type: UPDATE_TODO_SUCCESS,
      payload: res.data
    });

    toast.success('Todo updated successfully');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    dispatch({
      type: UPDATE_TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Complete or Uncomplete Todo
export const toggleCompleteTodo = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    dispatch({
      type: TOGGLE_COMPLETE_TODO
    });
    const res = await axios.put(`/api/todos/complete/${id}`, config);
    dispatch({
      type: TOGGLE_COMPLETE_SUCCESS,
      payload: { status: res.data, _id: id }
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    dispatch({
      type: TOGGLE_COMPLETE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
