import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IntegracaoMassa } from './IntegracaoMassa';
import WebHooks from './Webhooks';
import CamposCustomizadosIntegracao from './CamposCustomizadosIntegracao';

export const DadosIntegracao = ({ empresaId }: { empresaId: number }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-2 rounded">
          <span className="text-sm text-gray-800">Integração</span>

          <Separator className="mt-2 mb-2" />

          <IntegracaoMassa empresaId={empresaId} />
        </Card>

        <Card className="p-2 rounded">
          <span className="text-sm text-gray-800">Webhooks</span>

          <Separator className="mt-2 mb-2" />

          <WebHooks empresaId={empresaId} />
        </Card>
      </div>

      <div>
        <Card className="p-2 rounded">
          <CamposCustomizadosIntegracao empresaId={empresaId} />
        </Card>
      </div>
    </div>
  );
};
