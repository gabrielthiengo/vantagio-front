export interface IPedidoProduto {
  id?: number | null;
  pedidoId?: number;
  produtoExternoId?: number | null;
  nomeProduto?: string | null;
  quantidade?: number | null;
  valorTotal?: string | null;
  valorTotalTaxa?: string | null;
  valorSubTotal?: string | null;
  tamanho?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
