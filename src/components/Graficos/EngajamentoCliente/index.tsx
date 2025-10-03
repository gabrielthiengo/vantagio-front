import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sparkles } from 'lucide-react';
import { EngajamentoBar100 } from './EngajamentoGraficoBar';
import { useEngajamentoCliente } from './useEngajamentoCliente';
import CardFeedback from '@/components/CardFeedback';
import LoadingComponent from '@/components/LoadingComponent';

const EngajamentoCliente = () => {
  const { loading, dados } = useEngajamentoCliente();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={22} color="orange" />
            <h3 className="font-semibold text-lg">Radar de Relacionamento</h3>
          </div>

          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <span className="font-semibold text-xs text-gray-600">Como calculamos?</span>
              </TooltipTrigger>
              <TooltipContent className="w-[500px] bg-white text-gray-700 border shadow-md flex flex-col items-center">
                <p>
                  {
                    'A nota (0–100) prioriza recência da última compra. Ticket médio e valor total contam, mas passam por multiplicador de recência e retorno decrescente (evita distorções). Notas >95 são raras (compra muito recente + alto valor).'
                  }
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <p className="text-xs text-muted-foreground">
          Engajamento 0–100 com ênfase em recência; use para decidir quem abordar primeiro.
        </p>
      </CardHeader>

      <CardContent>
        {loading === '' && dados.length > 0 && <EngajamentoBar100 rows={dados} />}

        {loading === '' && dados.length === 0 && <CardFeedback text="Nenhum engajamento encontrado" />}

        {loading !== '' && <LoadingComponent />}
      </CardContent>
    </Card>
  );
};

export default EngajamentoCliente;
