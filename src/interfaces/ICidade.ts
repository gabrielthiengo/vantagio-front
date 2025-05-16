import { IUnidadeFederacao } from './IUnidadeFederacao';

export interface ICidade {
  id: number;
  nome?: string;
  UnidadeFederacao: IUnidadeFederacao | null;
  createdAt: Date;
  updatedAt: Date;
}
