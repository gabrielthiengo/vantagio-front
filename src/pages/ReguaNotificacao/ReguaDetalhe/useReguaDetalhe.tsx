import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { reguaDetalheSchema, ReguaDetalheSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '@/services/apiRequest';
import { ICondicaoSaida, IEtapa, IRegua } from '@/interfaces/IRegua';
import { ITemplate } from '@/interfaces/ITemplate';
import { IGatilho } from '@/interfaces/IGatilho';
import { ICupomDesconto } from '@/interfaces/ICupomDesconto';

type ReguaDadosRequest = {
  templates: ITemplate[];
  condicoes: ICondicaoSaida[];
  gatilhos: IGatilho[];
};

export const useReguaDetalhe = (reguaId?: number) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    handleSubmit,
    reset,
    register,
    setValue,
    getValues,
    control,
    formState: { errors, isValid },
  } = useForm<ReguaDetalheSchema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(reguaDetalheSchema),
  });

  const [reguaRecord, setReguaRecord] = useState<IRegua>({} as IRegua);
  const [etapaRecord, setEtapaRecord] = useState<IEtapa>({
    canal: '0',
    condicao: {} as ICondicaoSaida,
    delayDias: 0,
    ordem: 0,
    template: {} as ITemplate,
    qtdEnviosDia: 100,
  });
  const [etapaList, setEtapaList] = useState<IEtapa[]>([]);
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [gatilhos, setGatilhos] = useState<IGatilho[]>([]);
  const [condicoes, setCondicoes] = useState<ICondicaoSaida[]>([]);
  const [cupomRecord, setCupomRecord] = useState<ICupomDesconto>({
    tipoDesconto: 'percentual',
    valorDesconto: 10,
    valorMinimoCompra: 0,
    dataInicioValidade: new Date(),
    qtdTotalUso: 0,
    qtdUsoCliente: 1,
    qtdDiasValidade: 15,
  });

  async function criarReguaNotificacao(regua: ReguaDetalheSchema) {
    const etapasFormatadas = etapaList.map((e, index) => ({
      ordem: index,
      delayDias: e.delayDias,
      canal: e.canal,
      templateId: e.template?.id ?? null,
      qtdEnviosDia: e.qtdEnviosDia,
      condicaoSaidaId: e.condicao?.id ?? null,
      dataInicioValidade: new Date(),
      isUtilizaCupom: e.isUtilizaCupom,
      isEnviarCupomEtapaAnterior: e.isEnviarCupomEtapaAnterior,
      isUtilizaCupomExistente: e.isUtilizaCupomExistente,
      cupom: e.isUtilizaCupom || e.isUtilizaCupomExistente ? e.cupom : null,
    }));

    const { sucesso, mensagem } = await apiRequest<IRegua>('/regua', 'POST', {
      nome: regua.nome,
      descricao: regua.descricao,
      gatilhoId: regua.gatilhoId,
      dataInicio: regua.dataInicio,
      dataFim: regua.dataFim,
      etapas: etapasFormatadas,
    });

    if (!sucesso) {
      setIsLoading(false);
      toast.error(mensagem);
      return;
    }

    toast.success('Automação salva com sucesso');

    setIsSuccess(true);
    setIsLoading(false);

    navigate(`/regua`);
  }

  async function atualizarReguaNotificacao() {
    const etapasFormatadas = etapaList.map((e, index) => ({
      id: e.id,
      reguaId: e.reguaId,
      ordem: index,
      delayDias: e.delayDias,
      canal: e.canal,
      templateId: e.template?.id,
      qtdEnviosDia: e.qtdEnviosDia,
      condicaoSaidaId: e.condicao?.id ?? null,
      isUtilizaCupom: e.isUtilizaCupom,
      isEnviarCupomEtapaAnterior: e.isEnviarCupomEtapaAnterior,
      isUtilizaCupomExistente: e.isUtilizaCupomExistente,
      cupom: e.isUtilizaCupom || e.isUtilizaCupomExistente ? e.cupom : null,
    }));

    const { sucesso, mensagem } = await apiRequest<IRegua>('/regua', 'PUT', {
      id: reguaId,
      nome: getValues().nome,
      descricao: getValues().descricao,
      gatilhoId: getValues().gatilhoId,
      dataInicio: getValues().dataInicio,
      dataFim: getValues().dataFim,
      etapas: etapasFormatadas,
    });

    if (!sucesso) {
      setIsLoading(false);
      toast.error(mensagem);
      return;
    }

    toast.success('Automação atualizada com sucesso');

    setIsSuccess(true);
    setIsLoading(false);

    navigate(`/regua`);
  }

  async function handleFormSubmit(regua: ReguaDetalheSchema): Promise<void | string> {
    setIsLoading(true);
    setIsSuccess(false);

    if (regua.dataFim === '') regua.dataFim = null;

    await criarReguaNotificacao(regua);
    return;
  }

  async function getInitialData() {
    const { data } = await apiRequest<ReguaDadosRequest>('/regua/dados', 'GET');

    if (data?.gatilhos) {
      setGatilhos(data?.gatilhos);
    }

    if (data?.condicoes) {
      setCondicoes(data.condicoes);
    }
  }

  async function listarTemplates(canal: string) {
    setIsLoadingTemplate(true);
    const { data } = await apiRequest<ITemplate[]>('/template', 'GET', null, {
      canal,
    });

    if (data) {
      setTemplates(data);
    }

    setIsLoadingTemplate(false);
  }

  async function obterReguaNotificacao() {
    setIsLoading(true);

    const { data } = await apiRequest<IRegua>('/regua', 'GET', null, { reguaId });

    if (data) {
      setReguaRecord(data);

      reset({
        nome: data.nome,
        gatilhoId: data.gatilhoId,
        descricao: data.descricao,
        dataInicio: data.dataInicio,
        dataFim: String(data.dataFim),
      });

      setEtapaList(data.etapas);

      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (reguaId) {
      obterReguaNotificacao();
    }
    getInitialData();
  }, []);

  const adicionarEtapa = () => {
    if (etapaRecord.isUtilizaCupom) {
      if (!cupomRecord.tipoDesconto || cupomRecord.tipoDesconto === '0') {
        toast.error('Informe um tipo de desconto para o cupom');
        return;
      }

      if (!cupomRecord.valorDesconto) {
        toast.error('Informe um valor válido para o cupom');
        return;
      }

      if (cupomRecord.qtdUsoCliente === 0) {
        toast.error('A quantidade total de utilização por cliente deve ser maior que 0');
        return;
      }
    }

    if (etapaRecord.isUtilizaCupomExistente && (!cupomRecord.codigo || cupomRecord.codigo === '')) {
      toast.error('O código do cupom é obrigatório');
      return;
    }

    const novaEtapa = {
      ...etapaRecord,
      cupom: etapaRecord.isUtilizaCupom
        ? {
            tipoDesconto: cupomRecord.tipoDesconto,
            valorDesconto: cupomRecord.valorDesconto,
            valorMinimoCompra: cupomRecord.valorMinimoCompra === 0 ? null : cupomRecord.valorMinimoCompra,
            dataInicioValidade: cupomRecord.dataInicioValidade,
            qtdTotalUso: cupomRecord.qtdTotalUso === 0 ? null : cupomRecord.qtdTotalUso,
            qtdUsoCliente: cupomRecord.qtdUsoCliente,
            qtdDiasValidade: cupomRecord.qtdDiasValidade,
          }
        : etapaRecord.isUtilizaCupomExistente
        ? { codigo: cupomRecord.codigo }
        : null,
    };

    setEtapaList((prev) => [...prev, novaEtapa]);

    limparEtapaRecord();

    setEtapaRecord({
      canal: '0',
      condicao: {} as ICondicaoSaida,
      delayDias: 5,
      ordem: 0,
      template: {} as ITemplate,
      qtdEnviosDia: 100,
      isUtilizaCupom: false,
      isEnviarCupomEtapaAnterior: false,
      isUtilizaCupomExistente: false,
    });
  };

  const limparEtapaRecord = () => {
    setCupomRecord({
      codigo: null,
      tipoDesconto: 'percentual',
      dataInicioValidade: new Date(),
      valorDesconto: 10,
      qtdTotalUso: 0,
      qtdUsoCliente: 1,
      valorMinimoCompra: 0,
      qtdDiasValidade: 15,
    });
  };

  const removerEtapa = (index: number) => {
    setEtapaList((prev) => prev.filter((_, i) => i !== index));
  };

  const existeCupomEtapaAnterior = (): boolean => {
    return etapaList.some((etapa) => etapa.isUtilizaCupom === true);
  };

  return {
    isLoading,
    isSuccess,
    errors,
    isValid,
    control,
    reguaRecord,
    etapaRecord,
    templates,
    condicoes,
    gatilhos,
    isLoadingTemplate,
    cupomRecord,
    setCupomRecord,
    register,
    handleSubmit,
    handleFormSubmit,
    setValue,
    setReguaRecord,
    setEtapaRecord,
    etapaList,
    setEtapaList,
    adicionarEtapa,
    setTemplates,
    removerEtapa,
    atualizarReguaNotificacao,
    listarTemplates,
    limparEtapaRecord,
    existeCupomEtapaAnterior,
  };
};
