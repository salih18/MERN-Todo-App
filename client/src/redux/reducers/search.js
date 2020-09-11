import {
  SET_SEARCH_TERM,
  LOCATION_CHANGED,
  SET_SEARCH,
  CLEAR_PROFILE
} from './../actions/types';

const initialState = {
  isActive: null,
  searchTerm: '',
  filtered: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SEARCH:
      return {
        ...state,
        filtered: payload.filtered
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        isActive: payload.term ? true : null,
        searchTerm: payload.term,
        filtered: payload.term ? state.filtered : []
      };
    case LOCATION_CHANGED:
      return initialState;
    case CLEAR_PROFILE:
      return {
        isActive: null,
        searchTerm: '',
        filtered: []
      };

    default:
      return state;
  }
}
