export interface IReguaInstanciaLog {
  id: number;
  instanciaId: number;
  etapaId: number;
  clienteId: number;
  dataExecucao: number;
  status: string;
  canal: string;
  mensagemErro?: string | null;
}
