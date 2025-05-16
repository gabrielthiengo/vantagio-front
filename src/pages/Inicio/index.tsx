import ClientesInativos from '@/components/Cards/ClientesInativos';
import FaturamentoMesAtualAnterior from '@/components/Cards/FaturamentoMesAtualAnterior';
import NovosClientes from '@/components/Cards/NovosClientes';
import TicketMedioMesAtAnt from '@/components/Cards/TicketMedioMesAtAnt';
import { FaturamentoMensal } from '@/components/Graficos/FaturamentoMensal';
import { TicketMedioXNumeroVendas } from '@/components/Graficos/TicketMedioNumVendas';
import NotificacaoAlertas from '@/components/NotificacaoAlertas';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Send, TrendingDown } from 'lucide-react';
import { DataTableDemo } from './index2';

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
            {/* Seção 1 - Alertas Inteligentes */}

            <NotificacaoAlertas />
            {/* Seção 4 - Recomendações Baseadas em Dados */}
            <Card className="lg:col-span-2 rounded-md shadow-none border-gray-300">
              <CardContent className="p-4">
                <div className="w-full flex items-start gap-4">
                  <Send className="text-blue-500 w-5 h-5 mt-1" />
                  <div className="w-full">
                    <h3 className="text-lg font-semibold">Recomendação Inteligente</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      Clientes que compraram no mês passado ainda não voltaram. Que tal uma campanha de recompra com
                      desconto exclusivo?
                    </p>
                    <div className="flex gap-2">
                      <Button variant="default" className="text-sm">
                        Criar Automação de Recompra
                      </Button>
                    </div>

                    <div className="w-full">
                      <DataTableDemo />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
