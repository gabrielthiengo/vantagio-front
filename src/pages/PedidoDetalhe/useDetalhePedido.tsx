import { ListarPedidosRes } from '@/services/pedidos/ListarPedidos';
import ObterDetalhePedido from '@/services/pedidos/ObterDetalhePedido';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useDatalhePedido = ({ pedidoId }: { pedidoId: number }) => {
  const [pedido, setPedido] = useState<ListarPedidosRes>({} as ListarPedidosRes);
  const [isFetching, setIsFetching] = useState(true);

  const obterPedido = () => {
    ObterDetalhePedido.listar(pedidoId)
      .then((data) => {
        setPedido(data.pedido);
      })
      .catch(() => {
        toast.error('Houve um erro ao tentar buscar os dados, tente novamente mais tarde');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    obterPedido();
  }, []);

  return { isFetching, pedido };
};
