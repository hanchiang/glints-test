import { SET_FILTER, CLEAR_FILTER } from './actionTypes';

export const setFilter = (date) => ({
  type: SET_FILTER,
  date
})

export const clearFilter = () => ({
  type: CLEAR_FILTER
})