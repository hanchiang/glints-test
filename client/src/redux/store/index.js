import { createStore } from 'redux';

import { SHOW_ALL } from '../action/actionTypes';
import rootReducer from '../reducer';

const initialState = {
  user: null,
  stores: [],
  filter: SHOW_ALL
}


const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;