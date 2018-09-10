import {
  GET_COLLECTION,
  CREATE_COLLECTION, UPDATE_COLLECTION, ADD_TO_COLLECTION, DELETE_FROM_COLLECTION,
  SET_USER_LOADING, SET_UPDATING_COLLECTION,
  ADD_USER_ERROR, REMOVE_USER_ERROR
 }
 from '../action/actionTypes';

function handleCreateCollection(state, action) {
  const { collection } = action;
  return {
    ...state,
    collections: [...state.collections, collection]
  };
}

function handleGetCollection(state, action) {
  const { user } = action;
  return {
    ...state,
    ...user
  }
}

function handleUpdateCollection(state, action) {
  const { id, name } = action;
  const collection = state.collections.find(col => col._id === id);
  collection.name = name;

  return {
    ...state,
    collections: [
      ...state.collections,
      ...collection
    ]
  }
}

function handleAddToCollection(state, action) {
  const { id, store } = action;
  const updatedCollections = state.collections.map(col => {
    if (col._id !== id) {
      return col;
    } else {
      const newStores = [...col.stores, store];
      return {
        ...col,
        stores: newStores
      }
    }
  })

  return {
    ...state,
    collections: updatedCollections
  }
}

function handleDeleteFromCollection(state, action) {
  const { id, store } = action;
  const updatedCollections = state.collections.map(col => {
    if (col._id !== id) {
      return col;
    } else {
      const newStores = col.stores.filter(s => s._id !== store._id);
      return {
        ...col,
        stores: newStores
      }
    }
  })

  return {
    ...state,
    collections: updatedCollections
  }
}

function handleRemoveError(state, action) {
  const { id } = action;
  return state.errors.filter(error => error.id !== id);
}

const initialState = {
  collections: [],
  id: '',
  name: '',
  isLoading: false,
  updatingCollection: false,
  errors: [],
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_COLLECTION:
      return handleCreateCollection(state, action);
    case GET_COLLECTION:
      return handleGetCollection(state, action);
    case UPDATE_COLLECTION:
      return handleUpdateCollection(state, action);
    case ADD_TO_COLLECTION:
      return handleAddToCollection(state, action);
    case DELETE_FROM_COLLECTION:
      return handleDeleteFromCollection(state, action);
    case SET_USER_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SET_UPDATING_COLLECTION:
      return { ...state, updatingCollection: action.updatingCollection }
    case ADD_USER_ERROR:
      return { ...state, errors: [...state.errors, action.error] }
    case REMOVE_USER_ERROR:
      return handleRemoveError(state, action);
    default:
      return state;
  }
}