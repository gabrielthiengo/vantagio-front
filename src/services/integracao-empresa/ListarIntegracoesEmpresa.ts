import { Api } from '../api';

class ListarIntegracoesEmpres {
  async listarIntegracoesPorEmpresaId(empresaId: number) {
    const response = await Api.get('empresa/integracoes', {
      params: {
        tenantId: empresaId,
      },
    });

    console.log(response.data);

    return response.data;
  }
}

export default new ListarIntegracoesEmpres();
