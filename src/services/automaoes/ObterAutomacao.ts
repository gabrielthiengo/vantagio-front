import { Api } from '../api';

export type ObterAutomacaoRes = {
  id: number;
  tenantId: number;
  nome: string;
  descricao: string;
  isAtivo: boolean;
  createdAt: Date;
  updatedAt: Date;
};

class ObterAutomacao {
  async get(automacaoId: number) {
    const response = await Api.get('automacao/obter', {
      params: {
        automacaoId,
      },
    });

    return response.data;
  }
}

export default new ObterAutomacao();
