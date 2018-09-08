import { combineReducers } from 'redux';

import storeReducer from './storeReducer';
import filterReducer from './filterReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  storeState: storeReducer,
  filterState: filterReducer,
  userState: userReducer,
  errorState: errorReducer
});

export default rootReducer;