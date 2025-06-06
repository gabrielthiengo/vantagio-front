'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { TaxaVisualizacaoData } from '@/services/automaoes/ListarGraficosAutomacao';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#60A5FA', '#ef4444'];

type Props = {
  data: TaxaVisualizacaoData[];
};

const chartConfig = {
  total: {
    label: 'Total',
  },
} satisfies ChartConfig;

export function GraficoTaxaVisualizacao({ data }: Props) {
  return (
    <Card className="min-h-[100%] max-h-[100%] border border-gray-300 rounded shadow-none">
      <CardHeader className="p-3">
        <CardTitle>Visualizações ao longo do tempo</CardTitle>
        <CardDescription className="text-xs">Exibindo os dados da automação</CardDescription>
        <Separator className="bg-gray-300" />
      </CardHeader>

      <CardContent className="pl-3 pr-3 pb-3 m-0 ">
        <ChartContainer config={chartConfig}>
          <PieChart>
            <Pie
              data={data}
              dataKey="quantidade"
              nameKey="visualizado"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
