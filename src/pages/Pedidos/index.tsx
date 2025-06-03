import InputBlock from '@/components/InputBlock';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Search, ShoppingBasket } from 'lucide-react';
import { usePedidos } from './usePedidos';
import { Card } from '@/components/ui/card';
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
import { formatarCurrency, formatarData } from '@/lib/utils';
import { Status, StatusPedido } from '@/components/StatusPedido';
import { ClienteCombobox } from '@/components/Combobox/ClienteCombobox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

export default function Pedidos() {
  const navigate = useNavigate();
  const { filtros, pedidos, total, isFetching, setFiltros, setRefetchData, listarPedidos, handlePagination } =
    usePedidos();

  return (
    <div className="h-full">
      <PageHeader
        title="Pedidos"
        icon={<ShoppingBasket size={18} />}
        content={
          <div className="w-full">
            <div className="grid grid-cols-4 gap-4">
              <InputBlock label="Cliente">
                <ClienteCombobox
                  isClearSelectedValue={filtros.clienteId === null}
                  handleClienteSelected={(clienteId: number) => {
                    setFiltros({
                      ...filtros,
                      clienteId,
                    });
                  }}
                />
              </InputBlock>

              <InputBlock label="Status do pedido">
                <Select
                  value={filtros.status}
                  onValueChange={(value) => {
                    setFiltros({
                      ...filtros,
                      status: value,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CANCELADO">Cancelado</SelectItem>
                    <SelectItem value="CONCLUIDO">Concluído</SelectItem>
                    <SelectItem value="ENVIADO">Enviado</SelectItem>
                    <SelectItem value="EM PROCESSAMENTO">Em processamento</SelectItem>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                    <SelectItem value="REEMBOLSADO">Reembolsado</SelectItem>
                  </SelectContent>
                </Select>
              </InputBlock>
            </div>

            <div className="w-full flex items-center justify-end gap-4 mt-20">
              <Button
                variant={'ghost'}
                onClick={() => {
                  setFiltros({
                    clienteId: null,
                    status: '',
                    page: 1,
                  });

                  setRefetchData(true);
                }}
              >
                Limpar
              </Button>
              <Button onClick={() => listarPedidos()}>Pesquisar</Button>
            </div>
          </div>
        }
      ></PageHeader>

      {!isFetching ? (
        <Card className="rounded p-2">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Valor total</TableHead>
                <TableHead className="text-center">Data criação</TableHead>
                <TableHead className="text-center">Data finalização</TableHead>
                <TableHead className="text-center">Data pagamento</TableHead>
                <TableHead className="text-center">Método pagamento</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidos.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell>{pedido?.cliente?.pessoa.nome}</TableCell>
                  <TableCell className="text-right">{formatarCurrency(Number(pedido.valorTotal))}</TableCell>
                  <TableCell className="text-center">{formatarData(String(pedido?.dataCadastroExterno))}</TableCell>
                  <TableCell className="text-center">{formatarData(String(pedido?.dataFinalizacao))}</TableCell>
                  <TableCell className="text-center">{formatarData(String(pedido?.dataPagamento))}</TableCell>
                  <TableCell className="text-center">{pedido?.metodoPagamento}</TableCell>
                  <TableCell className="text-center max-w-24">
                    {<StatusPedido status={pedido?.status as Status} />}
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <Button
                      variant={'ghost'}
                      className="text-primary flex items-center gap-1 text-xs"
                      onClick={() => {
                        navigate('/pedido/detalhe/' + pedido.id);
                      }}
                    >
                      <Search size={13} /> Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {pedidos.length === 0 && <CardFeedback text="Nenhum pedido encontrado" />}

          <Pagination className="justify-end mt-4">
            <PaginationContent>
              <PaginationItem>
                {filtros.page > 1 && (
                  <PaginationPrevious className="cursor-pointer" onClick={() => handlePagination(filtros.page - 1)} />
                )}
              </PaginationItem>

              <PaginationItem>
                <PaginationLink className="mr-3">
                  {filtros.page <= 1 && filtros.page * 10 > total && `Total: ${total}`}
                  {filtros.page >= 1 && filtros.page * 10 <= total && filtros.page}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                {filtros.page * 10 < total && (
                  <PaginationNext className="cursor-pointer" onClick={() => handlePagination(filtros.page + 1)} />
                )}
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
}
