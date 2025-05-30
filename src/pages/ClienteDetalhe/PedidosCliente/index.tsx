import CardFeedback from '@/components/CardFeedback';
import LoadingComponent from '@/components/LoadingComponent';
import { Status, StatusPedido } from '@/components/StatusPedido';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { formatarCurrency, formatarData } from '@/lib/utils';
import ListarPedidosCliente, { PedidosClienteRes } from '@/services/cliente/ListarPedidosCliente';
import { Separator } from '@radix-ui/react-separator';
import { useEffect, useState } from 'react';

type PedidosClienteProps = {
  clienteId: number;
};

export default function PedidosCliente({ clienteId }: PedidosClienteProps) {
  const [pedidos, setPedidos] = useState<PedidosClienteRes[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [valorTotalPedidos, setValorTotalPedidos] = useState(0);

  const listarPedidosCliente = () => {
    ListarPedidosCliente.listar(clienteId, page)
      .then((data) => {
        setPedidos(data.pedidos);
        setTotal(data.total);
        setValorTotalPedidos(data.valorTotalPedidos);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    setIsFetching(true);
    listarPedidosCliente();
  }, [page]);

  return (
    <div>
      {!isFetching && (
        <div>
          <div className="flex items-end justify-between gap-2 mb-2">
            <span className=" text-sm text-gray-400">Valor total movimentado:</span>
            <Separator className="flex-1 h-[1px] bg-gray-300 mb-1" />
            <span className="text-sm">{formatarCurrency(valorTotalPedidos)}</span>
          </div>

          <Accordion type="single">
            {pedidos.map((pedido) => {
              return (
                <AccordionItem key={pedido?.id} value={String(pedido.id)}>
                  <AccordionTrigger className="flex items-center justify-between">
                    <div className="w-full grid grid-cols-[150px_1fr_1fr] gap-4">
                      <span className="text-xs w-full ">
                        <StatusPedido status={pedido.status as Status} />
                      </span>
                      <span className="text-xs text-center">{formatarCurrency(Number(pedido.valorTotal))}</span>
                      <span className="text-xs text-center">{formatarData(String(pedido.dataCadastroExterno))}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Separator className="bg-gray-300 my-2" />
                    {pedido.produtos.map((produto: any) => {
                      return (
                        <div
                          key={produto?.id}
                          className="grid grid-cols-[2fr_1fr_1fr] border border-gray-300 rounded-sm p-2 mt-1"
                        >
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400">Produto:</span>
                            <span className="text-xs">{produto.nomeProduto}</span>
                          </div>

                          <div className="flex flex-col text-center">
                            <span className="text-xs text-gray-400">Quantidade:</span>
                            <span className="text-xs">{produto.quantidade}</span>
                          </div>

                          <div className="flex flex-col text-right">
                            <span className="text-xs text-gray-400">Valor total:</span>
                            <span className="text-xs">{formatarCurrency(produto.valorTotal)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {total > 0 && (
            <Pagination className="justify-end mt-4">
              <PaginationContent>
                <PaginationItem>
                  {page > 1 && <PaginationPrevious className="cursor-pointer" onClick={() => setPage(page - 1)} />}
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink className="mr-3">
                    {page <= 1 && page * 5 > total ? `Total: ${total}` : page}
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  {page * 5 < total && <PaginationNext className="cursor-pointer" onClick={() => setPage(page + 1)} />}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}

      {total === 0 && <CardFeedback text="Nenhum pedido encontrado" />}

      {isFetching && <LoadingComponent />}
    </div>
  );
}
