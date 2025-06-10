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
  isExcluindo: boolean;
};

class ListarCamposIntegracaoEmpresa {
  async list(empresaId: number) {
    const response = await Api.get('/empresa/campos/customizados', {
      params: {
        empresaId,
      },
    });

    return response.data;
  }
}

export default new ListarCamposIntegracaoEmpresa();
