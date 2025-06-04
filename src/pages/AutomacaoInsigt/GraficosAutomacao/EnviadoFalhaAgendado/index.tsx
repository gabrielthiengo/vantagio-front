'use client';

import { Cell, Legend, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { StatusData } from '@/services/automaoes/ListarGraficosAutomacao';

const chartConfig = {
  total: {
    label: 'Total',
  },
} satisfies ChartConfig;

type Props = {
  data: StatusData[];
};

export function GraficoEnviadoFalhaAgendado({ data }: Props) {
  const COLORS = {
    ENVIADO: '#22c55e',
    ERRO: '#ef4444',
    AGENDADO: '#3b82f6',
  };

  return (
    <Card className="min-h-[100%] max-h-[100%] border border-gray-300 rounded shadow-none">
      <CardHeader className="p-3">
        <CardTitle>Enviado x Agendado x Falha</CardTitle>
        <CardDescription className="text-xs">Exibindo os dados da automação</CardDescription>
        <Separator className="bg-gray-300" />
      </CardHeader>

      <CardContent className="pl-3 pr-3 pb-3 m-0 ">
        <ChartContainer config={chartConfig}>
          <PieChart>
            <Pie data={data} dataKey="quantidade" nameKey="status" cx="50%" cy="50%" outerRadius={80} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.status]} />
              ))}
            </Pie>

            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
