import { Api } from '../api';

export type CamposIntegracaoRes = {
  id: number;
  campo: string;
  path: string;
  tenantId: number;
  funcionalidadeIntegracaoId: number;
  funcionalidade: {
    id: number;
    nome: string;
  };
};

class ExcluirCampoIntegracao {
  async delete(campoId: number) {
    const response = await Api.delete('/empresa/campos/customizados', {
      params: {
        campoId,
      },
    });

    return response.data;
  }
}

export default new ExcluirCampoIntegracao();
