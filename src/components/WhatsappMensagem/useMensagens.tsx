import { useEffect, useState } from 'react';
import { IMensagemWhatsapp } from './types';
import { apiRequest } from '@/services/apiRequest';
import { toast } from 'react-toastify';

export const useMensagens = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [toggleEncerrar, setToggleEncerrar] = useState(false);
  const [nomeCliente, setNomeCliente] = useState('');
  const [isEncerrando, setIsEncerrando] = useState(false);
  const [mensagens, setMensagens] = useState<IMensagemWhatsapp[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('ativas');

  async function listarMensagens() {
    setIsLoading(true);

    const { sucesso, mensagem, data, total } = await apiRequest<IMensagemWhatsapp[]>('/whatsapp', 'GET', null, {
      status,
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

  async function inativarConversa(nome: string) {
    setIsEncerrando(true);

    const { sucesso, mensagem } = await apiRequest('/whatsapp/encerrar', 'PUT', null, {
      nome,
    });

    if (!sucesso) {
      toast.error(mensagem ?? 'Houve um erro ao tentar buscar as mensagens');
      setToggleEncerrar(false);
      return;
    }

    await listarMensagens();

    toast.success(mensagem);

    setToggleEncerrar(false);
    setIsEncerrando(false);
  }

  useEffect(() => {
    listarMensagens();
  }, [page, status]);

  return {
    isLoading,
    mensagens,
    page,
    total,
    status,
    toggleEncerrar,
    isEncerrando,
    nomeCliente,
    setNomeCliente,
    setToggleEncerrar,
    setPage,
    setStatus,
    inativarConversa,
  };
};
