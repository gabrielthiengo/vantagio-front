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
import ListarMensagensCliente, { MensagensClienteRes } from '@/services/cliente/ListarMensagensCliente';
import { useEffect, useState } from 'react';

type PedidosClienteProps = {
  clienteId: number;
};

export default function ContatosCliente({ clienteId }: PedidosClienteProps) {
  const [mensagens, setMensagens] = useState<MensagensClienteRes[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const listarMensagensCliente = () => {
    ListarMensagensCliente.listar(clienteId, page)
      .then((data) => {
        setMensagens(data.mensagens);
        setTotal(data.total);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    setIsFetching(true);
    listarMensagensCliente();
  }, [page]);

  return (
    <div>
      {!isFetching && (
        <div className="flex flex-col gap-2">
          {mensagens.map((mensagem) => {
            return (
              <div key={mensagem.id} className="border border-gray-300 rounded-md p-3 grid grid-cols-[1fr_120px] gap-3">
                <div className="flex flex-col text-xs">
                  <span className="text-gray-500">Mensagem:</span>
                  <span>{mensagem.mensagem}</span>
                </div>

                <div className="flex flex-col text-xs text-right">
                  <span className="text-gray-500">Data envio:</span>
                  <span>{formatarData(String(mensagem.createdAt))}</span>
                </div>

                <div className="flex flex-col text-xs text-right lg:col-span-2">
                  <span className="text-gray-500">Usuário:</span>
                  <span>{mensagem.usuario.nome}</span>
                </div>
              </div>
            );
          })}

          {mensagens.length > 0 && (
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

      {mensagens.length === 0 && <CardFeedback text="Nenhum contato realizado com o cliente" />}

      {isFetching && <LoadingComponent />}
    </div>
  );
}
