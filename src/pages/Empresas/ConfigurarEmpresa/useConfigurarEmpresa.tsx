import { IEmpresa } from '@/interfaces/IEmpresa';
import ListarEmpresas from '@/services/empresa/ListarEmpresas';
import { useEffect, useState } from 'react';

export const useConfigurarEmpresa = (cnpj: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [empresa, setEmpresa] = useState<IEmpresa>();

  async function listarDadosEmpresaPorCnpj() {
    try {
      setIsLoading(true);

      const empresa = await ListarEmpresas.listarEmpresaPorCnpj(cnpj);

      if (empresa) {
        setEmpresa(empresa);
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
