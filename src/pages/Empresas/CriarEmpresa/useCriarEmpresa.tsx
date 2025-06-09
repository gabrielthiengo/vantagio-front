import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { criarEmpresaSchema, CriarEmpresaSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import CriarEmpresa from '@/services/empresa/CriarEmpresa';
import { useNavigate } from 'react-router-dom';

export const useCriarEmpresa = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<CriarEmpresaSchema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(criarEmpresaSchema),
  });

  async function handleFormSubmit(data: CriarEmpresaSchema): Promise<void | string> {
    setIsLoading(true);
    setIsSuccess(false);

    const { isSuccess, message, cnpj } = await CriarEmpresa.execute(data);

    if (!isSuccess) {
      setIsLoading(false);
      toast.error(message);
      return '';
    }

    toast.success('Empresa criada com sucesso');

    setIsSuccess(true);
    setIsLoading(false);

    navigate(`/empresa/configurar/${cnpj}`);
  }

  return {
    isLoading,
    isSuccess,
    errors,
    isValid,
    register,
    handleSubmit,
    handleFormSubmit,
    setValue,
  };
};
