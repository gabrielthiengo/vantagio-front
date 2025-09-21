export interface ITemplate {
  id?: number;
  tenantId?: number;
  nome: string;
  canal: string;
  assunto?: string;
  conteudo: string;
  variaveis: any;
}
