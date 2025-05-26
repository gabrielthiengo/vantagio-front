import CardFeedback from '@/components/CardFeedback';
import LoadingComponent from '@/components/LoadingComponent';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { formatarData } from '@/lib/utils';
import ListarAutomacoesCliente from '@/services/cliente/ListarAutomacoesCliente';
import { AutomacoesClienteRes } from '@/services/cliente/ListarPedidosCliente';
import { useEffect, useState } from 'react';

type AutomacoesClienteProps = {
  clienteId: number;
};

export default function AutomacoesCliente({ clienteId }: AutomacoesClienteProps) {
  const [automacoes, setAutomacoes] = useState<AutomacoesClienteRes[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const listarAutomacoesCliente = () => {
    ListarAutomacoesCliente.listar(clienteId, page)
      .then((data) => {
        setAutomacoes(data.automacoes);
        setTotal(data.total);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    listarAutomacoesCliente();
  }, [page]);

  return (
    <div>
      {!isFetching && (
        <div className="flex flex-col gap-2">
          {automacoes.map((automacao) => {
            return (
              <div
                key={automacao.id}
                className="border border-gray-300 rounded-md p-3 grid grid-cols-[2fr_1fr_1fr_1fr] gap-3"
              >
                <div className="flex flex-col text-xs">
                  <span className="text-gray-500">Automação:</span>
                  <span>{automacao.automacao.nome}</span>
                </div>

                <div className="flex flex-col text-xs">
                  <span className="text-gray-500">Status:</span>
                  <span>{automacao.status}</span>
                </div>

                <div className="flex flex-col text-xs text-right">
                  <span className="text-gray-500">Data criação:</span>
                  <span>{formatarData(String(automacao.createdAt))}</span>
                </div>

                <div className="flex flex-col text-xs text-right">
                  <span className="text-gray-500">Data envio:</span>
                  {automacao.dataExecucao ? (
                    <span>{formatarData(String(automacao.dataExecucao))}</span>
                  ) : (
                    <span className="text-xs text-gray-400">Não enviado</span>
                  )}
                </div>
              </div>
            );
          })}

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

      {total === 0 && <CardFeedback text="Nenhuma automação disparou mensagens para este cliente" />}

      {isFetching && <LoadingComponent />}
    </div>
  );
}
