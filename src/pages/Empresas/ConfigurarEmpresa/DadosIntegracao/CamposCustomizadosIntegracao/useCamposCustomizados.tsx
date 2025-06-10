import CriarCampoIntegracao from '@/services/empresa/CriarCampoIntegracao';
import ExcluirCampoIntegracao from '@/services/empresa/ExcluirCampoIntegracao';
import ListarCamposIntegracaoEmpresa, { CamposIntegracaoRes } from '@/services/empresa/ListarCamposIntegracaoEmpresa';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useCamposCustomizados = (empresaId: number) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isSalvando, setIsSalvando] = useState(false);
  const [toggleDialogCriar, setToggleDialogCriar] = useState(false);
  const [camposIntegracao, setCamposIntegracao] = useState<CamposIntegracaoRes[]>([]);
  const [campoIntegracaoRecord, setCampoIntegracaoRecord] = useState({
    campo: '',
    path: '',
    tenantId: empresaId,
    funcionalidade: '',
  });

  const listarCamposIntegracao = () => {
    ListarCamposIntegracaoEmpresa.list(empresaId)
      .then((data) => {
        setCamposIntegracao(data.campos);
      })
      .catch(() => {
        toast.error('Houve um erro ao tentar listar os dados. Tente novamente mais tarde');
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const excluirCampoIntegracao = async (campoId: number) => {
    toggleExcluindo(campoId);
    ExcluirCampoIntegracao.delete(campoId)
      .then((data) => {
        if (data.sucesso) {
          toast.success(data.mensagem);

          listarCamposIntegracao();
          return;
        }

        toast.error(data.mensagem);
      })
      .finally(() => {
        toggleExcluindo(campoId);
      });
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

    CriarCampoIntegracao.create(campoIntegracaoRecord)
      .then((data) => {
        if (data.sucesso) {
          toast.success(data.mensagem);

          listarCamposIntegracao();

          setToggleDialogCriar(false);
          return;
        }

        toast.error(data.mensagem);
      })
      .finally(() => {
        setIsSalvando(false);
      });
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
