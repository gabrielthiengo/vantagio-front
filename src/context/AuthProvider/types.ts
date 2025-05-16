import { IResponse } from '@/interfaces/response';

type IUsuario = {
  nome: string;
  email: string;
  isMaster?: boolean;
};

export interface IUser {
  token?: string;
  usuario?: IUsuario;
  validade?: Date;
  empresa?: {
    id?: number;
    cnpj?: number;
    nome?: string;
    dominio?: string;
  };
}

export interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<IResponse>;
  logout: () => void;
}

export interface IAuthProvider {
  children: JSX.Element;
}
