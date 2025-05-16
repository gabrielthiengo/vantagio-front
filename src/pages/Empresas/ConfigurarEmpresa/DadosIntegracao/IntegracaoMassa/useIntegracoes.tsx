import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { criarEmpresaSchema, CriarEmpresaSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import ListarIntegracoesEmpresa from '@/services/integracao-empresa/ListarIntegracoesEmpresa';
import { IIntegracaoEmpresa } from '@/interfaces/IIntegracaoEmpresa';
import IniciarIntegracaoEmpresa from '@/services/integracao-empresa/IniciarIntegracaoEmpresa';

export const useIntegracoes = (empresaId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [integracoes, setIntegracoes] = useState<IIntegracaoEmpresa[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<CriarEmpresaSchema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(criarEmpresaSchema),
  });

  async function listarIntegracoesEmpresa() {
    try {
      setIsLoading(true);

      const integracoes = await ListarIntegracoesEmpresa.listarIntegracoesPorEmpresaId(empresaId);

      setIntegracoes(integracoes);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      listarIntegracoesEmpresa();
    }, 60000); // 60 segundos

    listarIntegracoesEmpresa();

    return () => clearInterval(intervalo);
  }, []);

  async function iniciarIntegracao(integracaoId: number) {
    const response = await IniciarIntegracaoEmpresa.iniciarIntegracao(integracaoId);

    if (response.isSucesso) {
      await listarIntegracoesEmpresa();

      toast.success(response.mensagem);
    } else {
      toast.error(response.mensagem);
    }
  }

  return {
    isLoading,
    errors,
    isValid,
    integracoes,
    register,
    iniciarIntegracao,
    handleSubmit,
    listarIntegracoesEmpresa,
  };
};
