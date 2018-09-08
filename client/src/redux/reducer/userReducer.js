import { UPDATE_COLLECTION, ADD_TO_COLLECTION, DELETE_FROM_COLLECTION } from '../action/actionTypes';

function handleUpdateCollection(state, action) {
  const { id, name } = action;
  const collection = state.collections.find(col => col._id === id);
  collection.name = name;
  return {
    ...state,
    collections: {
      ...state.collections,
      ...collection
    }
  }
}

function handleAddToCollection(state, action) {
  const { id, store } = action;
  const collection = state.collections.find(col => col._id === id);
  collection.stores.push(store);
  return {
    ...state,
    collections: {
      ...state.collections,
      ...collection
    }
  }
}

function handleDeleteFromCollection(state, action) {
  const { id, store } = action;
  const collection = state.collections.find(col => col._id === id)
    .stores.filter(store => store !== store);
  return {
    ...state,
    collections: {
      ...state.collections,
      ...collection
    }
  }
}

export default function userReducer(state = null, action) {
  switch(action.type) {
    case UPDATE_COLLECTION:
      return handleUpdateCollection(state, action);
    case ADD_TO_COLLECTION:
      return handleAddToCollection(state, action);
    case DELETE_FROM_COLLECTION:
      return handleDeleteFromCollection(state, action);
    default:
      return state;
  }
}