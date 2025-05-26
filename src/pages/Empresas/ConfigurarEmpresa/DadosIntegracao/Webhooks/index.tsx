import LoadingComponent from '@/components/LoadingComponent';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatarData } from '@/lib/utils';
import WebhooksEmpresa, { WebhooksEmpresaRes } from '@/services/empresa/WebhooksEmpresa';
import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WebHooks({ empresaId }: { empresaId: number }) {
  const [webHooks, setWebHooks] = useState<WebhooksEmpresaRes[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const listarWebhooks = () => {
    WebhooksEmpresa.list(empresaId)
      .then((data) => {
        setWebHooks(data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    listarWebhooks();
  }, []);

  return (
    <div>
      {!isFetching && (
        <div className="flex flex-col gap-2">
          {webHooks.map((webhook) => {
            return (
              <div
                key={webhook.id}
                className="grid grid-cols-5 items-center gap-2 p-2 border rounded-md border-gray-200"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Nome:</span>
                  <span className="text-xs">{webhook.name}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Status:</span>
                  <span className="text-xs">{webhook.status}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Resource:</span>
                  <span className="text-xs">{webhook.resource}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Data criação:</span>
                  <span className="text-xs">{formatarData(String(webhook.date_created))}</span>
                </div>

                <div className="flex flex-col">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-xs text-gray-400 flex items-center gap-2">
                          Delivery URL: <Info className="text-orange-500" size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{webhook.delivery_url}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isFetching && <LoadingComponent />}
    </div>
  );
}
