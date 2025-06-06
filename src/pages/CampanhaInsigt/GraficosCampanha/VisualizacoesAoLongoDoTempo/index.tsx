import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { getRandomBlueShade } from '@/lib/grafico-cores';
import { VisualizacoesData } from '@/services/automaoes/ListarGraficosAutomacao';
import { XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from 'recharts';

type Props = {
  data: VisualizacoesData[];
};

const chartConfig = {
  total: {
    label: 'Total',
  },
} satisfies ChartConfig;

export function VisualizacoesAoLongoDoTempo({ data }: Props) {
  return (
    <Card className="min-h-[100%] max-h-[100%] border border-gray-300 rounded-md shadow-none">
      <CardHeader className="p-3">
        <CardTitle>Visualizações ao longo do tempo</CardTitle>
        <CardDescription className="text-xs">Exibindo os dados da automação</CardDescription>
        <Separator className="bg-gray-300" />
      </CardHeader>

      <CardContent className="pl-3 pr-3 pb-3 m-0 ">
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hora" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="quantidade" name="Total de visualizações">
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
