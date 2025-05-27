import { Card } from '@/components/ui/card';
import { useIntegracoes } from './useIntegracoes';
import { Check, CirclePlayIcon, LoaderCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const IntegracaoMassa = ({ empresaId }: { empresaId: number }) => {
  const { isLoading, integracoes, iniciarIntegracao } = useIntegracoes(empresaId || 0);
  return (
    <div className="flex flex-col gap-1">
      {!isLoading ? (
        <div className="flex flex-col gap-2">
          {integracoes.map((integracao) => {
            return (
              <Card key={integracao.id} className="p-2 rounded flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-700">Funcionalidade</span>
                  <span className="text-sm text-gray-800">{integracao.funcionalidade}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-gray-700">Página atual</span>
                  <span className="text-sm text-gray-800">
                    {integracao.pagProximaBusca === null ? 0 : integracao.pagProximaBusca} de{' '}
                    {integracao.totalPaginas === null ? 0 : integracao.totalPaginas}
                  </span>
                </div>

                <div className="flex flex-col justify-end">
                  <span className="text-xs text-gray-700">Total reg/página</span>
                  <span className="text-sm text-gray-800">
                    {integracao.totalRegistrosPagina === null ? 0 : integracao.totalRegistrosPagina}
                  </span>
                </div>

                <div className="flex flex-col items-end min-w-28">
                  {integracao.isFinalizado ? (
                    <div className="flex items-center gap-1 text-xs text-green-500">
                      <Check size={11} /> Finalizado
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-red-500">
                      <LoaderCircle className="animate-spin" size={11} /> Em andamento
                    </div>
                  )}
                  {integracao.isFinalizado && (
                    <button
                      className="flex items-center gap-1 bg-orange-100 text-orange-500 tracking-wide text-xs py-1 px-3 rounded mt-1 hover:bg-orange-200"
                      onClick={() => {
                        iniciarIntegracao(integracao.id);
                      }}
                    >
                      <CirclePlayIcon size={11} />
                      Iniciar
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div>
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
        </div>
      )}
    </div>
  );
};
