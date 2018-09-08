import { SET_STORES } from '../action/actionTypes';
import { handleSetStores } from '../saga/storeSaga';

function handleSetStores(state, action) {
  return { stores: action.stores, isLoading: false };
}

export default function storeReducer(state = { stores:[], isLoading: false }, action) {
  switch(action.type) {
    case SET_STORES:
      return handleSetStores(state, action);
    default:
      return state;
  }
}