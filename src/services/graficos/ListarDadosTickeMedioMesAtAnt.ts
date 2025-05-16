import { Api } from '../api';

class ListarDadosTicketMedioMesAtAnt {
  async listar() {
    const response = await Api.get('grafico/ticket');

    return response.data;
  }
}

export default new ListarDadosTicketMedioMesAtAnt();
