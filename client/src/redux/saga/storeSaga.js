import { call, put, select } from 'redux-saga/effects'

import { setStores, setStoresLoading, addStoresError, removeStoresError } from '../action/storeAction';
import Api from '../../api';


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function* handleSetStores(action) {

  try {
    yield put(setStoresLoading(true));
    const { data: stores } = yield call(Api.getStores);
    yield put(setStores(stores));
    yield put(setStoresLoading(false));
  } catch(error) {
    yield put(setStoresLoading(false));
    yield put(addStoresError(error.message))
    yield delay(4000);
    const err = yield select(state => state.storeState.errors[0]);
    yield put(removeStoresError(err.id));
  }
}

export {
  handleSetStores
}