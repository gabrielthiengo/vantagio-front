import { Api } from '../api';

class PrimeiroAcessoService {
  async obterEmpresa(cnpj: string) {
    const response = await Api.get('primeiro/acesso', {
      params: {
        cnpj,
      },
    });

    return response.data;
  }

  async criar(usuario: any, termoAceite: any, tenantId: number) {
    const data = {
      usuario,
      termoAceite,
      tenantId,
    };

    const response = await Api.post('primeiro/acesso/finalizar', {
      usuario: data.usuario,
      termoAceite: data.termoAceite,
      tenantId: usuario.tenantId,
    });

    return response.data;
  }
}

export default new PrimeiroAcessoService();
