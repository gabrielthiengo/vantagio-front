import { apiRequest } from '@/services/apiRequest';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type EngajamentoDados = {
  status: string;
  total: number;
};

export const useEngajamentoCliente = () => {
  const [loading, setLoading] = useState('');
  const [dados, setDados] = useState<EngajamentoDados[]>([]);

  const listarDadosEngajamento = async () => {
    setLoading('loading');

    const { sucesso, mensagem, data } = await apiRequest<EngajamentoDados[]>('/engajamento', 'GET');

    if (!sucesso) {
      toast.error(mensagem ?? 'Houve um erro ao tentar buscar os dados');
    }

    if (data) {
      setDados(data);
    }

    setLoading('');
  };

  useEffect(() => {
    listarDadosEngajamento();
  }, []);

  return { loading, dados };
};
