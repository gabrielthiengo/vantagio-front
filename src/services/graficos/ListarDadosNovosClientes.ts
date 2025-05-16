import { Api } from '../api';

class ListarDadosNovosClientes {
  async listar() {
    const response = await Api.get('grafico/novos/clientes');

    return response.data;
  }
}

export default new ListarDadosNovosClientes();
