export interface IQueryDatabaseMV {
  id: number;
  tabela: string;
  query: string;
  subQuery: string;
  cnpjEmpresa: string;
  dataUltimaIntegracao: Date;
  paginaInicial: number;
  paginaFinal: number;
}
