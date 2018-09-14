import axios from 'axios';

import apiErrorTransform from '../transforms/apiErrorTransform';

function createApi() {
  const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    withCredentials: true
  })

  const getStores = () => api.get('/stores')
    .catch(apiErrorTransform);

  const createCollection = ([name, store]) => api.post('/users/collections', { name, store })
    .catch(apiErrorTransform);

  const getCollection = (referrer) => {
    return api.get('/users/collections', referrer && { params: { referrer } }).catch(apiErrorTransform);
  }

  const addToCollection = ([collectionId, storeId]) => api.patch('/users/collections', {
    _id: collectionId,
    store: storeId,
    operation: 'add'
  }).catch(apiErrorTransform);
  
  const deleteFromCollection = ([collectionId, storeId]) => api.patch('/users/collections', {
    _id: collectionId,
    store: storeId,
    operation: 'delete'
  }).catch(apiErrorTransform);

  const updateCollection = ([collectionId, name]) => api.patch('/users/collections', {
    _id: collectionId,
    name,
    operation: 'update'
  }).catch(apiErrorTransform);

  const inviteUser = ([referrer, email]) => api.post('/invite', {
    referrer,
    email
  }).catch(apiErrorTransform);

  return {
    getStores,
    createCollection,
    getCollection,
    addToCollection,
    deleteFromCollection,
    updateCollection,
    inviteUser
  };
}

const Api = createApi();
export default Api;