import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useReguaEvento } from './useReguaEvento';
import { Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CardFeedback from '@/components/CardFeedback';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import LoadingComponent from '@/components/LoadingComponent';
import { formatarData } from '@/lib/utils';

const ReguaEventos = ({ reguaId }: { reguaId: number }) => {
  const { isLoading, instancias, page, total, setPage } = useReguaEvento(reguaId);
  return (
    <div>
      {!isLoading && (
        <div>
          <span>Eventos</span>

          {instancias.map((instancia) => {
            return (
              <Accordion key={instancia.id} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full">
                      <span>{instancia.cliente.pessoa.nome}</span>
                      <span>Status: {instancia.status}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      {instancia.status === 'concluido' && (
                        <div className="flex items-center gap-1 border rounded p-2 border-green-500 text-green-500 bg-green-100">
                          <Check size={14} />
                          <span className="font-semibold">
                            Todas as etapas desta automação foram concluídas para este cliente.
                          </span>
                        </div>
                      )}

                      {instancia.status !== 'concluido' && (
                        <div className="flex items-center justify-between">
                          <span>
                            Próxima etapa: <strong className="capitalize">{instancia.etapa.canal}</strong>
                          </span>

                          <span>
                            Próximo disparo:{' '}
                            <strong className="capitalize">
                              {formatarData(String(instancia.dataProximaExecucao), true)}
                            </strong>
                          </span>
                        </div>
                      )}

                      <Separator className="mt-2 mb-2" />

                      <div>
                        <span className="font-semibold">Disparos</span>
                        <Table className="overflow-hidden">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Ação</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Data de envio</TableHead>
                              <TableHead>Mensagem de erro</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {instancia?.logs.map((log) => {
                              return (
                                <TableRow key={log.id}>
                                  <TableCell className="capitalize">{log.canal}</TableCell>
                                  <TableCell className="capitalize">{log.status}</TableCell>
                                  <TableCell className="capitalize">{formatarData(String(log.dataExecucao))}</TableCell>
                                  <TableCell>{log.mensagemErro}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>

                        {instancia.logs.length === 0 && <CardFeedback text="Nenhum disparo realizado" />}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}

          {instancias.length === 0 && <CardFeedback text="Nenhum evento encontrado" />}

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
        </div>
      )}

      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default ReguaEventos;
