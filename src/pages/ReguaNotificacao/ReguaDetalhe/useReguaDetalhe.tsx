import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { etapaSchema, reguaDetalheSchema, ReguaDetalheSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '@/services/apiRequest';
import { IEtapa, IRegua } from '@/interfaces/IRegua';

export const useReguaDetalhe = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
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
    templateId: 0,
    canalLabel: '',
    condicaoLabel: '',
    templateLabel: '',
  });
  const [etapaList, setEtapaList] = useState<IEtapa[]>([]);

  async function handleFormSubmit(regua: ReguaDetalheSchema): Promise<void | string> {
    console.log('aqiio');
    setIsLoading(true);
    setIsSuccess(false);

    const etapasFormatadas = etapaList.map((e, index) => ({
      ordem: index,
      delayDias: e.delayDias,
      canal: e.canal,
      templateId: e.templateId,
      condicaoSaida: e.condicaoSaida,
    }));

    if (regua.dataFim === '') regua.dataFim = null;

    console.log(regua);

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
      return '';
    }

    toast.success('Automação salva com sucesso');

    setIsSuccess(true);
    setIsLoading(false);

    navigate(`/regua`);
  }

  async function getInitialData() {}

  const adicionarEtapa = () => {
    setEtapaList((prev) => [...prev, etapaRecord]);

    setEtapaRecord({
      canal: '0',
      condicaoSaida: '0',
      delayDias: 0,
      ordem: 0,
      templateId: 0,
      canalLabel: '',
      condicaoLabel: '',
      templateLabel: '',
    });
  };

  const removerEtapa = (index: number) => {};

  return {
    isLoading,
    isSuccess,
    errors,
    isValid,
    control,
    reguaRecord,
    etapaRecord,
    register,
    handleSubmit,
    handleFormSubmit,
    setValue,
    setReguaRecord,
    setEtapaRecord,
    etapaList,
    setEtapaList,
    adicionarEtapa,
  };
};
