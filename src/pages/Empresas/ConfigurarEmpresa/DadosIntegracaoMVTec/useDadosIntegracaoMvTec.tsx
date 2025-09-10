import { IConfiguracaoDatabaseMV } from '../../../../interfaces/IConfiguracaoDatabaseMV';
import { IQueryDatabaseMV } from '../../../../interfaces/IQueryDatabaseMV';
import { IScheduleJobMV } from '../../../../interfaces/IScheduleJobMV';
import { apiRequest } from '../../../../services/apiRequest';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type DadosIntegracaoResponse = {
  configuracao: IConfiguracaoDatabaseMV;
  queries: IQueryDatabaseMV[];
  schedules: IScheduleJobMV[];
  isExibirAlertaIntegracao: boolean;
};

export const useDadosIntegracaoMvTec = (empresaId: number) => {
  const [isFetching, setIsFetching] = useState(true);
  const [isSalvandoConfiguracao, setIsSalvandoConfiguracao] = useState(false);
  const [dadosIntegracao, setDadosIntegracao] = useState<DadosIntegracaoResponse>();
  const [configuracaoRecord, setConfiguracaoRecord] = useState<IConfiguracaoDatabaseMV>({} as IConfiguracaoDatabaseMV);

  const listarDadosIntegracao = async () => {
    const { data } = await apiRequest<DadosIntegracaoResponse>('/empresa/integracao/mv', 'GET', {
      empresaId,
    });

    if (data) {
      setDadosIntegracao(data);
      setConfiguracaoRecord(data.configuracao);
    }

    setIsFetching(false);
  };

  const atualizarConfiguracaoDatabase = async () => {
    console.log(configuracaoRecord);
    if (!configuracaoRecord?.pathDatabase || configuracaoRecord?.pathDatabase === '') {
      toast.error('Informe o path do banco de dados');

      return;
    }
    if (!configuracaoRecord?.user || configuracaoRecord?.user === '') {
      toast.error('Informe um usuário do banco de dados');

      return;
    }

    if (!configuracaoRecord?.password || configuracaoRecord?.password === '') {
      toast.error('Informe uma senha do banco de dados');

      return;
    }

    if (!configuracaoRecord?.port || String(configuracaoRecord?.port).length !== 4) {
      toast.error('A porta banco de dados está inválida');

      return;
    }

    setIsSalvandoConfiguracao(true);

    await apiRequest<DadosIntegracaoResponse>('/empresa/integracao/mv/configuracao', 'PUT', configuracaoRecord)
      .then((response) => {
        if (!response.sucesso) {
          toast.error(response.mensagem);
          return;
        }

        setIsFetching(true);
        listarDadosIntegracao();

        toast.success(response.mensagem);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsSalvandoConfiguracao(false);
      });
  };

  useEffect(() => {
    listarDadosIntegracao();
  }, []);

  return {
    isFetching,
    dadosIntegracao,
    configuracaoRecord,
    setConfiguracaoRecord,
    atualizarConfiguracaoDatabase,
    isSalvandoConfiguracao,
  };
};
