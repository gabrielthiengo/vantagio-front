import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEngajamentoDetalhe } from './useEngajamentoDetalhe';
import LoadingComponent from '@/components/LoadingComponent';
import { Sparkles } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CardFeedback from '@/components/CardFeedback';
import { formatarCurrency, formatarData } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type EngajamentoDetalheProps = {
  status: string;
  onToggleChange: () => void;
};

type CustomerCategory = 'Resgate' | 'Frio' | 'Morno' | 'Quente' | 'Elite';

const categoryLabels: Record<CustomerCategory, string> = {
  Resgate: 'Resgate',
  Frio: 'Frio',
  Morno: 'Morno',
  Quente: 'Quente',
  Elite: 'Elite',
};

const EngajamentoDetalhe = ({ status, onToggleChange }: EngajamentoDetalheProps) => {
  const {
    loading,
    isOpen,
    dadosEngajamento,
    statusSelecionado,
    page,
    total,
    setPage,
    toggleModal,
    selecionarStatusOnClick,
  } = useEngajamentoDetalhe(status, onToggleChange);

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent className="xs:max-w-[95%] sm:max-w-[95%] xl:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Sparkles size={22} color="orange" />
              <h3 className="font-semibold text-lg">Radar de Relacionamento</h3>
            </div>
          </DialogTitle>
          <DialogDescription>Aqui está a visão detalhada do relacionamento com seus clientes.</DialogDescription>

          <div className="flex items-center gap-2 mt-3">
            <button
              className={`px-4 rounded-xl text-xs border  text-[#ef4444] hover:bg-[#ef444493] font-semibold ${
                statusSelecionado === 'Resgate' ? 'bg-[#ef444493]' : 'bg-[#ef444433]'
              }`}
              onClick={() => selecionarStatusOnClick('Resgate')}
            >
              Resgate
            </button>
            <button
              className={`px-4 rounded-xl text-xs border text-[#9ca3af] hover:bg-[#9ca3af85] font-semibold  ${
                statusSelecionado === 'Frio' ? 'bg-[#9ca3af85]' : 'bg-[#9ca3af3b] '
              }`}
              onClick={() => selecionarStatusOnClick('Frio')}
            >
              Frio
            </button>
            <button
              className={`px-4 rounded-xl text-xs border text-[#f59e0b] hover:bg-[#f59f0b79] font-semibold ${
                statusSelecionado === 'Morno' ? 'bg-[#f59f0b79]' : 'bg-[#f59f0b3f]'
              }`}
              onClick={() => selecionarStatusOnClick('Morno')}
            >
              Morno
            </button>
            <button
              className={`px-4 rounded-xl text-xs border text-[#22c55e] hover:bg-[#22c55e79] font-semibold  ${
                statusSelecionado === 'Quente' ? 'bg-[#22c55e79]' : 'bg-[#22c55e38]'
              }`}
              onClick={() => selecionarStatusOnClick('Quente')}
            >
              Quente
            </button>
            <button
              className={`px-4 rounded-xl text-xs border text-[#a855f7] hover:bg-[#a955f777] font-semibold ${
                statusSelecionado === 'Elite' ? 'bg-[#a955f779]' : 'bg-[#a955f73b]'
              }`}
              onClick={() => selecionarStatusOnClick('Elite')}
            >
              Elite
            </button>
          </div>
        </DialogHeader>

        {loading === 'loading' && <LoadingComponent />}
        {loading === '' && dadosEngajamento.length === 0 && (
          <CardFeedback text="Nenhum cliente encontrado nessa categoria" />
        )}
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          {loading === '' &&
            dadosEngajamento.map((engajamento) => {
              return (
                <AccordionItem key={engajamento.id} value={String(engajamento.id)} className="border-border">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <span className="text-foreground">{engajamento.cliente?.pessoa?.nome}</span>

                      <Badge variant={'outline'}>{categoryLabels[statusSelecionado as CustomerCategory]}</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-3 rounded-lg bg-gray-100 p-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Data última compra:</span>
                        <span className="text-sm font-medium text-foreground">
                          {formatarData(String(engajamento.dataUltimaCompra ?? ''))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Ticket médio:</span>
                        <span className="text-sm font-medium text-foreground">
                          {formatarCurrency(Number(engajamento.ticketMedio ?? 0))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Valor gasto em compras:</span>
                        <span className="text-sm font-medium text-foreground">
                          {formatarCurrency(Number(engajamento.valorGastoCompras))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Nota do engajamento:</span>
                        <span className="text-sm font-medium text-foreground">{engajamento.notaEngajamento}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </Accordion>

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={total === page}>
            Próximo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EngajamentoDetalhe;
