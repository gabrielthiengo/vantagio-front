import LoadingComponent from '@/components/LoadingComponent';
import { useDadosIntegracaoMvTec } from './useDadosIntegracaoMvTec';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Database } from 'lucide-react';
import { ReloadIcon } from '@radix-ui/react-icons';

export const DadosIntegracaoMvTec = ({ empresaId }: { empresaId: number }) => {
  const {
    isFetching,
    dadosIntegracao,
    configuracaoRecord,
    isSalvandoConfiguracao,
    setConfiguracaoRecord,
    atualizarConfiguracaoDatabase,
  } = useDadosIntegracaoMvTec(empresaId);
  return (
    <div>
      {!isFetching && (
        <div className="grid grid-cols-2 gap-2">
          <Card className="rounded-md shadow-none border-gray-200 p-2">
            <h3 className="mb-3">Configurações do banco de dados</h3>

            <div>
              <Label>Path do banco de dados</Label>
              <Input
                value={configuracaoRecord?.pathDatabase}
                onChange={(e) => {
                  setConfiguracaoRecord({
                    ...configuracaoRecord,
                    pathDatabase: e.target.value,
                  });
                }}
              />
            </div>

            <div>
              <Label>Usuário do banco de dados</Label>
              <Input
                value={configuracaoRecord?.user}
                onChange={(e) => {
                  setConfiguracaoRecord({
                    ...configuracaoRecord,
                    user: e.target.value,
                  });
                }}
              />
            </div>

            <div>
              <Label>Senha do banco de dados</Label>
              <Input
                value={configuracaoRecord?.password}
                onChange={(e) => {
                  setConfiguracaoRecord({
                    ...configuracaoRecord,
                    password: e.target.value,
                  });
                }}
              />
            </div>

            <div>
              <Label>Porta do banco de dados</Label>
              <Input
                value={configuracaoRecord?.port}
                onChange={(e) => {
                  setConfiguracaoRecord({
                    ...configuracaoRecord,
                    port: Number(e.target.value),
                  });
                }}
              />
            </div>

            <div className="mt-5 flex justify-end">
              {!isSalvandoConfiguracao ? (
                <Button onClick={atualizarConfiguracaoDatabase}>Atualizar configuração</Button>
              ) : (
                <Button disabled className="flex items-center">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </Button>
              )}
            </div>
          </Card>

          <Card className="rounded-md shadow-none border-gray-200 p-2">
            <h3 className="mb-3">Jobs de integração</h3>

            {dadosIntegracao?.schedules.map((schedule) => {
              return (
                <Card
                  key={schedule.id}
                  className="flex justify-between rounded-md shadow-none border-gray-200 p-2 mb-1"
                >
                  <div className="flex flex-col">
                    <Label>Nome</Label>
                    <span>{schedule.nome}</span>
                  </div>

                  <div className="flex flex-col">
                    <Label>Schedule</Label>
                    <span>{schedule.schedule}</span>
                  </div>
                </Card>
              );
            })}
          </Card>

          <Card className="rounded-md shadow-none border-gray-200 p-2 lg:col-span-2">
            <h3 className="mb-3">Queries de integração</h3>
            {dadosIntegracao?.queries.map((query) => {
              return (
                <Card key={query.id} className="flex justify-between rounded-md shadow-none border-gray-200 p-2 mb-1">
                  <div className="flex flex-col">
                    <Label>Tabela</Label>
                    <span>{query.tabela}</span>
                  </div>

                  <div className="flex flex-col">
                    <Label>Página inicial</Label>
                    <span>{query.paginaInicial}</span>
                  </div>

                  <div className="flex flex-col">
                    <Label>Página final</Label>
                    <span>{query.paginaFinal}</span>
                  </div>

                  <div className="flex flex-col">
                    <Label>Data integração</Label>
                    <span>{(query.dataUltimaIntegracao || '').toString()}</span>
                  </div>

                  <div className="flex flex-col">
                    <Label>Query</Label>
                    <TooltipProvider>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Database size={20} />
                        </TooltipTrigger>
                        <TooltipContent className="w-[300px] bg-white text-gray-700 border shadow-md flex flex-col items-center">
                          <p>{query.query}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="flex flex-col">
                    <Label>Sub query</Label>
                    {query.subQuery && (
                      <TooltipProvider>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Database size={20} />
                          </TooltipTrigger>
                          <TooltipContent className="w-[300px] bg-white text-gray-700 border shadow-md flex flex-col items-center">
                            <p>{query.subQuery}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                    {!query.subQuery && <Database size={20} />}
                  </div>
                </Card>
              );
            })}
          </Card>
        </div>
      )}

      {isFetching && <LoadingComponent />}
    </div>
  );
};
