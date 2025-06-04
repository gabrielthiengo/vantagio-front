import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { getRandomBlueShade } from '@/lib/grafico-cores';
import { ExecucoesPorDia } from '@/services/automaoes/ListarGraficosAutomacao';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

type Props = {
  data: ExecucoesPorDia[];
};

const chartConfig = {
  total: {
    label: 'Total',
  },
} satisfies ChartConfig;

export function ExecucoesPorDiaChart({ data }: Props) {
  return (
    <Card className="min-h-[100%] max-h-[100%] border border-gray-300 rounded shadow-none">
      <CardHeader className="p-3">
        <CardTitle>Execuções por dia</CardTitle>
        <CardDescription className="text-xs">Exibindo os dados da automação</CardDescription>
        <Separator className="bg-gray-300" />
      </CardHeader>

      <CardContent className="pl-3 pr-3 pb-3 m-0 ">
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="quantidade" name="Total de execuções">
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={getRandomBlueShade()} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
