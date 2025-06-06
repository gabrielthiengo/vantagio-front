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

class ListarGraficosCampanha {
  async list(campanhaId: number) {
    const response = await Api.get('campanha/graficos', {
      params: {
        campanhaId,
      },
    });

    return response.data;
  }
}

export default new ListarGraficosCampanha();
