import { getUserLocalStorage } from '@/context/AuthProvider/util';
import axios from 'axios';

export const Api = axios.create({
  baseURL: import.meta.env.VITE_URL_API_VANTAGIO ?? 'https://vantagio-api.onrender.com',
});

Api.interceptors.request.use((config) => {
  const user = getUserLocalStorage();

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});
