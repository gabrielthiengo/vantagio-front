import { Api } from '../api';

export type AutomacaoResponse = {
  id: number;
  tenantId: number;
  nome: string;
  descricao: string;
  isAtivo: boolean;
  createdAt: Date;
  updatedAt: Date;
  evento: {
    id: number;
    automacaoId: number;
    tipoEvento: string;
    parametro: {
      campo: string;
      operador: string;
      valor: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
  };
  acao: {
    id: number;
    automacaoId: number;
    tenantId: number;
    automacaoTemplateId: number;
    ordem: number;
    tipoAcao: string;
    delayMinutos: number;
    isUtilizaCupom: boolean;
    codigoCupom: string;
    isUsoIndividual: boolean;
    tipoDesconto: string;
    valorDescontoCupom: number;
    valorMinimoCarrinho: number;
    createdAt: Date;
    updatedAt: Date;
    template: {
      id: number;
      tenantId: number;
      automacaoId: number;
      templateId: number;
      tipo: string;
      assunto: string;
      corpo: string;
      criadoPor: number;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};

class ListarAutomacoes {
  async list(page: number) {
    const response = await Api.get('automacao', {
      params: {
        page,
        limit: 10,
      },
    });

    return response.data;
  }
}

export default new ListarAutomacoes();
