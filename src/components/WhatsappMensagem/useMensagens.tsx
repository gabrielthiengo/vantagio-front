import { useEffect, useState } from 'react';
import { IMensagemWhatsapp } from './types';
import { apiRequest } from '@/services/apiRequest';
import { toast } from 'react-toastify';

export const useMensagens = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mensagens, setMensagens] = useState<IMensagemWhatsapp[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  async function listarMensagens() {
    setIsLoading(true);

    const { sucesso, mensagem, data, total } = await apiRequest<IMensagemWhatsapp[]>('/whatsapp', 'GET', null, {
      page,
      limit: 5,
    });

    if (!sucesso) {
      toast.error(mensagem ?? 'Houve um erro ao tentar buscar as mensagens');
    }

    if (data) {
      setMensagens(data);
      setTotal(total ?? 0);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    listarMensagens();
  }, [page]);

  return {
    isLoading,
    mensagens,
    page,
    total,
    setPage,
  };
};
