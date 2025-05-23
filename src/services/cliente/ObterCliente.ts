import { Api } from '../api';

export type FiltrosCliente = {
  page: number;
  nome: string;
  email: string;
  cpf: string;
};

export type Cliente = {
  id: number;
  tenantId: number;
  pessoaId: number;
  email: string;
  telefone: string;
  clienteExternoId: number;
  dataCadastroExterno: Date;
  isCriacaoInterna: boolean;
  convertidoLead: boolean;
  dataConversao: Date | null;
  createdAt: Date;
  updatedAt: Date;
  pessoa: {
    id: number;
    nome: string;
    cpf: string | null;
    rg: string | null;
    dataNascimento: Date | null;
    genero: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

class ObterCliente {
  async obter(clienteId: number) {
    const response = await Api.get('cliente/obter', {
      params: {
        id: clienteId,
      },
    });

    return response.data;
  }
}

export default new ObterCliente();
