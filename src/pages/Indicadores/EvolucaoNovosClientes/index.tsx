import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { getRandomBlueShade } from '@/lib/grafico-cores';
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts';
import { IndicadoresProps } from '../useIndicadores';
import LoadingComponent from '@/components/LoadingComponent';

export default function EvolucaoNovosClientes({ data, chartConfig, isFetching }: IndicadoresProps) {
  return (
    <Card className="min-h-[100%] max-h-[100%] border border-gray-300 rounded-md shadow-none">
      <CardHeader className="p-3">
        <CardTitle>Evolução de novos clientes</CardTitle>
        <CardDescription className="text-xs">Exibindo os dados dos últimos 5 meses</CardDescription>
        <Separator className="bg-gray-300" />
      </CardHeader>

      <CardContent className="pl-3 pr-3 pb-3 m-0 ">
        {!isFetching ? (
          <ChartContainer config={chartConfig}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="total" name="Total">
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={getRandomBlueShade()} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <LoadingComponent />
        )}
      </CardContent>
    </Card>
  );
}
