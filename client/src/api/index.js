import axios from 'axios';

import apiErrorTransform from '../transforms/apiErrorTransform';

function createApi() {
  const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    withCredentials: true
  })

  const getStores = () => api.get('/stores').catch(apiErrorTransform)

  return {
    getStores
  };
}

const Api = createApi();
export default Api;