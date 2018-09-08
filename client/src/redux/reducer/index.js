import { combineReducers } from 'redux';

import storeReducer from './storeReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
  stores: storeReducer,
  filter: filterReducer
});

export default rootReducer;