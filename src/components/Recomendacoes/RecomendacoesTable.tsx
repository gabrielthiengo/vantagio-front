import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RecomendacoesData } from './types';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GerirAcoesRecomendacoes } from './GerirAcoesRecomendacoes';
import CardFeedback from '../CardFeedback';

type RecomendacoesTableProps = {
  data: RecomendacoesData[];
  totalPages: number;
  currentPage: number;
  paginate: (page: number) => void;
};

export function RecomendacoesTable({ data, totalPages, currentPage, paginate }: RecomendacoesTableProps) {
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [clientesSelecionados, setClientesSelecionados] = React.useState<RecomendacoesData[]>([]);
  const [showButtonAcoesCliente, setShowButtonAcoesCliente] = React.useState(false);

  const columns: ColumnDef<RecomendacoesData>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'nome',
      header: 'Nome',
      cell: ({ row }) => <div className="capitalize">{row.getValue('nome')}</div>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'telefone',
      header: 'Telefone',
      cell: ({ row }) => <div className="capitalize">{row.getValue('telefone')}</div>,
    },
    {
      id: 'acao',
      header: () => <div className="text-center">Detalhes</div>,
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="w-full flex items-center justify-center">
            <Button
              variant={'ghost'}
              className="text-orange-500 hover:text-orange-700 flex items-center gap-1 text-xs"
              onClick={() => {
                navigate(row.original.acao);
              }}
            >
              Acessar <Send size={13} />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      const newRowSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
      setRowSelection(newRowSelection);

      const selectedRows = Object.keys(newRowSelection)
        .filter((key) => newRowSelection[key])
        .map((key) => table.getRowModel().rowsById[key]?.original)
        .filter(Boolean) as RecomendacoesData[];

      setClientesSelecionados(selectedRows);
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    setShowButtonAcoesCliente(clientesSelecionados.length > 0);
  }, [clientesSelecionados]);

  return (
    <div className="w-full">
      <GerirAcoesRecomendacoes isEnabled={showButtonAcoesCliente} clientes={clientesSelecionados} />
      <div className="rounded-md border mt-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length > 0 &&
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {table.getFilteredRowModel().rows.length === 0 && (
          <div className="w-full">
            <CardFeedback text="Nenhum cliente encontrado" />
          </div>
        )}
      </div>
      {table.getFilteredRowModel().rows.length > 0 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linhas(s)
            selecionadas.
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={totalPages === currentPage}
            >
              Próximo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
