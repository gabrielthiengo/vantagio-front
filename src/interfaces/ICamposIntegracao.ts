import { IFuncionalidade } from './IFuncionalidade';

export interface ICamposIntegracao {
  id: number;
  campo: string;
  path: string;
  tenantId: number;
  funcionalidadeIntegracaoId: number;
  funcionalidade: IFuncionalidade;
  isExcluindo?: boolean;
}
