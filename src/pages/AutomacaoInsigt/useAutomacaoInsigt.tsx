import ObterAutomacao, { ObterAutomacaoRes } from '@/services/automaoes/ObterAutomacao';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useAutomacaoInsigt = (automacaoId: number) => {
  const [isFetching, setIsFetching] = useState(true);
  const [automacao, setAutomacao] = useState<ObterAutomacaoRes>({} as ObterAutomacaoRes);

  const obterAutomacao = () => {
    ObterAutomacao.get(automacaoId)
      .then((data) => {
        setAutomacao(data.automacao);
      })
      .catch(() => {
        toast.error('Houve um erro ao tentar buscar os dados, tente novamente mais tarde');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    obterAutomacao();
  }, [automacaoId]);

  return {
    isFetching,
    automacao,
  };
};
