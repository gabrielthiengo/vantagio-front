import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { FiltrosAutomacao } from '@/components/FiltrosAutomacao';
import { Card } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { Info, LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ListaVariaveis from '@/components/ListaVariaveis';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import ListarTemplatesAutomacao, {
  TemplateAutomacaoResponse,
} from '@/services/templates-automacao/ListarTemplatesAutomacao';
import { CampanhaResponse } from '@/services/campanhas/ListarCampanhas';
import CriarAtualizarCampanha from '@/services/campanhas/CriarAtualizarCampanha';

type CampanhaProps = {
  campanha?: CampanhaResponse;
  dispatch?: () => void;
};

export function CampanhaDetalhe({ campanha, dispatch }: CampanhaProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState<CampanhaResponse>({} as CampanhaResponse);
  const [isSaving, setIsSaving] = useState(false);
  const [templates, setTemplates] = useState<TemplateAutomacaoResponse[]>([]);

  useEffect(() => {
    if (campanha?.id) {
      setForm(campanha);
    }

    listarTemplatesAutomacao();
  }, []);

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
    setIsSaving(false);

    CriarAtualizarCampanha.createOrUpdate(form)
      .then((data) => {
        if (!data.sucesso) {
          toast.error(data.mensagem);
          return;
        }

        toast.success(data.mensagem);

        if (dispatch) {
          dispatch();
        }
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const listarTemplatesAutomacao = () => {
    ListarTemplatesAutomacao.listar().then((data) => {
      if (data.length > 0) {
        setTemplates(data);
      }
    });
  };

  return (
    <div>
      <Card className={`${!campanha ? 'border p-6 rounded-md border-gray-300' : 'border-none'} shadow-none  `}>
        <h2 className="text-xl font-bold">{form?.id ? 'Atualizar' : 'Criar'} campanha</h2>
        <span className="text-gray-500 text-sm">
          {form?.id ? 'Atualize' : 'Cadastre'} campanhas personalizadas pra interagir com seus clientes
        </span>

        <div className="mt-5 flex flex-col gap-2">
          <div className="w-full flex gap-2">
            <div className="w-full">
              <Label>Nome da Campanha</Label>
              <Input value={form?.nome} onChange={(e) => handleChange('nome', e.target.value)} />
            </div>

            <div className="w-full">
              <Label>Descrição da Campanha</Label>
              <Input value={form?.descricao} onChange={(e) => handleChange('descricao', e.target.value)} />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <Label>Data de início</Label>
              <Input
                type="date"
                disabled={form?.isProcessado}
                value={form?.dataInicio ? new Date(form?.dataInicio).toISOString().split('T')[0] : ''}
                onChange={(e) => handleChange('dataInicio', e.target.value)}
              />
            </div>

            <div className="w-full">
              <Label>Data fim</Label>

              <Input
                type="date"
                disabled={form?.isProcessado}
                value={form?.dataFim ? new Date(form?.dataFim).toISOString().split('T')[0] : ''}
                onChange={(e) => handleChange('dataFim', e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col justify-end">
              <div className="flex mb-1 gap-2">
                <Label>Recorrência prévia</Label>
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Info size={15} className=" cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent className="w-[300px] bg-white text-gray-700 border shadow-md flex flex-col items-center">
                      <span className="text-center mt-2">
                        Recorrência prévia indica quantos dias antes da data de início a comunicação será enviada ao
                        cliente.
                      </span>

                      <p className="text-center mt-1">
                        Exemplo: se a data de início for 10/05 e a recorrência prévia estiver definida para 10 dias, as
                        comunicações começarão em 30/04 (dez dias antes da data de início).
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                disabled={form?.isProcessado}
                placeholder="Ex: 10 dias"
                type="number"
                min={0}
                onChange={(e) => handleChange('recorrenciaPreviaDias', Number(e.target.value))}
              />
            </div>

            <div className="w-full flex flex-col justify-end">
              <div className="flex mb-1 gap-2">
                <Label>Qtd. processamento</Label>
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Info size={15} className=" cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent className="w-[300px] bg-white text-gray-700 border shadow-md flex flex-col items-center">
                      <span className="text-center mt-2">
                        Quantidade de processamento representa o número de vezes que a campanha será processada antes da
                        data de início.
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                disabled={form?.isProcessado}
                placeholder="Ex: 2"
                type="number"
                min={0}
                onChange={(e) => handleChange('quantidadeProcessamento', Number(e.target.value))}
              />
            </div>

            <div className="w-full flex flex-col justify-end">
              <div className="flex mb-1 gap-2">
                <Label>Dif. dias processamento</Label>
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Info size={15} className=" cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent className="w-[300px] bg-white text-gray-700 border shadow-md flex flex-col items-center">
                      <span className="text-center mt-2">
                        Diferença de dias entre processamentos define o intervalo, em dias, entre cada execução da
                        campanha.
                      </span>

                      <p className="text-center mt-1">
                        Exemplo: se a campanha estiver configurada para ser processada duas vezes (Qtd. processamento) e
                        o intervalo entre processamentos for de dois dias, então haverá um intervalo de dois dias entre
                        cada execução.
                      </p>

                      <p className="text-center mt-1">
                        Recomenda-se que o intervalo entre os dias seja superior a 5, pois valores menores podem causar
                        incômodo ao cliente devido ao recebimento de comunicações em sequência.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                disabled={form?.isProcessado}
                placeholder="Ex: 10 dias"
                type="number"
                min={0}
                onChange={(e) => handleChange('diferencaDiasProcessamento', Number(e.target.value))}
              />
            </div>
          </div>

          <div className=" flex gap-2">
            <div className="w-full">
              <Label>Canal de comunicação</Label>
              <Select
                disabled={!!form?.id}
                value={form?.mensagem?.canalComunicacao}
                onValueChange={(value) => handleChange('mensagem.canalComunicacao', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o canal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">E-mail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <Label>Template</Label>
              <Select
                disabled={!!form?.id}
                value={String(form?.mensagem?.templateId ?? '')}
                onValueChange={(value) => handleChange('mensagem.templateId', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => {
                    return (
                      <div>
                        <SelectItem key={template.id} value={String(template.id)}>
                          <span>{template.nome}</span>
                        </SelectItem>
                        <span className="pl-2 text-xs text-gray-400">{template.descricao}</span>

                        <Separator />
                      </div>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <Label>Tipo do evento</Label>
              <Select
                disabled={!!form?.id}
                value={form?.evento?.tipoEvento}
                onValueChange={(value) => handleChange('evento.tipoEvento', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DESCONTO_RELAMPAGO">Desconto/Promoção relâmpago</SelectItem>
                  <SelectItem value="DESCONTO_PROGRESSIVO">Desconto progressivo</SelectItem>
                  <SelectItem value="FRETE_GRATIS">Frete grátis</SelectItem>
                  <SelectItem value="COMPRE_GANHE">Compre ganhe</SelectItem>
                  <SelectItem value="DATA_COMEMORATIVA">Datas comemorativas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="col-span-2">
            <Card className="rounded-md shadow-none p-4">
              <FiltrosAutomacao
                filtroSelecionado={(filtros) => {
                  handleChange('evento.filtros', JSON.parse(filtros));
                }}
                filtrosIn={JSON.parse(JSON.stringify(form?.evento?.filtros) || '[]')}
                evento={form?.evento?.tipoEvento || ''}
              />
            </Card>
          </div>

          <div className="">
            <Label>Assunto</Label>
            <Input value={form?.mensagem?.assunto} onChange={(e) => handleChange('mensagem.assunto', e.target.value)} />
            <ListaVariaveis
              onSelect={(variavel) => {
                handleChange('mensagem.assunto', `${form?.mensagem?.assunto || ''}${variavel}`);
              }}
            />
          </div>

          <div className="col-span-2">
            <Label>Mensagem</Label>
            <Textarea
              rows={5}
              value={form?.mensagem?.mensagem}
              onChange={(e) => handleChange('mensagem.mensagem', e.target.value)}
            />
            <ListaVariaveis
              onSelect={(variavel) => {
                handleChange('mensagem.mensagem', `${form?.mensagem?.mensagem || ''}${variavel}`);
              }}
            />
          </div>

          {form?.id && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={form?.isAtivo}
                disabled={!form?.id}
                onClick={() => {
                  handleChange('isAtivo', Boolean(!form?.isAtivo));
                }}
              />

              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Campanha {form?.isAtivo ? 'ativa' : 'inativa'}
              </label>
            </div>
          )}
        </div>

        <div className="w-full flex items-center justify-end gap-2 mt-5">
          {!form?.id && (
            <Button
              variant={'ghost'}
              className=""
              disabled={isSaving}
              onClick={() => {
                navigate('/automacao');
              }}
            >
              Cancelar e voltar
            </Button>
          )}

          <Button disabled={isSaving} onClick={handleSubmit} className="">
            {!isSaving && <span>{!form?.id ? 'Criar' : 'Atualizar'} campanha</span>}

            {isSaving && (
              <span className="flex items-center gap-1">
                Salvando <LoaderCircle className="animate-spin" size={14} />
              </span>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
