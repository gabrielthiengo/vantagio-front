import { Api } from '../api';

class ObterDetalhePedido {
  async listar(pedidoId: number) {
    const response = await Api.get('pedido/detalhe', {
      params: {
        pedidoId,
      },
    });

    return response.data;
  }
}

export default new ObterDetalhePedido();
