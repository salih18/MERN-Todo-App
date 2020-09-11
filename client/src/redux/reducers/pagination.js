import {
  SET_PAGINATION_PAGE,
  SET_PAGINATION_ITEMS,
  SET_PAGINATION_SIZE,
  SET_PAGINATION_RESET,
  CLEAR_PROFILE
} from './../actions/types';

const initialState = {
  activePage: null,
  pageSize: 10,
  pageOfItems: [],
  pageReset: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PAGINATION_PAGE:
      return {
        ...state,
        activePage: payload
      };
    case SET_PAGINATION_ITEMS:
      return {
        ...state,
        pageOfItems: payload
      };

    case SET_PAGINATION_SIZE:
      return {
        ...state,
        pageSize: payload
      };
    case SET_PAGINATION_RESET:
      return {
        ...state,
        pageReset: payload
      };
    case CLEAR_PROFILE:
      return {
        activePage: null,
        pageSize: 10,
        pageOfItems: [],
        pageReset: true
      };
    default:
      return state;
  }
}
