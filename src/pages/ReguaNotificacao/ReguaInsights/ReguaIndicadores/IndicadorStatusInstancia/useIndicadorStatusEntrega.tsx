import { apiRequest } from '@/services/apiRequest';
import { useEffect, useState } from 'react';

type IIndicadorStatus = {
  status: string;
  quantidade: number;
};

export const useIndicadorStatusInstancia = (reguaId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [indicador, setIndicador] = useState<IIndicadorStatus[]>([]);

  async function obterIndicador() {
    setIsLoading(true);

    const { data } = await apiRequest<IIndicadorStatus[]>('/regua/instancia/indicador/status', 'GET', null, {
      reguaId,
    });

    if (data) {
      setIndicador(data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    obterIndicador();
  }, []);

  return {
    isLoading,
    indicador,
  };
};
