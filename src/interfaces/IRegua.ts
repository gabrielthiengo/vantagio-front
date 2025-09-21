import { ITemplate } from './ITemplate';

export interface IEtapa {
  ordem: number;
  delayDias: number;
  canal: string;
  template: ITemplate;
  condicaoSaida: string;
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
}
