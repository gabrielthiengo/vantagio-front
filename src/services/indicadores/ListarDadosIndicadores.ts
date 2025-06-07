import { Api } from '../api';

export type IndicadoresRes = {
  label: string;
  total: number | string;
};

class ListarDadosIndicadores {
  async listar() {
    const response = await Api.get('indicadores');

    return response.data;
  }
}

export default new ListarDadosIndicadores();
