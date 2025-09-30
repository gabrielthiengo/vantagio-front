import { IEmpresa } from '@/interfaces/IEmpresa';
import { apiRequest } from '@/services/apiRequest';
import { useEffect, useState } from 'react';

export const useConfigurarEmpresa = (cnpj: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [empresa, setEmpresa] = useState<IEmpresa>();

  async function listarDadosEmpresaPorCnpj() {
    try {
      setIsLoading(true);

      const { data } = await apiRequest<IEmpresa>('/empresa/obter', 'GET', null, {
        cnpj,
      });

      if (data) {
        setEmpresa(data);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listarDadosEmpresaPorCnpj();
  }, []);

  return {
    isLoading,
    empresa,
  };
};
