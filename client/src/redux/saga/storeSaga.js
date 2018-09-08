import { call, put, select } from 'redux-saga/effects'

import { addError, removeError } from '../action/errorAction';
import { setStores } from '../action/storeAction';
import createApi from '../../api';
const Api = createApi();


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function* handleSetStores(action) {
  try {
    const { data: stores } = yield call(Api.getStores);
    yield put(setStores(stores));
  } catch(error) {
    yield put(addError(error.message))
    yield delay(4000);
    const err = yield select(state => state.errorState[0]);
    yield put(removeError(err.id));
  }
}

export {
  handleSetStores
}