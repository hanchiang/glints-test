import { SET_STORES, SET_STORES_LOADING } from '../action/actionTypes';

const initialstate = {
  stores: [],
  isLoading: false 
}

function setStores(state, action) {
  return { stores: action.stores, isLoading: false };
}

export default function storeReducer(state = initialstate, action) {
  switch(action.type) {
    case SET_STORES:
      return setStores(state, action);
    case SET_STORES_LOADING:
      return { ...state,  isLoading: action.isLoading }
    default:
      return state;
  }
}