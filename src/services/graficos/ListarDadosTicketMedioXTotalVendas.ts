import { Api } from '../api';

class ListarDadosTicketMedioXTotalVendas {
  async listar() {
    const response = await Api.get('grafico/ticket/vendas');

    return response.data;
  }
}

export default new ListarDadosTicketMedioXTotalVendas();
