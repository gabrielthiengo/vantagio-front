import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { criarEmpresaSchema, CriarEmpresaSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '@/services/apiRequest';
import { convertToBase64 } from '@/lib/convert-base64';
import { IEmpresa } from '@/interfaces/IEmpresa';

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

  async function handleFormSubmit(empresa: CriarEmpresaSchema): Promise<void | string> {
    setIsLoading(true);
    setIsSuccess(false);

    if (empresa.logoFile) {
      empresa.logo = await convertToBase64(empresa.logoFile);
    }

    const { sucesso, mensagem, data } = await apiRequest<IEmpresa>('/empresa/criar', 'POST', empresa);

    if (!sucesso) {
      setIsLoading(false);
      toast.error(mensagem);
      return '';
    }

    toast.success('Empresa criada com sucesso');

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
    setValue,
  };
};
