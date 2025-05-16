import { AlertCircle, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

export default function NotificacaoAlertas() {
  return (
    <div className="w-full grid grid-cols-2 gap-3">
      <Card className="rounded-md shadow-none border-gray-300">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-red-500 w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Alerta de Queda no Ticket Médio</h3>
              <p className="text-xs text-muted-foreground mb-2">
                \ Seu ticket médio caiu 20% em relação ao mês anterior. Que tal criar uma campanha de upsell?
              </p>
              <Button variant="default" className="text-sm">
                Criar Campanha de Upsell
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-md shadow-none border-gray-300">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <TrendingDown className="text-yellow-500 w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold">Clientes Inativos</h3>
              <p className="text-xs text-muted-foreground mb-2">
                Número de clientes inativos aumentou. Você pode reengajá-los com uma campanha personalizada.
              </p>
              <Button variant="default" className="text-sm">
                Enviar Campanha de Reativação
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
