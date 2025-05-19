import { Api } from '../api';

class ObterRecomendacoes {
  async listar(page: number) {
    const response = await Api.get('recomendacoes', {
      params: {
        page: page,
      },
    });

    return response.data;
  }
}

export default new ObterRecomendacoes();
