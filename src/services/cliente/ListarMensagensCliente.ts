import { Api } from '../api';

export type MensagensClienteRes = {
  id: number;
  tenantId: number;
  clienteId: number;
  mensagem: string;
  createdAt: Date;
  updatedAt: Date;
  usuario: {
    nome: string;
  };
};

class ListarMensagensCliente {
  async listar(clienteId: number, page: number) {
    const response = await Api.get('cliente/mensagens', {
      params: {
        id: clienteId,
        page: page,
      },
    });

    return response.data;
  }
}

export default new ListarMensagensCliente();
