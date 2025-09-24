import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import LoadingComponent from '@/components/LoadingComponent';
import { useIndicadorStatusInstancia } from './useIndicadorStatusEntrega';

const chartConfig = {
  total: {
    label: 'Total',
  },
} satisfies ChartConfig;

const COLORS: any = {
  concluido: '#22c55e',
  cancelado: '#ef4444',
  ativo: '#3b82f6',
};

const IndicadorStatusInstancia = ({ reguaId }: { reguaId: number }) => {
  const { isLoading, indicador } = useIndicadorStatusInstancia(reguaId);

  return (
    <div>
      {!isLoading && (
        <Card className="min-h-[100%] max-h-[100%] border border-gray-300 rounded shadow-none">
          <CardHeader className="p-3">
            <CardTitle>Ativo x Concluido x Cancelado</CardTitle>
            <CardDescription className="text-xs">Exibindo os dados da automação</CardDescription>
            <Separator className="bg-gray-300" />
          </CardHeader>

          <CardContent className="pl-3 pr-3 pb-3 m-0 ">
            <ChartContainer config={chartConfig}>
              <PieChart>
                <Pie data={indicador} dataKey="quantidade" nameKey="status" cx="50%" cy="50%" outerRadius={80} label>
                  {indicador.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.status]} />
                  ))}
                </Pie>

                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default IndicadorStatusInstancia;
