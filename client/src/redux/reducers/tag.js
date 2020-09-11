import {
  GET_TAGS,
  GET_TAGS_SUCCESS,
  GET_TAGS_ERROR,
  CLEAR_PROFILE
} from '../actions/types';

const initialState = {
  tags: [],
  loading: false,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TAGS:
      return {
        ...state,
        loading: true
      };
    case GET_TAGS_SUCCESS:
      return {
        ...state,
        tags: payload,
        loading: false
      };
    case GET_TAGS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        tags: [],
        loading: false
      };

    default:
      return state;
  }
}
