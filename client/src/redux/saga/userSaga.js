import { call, put, select } from 'redux-saga/effects'
import _ from 'lodash';

import {
  loadingCollection, updatingCollection, createCollection, getCollection,
  addToCollection, deleteFromCollection,
  addUserError, removeUserError
} from '../action/userAction';
import Api from '../../api';
import { utils } from 'redux-saga';


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function* handleUserError(error) {
  yield put(addUserError(error.message))
  yield delay(4000);
  const err = yield select(state => state.userState.errors[0]);
  yield put(removeUserError(err.id));
}

function* handleCreateCollection(action) {
  try {
    const { name, store: storeId } = action;
    yield put(updatingCollection(true));
    const result = yield call(Api.createCollection, [name, storeId]);
    yield put(updatingCollection(false));

    const collection = result.data.data;
    const store = yield select(state => state.storeState.stores.find(store => store._id === storeId));
    collection.stores[0] = _.pick(store, '_id', 'name', 'slug');
    yield put(createCollection(collection));
  } catch (error) {
    yield put(updatingCollection(false));
    handleUserError(error);
  }
}

function* handleGetCollection(action) {
  try {
    yield put(loadingCollection(true));
    const result = yield call(Api.getCollection);
    yield put(loadingCollection(false));
    yield put(getCollection(result.data));
  } catch(error) {
    yield put(loadingCollection(false));
    handleUserError(error);
  }
}

function* handleAddToCollection(action) {
  const { id, store: storeId } = action;

  try {
    yield put(updatingCollection(true));
    const result = yield call(Api.addToCollection, [id, storeId]);
    yield put(updatingCollection(false));
    const store = yield select(state => state.storeState.stores.find(store => store._id === storeId))
    yield put(addToCollection(id, _.pick(store, '_id', 'name', 'slug')));
  } catch(error) {
    yield put(updatingCollection(false));
    handleUserError(error);
  }
}

function* handleDeleteFromCollection(action) {
  const { id, store: storeId } = action;
  try {
    yield put(updatingCollection(true));
    const result = yield call(Api.deleteFromCollection, [id, storeId]);
    yield put(updatingCollection(false));
    const store = yield select(state => state.storeState.stores.find(store => store._id === storeId));
    yield put(deleteFromCollection(id, _.pick(store, '_id', 'name', 'slug')));
  } catch (error) {
    yield put(updatingCollection(false));
    handleUserError(error);
  }
}

export {
  handleCreateCollection,
  handleGetCollection,
  handleAddToCollection,
  handleDeleteFromCollection
}