import { ICamposIntegracao } from '@/interfaces/ICamposIntegracao';
import { apiRequest } from '@/services/apiRequest';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useCamposCustomizados = (empresaId: number) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isSalvando, setIsSalvando] = useState(false);
  const [toggleDialogCriar, setToggleDialogCriar] = useState(false);
  const [camposIntegracao, setCamposIntegracao] = useState<ICamposIntegracao[]>([]);
  const [campoIntegracaoRecord, setCampoIntegracaoRecord] = useState({
    campo: '',
    path: '',
    tenantId: empresaId,
    funcionalidade: '',
  });

  const listarCamposIntegracao = async () => {
    const { data } = await apiRequest<ICamposIntegracao[]>('/empresa/campos/customizados', 'GET', {
      empresaId,
    });

    if (data) {
      setCamposIntegracao(data);
    }

    setIsFetching(false);
  };

  const excluirCampoIntegracao = async (campoId: number) => {
    toggleExcluindo(campoId);

    const { sucesso, mensagem } = await apiRequest('/empresa/campos/customizados', 'DELETE', { campoId });

    if (sucesso) {
      toast.success(mensagem);
      toggleExcluindo(campoId);

      listarCamposIntegracao();

      return;
    }

    toast.error(mensagem);

    toggleExcluindo(campoId);
  };

  const toggleExcluindo = (campoId: number) => {
    setCamposIntegracao((prev) =>
      prev.map((item) => {
        if (item.id === campoId) {
          return { ...item, isExcluindo: !item.isExcluindo };
        }

        return item;
      }),
    );
  };

  const criarCampoIntegracao = async () => {
    if (campoIntegracaoRecord.campo === '') {
      toast.error('Informe o nome do campo');
      return;
    }

    if (campoIntegracaoRecord.path === '') {
      toast.error('Informe o path do campo');
      return;
    }

    if (campoIntegracaoRecord.funcionalidade === '') {
      toast.error('Informe a funcionalidade do campo');
      return;
    }

    setIsSalvando(true);

    const { sucesso, mensagem } = await apiRequest('/empresa/campos/customizados', 'POST', campoIntegracaoRecord);

    if (sucesso) {
      toast.success(mensagem);

      listarCamposIntegracao();

      setToggleDialogCriar(false);
      setIsSalvando(false);
      return;
    }

    toast.error(mensagem);
    setIsSalvando(false);
  };

  useEffect(() => {
    listarCamposIntegracao();
  }, []);

  return {
    isFetching,
    camposIntegracao,
    isSalvando,
    toggleDialogCriar,
    campoIntegracaoRecord,
    setCampoIntegracaoRecord,
    setToggleDialogCriar,
    excluirCampoIntegracao,
    criarCampoIntegracao,
  };
};
