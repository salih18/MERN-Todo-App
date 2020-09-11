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
  TOGGLE_COMPLETE_ERROR,
  CLEAR_PROFILE
} from './../actions/types';

const initialState = {
  todos: [],
  todo: {},
  loading: false,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TODOS:
    case GET_TODO:
    case ADD_TODO:
    case DELETE_TODO:
    case UPDATE_TODO:
    case TOGGLE_COMPLETE_TODO:
      return {
        ...state,
        loading: true
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: payload,
        loading: false
      };
    case GET_TODO_SUCCESS:
      return {
        ...state,
        todo: payload,
        loading: false
      };
    case GET_TODOS_ERROR:
    case GET_TODO_ERROR:
    case ADD_TODO_ERROR:
    case DELETE_TODO_ERROR:
    case UPDATE_TODO_ERROR:
    case TOGGLE_COMPLETE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
        loading: false
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === payload._id ? { ...payload } : todo
        ),
        loading: false
      };
    case TOGGLE_COMPLETE_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === payload._id ? { ...todo, completed: payload.status } : todo
        ),
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        todos: [],
        todo: {},
        loading: false
      };

    default:
      return state;
  }
}
