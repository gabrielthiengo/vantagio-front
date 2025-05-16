import { Api } from '../api';

class ListarEmpresas {
  async execute(page: number) {
    const response = await Api.get('/empresa', {
      params: {
        page,
      },
    });

    return response.data;
  }

  async listarEmpresaPorCnpj(cnpj: string) {
    const response = await Api.get('/empresa/obter', {
      params: {
        cnpj,
      },
    });

    return response.data;
  }
}

export default new ListarEmpresas();
