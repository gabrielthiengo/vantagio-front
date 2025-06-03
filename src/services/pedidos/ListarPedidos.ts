import { FiltrosPedido } from '@/pages/Pedidos/types';
import { Api } from '../api';

export type ListarPedidosRes = {
  id: number;
  tenantId: number;
  clienteId: number;
  pedidoExternoId: number;
  clienteExternoId: number;
  status: string;
  valorTotal: string;
  valorTotalTaxa: string;
  valorDescontoTaxa: string;
  valorDesconto: string;
  valorEntregaTaxa: string;
  valorEntrega: string;
  metodoPagamento: string;
  carrinhoHash: string;
  dataPagamento: Date | null;
  dataFinalizacao: Date;
  dataCadastroExterno: Date;
  isCriacaoInterna: false;
  createdAt: Date;
  updatedAt: Date;
  cliente: {
    id: number;
    tenantId: number;
    pessoaId: number;
    email: string;
    telefone: string;
    clienteExternoId: number;
    dataCadastroExterno: Date;
    isCriacaoInterna: false;
    convertidoLead: false;
    dataConversao: Date | null;
    createdAt: Date;
    updatedAt: Date;
    pessoa: {
      id: number;
      nome: string;
      cpf: string | null;
      rg: string | null;
      dataNascimento: Date | null;
      genero: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  };
  produtos: {
    id: number;
    pedidoId: number;
    produtoExternoId: number;
    nomeProduto: string;
    quantidade: number;
    valorTotal: string;
    valorTotalTaxa: string;
    valorSubTotal: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

class ListarPedidos {
  async listar(filtros?: FiltrosPedido) {
    const response = await Api.get('pedido', {
      params: {
        page: filtros?.page,
        clienteId: filtros?.clienteId ?? null,
        status: filtros?.status ?? null,
      },
    });

    return response.data;
  }
}

export default new ListarPedidos();
