import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Boxes, Check, LineChartIcon, Pencil, X } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReguaList } from './useReguaList';
import LoadingComponent from '@/components/LoadingComponent';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatarData } from '@/lib/utils';
import { Status } from '@/components/Status';
import CardFeedback from '@/components/CardFeedback';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import InputBlock from '@/components/InputBlock';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ReloadIcon } from '@radix-ui/react-icons';

const ReguaList: React.FC = () => {
  const navigate = useNavigate();
  const {
    reguas,
    filtros,
    isLoading,
    page,
    total,
    isSalvando,
    setToggleAtivarInativar,
    setPage,
    setFiltros,
    listarReguasNotificacao,
    limparFiltros,
    ativarInativarAutomacao,
  } = useReguaList();

  return (
    <div>
      <PageHeader
        title="Automações"
        icon={<Boxes size={18} />}
        children={
          <Button
            onClick={() => {
              navigate('/regua/form');
            }}
          >
            + Criar automação
          </Button>
        }
        content={
          <div>
            <div className="flex items-center gap-2">
              <InputBlock label="Nome">
                <Input
                  value={filtros.nome ?? ''}
                  onChange={(e) =>
                    setFiltros({
                      ...filtros,
                      nome: e.target.value,
                    })
                  }
                />
              </InputBlock>

              <InputBlock label="Data de início">
                <Input
                  type="date"
                  value={String(filtros.dataInicio) ?? ''}
                  onChange={(e) =>
                    setFiltros({
                      ...filtros,
                      dataInicio: e.target.value,
                    })
                  }
                />
              </InputBlock>

              <InputBlock label="Data fim">
                <Input
                  type="date"
                  value={String(filtros.dataFim) ?? ''}
                  onChange={(e) =>
                    setFiltros({
                      ...filtros,
                      dataFim: e.target.value,
                    })
                  }
                />
              </InputBlock>
            </div>

            <div className="flex items-start justify-end gap-2 mt-5">
              <Button variant={'outline'} onClick={limparFiltros}>
                Limpar
              </Button>
              <Button variant={'secondary'} onClick={() => listarReguasNotificacao()}>
                Pesquisar
              </Button>
            </div>
          </div>
        }
      />

      {!isLoading ? (
        <Card className="rounded p-2">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data de início</TableHead>
                <TableHead>Data fim</TableHead>
                <TableHead className="max-w-8 text-center">Total de disparos</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reguas.map((regua) => (
                <TableRow key={regua.id}>
                  <TableCell>{regua.nome}</TableCell>
                  <TableCell>{regua.descricao}</TableCell>
                  <TableCell>{formatarData(String(regua.dataInicio), true)}</TableCell>
                  <TableCell>{formatarData(String(regua.dataFim), true)}</TableCell>
                  <TableCell className="text-center">{regua.disparos}</TableCell>
                  <TableCell className="text-center">
                    <Status
                      isActive={new Date(regua.dataFim ?? new Date()) >= new Date() && (regua.isAtivo ?? false)}
                    />
                  </TableCell>
                  <TableCell className="text-center flex items-center justify-center gap-1">
                    <Button onClick={() => navigate(`/regua/form/${regua.id}`)} title="Editar automação">
                      <Pencil size={14} />
                    </Button>

                    <Button
                      variant={'secondary'}
                      title="Acessar insights da automação"
                      onClick={() => navigate(`/regua/insight/${regua.id}`)}
                    >
                      <LineChartIcon size={14} />
                    </Button>

                    <AlertDialog onOpenChange={setToggleAtivarInativar}>
                      <AlertDialogTrigger asChild>
                        {regua.isAtivo ? (
                          <Button
                            variant={'destructive'}
                            title="Inativar automação"
                            disabled={new Date(regua.dataFim ?? new Date()) < new Date()}
                          >
                            <X size={14} />
                          </Button>
                        ) : (
                          <Button
                            className="bg-green-500 hover:bg-green-600"
                            title="Ativar automação"
                            disabled={new Date(regua.dataFim ?? new Date()) < new Date()}
                          >
                            <Check size={14} />
                          </Button>
                        )}
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Deseja realmente {regua.isAtivo ? 'intativar' : 'ativar'} esta automação?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {regua.isAtivo
                              ? 'Ao inativar, todos os processamentos e envios desta automação serão interrompidos automaticamente.'
                              : 'Ao ativar, esta automação voltará a ser processada e os envios serão realizados.'}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-5">
                          <AlertDialogCancel disabled={isSalvando}>Cancelar</AlertDialogCancel>
                          {!isSalvando ? (
                            <Button
                              onClick={() => {
                                ativarInativarAutomacao(regua.id ?? 0);
                              }}
                            >
                              Continuar
                            </Button>
                          ) : (
                            <Button disabled>
                              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                              Salvando...
                            </Button>
                          )}
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {reguas.length === 0 && <CardFeedback text="Nenhuma automação encontrada" />}

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
    </div>
  );
};

export default ReguaList;
