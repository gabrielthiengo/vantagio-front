import { ICidade } from './ICidade';

export interface IEmpresa {
  id: number;
  razaoSocial?: string;
  nomeFantasia: string;
  cnpj: string;
  dominio: string;
  sistema: string;
  apiKey?: string;
  apiSecret?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidadeId?: string;
  cidade?: ICidade | null;
  isAtivo: boolean;
}
