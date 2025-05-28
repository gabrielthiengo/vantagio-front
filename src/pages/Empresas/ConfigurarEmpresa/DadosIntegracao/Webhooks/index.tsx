import CardFeedback from '@/components/CardFeedback';
import LoadingComponent from '@/components/LoadingComponent';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatarData } from '@/lib/utils';
import WebhooksEmpresa, { WebhooksEmpresaRes } from '@/services/empresa/WebhooksEmpresa';
import { Info, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function WebHooks({ empresaId }: { empresaId: number }) {
  const [webHooks, setWebHooks] = useState<WebhooksEmpresaRes[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [perPage, setPerPage] = useState(50);

  const listarWebhooks = () => {
    WebhooksEmpresa.list(empresaId, perPage)
      .then((data) => {
        setWebHooks(data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const criarWebhooksWoocommerce = () => {
    setIsCreating(true);

    WebhooksEmpresa.createWebhooks(empresaId)
      .then((response) => {
        toast.success(response.message);
        setPerPage(60);
        listarWebhooks();
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  useEffect(() => {
    listarWebhooks();
  }, []);

  return (
    <div>
      {webHooks.length === 0 && !isFetching && (
        <Button onClick={() => criarWebhooksWoocommerce()} disabled={isCreating} variant={'ghost'}>
          {!isCreating ? (
            'Criar webhooks'
          ) : (
            <div className="flex items-center gap-1">
              <LoaderCircle className="animate-spin" size={14} /> Criando webhooks
            </div>
          )}
        </Button>
      )}

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

      {webHooks.length === 0 && !isFetching && <CardFeedback text="Nenhum webhook cadastrado" />}

      {isFetching && <LoadingComponent />}
    </div>
  );
}
