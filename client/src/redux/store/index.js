import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { SHOW_ALL } from '../action/actionTypes';
import rootReducer from '../reducer';
import rootSaga from '../saga';

const initialState = {
  user: null,
  stores: [],
  filter: SHOW_ALL
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga);

export default store;