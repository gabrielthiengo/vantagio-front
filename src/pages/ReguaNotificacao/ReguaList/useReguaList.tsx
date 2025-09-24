import { IRegua } from '@/interfaces/IRegua';
import { apiRequest } from '@/services/apiRequest';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type ReguaFiltros = {
  nome: string | null;
  dataInicio: string | null;
  dataFim: string | null;
  isAtivo: boolean | null;
};

export const useReguaList = () => {
  const [reguas, setReguas] = useState<IRegua[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSalvando, setIsSalvando] = useState(false);
  const [toggleAtivarInativar, setToggleAtivarInativar] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filtros, setFiltros] = useState<ReguaFiltros>({} as ReguaFiltros);

  async function listarReguasNotificacao(filtrosIn?: ReguaFiltros) {
    setIsLoading(true);

    const { sucesso, mensagem, data, total } = await apiRequest<IRegua[]>('/regua/list', 'GET', null, {
      page,
      limit: 10,
      filtros: JSON.stringify(filtrosIn ? filtrosIn : filtros),
    });

    if (!sucesso) {
      toast.error(mensagem ?? 'Houve um erro ao tentar buscar as automações');
    }

    if (data) {
      setReguas(data);
      setTotal(total ?? 0);
    }

    setIsLoading(false);
  }

  async function ativarInativarAutomacao(reguaId: number) {
    setIsSalvando(true);

    console.log(reguaId);

    const { sucesso, mensagem } = await apiRequest('/regua/status', 'PUT', {
      reguaId,
    });

    if (!sucesso) {
      toast.error(mensagem);
      setIsSalvando(false);
      setToggleAtivarInativar(false);
      return;
    }

    listarReguasNotificacao(filtros);

    toast.success(mensagem);

    setIsSalvando(false);
    setToggleAtivarInativar(false);
  }

  async function limparFiltros() {
    setFiltros({
      nome: null,
      dataInicio: null,
      dataFim: null,
      isAtivo: true,
    });

    await listarReguasNotificacao({
      nome: null,
      dataInicio: null,
      dataFim: null,
      isAtivo: true,
    });
  }
  useEffect(() => {
    listarReguasNotificacao();
  }, []);

  return {
    reguas,
    isLoading,
    page,
    total,
    filtros,
    isSalvando,
    toggleAtivarInativar,
    setToggleAtivarInativar,
    setFiltros,
    setPage,
    listarReguasNotificacao,
    limparFiltros,
    ativarInativarAutomacao,
  };
};
