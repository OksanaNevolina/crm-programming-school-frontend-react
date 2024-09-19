import axios from 'axios';

import { baseURL } from '../constants';
import { AuthService } from './AuthService';

const ApiService = axios.create({ baseURL });

ApiService.interceptors.request.use((request) => {
  const tokenAccess = AuthService.getAccessToken();
  if (tokenAccess) {
    request.headers.authorization = `Bearer ${tokenAccess}`;
  }
  return request;
});
export { ApiService };
