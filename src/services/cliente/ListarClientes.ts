import { Api } from '../api';

export type FiltrosCliente = {
  page: number;
  nome: string;
  email: string;
  cpf: string;
};

export type ClientesList = {
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

class ListarClientes {
  async listar(filtros?: FiltrosCliente) {
    const response = await Api.get('cliente', {
      params: {
        page: filtros?.page,
        nome: filtros?.nome ?? '',
        email: filtros?.email ?? '',
        cpf: filtros?.cpf ?? '',
      },
    });

    return response.data;
  }
}

export default new ListarClientes();
