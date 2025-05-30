export type AutomacaoProp = {
  id?: number;
  nome?: string;
  descricao?: string;
  isAtivo?: boolean;
  evento?: {
    tipoEvento: string;
    parametro: string;
  };
  acao?: {
    ordem: number;
    tipoAcao: string;
    assunto: string;
    mensagem: string;
    templateEmailId: number;
    automacaoTemplateId?: number;
    isUtilizaCupom: boolean;
    codigoCupom: string;
    valorDescontoCupom: number;
    tipoDesconto: string;
    isUsoIndividual: boolean;
    valorMinimoCarrinho: number;
  };
};
