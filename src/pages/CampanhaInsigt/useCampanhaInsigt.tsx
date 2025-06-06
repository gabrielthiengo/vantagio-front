import { ObterAutomacaoRes } from '@/services/automaoes/ObterAutomacao';
import ObterCampanha from '@/services/campanhas/ObterCampanha';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useCampanhaInsigt = (campanhaId: number) => {
  const [isFetching, setIsFetching] = useState(true);
  const [campanha, setCampanha] = useState<ObterAutomacaoRes>({} as ObterAutomacaoRes);

  const obterCampanha = () => {
    ObterCampanha.get(campanhaId)
      .then((data) => {
        setCampanha(data.campanha);
      })
      .catch(() => {
        toast.error('Houve um erro ao tentar buscar os dados, tente novamente mais tarde');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    obterCampanha();
  }, [campanhaId]);

  return {
    isFetching,
    campanha,
  };
};
