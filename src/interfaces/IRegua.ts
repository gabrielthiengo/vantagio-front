import { ITemplate } from './ITemplate';

export interface IEtapa {
  id?: number;
  reguaId?: number;
  templateId?: number;
  ordem: number;
  delayDias: number;
  canal: string;
  template: ITemplate | null;
  condicaoSaida: string | null;
  qtdEnviosDia: number;
  isUtilizaCupom?: boolean | null;
  isEnviarCupomEtapaAnterior?: boolean | null;
  cupom?: Record<string, any> | null;
  canalLabel?: string | null;
  templateLabel?: string | null;
  condicaoLabel?: string | null;
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
