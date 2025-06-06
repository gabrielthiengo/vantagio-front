import { PageHeader } from '@/components/PageHeader';
import { Boxes } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import LoadingComponent from '@/components/LoadingComponent';
import { Separator } from '@/components/ui/separator';
import { useCampanhaInsigt } from './useCampanhaInsigt';
import GraficosCampanha from './GraficosCampanha';
import EnviosCampanha from '../CampanhaInsigt/EnviosCampanha';

export default function CampanhaInsigt() {
  const { id } = useParams();
  const { isFetching, campanha } = useCampanhaInsigt(Number(id));

  return (
    <div className="w-full">
      <PageHeader title={`Campanha - ${campanha.nome}`} icon={<Boxes size={18} />}></PageHeader>

      {!isFetching ? (
        <div className="grid grid-cols-2 gap-3">
          <Card className="shadow rounded p-4">
            <span className="text-gray-600">Envios realizado por esta campanha</span>

            <Separator className="mt-2 mb-2" />

            <EnviosCampanha campanhaId={Number(id)} />
          </Card>
          <Card className="shadow rounded p-4">
            <span className="text-gray-600">Indicadores da Campanha</span>

            <Separator className="mt-2 mb-2" />

            <GraficosCampanha campanhaId={Number(id)} />
          </Card>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
}
