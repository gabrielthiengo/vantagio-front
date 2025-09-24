import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import { useIndicadorStatusEntrega } from './useIndicadorStatusEntrega';
import LoadingComponent from '@/components/LoadingComponent';

const chartConfig = {
  total: {
    label: 'Total',
  },
} satisfies ChartConfig;

const COLORS: any = {
  enviado: '#22c55e',
  falha: '#ef4444',
  cancelado: '#3b82f6',
};

const IndicadorStatusEntrega = ({ reguaId }: { reguaId: number }) => {
  const { isLoading, indicador } = useIndicadorStatusEntrega(reguaId);

  return (
    <div>
      {!isLoading && (
        <Card className="min-h-[100%] max-h-[100%] border border-gray-300 rounded shadow-none">
          <CardHeader className="p-3">
            <CardTitle>Enviado x Agendado x Falha</CardTitle>
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

export default IndicadorStatusEntrega;
