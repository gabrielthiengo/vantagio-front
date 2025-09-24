import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import InputBlock from '@/components/InputBlock';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Boxes, ChevronsRight, LoaderCircle, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CardFeedback from '@/components/CardFeedback';
import { InputError } from '@/components/InputErrors';
import { useReguaDetalhe } from './useReguaDetalhe';
import { Controller } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Template from '@/components/Template';
import { useParams } from 'react-router-dom';
import LoadingComponent from '@/components/LoadingComponent';
import { ITemplate } from '@/interfaces/ITemplate';

const ReguaDetalhe: React.FC = () => {
  const { id: reguaId } = useParams();
  const [toggleTemplate, setToggleTemplate] = useState(false);
  const {
    register,
    handleSubmit,
    handleFormSubmit,
    reguaRecord,
    etapaRecord,
    setEtapaRecord,
    etapaList,
    adicionarEtapa,
    errors,
    control,
    templates,
    isLoading,
    condicoes,
    gatilhos,
    isLoadingTemplate,
    setTemplates,
    removerEtapa,
    atualizarReguaNotificacao,
    listarTemplates,
  } = useReguaDetalhe(Number(reguaId));

  return (
    <div>
      <PageHeader
        title={`${reguaId ? 'Atualizar' : 'Criar'} automação`}
        icon={<Boxes size={18} />}
        previousPage="/regua"
      />

      {isLoading && <LoadingComponent />}

      {new Date(reguaRecord.dataFim ?? new Date()) < new Date() && (
        <p className="mb-4">
          <span className="text-red-500">Atenção:</span> esta automação está <strong>encerrada</strong>.
        </p>
      )}

      {!isLoading && (
        <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit(handleFormSubmit)}>
          <Card>
            <CardHeader>Configurações da automação</CardHeader>
            <CardContent className="flex flex-col gap-1">
              <Separator />

              <InputBlock label="Nome" isRequired>
                <>
                  <Input
                    {...register('nome')}
                    placeholder="Ex: Automação xpto"
                    className={`${errors.nome && 'border-red-500'}`}
                    disabled={!!reguaId}
                  />
                  {errors.nome && <InputError error={errors.nome?.message ?? ''} />}
                </>
              </InputBlock>

              <InputBlock label="Descrição">
                <>
                  <Input
                    {...register('descricao')}
                    placeholder="Ex: Automação para clientes..."
                    disabled={new Date(reguaRecord.dataFim ?? new Date()) < new Date()}
                  />
                  {errors.descricao && <InputError error={errors.descricao?.message ?? ''} />}
                </>
              </InputBlock>

              <InputBlock
                label="Critério de início"
                isRequired
                info="É o evento que vai iniciar esta automação. Sempre que a condição selecionada acontecer, as etapas da automação serão executadas automaticamente."
              >
                <>
                  <Controller
                    name="gatilhoId"
                    control={control}
                    rules={{ required: 'Selecione um critério de início' }}
                    render={({ field }) => (
                      <Select
                        onValueChange={(v) => {
                          field.onChange(Number(v));
                        }}
                        value={String(field.value ?? '')}
                        disabled={!!reguaId}
                      >
                        <SelectTrigger className={errors.gatilhoId ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Selecione um critério de início" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Selecione</SelectItem>
                          {gatilhos.map((gatilho) => {
                            return (
                              <div>
                                <SelectItem className="mb-0 pb-0" key={gatilho.id} value={String(gatilho.id ?? '')}>
                                  {gatilho.nome}
                                </SelectItem>

                                <span className="pl-2 text-xs text-gray-400">{gatilho.descricao}</span>
                              </div>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.gatilhoId && <InputError error={errors.gatilhoId?.message ?? ''} />}
                </>
              </InputBlock>

              <InputBlock label="Data de início" isRequired>
                <>
                  <Input
                    type="date"
                    {...register('dataInicio')}
                    className={`${errors.dataInicio && 'border-red-500'}`}
                    disabled={!!reguaId}
                  />
                  {errors.dataInicio && <InputError error={errors.dataInicio?.message ?? ''} />}
                </>
              </InputBlock>

              <InputBlock label="Data fim">
                <Input
                  type="date"
                  {...register('dataFim')}
                  disabled={new Date(reguaRecord.dataFim ?? new Date()) < new Date()}
                />
              </InputBlock>
            </CardContent>
          </Card>

          {/* Criar etapas */}
          <Card>
            <CardHeader>Criar etapas da automação</CardHeader>

            <CardContent className="flex flex-col gap-1">
              <Separator />

              <InputBlock label="Ação" isRequired>
                <Select
                  onValueChange={(v) => {
                    setEtapaRecord({ ...etapaRecord, canal: v, template: {} as ITemplate, condicaoSaida: null });

                    if (v === 'whatsapp' || v === 'email') {
                      listarTemplates(v);
                    }
                  }}
                  value={etapaRecord.canal}
                  disabled={new Date(reguaRecord.dataFim ?? new Date()) < new Date()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um canal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Selecione</SelectItem>
                    <SelectItem value="whatsapp">Whatsapp</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="atividade">Gerar atividade</SelectItem>
                  </SelectContent>
                </Select>
              </InputBlock>

              <InputBlock label="Template" isRequired>
                <Select
                  onValueChange={(v) => {
                    const templateSelecionado = templates.find((t) => t.id === Number(v));

                    if (templateSelecionado) {
                      setEtapaRecord({
                        ...etapaRecord,
                        template: templateSelecionado,
                      });
                    } else {
                      setEtapaRecord({
                        ...etapaRecord,
                        template: {} as ITemplate,
                      });
                    }
                  }}
                  value={String(etapaRecord.template?.id ?? '')}
                  disabled={
                    templates.length === 0 ||
                    etapaRecord.canal === 'atividade' ||
                    new Date(reguaRecord.dataFim ?? new Date()) < new Date() ||
                    isLoadingTemplate
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !isLoadingTemplate ? (
                          'Selecione um template'
                        ) : (
                          <div className="flex items-center gap-1">
                            <LoaderCircle className="animate-spin" size={14} /> Carregando templates
                          </div>
                        )
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Selecione</SelectItem>

                    {templates.map((template) => {
                      return (
                        <SelectItem key={template.id} value={String(template.id ?? '')}>
                          {template.nome}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </InputBlock>

              <InputBlock
                label="Tempo de espera (em dias)"
                info="Defina quantos dias devem passar após a conclusão da etapa anterior para que esta etapa seja executada. Por exemplo, se você colocar ‘3’, esta etapa será iniciada 3 dias depois da etapa anterior."
              >
                <Input
                  type="number"
                  min={0}
                  value={etapaRecord.delayDias}
                  onChange={(e) => setEtapaRecord({ ...etapaRecord, delayDias: Number(e.target.value) })}
                  disabled={etapaList.length === 0 || new Date(reguaRecord.dataFim ?? new Date()) < new Date()}
                />
              </InputBlock>

              <InputBlock
                label="Critério de saída"
                info="Defina a condição que fará com que esta etapa ou automação seja encerrada ou pule para a próxima etapa. Por exemplo, se o cliente atender a determinada condição, ele será removido desta automação."
              >
                <Select
                  onValueChange={(v) => setEtapaRecord({ ...etapaRecord, condicaoSaida: v })}
                  value={etapaRecord.condicaoSaida ?? ''}
                  disabled={
                    etapaRecord.canal === 'atividade' || new Date(reguaRecord.dataFim ?? new Date()) < new Date()
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma condição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Selecione</SelectItem>
                    {condicoes.map((condicao) => {
                      return (
                        <SelectItem key={condicao} value={condicao}>
                          {condicao}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </InputBlock>

              <InputBlock
                label="Qtd máxima de envios por dia"
                info="Estabeleça a quantidade máxima de disparos diários permitidos para esta etapa.
                O mínimo são 5 e o máximo são 1000
                "
              >
                <Input
                  type="number"
                  min={5}
                  max={1000}
                  value={etapaRecord.qtdEnviosDia}
                  onChange={(e) => setEtapaRecord({ ...etapaRecord, qtdEnviosDia: Number(e.target.value) })}
                  disabled={new Date(reguaRecord.dataFim ?? new Date()) < new Date()}
                />
              </InputBlock>

              <div className="flex justify-between mt-5">
                <Dialog open={toggleTemplate} onOpenChange={setToggleTemplate}>
                  <form>
                    <DialogTrigger asChild>
                      <Button
                        disabled={etapaRecord.canal !== 'whatsapp' && etapaRecord.canal !== 'email'}
                        className="flex items-center gap-1"
                        variant="outline"
                        onClick={() => setToggleTemplate(true)}
                      >
                        <Plus size={14} /> Criar template
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px]">
                      <DialogHeader>
                        <DialogTitle>Criar template</DialogTitle>
                        <DialogDescription>
                          Crie seus templates de whatsapp e/ou email para serem utilizados nas automações.
                        </DialogDescription>
                      </DialogHeader>

                      <div>
                        <Template
                          canal={etapaRecord.canal}
                          onCreate={(template) => {
                            setTemplates((prev) => [...prev, template]);
                            setToggleTemplate(false);
                          }}
                        />
                      </div>
                    </DialogContent>
                  </form>
                </Dialog>

                <Button
                  variant="outline"
                  onClick={adicionarEtapa}
                  disabled={
                    etapaRecord.canal === '0' || (!etapaRecord.template?.id && etapaRecord.canal !== 'atividade')
                  }
                >
                  <Plus size={14} /> Adicionar etapa
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Listagem de etapas */}
          <Card className="lg:col-span-2">
            <CardHeader>Etapas da automação</CardHeader>

            <CardContent>
              <Separator />

              {etapaList.length === 0 && <CardFeedback text="Nenhuma etapa adicionada" />}
              <div className="flex items-center gap-2">
                {etapaList.map((etapa, index) => (
                  <div className="flex items-center gap-2">
                    <Card key={index} className="p-4 mb-2 flex flex-col gap-1 max-w-64">
                      <InputBlock label="Ordem">
                        <Input value={index} disabled />
                      </InputBlock>

                      <InputBlock label="Ação">
                        <Input value={etapa.canal} disabled />
                      </InputBlock>

                      <InputBlock label="Template">
                        <Input value={etapa.template?.nome ?? 'Sem template'} disabled />
                      </InputBlock>

                      <InputBlock label="Tempo de espera (em dias)">
                        <Input value={etapa.delayDias ?? 0} disabled />
                      </InputBlock>

                      <InputBlock label="Critério de saída">
                        <Input value={etapa.condicaoSaida ?? 'Sem critério de saída'} disabled />
                      </InputBlock>

                      <InputBlock label="Qtd máxima de envios por dia">
                        <Input value={etapa.qtdEnviosDia} disabled />
                      </InputBlock>

                      <Button
                        disabled={!!reguaId}
                        variant="destructive"
                        className="w-full mt-2 flex items-center gap-2"
                        onClick={(e) => {
                          e.preventDefault();

                          removerEtapa(index);
                        }}
                      >
                        <Trash size={14} /> Remover
                      </Button>
                    </Card>

                    {etapaList.length > 0 && index < etapaList.length - 1 && <ChevronsRight color="#003366" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 flex justify-end mt-5">
            {!reguaRecord.id && (
              <Button type="submit" disabled={etapaList.length === 0}>
                Salvar automação
              </Button>
            )}

            {reguaRecord.id && (
              <Button
                type="button"
                disabled={etapaList.length === 0 || new Date(reguaRecord.dataFim ?? new Date()) < new Date()}
                onClick={atualizarReguaNotificacao}
              >
                Atualizar automação
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ReguaDetalhe;
