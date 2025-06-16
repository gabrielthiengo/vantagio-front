import { IEmpresa } from '@/interfaces/IEmpresa';
import { apiRequest } from '@/services/apiRequest';
import { useEffect, useState } from 'react';

export const useEmpresas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [total, setTTotal] = useState<number | undefined>(0);

  async function listarEmpresas() {
    try {
      setIsLoading(true);

      const { data, total } = await apiRequest<IEmpresa[]>('/empresa', 'GET', {
        page,
      });

      if (data) {
        setEmpresas(data);
        setTTotal(total);
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
