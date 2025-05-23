import { useEffect, useState } from 'react';
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
import { Info, LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AtualizarAutomacao from '@/services/automaoes/AtualizarAutomacao';
import { AutomacaoResponse } from '@/services/automaoes/ListarAutomacoes';
import ListaVariaveis from '@/components/ListaVariaveis';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import ListarClientesFiltroDinamico, {
  ClientesFiltroDinamicoResponse,
} from '@/services/cliente/ListarClientesFiltroDinamico';
import ListarTemplatesAutomacao, {
  TemplateAutomacaoResponse,
} from '@/services/templates-automacao/ListarTemplatesAutomacao';
import { NumericFormat } from 'react-number-format';

type AutomacaoProps = {
  automacao?: AutomacaoResponse;
  dispatch?: () => void;
};

export function AutomacaoCriar({ automacao, dispatch }: AutomacaoProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState<AutomacaoProp>();
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingTest, setIsFetchingTest] = useState(false);
  const [templates, setTemplates] = useState<TemplateAutomacaoResponse[]>([]);
  const [filtroCliente, setFiltroCliente] = useState<ClientesFiltroDinamicoResponse | null>(null);

  useEffect(() => {
    if (automacao?.id) {
      setForm({
        nome: automacao.nome,
        descricao: automacao.descricao,
        id: automacao.id,
        isAtivo: automacao.isAtivo,
        evento: {
          tipoEvento: automacao.evento.tipoEvento,
          parametro: JSON.stringify(automacao.evento.parametro),
        },
        acao: {
          assunto: automacao.acao.template.assunto,
          mensagem: automacao.acao.template.corpo,
          ordem: automacao.acao.ordem,
          templateEmailId: automacao.acao.template.templateId,
          tipoAcao: automacao.acao.tipoAcao,
          automacaoTemplateId: automacao.acao.template.id,
          isUtilizaCupom: automacao.acao.isUtilizaCupom ?? false,
          codigoCupom: automacao.acao.codigoCupom ?? '',
          isUsoIndividual: automacao.acao.isUsoIndividual ?? false,
          tipoDesconto: 'percent',
          valorDescontoCupom: automacao.acao.valorDescontoCupom ?? 0,
          valorMinimoCarrinho: automacao.acao.valorMinimoCarrinho ?? 0,
        },
      });
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
    setIsSaving(true);

    const payload = {
      nome: form?.nome,
      descricao: `Automação - ${form?.nome}`,
      isAtivo: form?.isAtivo,
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
        automacaoTemplateId: form?.acao?.automacaoTemplateId,
        isUtilizaCupom: form?.acao?.isUtilizaCupom || false,
        codigoCupom: form?.acao?.codigoCupom || '',
        isUsoIndividual: form?.acao?.isUsoIndividual || false,
        tipoDesconto: 'percent',
        valorDescontoCupom: form?.acao?.valorDescontoCupom || 0,
        valorMinimoCarrinho: form?.acao?.valorMinimoCarrinho || 0,
      },
    };

    if (!form?.id) {
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

      return;
    }

    if (form?.id) {
      AtualizarAutomacao.update(payload, form?.id)
        .then((response) => {
          if (!response.sucesso) {
            toast.error(response.mensagem);
            return;
          }

          toast.success('Automação atualizada com sucesso.');

          if (dispatch) {
            dispatch();
          }
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          setIsSaving(false);
        });

      return;
    }
  };

  const testarAutomacao = () => {
    if (!form?.evento?.parametro) return;
    setIsFetchingTest(true);
    ListarClientesFiltroDinamico.listar(JSON.parse(form?.evento?.parametro))
      .then((data) => {
        if (data?.length === 0) {
          toast.warn('Nenhum cliente foi encontrado com base nos filtros informados');
        }

        setFiltroCliente(data);
      })
      .finally(() => {
        setIsFetchingTest(false);
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
    <div className={`${!!filtroCliente && 'grid grid-cols-[2fr_1fr] gap-4'}`}>
      <Card className={`${!automacao ? 'border p-6 rounded-md border-gray-300' : 'border-none'} shadow-none  `}>
        <h2 className="text-xl font-bold">{form?.id ? 'Atualizar' : 'Criar'} Automação</h2>
        <span className="text-gray-500 text-sm">
          {form?.id ? 'Atualize' : 'Cadastre'} automações personalizadas pra interagir com seus clientes
        </span>

        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <Label>Nome da automação</Label>
            <Input value={form?.nome} onChange={(e) => handleChange('nome', e.target.value)} />
          </div>

          <div>
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
                <SelectItem value="STATUS_PEDIDO">Alteração de status do pedido</SelectItem>
                <SelectItem value="ANIVERSARIO">Aniversário do cliente</SelectItem>
                <SelectItem value="BOAS_VINDAS">Boas vindas</SelectItem>
                <SelectItem value="COMPRA_REALIZADA">Compra realizada</SelectItem>
                <SelectItem value="INATIVIDADE">Inatividade do cliente</SelectItem>
                <SelectItem value="FEEDBACK">Solicitar feedback ao cliente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tipo da ação</Label>
            <Select
              disabled={!!form?.id}
              value={form?.acao?.tipoAcao}
              onValueChange={(value) => handleChange('acao.tipoAcao', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo da ação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EMAIL">E-mail</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="">
            <Label>Template</Label>
            <Select
              disabled={!!form?.id}
              value={String(form?.acao?.templateEmailId)}
              onValueChange={(value) => handleChange('acao.templateEmailId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => {
                  return (
                    <SelectItem key={template.id} value={String(template.id)}>
                      {template.nome}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <Card className="rounded-md shadow-none p-4">
              <FiltrosAutomacao
                filtroSelecionado={(filtros) => {
                  handleChange('evento.parametro', filtros);
                }}
                filtrosIn={JSON.parse(form?.evento?.parametro || '[]')}
                evento={form?.evento?.tipoEvento || ''}
              />
            </Card>
          </div>

          <div className="flex flex-col col-span-2 ">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={form?.acao?.isUtilizaCupom}
                onClick={() => {
                  handleChange('acao.isUtilizaCupom', Boolean(!form?.acao?.isUtilizaCupom));

                  if (!form?.acao?.isUtilizaCupom) {
                    handleChange('acao.codigoCupom', '');
                    handleChange('acao.valorDescontoCupom', '');
                    handleChange('acao.isUsoIndividual', false);
                    handleChange('acao.valorMinimoCarrinho', '');
                  }
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Esta automação precisa de um cupom de desconto?
              </label>

              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Info size={15} className="text-red-500 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent className="w-[300px] bg-white text-gray-700 border shadow-md flex flex-col items-center">
                    <span className="text-sm font-bold mb-2 text-red-500">ATENÇÃO!!!</span>
                    <Separator />
                    <span className="text-center mt-2">
                      Ao marcar esta opção, será gerado um cupom de desconto exclusivo para cada cliente que receber uma
                      mensagem desta automação.
                    </span>

                    <p className="text-center mt-1">
                      Isso permite personalizar o incentivo e facilita o controle de uso individual por cliente.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              <div>
                <Label>Código do cupom</Label>
                <Input
                  disabled={!form?.acao?.isUtilizaCupom}
                  value={form?.acao?.codigoCupom}
                  onChange={(e) => handleChange('acao.codigoCupom', e.target.value)}
                />
              </div>

              <div>
                <Label>Total do desconto</Label>
                <div className="flex items-center gap-2">
                  <Input
                    disabled={!form?.acao?.isUtilizaCupom}
                    value={form?.acao?.valorDescontoCupom}
                    type="number"
                    min={0}
                    max={100}
                    onChange={(e) => handleChange('acao.valorDescontoCupom', e.target.value)}
                  />

                  <div
                    className={`flex items-center justify-center rounded-md shadow h-9 px-4 border ${
                      !form?.acao?.isUtilizaCupom && 'cursor-not-allowed opacity-50'
                    }`}
                  >
                    %
                  </div>
                </div>
              </div>

              <div>
                <Label>Valor mínimo compra</Label>
                <NumericFormat
                  disabled={!form?.acao?.isUtilizaCupom}
                  prefix="R$ "
                  decimalSeparator=","
                  thousandSeparator="."
                  decimalScale={2}
                  fixedDecimalScale
                  value={Number(form?.acao?.valorMinimoCarrinho) || 0}
                  allowNegative={false}
                  placeholder="R$ 0,00"
                  onValueChange={(value) => {
                    handleChange('acao.valorMinimoCarrinho', value.floatValue);
                  }}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="flex items-center mt-6 space-x-2 ">
                <Checkbox
                  id="terms"
                  disabled={!form?.acao?.isUtilizaCupom}
                  checked={form?.acao?.isUsoIndividual}
                  onClick={() => {
                    handleChange('acao.isUsoIndividual', Boolean(!form?.acao?.isUsoIndividual));
                  }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Apenas uma utilização permitida por cliente
                </label>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <Label>Assunto</Label>
            <Input value={form?.acao?.assunto} onChange={(e) => handleChange('acao.assunto', e.target.value)} />
            <ListaVariaveis
              onSelect={(variavel) => {
                handleChange('acao.assunto', `${form?.acao?.assunto || ''}${variavel}`);
              }}
            />
          </div>

          <div className="col-span-2">
            <Label>Mensagem</Label>
            <Textarea
              rows={5}
              value={form?.acao?.mensagem}
              onChange={(e) => handleChange('acao.mensagem', e.target.value)}
            />
            <ListaVariaveis
              onSelect={(variavel) => {
                handleChange('acao.mensagem', `${form?.acao?.mensagem || ''}${variavel}`);
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
                Automação {form?.isAtivo ? 'ativa' : 'inativa'}
              </label>
            </div>
          )}
        </div>

        <div className="w-full flex items-center justify-end gap-2 mt-5">
          {!form?.id && (
            <Button
              variant={'ghost'}
              className=""
              disabled={isSaving || isFetchingTest}
              onClick={() => {
                navigate('/automacoes');
              }}
            >
              Cancelar e voltar
            </Button>
          )}

          {!form?.id && form?.evento?.tipoEvento && (form?.evento?.parametro || form?.evento?.parametro !== '') && (
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
          )}

          <Button disabled={isSaving} onClick={handleSubmit} className="">
            {!isSaving && <span>{!form?.id ? 'Criar' : 'Atualizar'} automação</span>}

            {isSaving && (
              <span className="flex items-center gap-1">
                Salvando <LoaderCircle className="animate-spin" size={14} />
              </span>
            )}
          </Button>
        </div>
      </Card>

      {filtroCliente && (
        <Card className={`${!automacao ? 'border p-6 rounded-md border-gray-300' : 'border-none'} shadow-none  `}>
          <h2 className="text-xl font-bold">Lista de clientes</h2>
          <span className="text-gray-500 text-sm">
            Atenção: os dados apresentados são provisórios e estão sujeitos a mudanças durante o processamento.
          </span>

          <div className="grid grid-cols-2 mt-4 gap-2">
            {filtroCliente?.clientes.map((cliente) => {
              return (
                <div className="text-xs border rounded-md px-2 py-1 flex flex-col">
                  <span className="text-gray-400">Nome:</span>
                  <span>{cliente.pessoa.nome}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
