import { createContext, useEffect, useState } from 'react';
import { IAuthProvider, IContext, IUser } from './types';
import { getUserLocalStorage, setUserLocalStorage } from './util';
import AuthController from '@/controllers/AuthController';
import { IResponse } from '@/interfaces/response';
import { useUserStores } from '@/store/userStores';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();
  const {
    actions: {},
  } = useUserStores();

  useEffect(() => {
    const user = getUserLocalStorage();
    user && setUser(user);
  }, []);

  async function authenticate(email: string, password: string): Promise<IResponse> {
    const { type, message, response } = await AuthController.loginRequest(email, password);

    if (type === 'error') {
      return {
        message,
        type,
      };
    }

    const payload = {
      token: response?.token,
      validade: response?.validade,
      empresa: response?.empresa,
      usuario: response?.usuario,
    };

    setUser(payload);
    setUserLocalStorage(payload);

    return {
      message,
      type,
    };
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return <AuthContext.Provider value={{ ...user, authenticate, logout }}>{children}</AuthContext.Provider>;
};
