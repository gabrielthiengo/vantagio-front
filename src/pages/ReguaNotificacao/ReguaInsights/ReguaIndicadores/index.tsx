import { Separator } from '@/components/ui/separator';
import IndicadorStatusEntrega from './IndicadorStatusEntrega';
import IndicadorStatusInstancia from './IndicadorStatusInstancia';
const ReguaIndicadores = ({ reguaId }: { reguaId: number }) => {
  return (
    <div>
      <span>Indicadores</span>

      <Separator className="mt-2 mb-2" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <IndicadorStatusEntrega reguaId={reguaId} />

        <IndicadorStatusInstancia reguaId={reguaId} />
      </div>
    </div>
  );
};

export default ReguaIndicadores;
