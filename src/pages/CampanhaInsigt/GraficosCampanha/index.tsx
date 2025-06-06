import LoadingComponent from '@/components/LoadingComponent';
import { GraficoEnviadoFalhaAgendado } from './EnviadoFalhaAgendado';
import { ExecucoesPorDiaChart } from './ExecucaoPorDia';
import { GraficoTaxaVisualizacao } from './TaxaVisualizacao';
import { useGraficosCampanha } from './useGraficosCampanha';
import { VisualizacoesAoLongoDoTempo } from './VisualizacoesAoLongoDoTempo';

export default function GraficosCampanha({ campanhaId }: { campanhaId: number }) {
  const { isFetching, statusEnvio, execucoesDia, visualizacaoTempo, taxaVisualizacao } =
    useGraficosCampanha(campanhaId);

  return (
    <div>
      {!isFetching && (
        <div className="grid grid-cols-2 gap-2">
          <GraficoEnviadoFalhaAgendado data={statusEnvio} />

          <ExecucoesPorDiaChart data={execucoesDia} />

          <VisualizacoesAoLongoDoTempo data={visualizacaoTempo} />

          <GraficoTaxaVisualizacao data={taxaVisualizacao} />
        </div>
      )}

      {isFetching && <LoadingComponent />}
    </div>
  );
}
