import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { reguaDetalheSchema, ReguaDetalheSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '@/services/apiRequest';
import { IEtapa, IRegua } from '@/interfaces/IRegua';
import { ITemplate } from '@/interfaces/ITemplate';
import { IGatilho } from '@/interfaces/IGatilho';

type ReguaDadosRequest = {
  templates: ITemplate[];
  condicaoSaidas: string[];
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
    condicaoSaida: '0',
    delayDias: 0,
    ordem: 0,
    template: {} as ITemplate,
    qtdEnviosDia: 100,
    canalLabel: '',
    condicaoLabel: '',
    templateLabel: '',
  });
  const [etapaList, setEtapaList] = useState<IEtapa[]>([]);
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [gatilhos, setGatilhos] = useState<IGatilho[]>([]);
  const [condicoes, setCondicoes] = useState<string[]>([]);

  async function criarReguaNotificacao(regua: ReguaDetalheSchema) {
    const etapasFormatadas = etapaList.map((e, index) => ({
      ordem: index,
      delayDias: e.delayDias,
      canal: e.canal,
      templateId: e.template?.id,
      qtdEnviosDia: e.qtdEnviosDia,
      condicaoSaida: e.condicaoSaida === '0' ? null : e.condicaoSaida,
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
      condicaoSaida: e.condicaoSaida === '0' ? null : e.condicaoSaida,
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

    if (data?.condicaoSaidas) {
      setCondicoes(data.condicaoSaidas);
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
    setEtapaList((prev) => [...prev, etapaRecord]);

    setEtapaRecord({
      canal: '0',
      condicaoSaida: '0',
      delayDias: 5,
      ordem: 0,
      template: {} as ITemplate,
      canalLabel: '',
      qtdEnviosDia: 100,
      condicaoLabel: '',
      templateLabel: '',
    });
  };

  const removerEtapa = (index: number) => {
    setEtapaList((prev) => prev.filter((_, i) => i !== index));
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
  };
};
