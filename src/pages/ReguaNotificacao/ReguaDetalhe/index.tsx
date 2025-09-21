import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import InputBlock from '@/components/InputBlock';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Boxes, Plus, Trash } from 'lucide-react';
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

const ReguaDetalhe: React.FC = () => {
  const [toggleTemplate, setToggleTemplate] = useState(false);
  const {
    register,
    handleSubmit,
    handleFormSubmit,
    etapaRecord,
    setEtapaRecord,
    etapaList,
    adicionarEtapa,
    errors,
    control,
    templates,
    condicoes,
    setTemplates,
  } = useReguaDetalhe();

  return (
    <div>
      <PageHeader title="Criar automação" icon={<Boxes size={18} />} />

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
                />
                {errors.nome && <InputError error={errors.nome?.message ?? ''} />}
              </>
            </InputBlock>

            <InputBlock label="Descrição">
              <>
                <Input {...register('descricao')} placeholder="Ex: Automação para clientes..." />
                {errors.descricao && <InputError error={errors.descricao?.message ?? ''} />}
              </>
            </InputBlock>

            <InputBlock label="Gatilho" isRequired info="É a ação que a automação será executada">
              <>
                <Controller
                  name="gatilhoId"
                  control={control}
                  rules={{ required: 'Selecione um gatilho' }}
                  render={({ field }) => (
                    <Select
                      onValueChange={(v) => {
                        field.onChange(Number(v));
                      }}
                      value={String(field.value ?? '')}
                    >
                      <SelectTrigger className={errors.gatilhoId ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Selecione um sistema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Selecione</SelectItem>
                        <SelectItem value="1">MV Tecnologia</SelectItem>
                        <SelectItem value="2">Woocommerce</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gatilhoId && <InputError error={errors.gatilhoId?.message ?? ''} />}
              </>
            </InputBlock>

            <InputBlock label="Data de início" isRequired>
              <>
                <Input type="date" {...register('dataInicio')} className={`${errors.dataInicio && 'border-red-500'}`} />
                {errors.dataInicio && <InputError error={errors.dataInicio?.message ?? ''} />}
              </>
            </InputBlock>

            <InputBlock label="Data fim">
              <Input type="date" {...register('dataFim')} />
            </InputBlock>
          </CardContent>
        </Card>

        {/* Criar etapas */}
        <Card>
          <CardHeader>Criar etapas da automação</CardHeader>

          <CardContent className="flex flex-col gap-1">
            <Separator />

            <InputBlock label="Canal" isRequired>
              <Select onValueChange={(v) => setEtapaRecord({ ...etapaRecord, canal: v })} value={etapaRecord.canal}>
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
                onValueChange={(v) =>
                  setEtapaRecord({
                    ...etapaRecord,
                    template: {
                      ...etapaRecord.template,
                      id: Number(v),
                    },
                  })
                }
                value={String(etapaRecord.template.id ?? '')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um template" />
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
              label="Delay (em dias)"
              info="É o tempo (em dias) em que esta etapa vai executar após a conclusão da etapa anterior."
            >
              <Input
                type="number"
                min={0}
                value={etapaRecord.delayDias}
                onChange={(e) => setEtapaRecord({ ...etapaRecord, delayDias: Number(e.target.value) })}
              />
            </InputBlock>

            <InputBlock
              label="Condição de saída"
              info="Quando o cliente realizar a condição selecionada, ele saírá do fluxo automaticamente."
            >
              <Select
                onValueChange={(v) => setEtapaRecord({ ...etapaRecord, condicaoSaida: v })}
                value={etapaRecord.condicaoSaida}
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

            <div className="flex justify-between mt-5">
              <Dialog open={toggleTemplate}>
                <form>
                  <DialogTrigger asChild>
                    <Button
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
                disabled={etapaRecord.canal === '0' || etapaRecord.template.id === 0}
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
            {etapaList.map((etapa, index) => (
              <Card key={index} className="p-4 mb-2 flex flex-col gap-1">
                <InputBlock label="Ordem">
                  <span>{index}</span>
                </InputBlock>
                <InputBlock label="Canal">
                  <span>{etapa.canal}</span>
                </InputBlock>
                <InputBlock label="Template">
                  <span>{etapa.template.nome}</span>
                </InputBlock>
                <InputBlock label="Delay">
                  <span>{etapa.delayDias ?? 0}</span>
                </InputBlock>
                <InputBlock label="Condição de saída">
                  <span>{etapa.condicaoSaida}</span>
                </InputBlock>
                <Button variant="destructive" className="w-full mt-2">
                  <Trash size={14} /> Remover
                </Button>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-2 flex justify-end mt-5">
          <Button type="submit" disabled={etapaList.length === 0}>
            Salvar automação
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReguaDetalhe;
