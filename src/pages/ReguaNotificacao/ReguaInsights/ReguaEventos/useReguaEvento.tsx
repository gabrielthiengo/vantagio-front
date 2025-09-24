import { IReguaInstancia } from '@/interfaces/IReguaInstancia';
import { apiRequest } from '@/services/apiRequest';
import { useEffect, useState } from 'react';

export const useReguaEvento = (reguaId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [instancias, setSetInstancias] = useState<IReguaInstancia[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  async function obterInstancias() {
    setIsLoading(true);

    const { data, total } = await apiRequest<IReguaInstancia[]>('/regua/instancia', 'GET', null, {
      page: page,
      limit: 5,
      reguaId,
    });

    if (data) {
      setSetInstancias(data);
      setTotal(total ?? 0);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    obterInstancias();
  }, [page]);

  return {
    isLoading,
    instancias,
    page,
    total,
    setPage,
  };
};
