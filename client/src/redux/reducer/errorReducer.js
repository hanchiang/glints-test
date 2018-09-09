import { ADD_ERROR, REMOVE_ERROR } from '../action/actionTypes';

// {id: 1, message: 'oh no'}
export default function errorReducer(state = [], action) {
  switch(action.type) {
    case ADD_ERROR:
      return [...state, { id: state.length+1, message: action.error }];
    case REMOVE_ERROR:
      return state.filter(error => error.id !== action.id);
    default:
      return state;
  }
}