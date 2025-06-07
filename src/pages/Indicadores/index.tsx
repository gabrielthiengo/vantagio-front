import { useIndicadores } from './useIndicadores';
import EvolucaoNovosClientes from './EvolucaoNovosClientes';
import { ChartConfig } from '@/components/ui/chart';
import ClientesPorStatus from './ClientesPorStatus';
import PedidosPorStatus from './PedidosPorStatus';
import ConversoesPorAutCamp from './ConversoesPorAutCamp';
import ComunicacaoPorStatus from './ComunicacaoPorStatus';
import PedidoPorCliente from './PedidoPorCliente';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F', '#FF8042'];

export const Indicadores = () => {
  const {
    isFetching,
    clientesPorStatus,
    pedidosPorStatus,
    clintesPorMes,
    taxaConversaoCampanhas,
    taxaConversaoAutomacao,
    statusEntregaCampanha,
    statusEntregaAutomacao,
    pedidosPorCliente,
  } = useIndicadores();

  const chartConfig = {
    total: {
      label: 'Total',
    },
  } satisfies ChartConfig;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <ConversoesPorAutCamp
        data={taxaConversaoCampanhas}
        chartConfig={chartConfig}
        isFetching={isFetching}
        colors={COLORS}
        title="Taxa de conversão das campanhas"
        description="Exibindo a taxa de conversão das campanhas"
      />

      <ComunicacaoPorStatus
        data={statusEntregaCampanha}
        chartConfig={chartConfig}
        isFetching={isFetching}
        colors={COLORS}
        title="Status de entrega das campanhas"
        description="Exibindo os status de entrega de mensagens aos clientes"
      />

      <EvolucaoNovosClientes data={clintesPorMes} chartConfig={chartConfig} isFetching={isFetching} />

      <ConversoesPorAutCamp
        data={taxaConversaoAutomacao}
        chartConfig={chartConfig}
        isFetching={isFetching}
        colors={COLORS}
        title="Taxa de conversão das automações"
        description="Exibindo a taxa de conversão das automações"
      />

      <ComunicacaoPorStatus
        data={statusEntregaAutomacao}
        chartConfig={chartConfig}
        isFetching={isFetching}
        colors={COLORS}
        title="Status de entrega das automações"
        description="Exibindo os status de entrega de mensagens aos clientes"
      />

      <ClientesPorStatus data={clientesPorStatus} chartConfig={chartConfig} colors={COLORS} isFetching={isFetching} />

      <div className="col-span-2">
        <PedidosPorStatus data={pedidosPorStatus} chartConfig={chartConfig} isFetching={isFetching} />
      </div>

      <PedidoPorCliente data={pedidosPorCliente} chartConfig={chartConfig} isFetching={isFetching} />
    </div>
  );
};
