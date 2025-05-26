import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDadosUsuario } from './useConfigurarEmpresa';
import { CriarUsuario } from './CriarUsuario';
import { Skeleton } from '@/components/ui/skeleton';
import CardFeedback from '@/components/CardFeedback';

export const DadosUsuario = ({ empresaId }: { empresaId: number }) => {
  const { isLoading, usuarios } = useDadosUsuario(empresaId || 0);

  return (
    <div className="h-full">
      {!isLoading ? (
        <Card className="p-2 rounded">
          <div className="flex items-center justify-between mb-3">
            Lista de usuários
            <CriarUsuario empresaId={empresaId} />
          </div>
          <Table className="overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.telefone}</TableCell>
                  <TableCell className="text-center">
                    <CriarUsuario usuario={usuario} isAtualizando />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {usuarios?.length === 0 && <CardFeedback text="Nenhum usuário encontrado" />}
        </Card>
      ) : (
        <div>
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
        </div>
      )}
    </div>
  );
};
