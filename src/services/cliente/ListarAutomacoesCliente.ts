import { Api } from '../api';

export type AutomacoesClienteRes = {
  id: number;
  automacaoId: number;
  tenantId: number;
  clienteId: number;
  automacaoAcaoId: number;
  status: string;
  dataExecucao: Date;
  erro: string;
  createdAt: Date;
  updatedAt: Date;
  automacao: {
    nome: string;
  };
};

class ListarAutomacoescliente {
  async listar(clienteId: number, page: number) {
    const response = await Api.get('cliente/automacoes', {
      params: {
        id: clienteId,
        page: page,
      },
    });

    return response.data;
  }
}

export default new ListarAutomacoescliente();
