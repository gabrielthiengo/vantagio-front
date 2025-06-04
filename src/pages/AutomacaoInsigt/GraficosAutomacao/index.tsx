import LoadingComponent from '@/components/LoadingComponent';
import { GraficoEnviadoFalhaAgendado } from './EnviadoFalhaAgendado';
import { ExecucoesPorDiaChart } from './ExecucaoPorDia';
import { GraficoTaxaVisualizacao } from './TaxaVisualizacao';
import { useGraficosAutomacao } from './useGraficosAutomacao';
import { VisualizacoesAoLongoDoTempo } from './VisualizacoesAoLongoDoTempo';

export default function GraficosAutomacao({ automacaoId }: { automacaoId: number }) {
  const { isFetching, statusEnvio, execucoesDia, visualizacaoTempo, taxaVisualizacao } =
    useGraficosAutomacao(automacaoId);

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
