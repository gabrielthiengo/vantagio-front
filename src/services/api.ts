import { getUserLocalStorage } from '@/context/AuthProvider/util';
import axios from 'axios';

export const Api = axios.create({
  baseURL: 'http://localhost:3333', // 'https://api-integracao-commerce-hub.onrender.com',
});

Api.interceptors.request.use((config) => {
  const user = getUserLocalStorage();

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});
