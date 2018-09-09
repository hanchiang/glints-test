import { call, put, select } from 'redux-saga/effects'

import { addError, removeError } from '../action/errorAction';
import { setStores, setStoresLoading } from '../action/storeAction';
import Api from '../../api';


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function* handleSetStores(action) {
  try {
    const { data: stores } = yield call(Api.getStores);
    yield put(setStores(stores));
    yield put(setStoresLoading(false));
  } catch(error) {
    yield put(setStoresLoading(false));
    yield put(addError(error.message))
    console.log(error.message);
    yield delay(4000);
    const err = yield select(state => state.errorState[0]);
    yield put(removeError(err.id));
  }
}

export {
  handleSetStores
}