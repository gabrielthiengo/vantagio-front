import { ICliente } from './ICliente';
import { IEtapa } from './IRegua';
import { IReguaInstanciaLog } from './IReguaInstanciaLog';

export interface IReguaInstancia {
  id: number;
  reguaId: number;
  clienteId: number;
  etapaId: number;
  status: string;
  dataInicio: Date;
  dataProximaExecucao: Date;
  cliente: ICliente;
  etapa: IEtapa;
  logs: IReguaInstanciaLog[];
}
