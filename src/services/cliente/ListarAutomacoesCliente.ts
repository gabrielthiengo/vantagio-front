import { Api } from '../api';

export type PedidosClienteRes = {
  id: number;
  tenantId: number;
  clienteId: number;
  pedidoExternoId: number;
  clienteExternoId: number;
  status: string;
  valorTotal: number;
  valorTotalTaxa: number;
  valorDescontoTaxa: number;
  valorDesconto: number;
  valorEntregaTaxa: number;
  valorEntrega: number;
  metodoPagamento: string;
  carrinhoHash: string;
  dataPagamento: null;
  dataFinalizacao: Date;
  dataCadastroExterno: Date;
  isCriacaoInterna: boolean;
  createdAt: Date;
  updatedAt: Date;
  produtos: {
    id: number;
    pedidoId: number;
    produtoExternoId: number;
    nomeProduto: string;
    quantidade: number;
    valorTotal: number;
    valorTotalTaxa: number;
    valorSubTotal: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

class ListarAutomacoescliente {
  async listar(clienteId: number, page: number) {
    const response = await Api.get('cliente/automacoes', {
      params: {
        id: clienteId,
        page: page,
      },
    });

    return response.data;
  }
}

export default new ListarAutomacoescliente();
