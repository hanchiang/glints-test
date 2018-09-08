import { SET_FILTER, SHOW_ALL } from '../action/actionTypes';

export default function filterReducer(state = SHOW_ALL, action) {
  switch(action.type) {
    case SET_FILTER:
      return { date: action.date };
    default:
      return state;
  }
}