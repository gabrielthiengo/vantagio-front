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

class CriarCampoIntegracao {
  async create(campo: any) {
    try {
      const response = await Api.post('/empresa/campos/customizados', campo);

      return response.data;
    } catch (err) {
      return {
        sucesso: false,
        mensagem: 'Houve um erro inesperado, tente novamente mais tarde',
      };
    }
  }
}

export default new CriarCampoIntegracao();
