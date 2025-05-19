import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { FiltrosAutomacao } from '@/components/FiltrosAutomacao';
import { Card } from '@/components/ui/card';
import { AutomacaoProp } from './type';
import CriarAutomacao from '@/services/automaoes/CriarAutomacao';
import { toast } from 'react-toastify';
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AutomacaoCriar() {
  const navigate = useNavigate();
  const [form, setForm] = useState<AutomacaoProp>();
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingTest, setIsFetchingTest] = useState(false);

  const handleChange = (key: string, value: any) => {
    const keys = key.split('.');
    setForm((prev) => {
      const newForm = { ...prev } as any;
      let current = newForm;

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!current[k]) current[k] = {};
        current = current[k];
      }

      current[keys[keys.length - 1]] = value;
      return newForm;
    });
  };

  const handleSubmit = () => {
    setIsSaving(true);
    const payload = {
      nome: form?.nome,
      descricao: `Automação - ${form?.nome}`,
      evento: {
        tipoEvento: form?.evento?.tipoEvento || '',
        parametro: form?.evento?.parametro || '',
      },
      acao: {
        ordem: 0,
        tipoAcao: form?.acao?.tipoAcao || '',
        assunto: form?.acao?.assunto || '',
        mensagem: form?.acao?.mensagem || '',
        templateEmailId: form?.acao?.templateEmailId || 0,
      },
    };

    CriarAutomacao.create(payload)
      .then((response) => {
        if (!response.sucesso) {
          toast.error(response.mensagem);
          return;
        }

        toast.success('Automação criada com sucesso.');

        navigate('/automacoes');
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const testarAutomacao = () => {};

  return (
    <Card className="p-6 rounded-md shadow-none border border-gray-300">
      <h2 className="text-xl font-bold">Criar Automação</h2>
      <span className="text-gray-500 text-sm">Cadastre automações personalizadas pra interagir com seus clientes</span>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <div>
          <Label>Nome da automação</Label>
          <Input value={form?.nome} onChange={(e) => handleChange('nome', e.target.value)} />
        </div>

        <div>
          <Label>Tipo do evento</Label>
          <Select value={form?.evento?.tipoEvento} onValueChange={(value) => handleChange('evento.tipoEvento', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um evento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALERTA_PROMOCAO">Alerta de promoção</SelectItem>
              <SelectItem value="STATUS_PEDIDO">Alteração de status do pedido</SelectItem>
              <SelectItem value="ANIVERSARIO">Aniversário do cliente</SelectItem>
              <SelectItem value="ANIVERSARIO_EMPRESA">Aniversário da empresa</SelectItem>
              <SelectItem value="BOAS_VINDAS">Boas vindas</SelectItem>
              <SelectItem value="COMPRA_REALIZADA">Compra realizada</SelectItem>
              <SelectItem value="EVENTO_PERSONALIZADO">Evento personalizado</SelectItem>
              <SelectItem value="INATIVIDADE">Inatividade do cliente</SelectItem>
              <SelectItem value="FEEDBACK">Solicitar feedback ao cliente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <Label>Template de e-mail</Label>
          <Select
            value={String(form?.acao?.templateEmailId)}
            onValueChange={(value) => handleChange('acao.templateEmailId', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um evento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Template padrão</SelectItem>
              <SelectItem value="2">Template promoção relâmpago</SelectItem>
              <SelectItem value="3">Template aniversariante</SelectItem>
              <SelectItem value="4">Template boas vindas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Tipo da ação</Label>
          <Select value={form?.acao?.tipoAcao} onValueChange={(value) => handleChange('acao.tipoAcao', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o canal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EMAIL">E-mail</SelectItem>
              <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2">
          <Card className="rounded-md shadow-none p-4">
            <FiltrosAutomacao
              filtroSelecionado={(filtros) => {
                console.log(filtros);
                handleChange('evento.parametro', filtros);
              }}
              evento={form?.evento?.tipoEvento || ''}
            />
          </Card>
        </div>

        <div className="col-span-2">
          <Label>Assunto</Label>
          <Input value={form?.acao?.assunto} onChange={(e) => handleChange('acao.assunto', e.target.value)} />
        </div>

        <div className="col-span-2">
          <Label>Mensagem</Label>
          <Textarea
            rows={5}
            value={form?.acao?.mensagem}
            onChange={(e) => handleChange('acao.mensagem', e.target.value)}
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-end gap-2 mt-5">
        <Button
          variant={'outline'}
          className="border-orange-400 text-orange-500 hover:border-orange-600 hover:text-orange-600"
          disabled={isSaving || isFetchingTest}
          onClick={testarAutomacao}
        >
          {!isFetchingTest && <span>Testar automação</span>}

          {isFetchingTest && (
            <span className="flex items-center gap-1">
              Carregando <LoaderCircle className="animate-spin" size={14} />
            </span>
          )}
        </Button>

        <Button disabled={isSaving} onClick={handleSubmit} className="">
          {!isSaving && <span>Criar automação</span>}

          {isSaving && (
            <span className="flex items-center gap-1">
              Salvando <LoaderCircle className="animate-spin" size={14} />
            </span>
          )}
        </Button>
      </div>
    </Card>
  );
}
