import { SET_PAGINATION_PAGE, SET_PAGINATION_SIZE, SET_PAGINATION_ITEMS, SET_PAGINATION_RESET } from './types';

export const setPage = (page) => async (dispatch) => {
  dispatch({
    type: SET_PAGINATION_PAGE,
    payload: page
  });
};

export const setPageSize = (size) => async (dispatch) => {
  dispatch({
    type: SET_PAGINATION_SIZE,
    payload: size
  });
};

export const setPageItems = (size) => async (dispatch) => {
  dispatch({
    type: SET_PAGINATION_ITEMS,
    payload: size
  });
};

export const setPageReset = (bool) => async (dispatch) => {
  dispatch({
    type: SET_PAGINATION_RESET,
    payload: bool
  });
};
