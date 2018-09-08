import axios from 'axios';

import apiErrorTransform from '../transforms/apiErrorTransform';

export default function createApi() {
  const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
  })

  const getStores = () => api.get('/stores').catch(apiErrorTransform)

  return {
    getStores
  };
}