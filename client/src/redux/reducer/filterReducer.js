import moment from 'moment';

import { SET_FILTER, CLEAR_FILTER } from '../action/actionTypes';

const initialState = {
  date: moment().startOf('day')
}
export default function filterReducer(state = initialState, action) {
  switch(action.type) {
    case SET_FILTER:
      return { date: action.date };
    case CLEAR_FILTER:
      return { date: null }
    default:
      return state;
  }
}