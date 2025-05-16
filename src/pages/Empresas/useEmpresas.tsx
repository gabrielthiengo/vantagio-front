import { IEmpresa } from '@/interfaces/IEmpresa';
import ListarEmpresas from '@/services/empresa/ListarEmpresas';
import { useEffect, useState } from 'react';

export const useEmpresas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [total, setTTotal] = useState(0);

  async function listarEmpresas() {
    try {
      setIsLoading(true);

      const data = await ListarEmpresas.execute(page);

      if (data.empresas) {
        setEmpresas(data.empresas);
        setTTotal(data.total);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }

  function paginate(newPage: number) {
    if (newPage < 1) {
      setPage(1);
    } else {
      setPage(newPage);
    }
  }

  useEffect(() => {
    listarEmpresas();
  }, [page]);

  return {
    isLoading,
    empresas,
    total,
    page,
    paginate,
  };
};
