import { StoresProps } from '@/store/userStores';
import { IUser } from './types';

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem('u', JSON.stringify(user));
}

export function getUserLocalStorage() {
  try {
    const json = localStorage.getItem('u');

    if (!json) {
      return null;
    }

    const user = JSON.parse(json);

    return user ?? null;
  } catch (err) {
    return null;
  }
}
