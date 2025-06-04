import { PageHeader } from '@/components/PageHeader';
import { Boxes } from 'lucide-react';
import { useAutomacaoInsigt } from './useAutomacaoInsigt';
import { useParams } from 'react-router-dom';
import EnviosAutomacao from './EnviosAutomacao';
import { Card } from '@/components/ui/card';
import LoadingComponent from '@/components/LoadingComponent';
import GraficosAutomacao from './GraficosAutomacao';
import { Separator } from '@/components/ui/separator';

export default function AutomacaoInsigt() {
  const { id } = useParams();
  const { isFetching, automacao } = useAutomacaoInsigt(Number(id));

  return (
    <div className="w-full">
      <PageHeader title={`Automação - ${automacao.nome}`} icon={<Boxes size={18} />}></PageHeader>

      {!isFetching ? (
        <div className="grid grid-cols-2 gap-3">
          <Card className="shadow rounded p-4">
            <span className="text-gray-600">Envios realizado por esta automação</span>

            <Separator className="mt-2 mb-2" />

            <EnviosAutomacao automacaoId={Number(id)} />
          </Card>
          <Card className="shadow rounded p-4">
            <span className="text-gray-600">Indicadores da automação</span>

            <Separator className="mt-2 mb-2" />

            <GraficosAutomacao automacaoId={Number(id)} />
          </Card>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
}
