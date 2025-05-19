import ClientesInativos from '@/components/Cards/ClientesInativos';
import FaturamentoMesAtualAnterior from '@/components/Cards/FaturamentoMesAtualAnterior';
import NovosClientes from '@/components/Cards/NovosClientes';
import TicketMedioMesAtAnt from '@/components/Cards/TicketMedioMesAtAnt';
import { FaturamentoMensal } from '@/components/Graficos/FaturamentoMensal';
import { TicketMedioXNumeroVendas } from '@/components/Graficos/TicketMedioNumVendas';
import NotificacaoAlertas from '@/components/NotificacaoAlertas';
import Recomendacoes from '@/components/Recomendacoes';

export const Inicio = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        <FaturamentoMesAtualAnterior />

        <TicketMedioMesAtAnt />

        <NovosClientes />

        <ClientesInativos />
      </div>
      <div className="flex gap-3 mt-3">
        <div className="flex-1">
          <div className="w-full flex flex-col gap-3">
            <NotificacaoAlertas />
            <Recomendacoes />
          </div>
        </div>
        <div className="grid grid-rows-2 gap-3 w-1/3 ">
          <FaturamentoMensal />
          <TicketMedioXNumeroVendas />
        </div>
      </div>
    </div>
  );
};
