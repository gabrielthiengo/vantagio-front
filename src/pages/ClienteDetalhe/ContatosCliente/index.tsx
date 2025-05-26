import CardFeedback from '@/components/CardFeedback';
import ClienteDetalheComunicacao from '@/components/Cliente/ClienteDetalheComunicacao';
import LoadingComponent from '@/components/LoadingComponent';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Cliente } from '@/services/cliente/ObterCliente';
import { MessageCircleHeart } from 'lucide-react';
import { useEffect, useState } from 'react';

type PedidosClienteProps = {
  cliente: Cliente;
};

export default function ContatosCliente({ cliente }: PedidosClienteProps) {
  const [mensagens, setMensagens] = useState<MensagensClienteRes[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [refetchMensagens, setRefetchMensagem] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [toggleEnviarMensagem, setToggleEnviarMensagem] = useState(false);

  const listarMensagensCliente = () => {
    ListarMensagensCliente.listar(cliente.id, page)
      .then((data) => {
        setMensagens(data.mensagens);
        setTotal(data.total);
      })
      .finally(() => {
        setIsFetching(false);
        setRefetchMensagem(false);
      });
  };

  useEffect(() => {
    setIsFetching(true);
    listarMensagensCliente();
  }, [page, refetchMensagens]);

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

          {total > 0 && (
            <div className="flex items-center justify-between">
              <Button
                variant={'ghost'}
                className="gap-1 text-green-600 hover:text-green-700"
                onClick={() => setToggleEnviarMensagem(true)}
              >
                Enviar mensagem <MessageCircleHeart size={14} />
              </Button>

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
                    {page * 5 < total && (
                      <PaginationNext className="cursor-pointer" onClick={() => setPage(page + 1)} />
                    )}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}

      {total === 0 && (
        <div>
          <CardFeedback text="Nenhum contato realizado com o cliente" />
          <Button
            variant={'ghost'}
            className="gap-1 text-green-600 hover:text-green-700 mt-2"
            onClick={() => setToggleEnviarMensagem(true)}
          >
            Enviar mensagem <MessageCircleHeart size={14} />
          </Button>
        </div>
      )}

      {isFetching && <LoadingComponent />}

      <Dialog open={toggleEnviarMensagem} onOpenChange={setToggleEnviarMensagem}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[40%]">
          <DialogHeader>
            <DialogTitle>Enviar mensagem</DialogTitle>
            <DialogDescription>
              Utilize este fluxo para se comunicar de forma personalizada com seus clientes.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <ClienteDetalheComunicacao
              cliente={{
                id: cliente.id,
                email: cliente.email,
                nome: cliente.pessoa.nome,
                telefone: cliente.telefone,
                acao: '',
                select: true,
              }}
              esconderPedidos
              callback={() => {
                setToggleEnviarMensagem(false);
                setRefetchMensagem(true);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
