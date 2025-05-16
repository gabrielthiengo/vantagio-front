import { Api } from '../api';

class ListarDadosFatMesAtAnt {
  async listar() {
    const response = await Api.get('grafico/inativo/clientes');

    return response.data;
  }
}

export default new ListarDadosFatMesAtAnt();
