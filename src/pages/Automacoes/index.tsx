import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatarData } from '@/lib/utils';
import ListarAutomacoes, { AutomacaoResponse } from '@/services/automaoes/ListarAutomacoes';

import { Boxes, Ellipsis, Pencil, PieChart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AutomacaoCriar } from '../AutomcacaoCriar';
import CardFeedback from '@/components/CardFeedback';
import { Status } from '@/components/Status';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import LoadingComponent from '@/components/LoadingComponent';

export function Automacoes() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [automacoes, setAutomacoes] = useState<AutomacaoResponse[]>([]);
  const [automacaoSelecionada, setAutomacaoSelecionada] = useState<AutomacaoResponse>();

  const ListarAutomacoesFetch = () => {
    ListarAutomacoes.list(page)
      .then((response) => {
        setAutomacoes(response.automacoes);
        setTotal(response.total);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (toggleDialog) return;

    ListarAutomacoesFetch();
  }, [page, toggleDialog]);

  return (
    <div className="h-full">
      <PageHeader title="Automações" icon={<Boxes size={18} />}>
        <Button
          onClick={() => {
            navigate('/automacao/criar');
          }}
        >
          + Automação
        </Button>
      </PageHeader>

      {!isLoading ? (
        <Card className="rounded p-2">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Atualizado em</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {automacoes.map((automacao) => (
                <TableRow key={automacao.id}>
                  <TableCell>{automacao.nome}</TableCell>
                  <TableCell>{automacao.descricao}</TableCell>
                  <TableCell>{formatarData(String(automacao.createdAt))}</TableCell>
                  <TableCell>{formatarData(String(automacao.updatedAt))}</TableCell>
                  <TableCell className="text-center">
                    <Status isActive={automacao.isAtivo} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Popover>
                      <PopoverTrigger>
                        <Ellipsis className="text-gray-500" />
                      </PopoverTrigger>
                      <PopoverContent align="start" className="max-w-[auto] mr-5">
                        <Button
                          variant={'ghost'}
                          className="flex items-center gap-1 text-primary"
                          onClick={() => {
                            setAutomacaoSelecionada(automacao);

                            setToggleDialog(true);
                          }}
                        >
                          <Pencil size={12} />
                          Atualizar
                        </Button>

                        <Button
                          variant={'ghost'}
                          className="flex items-center gap-1 text-orange-700"
                          onClick={() => {
                            setAutomacaoSelecionada(automacao);

                            setToggleDialog(true);
                          }}
                        >
                          <PieChart size={12} />
                          Insigts
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {automacoes.length === 0 && <CardFeedback text="Nenhuma automação encontrada" />}

          <Pagination className="justify-end mt-4">
            <PaginationContent>
              <PaginationItem>
                {page > 1 && <PaginationPrevious className="cursor-pointer" onClick={() => setPage(page - 1)} />}
              </PaginationItem>

              <PaginationItem>
                <PaginationLink className="mr-3">
                  {page <= 1 && page * 10 > total && `Total: ${total}`}
                  {page >= 1 && page * 10 <= total && page}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                {page * 10 < total && <PaginationNext className="cursor-pointer" onClick={() => setPage(page + 1)} />}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Card>
      ) : (
        <div>
          <LoadingComponent />
        </div>
      )}

      <Dialog open={toggleDialog} onOpenChange={setToggleDialog}>
        <DialogContent className="sm:max-w-[55%] max-h-[90%] overflow-y-auto">
          <DialogHeader></DialogHeader>

          <AutomacaoCriar
            automacao={automacaoSelecionada}
            dispatch={() => {
              setPage(1);
              setToggleDialog(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
