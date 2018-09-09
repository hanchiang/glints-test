import { START_SET_STORES, SET_STORES, SET_STORES_LOADING } from './actionTypes';

export const startSetStores = () => ({
  type: START_SET_STORES
})

export const setStores = (stores) => ({
  type: SET_STORES,
  stores
})

export const setStoresLoading = (isLoading) => ({
  type: SET_STORES_LOADING,
  isLoading
})