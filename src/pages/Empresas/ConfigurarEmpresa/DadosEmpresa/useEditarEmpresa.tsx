import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { atualizarEmpresaSchema, AtualizarEmpresaSchema } from './types';
import { apiRequest } from '@/services/apiRequest';
import { IEmpresa } from '@/interfaces/IEmpresa';

export const useEditarEmpresa = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<AtualizarEmpresaSchema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(atualizarEmpresaSchema),
  });

  async function handleFormSubmit(empresa: AtualizarEmpresaSchema): Promise<void | string> {
    setIsLoading(true);
    setIsSuccess(false);

    const { sucesso, mensagem, data } = await apiRequest<IEmpresa>('empresa/atualizar', 'PUT', empresa);

    if (!sucesso) {
      setIsLoading(false);
      toast.error(mensagem);
      return '';
    }

    toast.success('Empresa atualizada com sucesso');

    setIsSuccess(true);
    setIsLoading(false);

    navigate(`/empresa/configurar/${data?.cnpj}`);
  }

  return {
    isLoading,
    isSuccess,
    errors,
    isValid,
    register,
    handleSubmit,
    handleFormSubmit,
  };
};
