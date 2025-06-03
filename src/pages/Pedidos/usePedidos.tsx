import { useEffect, useState } from 'react';
import { FiltrosPedido } from './types';
import ListarPedidos, { ListarPedidosRes } from '@/services/pedidos/ListarPedidos';
import { toast } from 'react-toastify';

export const usePedidos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filtros, setFiltros] = useState<FiltrosPedido>({
    page: 1,
  } as FiltrosPedido);
  const [pedidos, setPedidos] = useState<ListarPedidosRes[]>([]);
  const [total, setTotal] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [refetchData, setRefetchData] = useState(true);

  const listarPedidos = () => {
    setIsFetching(true);

    ListarPedidos.listar(filtros)
      .then((data) => {
        setPedidos(data.pedidos);
        setTotal(data.total);
      })
      .catch(() => {
        toast.error('Houve um erro ao tentar buscar os dados, tente novamente mais tarde');
      })
      .finally(() => {
        setIsFetching(false);
        setRefetchData(false);
      });
  };

  useEffect(() => {
    if (refetchData) {
      listarPedidos();
    }
  }, [filtros.page, refetchData]);

  const handleUpdateFiltro = (field: string, value: string) => {
    setFiltros({
      ...filtros,
      [field]: value,
    });
  };

  const handlePagination = (newPage: number) => {
    setRefetchData(true);

    setFiltros({
      ...filtros,
      page: newPage,
    });
  };

  return {
    isLoading,
    filtros,
    pedidos,
    total,
    isFetching,
    refetchData,
    setIsLoading,
    handleUpdateFiltro,
    setPedidos,
    setFiltros,
    setTotal,
    setIsFetching,
    setRefetchData,
    listarPedidos,
    handlePagination,
  };
};
