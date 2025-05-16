import { Api } from '../api';

class IniciarIntegracaoEmpresaPorIntegracaoId {
  async iniciarIntegracao(integracaoId: number) {
    const response = await Api.get('empresa/integracao/iniciar', {
      params: {
        integracaoId: integracaoId,
      },
    });

    return response.data;
  }
}

export default new IniciarIntegracaoEmpresaPorIntegracaoId();
