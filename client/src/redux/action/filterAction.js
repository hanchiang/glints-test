import { SHOW_ALL, SET_FILTER } from './actionTypes';

export const showAll = () => ({
  type: SHOW_ALL
})

export const setFilter = (date) => ({
  type: SET_FILTER,
  date
})