import { Api } from '../api';

export type StatusData = {
  status: 'ENVIADO' | 'ERRO' | 'AGENDADO';
  quantidade: number;
};

export type ExecucoesPorDia = {
  dia: string;
  quantidade: number;
};

export type VisualizacoesData = {
  hora: string;
  quantidade: number;
};

export type TaxaVisualizacaoData = {
  visualizado: string;
  quantidade: number;
};

class ListarGraficosAutomacao {
  async list(automacaoId: number) {
    const response = await Api.get('automacao/graficos', {
      params: {
        automacaoId,
      },
    });

    return response.data;
  }
}

export default new ListarGraficosAutomacao();
