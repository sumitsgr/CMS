import Axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';
import { paths } from '../config/paths';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';

    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config; 
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (response) => {

    return response.data
  },
  
  (error) => {
    const message =
      error.response?.data?.message || error.message;

    alert(message);

    if (error.response?.status === 401) {
      const redirectTo = window.location.pathname;
      window.location.href =
        paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  }
);