import CardFeedback from '@/components/CardFeedback';
import { useEnviosAutomacao } from './useEnviosAutomcacao';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Plus } from 'lucide-react';
import LoadingComponent from '@/components/LoadingComponent';
import InputBlock from '@/components/InputBlock';
import { formatarData } from '@/lib/utils';
import { ClienteCombobox } from '@/components/Combobox/ClienteCombobox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EnviosAutomacao({ automacaoId }: { automacaoId: number }) {
  const {
    isFetching,
    envios,
    total,
    isLoadingMore,
    filtros,
    setFiltros,
    handleLoadMore,
    handleFilterOnClick,
    setLimit,
  } = useEnviosAutomacao(automacaoId);

  return (
    <div>
      <Card className="shadow rounded-sm p-4 mb-5 flex flex-col">
        <div className="flex gap-2">
          <InputBlock label="Cliente">
            <ClienteCombobox
              isClearSelectedValue={filtros.clienteId === null}
              handleClienteSelected={(clienteId: number) => {
                setFiltros({
                  ...filtros,
                  clienteId,
                });
              }}
            />
          </InputBlock>

          <InputBlock label="Status do pedido">
            <Select
              value={filtros.status}
              onValueChange={(value) => {
                setFiltros({
                  ...filtros,
                  status: value,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AGENDADO">Agendado</SelectItem>
                <SelectItem value="ENVIADO">Enviado</SelectItem>
                <SelectItem value="ERRO">Erro</SelectItem>
              </SelectContent>
            </Select>
          </InputBlock>

          <InputBlock label="Status visualização">
            <Select
              value={filtros.statusVisualizacao}
              onValueChange={(value) => {
                setFiltros({
                  ...filtros,
                  statusVisualizacao: value,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SIM">Visualizado</SelectItem>
                <SelectItem value="NAO">Não visualizado</SelectItem>
              </SelectContent>
            </Select>
          </InputBlock>
        </div>

        <div className="mt-5 flex items-center justify-end gap-1">
          <Button
            variant={'ghost'}
            disabled={isFetching}
            onClick={() => {
              setFiltros({
                clienteId: null,
                status: '',
                statusVisualizacao: '',
              });

              setLimit(11);
            }}
          >
            Limpar
          </Button>
          <Button disabled={isFetching} onClick={() => handleFilterOnClick()}>
            Pesquisar
          </Button>
        </div>
      </Card>

      {!isFetching && (
        <div className="flex flex-col gap-2">
          {envios.map((envio) => {
            return (
              <Card key={envio.id} className="shadow rounded-sm p-4">
                <InputBlock label="Cliente">
                  <span className="text-sm">{envio.cliente?.pessoa.nome}</span>
                </InputBlock>

                <div className="flex items-center mt-3">
                  <InputBlock label="Status">
                    <span className="text-xs">{envio.status}</span>
                  </InputBlock>

                  <InputBlock label="Data/Hora envio">
                    <span className="text-xs">
                      {envio.status === 'ENVIADO' ? formatarData(String(envio.dataExecucao)) : 'Sem data'}
                    </span>
                  </InputBlock>

                  <InputBlock label="Descrição erro">
                    <span className="text-xs">{envio.erro !== '' ? envio.erro : 'Sem erro'}</span>
                  </InputBlock>

                  <InputBlock label="Email visualizado">
                    <span className="text-xs">{envio.isEmailVisualizado ? 'Sim' : 'Não'}</span>
                  </InputBlock>

                  <InputBlock label="Data/Hora visualização">
                    <span className="text-xs">
                      {envio.isEmailVisualizado ? formatarData(String(envio.dataVisualizacao)) : 'Não visualizado'}
                    </span>
                  </InputBlock>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {isFetching && <LoadingComponent />}

      {envios.length < total && (
        <div className="w-full mt-5 flex justify-end">
          {!isLoadingMore ? (
            <Button variant={'ghost'} className="flex items-center gap-1" onClick={handleLoadMore}>
              <Plus size={14} /> Carregar mais
            </Button>
          ) : (
            <Button variant={'ghost'} disabled className="flex items-center gap-1">
              <LoaderCircle className="animate-spin" size={14} /> Carregando...
            </Button>
          )}
        </div>
      )}

      {envios.length === 0 && <CardFeedback text="Nenhum envio encontrado para essa automação" />}
    </div>
  );
}
