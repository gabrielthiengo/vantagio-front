import CardFeedback from '@/components/CardFeedback';
import LoadingComponent from '@/components/LoadingComponent';
import { PageHeader } from '@/components/PageHeader';
import { Status } from '@/components/Status';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatarData } from '@/lib/utils';
import ListarCampanhas, { CampanhaResponse } from '@/services/campanhas/ListarCampanhas';
import { Ellipsis, LineChart, Pencil, PieChart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CampanhaDetalhe } from '../CampanhaDetalhe';

export const Campanhas = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [campanhas, setCampanhas] = useState<CampanhaResponse[]>([]);
  const [campanhaSelecionada, setCampanhaSelecionada] = useState<CampanhaResponse>();

  const ListarAutomacoesFetch = () => {
    ListarCampanhas.list(page)
      .then((response) => {
        setCampanhas(response.campanhas);
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
      <PageHeader title="Campanhas" icon={<LineChart size={18} />}>
        <Button
          onClick={() => {
            navigate('/campanha/detalhe');
          }}
        >
          + Campanha
        </Button>
      </PageHeader>

      {!isLoading ? (
        <Card className="rounded p-2">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data de início</TableHead>
                <TableHead>Data fim</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Atualizado em</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campanhas.map((campanha) => (
                <TableRow key={campanha.id}>
                  <TableCell>{campanha.nome}</TableCell>
                  <TableCell>{campanha.descricao}</TableCell>
                  <TableCell>{formatarData(String(campanha.dataInicio))}</TableCell>
                  <TableCell>{formatarData(String(campanha.dataFim))}</TableCell>
                  <TableCell>{formatarData(String(campanha.createdAt))}</TableCell>
                  <TableCell>{formatarData(String(campanha.updatedAt))}</TableCell>
                  <TableCell className="text-center">
                    <Status isActive={campanha.isAtivo} />
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
                            setCampanhaSelecionada(campanha);

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
                            setCampanhaSelecionada(campanha);

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

          {campanhas.length === 0 && <CardFeedback text="Nenhuma automação encontrada" />}

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
        <DialogContent className="sm:max-w-[60%] max-h-[90%] overflow-y-auto">
          <DialogHeader></DialogHeader>

          <CampanhaDetalhe
            campanha={campanhaSelecionada}
            dispatch={() => {
              setPage(1);
              setToggleDialog(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
