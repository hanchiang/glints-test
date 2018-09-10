import {
  START_SET_STORES, SET_STORES, SET_STORES_LOADING, ADD_STORES_ERROR,
  REMOVE_STORES_ERROR
} from './actionTypes';

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

export const addStoresError = (error) => ({
  type: ADD_STORES_ERROR,
  error
})

export const removeStoresError = (id) => ({
  type: REMOVE_STORES_ERROR,
  id
})