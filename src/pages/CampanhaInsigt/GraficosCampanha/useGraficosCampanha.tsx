import {
  ExecucoesPorDia,
  StatusData,
  TaxaVisualizacaoData,
  VisualizacoesData,
} from '@/services/automaoes/ListarGraficosAutomacao';
import ListarGraficosCampanha from '@/services/campanhas/ListarGraficosCampanha';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useGraficosCampanha = (campanhaId: number) => {
  const [isFetching, setIsFetching] = useState(true);
  const [statusEnvio, setStatusEnvio] = useState<StatusData[]>([]);
  const [execucoesDia, setExecucoesDia] = useState<ExecucoesPorDia[]>([]);
  const [visualizacaoTempo, setVisualizacaoTempo] = useState<VisualizacoesData[]>([]);
  const [taxaVisualizacao, setTaxaVisualizacao] = useState<TaxaVisualizacaoData[]>([]);

  const listarDadosGraficos = () => {
    ListarGraficosCampanha.list(campanhaId)
      .then((data) => {
        setStatusEnvio(data.statusEnvio);
        setExecucoesDia(data.execucoesDia);
        setVisualizacaoTempo(data.aberturasPorHora);
        setTaxaVisualizacao(data.taxaVisualizacao);
      })
      .catch(() => {
        toast.error('Houve um erro ao tentar buscar os dados, tente novamente mais tarde');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    listarDadosGraficos();
  }, []);

  return {
    isFetching,
    statusEnvio,
    execucoesDia,
    visualizacaoTempo,
    taxaVisualizacao,
  };
};
