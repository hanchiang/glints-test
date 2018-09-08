import { SET_STORES } from '../action/actionTypes';

export default function (state = [], action) {
  switch(action.type) {
    case SET_STORES:
      return stores;
    default:
      return state;
  }
}