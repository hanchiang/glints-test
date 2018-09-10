import { combineReducers } from 'redux';

import storeReducer from './storeReducer';
import filterReducer from './filterReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  storeState: storeReducer,
  filterState: filterReducer,
  userState: userReducer
});

export default rootReducer;