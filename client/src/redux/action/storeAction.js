import { START_SET_STORES, SET_STORES } from './actionTypes';

export const startSetStores = () => ({
  type: START_SET_STORES
})

export const setStores = (stores) => ({
  type: SET_STORES,
  stores
})