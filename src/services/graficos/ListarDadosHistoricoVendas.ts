import { Api } from '../api';

class ListarDadosHistoricoVendas {
  async listar() {
    const response = await Api.get('grafico/historico/vendas');

    return response.data;
  }
}

export default new ListarDadosHistoricoVendas();
