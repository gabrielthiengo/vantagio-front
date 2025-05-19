import { Api } from '../api';

class ListarNotificacoesAlerta {
  async listar(clienteId: number) {
    const response = await Api.get('cliente/info/comunicacao', {
      params: {
        id: clienteId,
      },
    });

    return response.data;
  }
}

export default new ListarNotificacoesAlerta();
