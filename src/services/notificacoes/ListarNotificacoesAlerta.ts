import { Api } from '../api';

class ListarNotificacoesAlerta {
  async listar() {
    const response = await Api.get('notificacoes/inicio');

    return response.data;
  }
}

export default new ListarNotificacoesAlerta();
