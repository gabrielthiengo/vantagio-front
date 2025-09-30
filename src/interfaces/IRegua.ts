import { ITemplate } from './ITemplate';

export interface ICondicaoSaida {
  id?: number;
  nome: string;
  descricao: string;
  queryCheck?: string | null;
}
export interface IEtapa {
  id?: number;
  reguaId?: number;
  templateId?: number;
  ordem: number;
  delayDias: number;
  canal: string;
  template: ITemplate | null;
  condicao: ICondicaoSaida | null;
  qtdEnviosDia: number;
  isUtilizaCupom?: boolean | null;
  isEnviarCupomEtapaAnterior?: boolean | null;
  cupom?: Record<string, any> | null;
}

export interface IRegua {
  id?: number | null;
  nome: string;
  descricao?: string | null;
  gatilhoId: number;
  dataInicio: Date;
  dataFim?: Date | null;
  isAtivo?: boolean | null;
  dataUltimoProcessamento?: Date | null;
  etapas: IEtapa[];
  disparos?: number;
}
