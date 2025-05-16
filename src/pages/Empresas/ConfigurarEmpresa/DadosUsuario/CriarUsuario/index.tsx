import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Plus } from 'lucide-react';
import { useCriarUsuario } from './useCriarUsuario';
import { InputError } from '@/components/InputErrors';
import { ReloadIcon } from '@radix-ui/react-icons';
import { IUsuario } from '@/interfaces/IUsuario';
import { useEffect, useState } from 'react';

export function CriarUsuario({
  usuario,
  empresaId,
  isAtualizando = false,
}: {
  usuario?: IUsuario;
  empresaId?: number;
  isAtualizando?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, isSuccess, isValid, errors, register, handleSubmit, handleFormSubmit, reset } = useCriarUsuario();

  useEffect(() => {
    if (usuario) {
      reset(usuario);
    } else {
      reset({
        tenantId: empresaId,
      });
    }
  }, [usuario, reset]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        open && reset();
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        {isAtualizando ? (
          <Button variant="default">
            <Pencil size={18} className="mr-1" />
          </Button>
        ) : (
          <Button variant="default">
            <Plus size={18} className="mr-1" />
            Usuário
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isAtualizando ? 'Atualizar' : 'Criar'} usuário</DialogTitle>
          <DialogDescription>
            Início do processo de {isAtualizando ? 'atualização do usuário' : 'criação de usuários'}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form action="submit" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input {...register('nome')} className={`${errors.nome && 'border-red-500'}`} />
              {errors.nome && <InputError error={errors.nome?.message ?? ''} />}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input {...register('email')} className={`${errors.email && 'border-red-500'}`} />
              {errors.email && <InputError error={errors.email?.message ?? ''} />}
            </div>

            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input {...register('senha')} type="password" className={`${errors.senha && 'border-red-500'}`} />
              {errors.senha && <InputError error={errors.senha?.message ?? ''} />}
            </div>

            <div>
              <div>
                <Label htmlFor="confirmarSenha">Confirmar senha</Label>
                <Input
                  {...register('confirmarSenha')}
                  type="password"
                  className={`${errors.confirmarSenha && 'border-red-500'}`}
                />
                {errors.confirmarSenha && <InputError error={errors.confirmarSenha?.message ?? ''} />}
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input {...register('telefone')} className={`${errors.telefone && 'border-red-500'}`} />
                {errors.telefone && <InputError error={errors.telefone?.message ?? ''} />}
              </div>
            </div>

            <DialogFooter>
              {!isLoading ? (
                <Button type="submit" className="mt-4" disabled={!isValid}>
                  {isAtualizando ? 'Atualizar' : 'Criar'} usuário
                </Button>
              ) : (
                <Button disabled className="flex items-center bg-secondaryBackground mt-4">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </Button>
              )}
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
