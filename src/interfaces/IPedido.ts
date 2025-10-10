import { IPedidoProduto } from './IPedidoProduto';

export interface IPedido {
  id?: number | null;
  tenantId?: number | null;
  clienteId: number | null;
  lojaId?: number | null;
  pedidoExternoId?: number | null;
  clienteExternoId?: number | null;
  status?: string | null;
  valorTotal?: string | null;
  valorTotalTaxa?: string | null;
  valorDescontoTaxa?: string | null;
  valorDesconto?: string | null;
  valorEntregaTaxa?: string | null;
  valorEntrega?: string | null;
  metodoPagamento?: string | null;
  carrinhoHash?: string | null;
  dataPagamento?: Date | null;
  dataFinalizacao?: Date | null;
  dataCadastroExterno?: Date | null;
  isCriacaoInterna?: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  produtos: IPedidoProduto[];
}
