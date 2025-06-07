import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { IndicadoresProps } from '../useIndicadores';
import { Separator } from '@/components/ui/separator';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getRandomBlueShade } from '@/lib/grafico-cores';
import LoadingComponent from '@/components/LoadingComponent';

export default function PedidosPorStatus({ data, chartConfig, isFetching }: IndicadoresProps) {
  return (
    <Card className="min-h-[100%] max-h-[100%] border border-gray-300 rounded-md shadow-none">
      <CardHeader className="p-3">
        <CardTitle>Pedidos por status</CardTitle>
        <CardDescription className="text-xs">Exibindo os dados do mês atual</CardDescription>
        <Separator className="bg-gray-300" />
      </CardHeader>

      <CardContent className="pl-3 pr-3 pb-3 m-0 ">
        {!isFetching ? (
          <ResponsiveContainer width="100%" height={350}>
            <ChartContainer config={chartConfig}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="total" name="Total" radius={[8, 8, 0, 0]}>
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={getRandomBlueShade()} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        ) : (
          <LoadingComponent />
        )}
      </CardContent>
    </Card>
  );
}
