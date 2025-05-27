import { PageHeader } from '@/components/PageHeader';
import { useEmpresas } from './useEmpresas';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Building2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { CriarEmpresa } from './CriarEmpresa';
import { useNavigate } from 'react-router-dom';
import { Status } from '@/components/Status';

export const Empresas = () => {
  const navigate = useNavigate();
  const { isLoading, empresas, total, page, paginate } = useEmpresas();

  return (
    <div className="h-full">
      <PageHeader title="Empresas" icon={<Building2 size={18} />}>
        <CriarEmpresa />
      </PageHeader>

      {!isLoading ? (
        <Card className="rounded p-2">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Sistema</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empresas.map((empresa) => (
                <TableRow key={empresa.id}>
                  <TableCell>{empresa.nomeFantasia}</TableCell>
                  <TableCell>{empresa.cnpj}</TableCell>
                  <TableCell>{empresa.sistema}</TableCell>
                  <TableCell className="text-center">
                    <Status isActive={empresa.isAtivo} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() => {
                        navigate(`/empresa/configurar/${empresa.cnpj}`);
                      }}
                    >
                      <Pencil size={11} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination className="justify-end mt-4">
            <PaginationContent>
              <PaginationItem>
                {page > 1 && <PaginationPrevious className="cursor-pointer" onClick={() => paginate(page - 1)} />}
              </PaginationItem>

              <PaginationItem>
                <PaginationLink>
                  {page <= 1 && page * 10 > total && `Total: ${total}`}
                  {page >= 1 && page * 10 <= total && page}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                {page * 10 < total && <PaginationNext className="cursor-pointer" onClick={() => paginate(page + 1)} />}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Card>
      ) : (
        <div>
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4" />
        </div>
      )}
    </div>
  );
};
