import {
  CREATE_COLLECTION, START_CREATE_COLLECTION, GET_COLLECTION, START_GET_COLLECTION,
  UPDATE_COLLECTION, ADD_TO_COLLECTION, DELETE_FROM_COLLECTION, START_UPDATE_COLLECTION,
  START_ADD_TO_COLLECTION, START_DELETE_FROM_COLLECTION, SET_USER_LOADING, SET_UPDATING_COLLECTION,
  ADD_USER_ERROR, REMOVE_USER_ERROR
} from './actionTypes';

export const createCollection = (collection) => ({
  type: CREATE_COLLECTION,
  collection
})

export const startCreateCollection = (name, storeId) => ({
  type: START_CREATE_COLLECTION,
  name,
  store: storeId
})

export const getCollection = (user) => ({
  type: GET_COLLECTION,
  user
})

export const startGetCollection = () => ({
  type: START_GET_COLLECTION
})

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

export const addToCollection = (id, store) => ({
  type: ADD_TO_COLLECTION,
  id,
  store
})

export const startAddToCollection = (id, storeId) => ({
  type: START_ADD_TO_COLLECTION,
  id,
  store: storeId
})

export const deleteFromCollection = (id, store) => ({
  type: DELETE_FROM_COLLECTION,
  id,
  store
})

export const startDeleteFromCollection = (id, storeId) => ({
  type: START_DELETE_FROM_COLLECTION,
  id,
  store: storeId
})

export const loadingCollection = (isLoading) => ({
  type: SET_USER_LOADING,
  isLoading
})

export const updatingCollection = (updatingCollection) => ({
  type: SET_UPDATING_COLLECTION,
  updatingCollection
})

export const addUserError = (error) => ({
  type: ADD_USER_ERROR,
  error
})

export const removeUserError = (id) => ({
  type: REMOVE_USER_ERROR,
  id
})