import axios, { AxiosError } from 'axios';

import { baseURL, urls } from '../constants';
import { router } from '../router';
import { AuthService } from './AuthService';

const ApiService = axios.create({ baseURL });

ApiService.interceptors.request.use((request) => {
  const tokenAccess = AuthService.getAccessToken();
  if (tokenAccess) {
    request.headers.authorization = `Bearer ${tokenAccess}`;
  }
  return request;
});

let isRefreshing = false;

const waitList: IWaitList[] = [];
ApiService.interceptors.response.use(
  (responce) => {
    return responce;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await AuthService.refresh();
          isRefreshing = false;
          afterRefresh();
          return ApiService(originalRequest);
        } catch (e) {
          AuthService.deleteTokens();
          isRefreshing = false;
          router.navigate('/login?SessionExpired=true');
          return Promise.reject(error);
        }
      }
      if (originalRequest.url === urls.auth.refresh) {
        return Promise.reject(error);
      }

      return new Promise((resolve) => {
        subscribeToWaitList(() => resolve(ApiService(originalRequest)));
      });
    }

    return Promise.reject(error);
  },
);
type IWaitList = () => void;
const subscribeToWaitList = (cb: IWaitList): void => {
  waitList.push(cb);
};

const afterRefresh = (): void => {
  while (waitList.length) {
    const cb = waitList.pop();
    cb();
  }
};
export { ApiService };
