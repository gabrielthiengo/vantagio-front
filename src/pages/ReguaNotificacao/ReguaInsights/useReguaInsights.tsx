import { IRegua } from '@/interfaces/IRegua';
import { apiRequest } from '@/services/apiRequest';
import { useEffect, useState } from 'react';

export const useReguaInsights = (reguaId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reguaRecord, setReguaRecord] = useState<IRegua>({} as IRegua);

  async function obterReguaNotificacao() {
    setIsLoading(true);

    const { data } = await apiRequest<IRegua>('/regua', 'GET', null, { reguaId });

    if (data) {
      setReguaRecord(data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    obterReguaNotificacao();
  }, []);

  return {
    isLoading,
    reguaRecord,
  };
};
