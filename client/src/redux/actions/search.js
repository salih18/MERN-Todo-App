import { SET_SEARCH_TERM, LOCATION_CHANGED, SET_SEARCH } from './types';

export const setSearchTerm = (term) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_TERM,
    payload: { term }
  });
};

export const setLocationChanged = () => async (dispatch) => {
  dispatch({
    type: LOCATION_CHANGED
  });
};

export const setSearch = (term, data) => async (dispatch) => {
  const filtered = data.filter((todo) => {
    return todo.tags[0].name.toLowerCase().includes(term.toLowerCase());
  });

  dispatch({
    type: SET_SEARCH,
    payload: { filtered }
  });
};
