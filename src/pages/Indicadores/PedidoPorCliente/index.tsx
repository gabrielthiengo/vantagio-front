import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IndicadoresProps } from '../useIndicadores';
import { Separator } from '@/components/ui/separator';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { getRandomBlueShade } from '@/lib/grafico-cores';
import LoadingComponent from '@/components/LoadingComponent';

export default function PedidoPorCliente({ data, chartConfig, isFetching }: IndicadoresProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  return (
    <Card className="min-h-[100%] max-h-[100%] border border-gray-300 rounded-md shadow-none">
      <CardHeader className="p-3">
        <CardTitle>Pedidos por clientes</CardTitle>
        <CardDescription className="text-xs">Exibindo os dados dos clientes que mais compram</CardDescription>
        <Separator className="bg-gray-300" />
      </CardHeader>

      <CardContent className="pl-3 pr-3 pb-3 m-0 ">
        {!isFetching ? (
          <ResponsiveContainer width="100%" height={350}>
            <ChartContainer config={chartConfig}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis tickFormatter={(value) => formatCurrency(Number(value))} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
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
