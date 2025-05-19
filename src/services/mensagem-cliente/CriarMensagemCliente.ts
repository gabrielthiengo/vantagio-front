import { Api } from '../api';

export type MensagemClienteBody = {
  clienteId: number;
  mensagem: string;
};

class CriarMensagemCliente {
  async create(mensagem: MensagemClienteBody) {
    const response = await Api.post('mensagem/cliente', mensagem);

    return response.data;
  }
}

export default new CriarMensagemCliente();
