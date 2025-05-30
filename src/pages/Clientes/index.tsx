import CardFeedback from '@/components/CardFeedback';
import InputBlock from '@/components/InputBlock';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatarCPF, formatarData, formatarTelefone } from '@/lib/utils';
import ListarClientes, { ClientesList, FiltrosCliente } from '@/services/cliente/ListarClientes';

import { UserRoundSearch, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Clientes() {
  const navigate = useNavigate();
  const [clientesList, setClientesList] = useState<ClientesList[]>([]);
  const [filtros, setFiltros] = useState<FiltrosCliente>({
    page: 1,
  } as FiltrosCliente);
  const [total, setTotal] = useState(0);

  const [isFetching, setIsFetching] = useState(false);
  const [refetchData, setRefetchData] = useState(true);

  const handleUpdateFiltro = (field: string, value: string) => {
    setFiltros({
      ...filtros,
      [field]: value,
    });
  };

  const buscarClientes = () => {
    setIsFetching(true);

    ListarClientes.listar(filtros)
      .then((data) => {
        if (data.clientes.length > 0) {
          setClientesList(data.clientes);
          setTotal(data.total);
        }
      })
      .catch(() => {
        toast.error('Houve um erro ao tentar buscar os dados, tente novamente mais tarde');
      })
      .finally(() => {
        setIsFetching(false);
        setRefetchData(false);
      });
  };

  useEffect(() => {
    if (refetchData) {
      buscarClientes();
    }
  }, [filtros.page, refetchData]);

  return (
    <div>
      <PageHeader
        title="Clientes"
        icon={<Users size={18} />}
        content={
          <div className="w-full">
            <div className="flex items-center gap-4">
              <InputBlock label="Nome">
                <Input
                  value={filtros.nome}
                  onChange={(e) => {
                    handleUpdateFiltro('nome', e.target.value);
                  }}
                />
              </InputBlock>

              <InputBlock label="Cpf">
                <Input
                  value={filtros?.cpf}
                  onChange={(e) => {
                    handleUpdateFiltro('cpf', e.target.value);
                  }}
                />
              </InputBlock>

              <InputBlock label="Email">
                <Input
                  value={filtros.email}
                  onChange={(e) => {
                    handleUpdateFiltro('email', e.target.value);
                  }}
                />
              </InputBlock>
            </div>

            <div className="w-full flex items-center justify-end gap-4 mt-20">
              <Button
                variant={'ghost'}
                onClick={() => {
                  setFiltros({
                    nome: '',
                    email: '',
                    cpf: '',
                    page: 1,
                  });

                  setRefetchData(true);
                }}
              >
                Limpar
              </Button>
              <Button onClick={() => buscarClientes()}>Pesquisar</Button>
            </div>
          </div>
        }
      />

      {!isFetching ? (
        <Card className="rounded p-2">
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>RG</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Data de nascimento</TableHead>
                <TableHead>Data de cadastro</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientesList.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.pessoa.nome}</TableCell>
                  <TableCell>{formatarCPF(cliente.pessoa.cpf)}</TableCell>
                  <TableCell>{cliente.pessoa.rg}</TableCell>
                  <TableCell>{formatarTelefone(cliente.telefone)}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{formatarData(String(cliente.pessoa.dataNascimento), true)}</TableCell>
                  <TableCell>{formatarData(String(cliente.dataCadastroExterno))}</TableCell>

                  <TableCell className="text-center">
                    <Button
                      variant={'ghost'}
                      onClick={() => {
                        navigate('/cliente/detalhe/' + cliente.id);
                      }}
                    >
                      <UserRoundSearch size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {clientesList.length === 0 && <CardFeedback text="Nenhum cliente encontrado" />}

          <Pagination className="justify-end mt-4">
            <PaginationContent>
              <PaginationItem>
                {filtros.page > 1 && (
                  <PaginationPrevious
                    className="cursor-pointer"
                    onClick={() =>
                      setFiltros({
                        ...filtros,
                        page: filtros.page - 1,
                      })
                    }
                  />
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
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() =>
                      setFiltros({
                        ...filtros,
                        page: filtros.page + 1,
                      })
                    }
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Card>
      ) : (
        <div>
          <Skeleton className="h-16 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-16 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-16" />
        </div>
      )}
    </div>
  );
}
