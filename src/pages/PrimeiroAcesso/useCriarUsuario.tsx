import { useForm } from 'react-hook-form';
import { criarUsuarioSchema, CriarUsuarioSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';

export const useCriarUsuario = () => {
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

  return {
    errors,
    isValid,
    register,
    handleSubmit,
    reset,
  };
};
