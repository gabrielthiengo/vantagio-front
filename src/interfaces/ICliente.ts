import { IPedido } from './IPedido';
import { IPessoa } from './IPessoa';

export interface ICliente {
  id: number;
  tenantId: number;
  pessoaId: number;
  email?: string | null;
  telefone?: string | null;
  clienteExternoId: number;
  dataCadastroExterno: Date;
  isCriacaoInterna: boolean;
  convertidoLead: boolean;
  dataConversao: null;
  createdAt: Date;
  updatedAt: Date;
  pessoa: IPessoa;
  pedidos?: IPedido[];
}
