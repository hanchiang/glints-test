import {
  UPDATE_COLLECTION, ADD_TO_COLLECTION, DELETE_FROM_COLLECTION,
  START_UPDATE_COLLECTION, START_ADD_TO_COLLECTION, START_DELETE_FROM_COLLECTION
} from './actionTypes';

export const updateCollection = (id, name) => ({
  type: UPDATE_COLLECTION,
  id,
  name
})

export const startUpdateCollection = (id, name) => ({
  type: START_UPDATE_COLLECTION,
  id,
  name
})

export const addToCollection = (id, storeId) => ({
  type: ADD_TO_COLLECTION,
  id,
  store: storeId
})

export const startAddToCollection = (id, storeId) => ({
  type: START_ADD_TO_COLLECTION,
  id,
  store: storeId
})

export const deleteFromCollection = (id, storeId) => ({
  type: DELETE_FROM_COLLECTION,
  id,
  store: storeId
})

export const startDeleteFromCollection = (id, storeId) => ({
  type: START_DELETE_FROM_COLLECTION,
  id,
  store: storeId
})