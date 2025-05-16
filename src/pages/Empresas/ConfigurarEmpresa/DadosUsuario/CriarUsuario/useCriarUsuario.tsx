import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { criarUsuarioSchema, CriarUsuarioSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import CriarUsuario from '@/services/usuario/CriarUsuario';
import AtualizarUsuario from '@/services/usuario/AtualizarUsuario';

export const useCriarUsuario = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<CriarUsuarioSchema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(criarUsuarioSchema),
  });

  async function handleFormSubmit(data: CriarUsuarioSchema): Promise<void | string> {
    setIsLoading(true);
    setIsSuccess(false);

    if (!data.id) {
      const { isSuccess, message } = await CriarUsuario.execute(data);

      if (!isSuccess) {
        setIsLoading(false);
        toast.error(message);
        return '';
      }

      toast.success('Usuário criado com sucesso');
    } else {
      const { isSuccess, message } = await AtualizarUsuario.execute(data);

      if (!isSuccess) {
        setIsLoading(false);
        toast.error(message);
        return '';
      }

      toast.success('Usuário atualizado com sucesso');
    }

    setIsSuccess(true);
    setIsLoading(false);
  }

  return {
    isLoading,
    isSuccess,
    errors,
    isValid,
    register,
    handleSubmit,
    reset,
    handleFormSubmit,
  };
};
