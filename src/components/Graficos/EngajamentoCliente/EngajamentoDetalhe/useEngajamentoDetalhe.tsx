import { IClienteEngajamento } from '@/interfaces/IClienteEngajamento';
import { apiRequest } from '@/services/apiRequest';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useEngajamentoDetalhe = (status: string, onToggleChange: any) => {
  const [dadosEngajamento, setDadosEngajamento] = useState<IClienteEngajamento[]>([]);
  const [loading, setLoading] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusSelecionado, setStatusSelecionado] = useState('');

  const toggleModal = () => {
    setIsOpen(false);
    onToggleChange('');
  };

  const listarEngajamentoClienteDetalhe = async () => {
    setLoading('loading');

    const { sucesso, mensagem, data, total } = await apiRequest<IClienteEngajamento[]>(
      '/engajamento/list',
      'GET',
      null,
      {
        page,
        status: statusSelecionado.toLowerCase(),
      },
    );

    if (!sucesso) {
      toast.error(mensagem ?? 'Houve um erro ao tentar buscar os dados');
    }

    if (data) {
      setDadosEngajamento(data);
      setTotal(total ?? 0);
    }

    setLoading('');
  };

  const selecionarStatusOnClick = (novoStatus: string) => {
    setStatusSelecionado(novoStatus);

    listarEngajamentoClienteDetalhe();
  };

  useEffect(() => {
    if (status !== '' && isOpen) {
      listarEngajamentoClienteDetalhe();
      setStatusSelecionado(status);
    }
  }, [status, page]);

  return {
    loading,
    isOpen,
    dadosEngajamento,
    page,
    total,
    statusSelecionado,
    setPage,
    toggleModal,
    selecionarStatusOnClick,
  };
};
