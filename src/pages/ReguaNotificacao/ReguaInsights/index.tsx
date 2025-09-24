import LoadingComponent from '@/components/LoadingComponent';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { LineChartIcon } from 'lucide-react';
import React from 'react';
import { useReguaInsights } from './useReguaInsights';
import { useParams } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import ReguaEventos from './ReguaEventos';
import ReguaIndicadores from './ReguaIndicadores';

const ReguaInsights: React.FC = () => {
  const { id: reguaId } = useParams();
  const { isLoading, reguaRecord } = useReguaInsights(Number(reguaId));

  return (
    <div>
      <PageHeader title={`Insights da automação`} icon={<LineChartIcon size={18} />} previousPage="/regua" />

      {!isLoading ? (
        <Card className="rounded p-2 flex gap-2 ">
          <Card className="rounded p-2 flex flex-col w-full">
            <div>
              <span>{reguaRecord.nome}</span>
              <span>{reguaRecord.disparos}</span>
            </div>
            {reguaRecord.descricao && <span className="text-sm text-gray-500">{reguaRecord.descricao}</span>}

            <Separator className="mt-2 mb-2" />

            <ReguaEventos reguaId={Number(reguaId)} />
          </Card>

          <Card className="rounded p-2 w-full">
            <ReguaIndicadores reguaId={Number(reguaId)} />
          </Card>
        </Card>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default ReguaInsights;
