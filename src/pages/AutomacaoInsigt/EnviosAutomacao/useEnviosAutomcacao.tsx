import ListarEnviosAutomacao, {
  EnviosAutomacaoRes,
  FiltroEnvioAutomacao,
} from '@/services/automaoes/ListarEnviosAutomacao';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useEnviosAutomacao = (automacaoId: number) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(10);
  const [filtros, setFiltros] = useState<FiltroEnvioAutomacao>({} as FiltroEnvioAutomacao);
  const [envios, setEnvios] = useState<EnviosAutomacaoRes[]>([]);

  const listarEnviosAutomacao = () => {
    ListarEnviosAutomacao.list(automacaoId, page, limit, filtros)
      .then((data) => {
        setEnvios(data.envios);
        setTotal(data.total);
      })
      .catch(() => {
        toast.error('Houve um erro ao tentar buscar os dados, tente novamente mais tarde');
      })
      .finally(() => {
        setIsFetching(false);
        setLoadingMore(false);
      });
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setLimit(limit + 10);
  };

  const handleFilterOnClick = () => {
    setIsFetching(true);
    listarEnviosAutomacao();
  };

  useEffect(() => {
    console.log('aqui');
    setIsFetching(true);
    listarEnviosAutomacao();
  }, [limit]);

  return {
    isFetching,
    filtros,
    envios,
    page,
    total,
    isLoadingMore,
    setPage,
    setLimit,
    handleLoadMore,
    setFiltros,
    handleFilterOnClick,
  };
};
