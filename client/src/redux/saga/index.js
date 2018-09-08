import { takeLatest, all } from 'redux-saga/effects'

// action
import { START_SET_STORES } from '../action/actionTypes';

// saga
import { handleSetStores } from './storeSaga';

export default function* rootSaga() {
  yield all([
    takeLatest(START_SET_STORES, handleSetStores)
  ])
}