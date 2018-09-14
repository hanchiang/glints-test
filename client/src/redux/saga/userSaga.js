import { call, put, select } from 'redux-saga/effects'
import _ from 'lodash';

import {
  loadingCollection, updatingCollection, createCollection, getCollection,
  addToCollection, deleteFromCollection, updateCollection,
  addUserError, removeUserError, inviteUser, removeSuccessMessage
} from '../action/userAction';
import Api from '../../api';


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

    // pass newly created collection to reducer
    const collection = result.data.data;
    const store = yield select(state => state.storeState.stores.find(store => store._id === storeId));
    collection.stores[0] = _.pick(store, '_id', 'name', 'slug');
    yield put(createCollection(collection));
  } catch (error) {
    yield put(updatingCollection(false));
    yield handleUserError(error);
  }
}

function* handleGetCollection(action) {
  const { referrer } = action;

  try {
    yield put(loadingCollection(true));
    const result = yield call(Api.getCollection, referrer);
    yield put(loadingCollection(false));

    yield put(getCollection(result.data));
  } catch(error) {
    yield put(loadingCollection(false));
    yield handleUserError(error);
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
    yield handleUserError(error);
  }
}

function* handleDeleteFromCollection(action) {
  const { id, store: storeId } = action;
  try {
    yield put(updatingCollection(true));
    const result = yield call(Api.deleteFromCollection, [id, storeId]);
    yield put(updatingCollection(false));

    yield put(deleteFromCollection(id, storeId));
  } catch (error) {
    yield put(updatingCollection(false));
    yield handleUserError(error)
  }
}

function* handleUpdateCollection(action) {
  const { id, name } = action;
  try {
    yield put(updatingCollection(true));
    const result = yield call(Api.updateCollection, [id, name]);
    yield put(updatingCollection(false));

    yield put(updateCollection(id, name));
  } catch(error) {
    yield put(updatingCollection(false));
    yield handleUserError(error);
  }
}

function* handleInviteUser(action) {
  const { referrer, email } = action;
  try {
    yield put(updatingCollection(true));
    const result = yield call(Api.inviteUser, [referrer, email]);
    yield put(updatingCollection(false));

    yield put(inviteUser(referrer, `Successfully invited ${email}!`));
    const successMessage = yield select(state => state.userState.success[0]);
    yield delay(4000);
    yield put(removeSuccessMessage(successMessage.id))
  } catch(error) {
    yield put(updatingCollection(false));
    yield handleUserError(error);
  }
}

export {
  handleCreateCollection,
  handleGetCollection,
  handleAddToCollection,
  handleDeleteFromCollection,
  handleUpdateCollection,
  handleInviteUser
}