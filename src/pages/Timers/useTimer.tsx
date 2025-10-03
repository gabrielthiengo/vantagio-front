import { apiRequest } from '@/services/apiRequest';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Timer = {
  nome: string;
  slug: string;
  descricao: string;
};

export const useTimer = () => {
  const [loading, setLoading] = useState('mongo-vendedor');
  const [timers, setTimers] = useState<Timer[]>([]);

  const listarTimers = async () => {
    setLoading('loading');
    const { data } = await apiRequest<Timer[]>('/timer', 'GET');

    if (data) {
      setTimers(data);
    }

    setLoading('');
  };

  const executarTimer = async (slug: string) => {
    setLoading(slug);

    const { sucesso, mensagem } = await apiRequest('/timer/execute', 'GET', null, {
      slug,
    });

    setLoading('');

    if (sucesso) {
      toast.success(mensagem);
      return;
    }

    toast.error(mensagem);
  };

  useEffect(() => {
    listarTimers();
  }, []);

  return {
    loading,
    timers,
    executarTimer,
  };
};
