import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts';
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
              <BarChart data={indicador}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" name="Status" />
                <YAxis />
                <Tooltip
                  formatter={(value, entry, index) => {
                    console.log({ value, entry, index });
                    return value;
                  }}
                />

                <Bar dataKey="quantidade" name="Status">
                  {indicador.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.status]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default IndicadorStatusEntrega;
