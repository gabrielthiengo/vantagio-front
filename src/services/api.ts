import { getUserLocalStorage } from '@/context/AuthProvider/util';
import axios from 'axios';

export const Api = axios.create({
  baseURL: process.env.URL_API_VANTAGIO,
});

Api.interceptors.request.use((config) => {
  const user = getUserLocalStorage();

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});
