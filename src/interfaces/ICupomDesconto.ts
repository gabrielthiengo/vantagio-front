export interface ICupomDesconto {
  id?: number;
  tenantId?: number;
  codigo?: string | null;
  descricao?: string | null;
  tipoDesconto: string;
  valorDesconto: number;
  valorMinimoCompra?: number | null;
  qtdTotalUso?: number;
  qtdUsoCliente?: number;
  qtdUtilizado?: number | null;
  qtdDiasValidade?: number;
  dataInicioValidade: Date;
  dataFimValidade?: Date | null;
  isGeradoAutomacao?: boolean | null;
  isAtivo?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
