export type AutomacaoProp = {
  nome?: string;
  descricao?: string;
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
  };
};
