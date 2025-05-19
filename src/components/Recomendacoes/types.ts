export type RecomendacoesData = {
  select: boolean;
  id: number;
  nome: string;
  email: string;
  telefone: string;
  acao: string;
};

type Meta = {
  descricao: string;
  total: number;
  totalPages: number;
  perPage: number;
  currentPage: number;
  percentual: number;
};

export type RecomendacoesRetorno = {
  columns: [];
  data: RecomendacoesData[];
  meta: Meta;
};
