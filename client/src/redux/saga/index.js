import { takeLatest, all } from 'redux-saga/effects'

// action
import {
  START_SET_STORES, START_CREATE_COLLECTION, START_GET_COLLECTION,
  START_ADD_TO_COLLECTION, START_DELETE_FROM_COLLECTION, START_UPDATE_COLLECTION,
  START_INVITE_USER
 }
 from '../action/actionTypes';

// saga
import { handleSetStores } from './storeSaga';
import {
  handleCreateCollection, handleGetCollection, handleAddToCollection,
  handleDeleteFromCollection, handleUpdateCollection, handleInviteUser
} from './userSaga';

export default function* rootSaga() {
  yield all([
    takeLatest(START_SET_STORES, handleSetStores),
    takeLatest(START_CREATE_COLLECTION, handleCreateCollection),
    takeLatest(START_GET_COLLECTION, handleGetCollection),
    takeLatest(START_ADD_TO_COLLECTION, handleAddToCollection),
    takeLatest(START_DELETE_FROM_COLLECTION, handleDeleteFromCollection),
    takeLatest(START_UPDATE_COLLECTION, handleUpdateCollection),
    takeLatest(START_INVITE_USER, handleInviteUser)
  ])
}