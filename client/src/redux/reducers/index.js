import { combineReducers } from 'redux';
import auth from './auth';
import todo from './todo';
import tag from './tag';
import search from './search';
import pagination from './pagination';

export default combineReducers({
  auth,
  todo,
  tag,
  search,
  pagination
});
