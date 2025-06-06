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

class ObterCampanha {
  async get(campanhaId: number) {
    const response = await Api.get('campanha/obter', {
      params: {
        campanhaId,
      },
    });

    return response.data;
  }
}

export default new ObterCampanha();
