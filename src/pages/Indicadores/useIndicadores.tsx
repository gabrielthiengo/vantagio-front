import { ChartConfig } from '@/components/ui/chart';
import ListarDadosIndicadores, { IndicadoresRes } from '@/services/indicadores/ListarDadosIndicadores';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export type IndicadoresProps = {
  chartConfig: ChartConfig;
  data: {
    label: string;
    total: number | string;
  }[];
  isFetching: boolean;
  colors?: string[];
  title?: string;
  description?: string;
};

export const useIndicadores = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [taxaConversaoAutomacao, setTaxaConversaoAutomacao] = useState<IndicadoresRes[]>([]);
  const [taxaConversaoCampanhas, setTaxaConversaoCampanhas] = useState<IndicadoresRes[]>([]);
  const [pedidosPorStatus, setPedidosPorStatus] = useState<IndicadoresRes[]>([]);
  const [clientesPorStatus, setClientesPorStatus] = useState<IndicadoresRes[]>([]);
  const [clintesPorMes, setClintesPorMes] = useState<IndicadoresRes[]>([]);
  const [pedidosPorCliente, setPedidosPorCliente] = useState<IndicadoresRes[]>([]);
  const [statusEntregaCampanha, setStatusEntregaCampanha] = useState<IndicadoresRes[]>([]);
  const [statusEntregaAutomacao, setStatusEntregaAutomacao] = useState<IndicadoresRes[]>([]);

  const listarDadosIndicadores = () => {
    ListarDadosIndicadores.listar()
      .then((data) => {
        setTaxaConversaoAutomacao(data.taxaConversaoAutomacao);
        setTaxaConversaoCampanhas(data.taxaConversaoCampanhas);
        setPedidosPorStatus(data.pedidosPorStatus);
        setClientesPorStatus(data.clientesPorStatus);
        setClintesPorMes(data.clintesPorMes);
        setPedidosPorCliente(data.pedidosPorCliente);
        setStatusEntregaCampanha(data.statusEntregaCampanha);
        setStatusEntregaAutomacao(data.statusEntregaAutomacao);
      })
      .catch(() => {
        toast.error('Houve um erro ao tentar buscar os dados, tente novamente mais tarde');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    listarDadosIndicadores();
  }, []);

  const comunicacaoCampanhaStatus = [
    { label: 'AGENDADO', total: 1000 },
    { label: 'ENVIADO', total: 600 },
    { label: 'ERRO', total: 189 },
  ];

  return {
    isFetching,
    clientesPorStatus,
    pedidosPorStatus,
    clintesPorMes,
    taxaConversaoCampanhas,
    taxaConversaoAutomacao,
    comunicacaoCampanhaStatus,
    pedidosPorCliente,
    statusEntregaCampanha,
    statusEntregaAutomacao,
  };
};
