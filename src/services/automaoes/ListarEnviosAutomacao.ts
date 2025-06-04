import { Api } from '../api';

export type EnviosAutomacaoRes = {
  id: number;
  automacaoId: number;
  tenantId: number;
  clienteId: number;
  automacaoAcaoId: number;
  status: string;
  dataExecucao: Date;
  erro: string;
  isEmailVisualizado: true;
  dataVisualizacao: Date;
  createdAt: Date;
  updatedAt: Date;
  cliente: {
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
      dataNascimento: string | null;
      genero: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};

export type FiltroEnvioAutomacao = {
  clienteId: number | null;
  status: string;
  statusVisualizacao: string;
};

class ListarEnviosAutomacao {
  async list(automacaoId: number, page: number, limit: number, filtros: FiltroEnvioAutomacao) {
    const response = await Api.get('automacao/envio', {
      params: {
        automacaoId,
        page,
        limit,
        clienteId: filtros.clienteId,
        status: filtros.status,
        statusVisualizacao: filtros.statusVisualizacao,
      },
    });

    return response.data;
  }
}

export default new ListarEnviosAutomacao();
