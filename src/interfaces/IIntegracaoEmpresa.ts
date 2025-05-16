export interface IIntegracaoEmpresa {
  id: number;
  tenantId: number;
  funcionalidade?: string;
  url: string;
  pagProximaBusca: number;
  totalRegistrosPagina: number;
  totalPaginas: number;
  ordemExecucao: number;
  isFinalizado: boolean;
}
