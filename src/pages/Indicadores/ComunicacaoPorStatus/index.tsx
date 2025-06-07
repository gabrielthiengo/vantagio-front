import LoadingComponent from '@/components/LoadingComponent';
import { IndicadoresProps } from '../useIndicadores';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getRandomBlueShade } from '@/lib/grafico-cores';

export default function ComunicacaoPorStatus({ data, chartConfig, title, description, isFetching }: IndicadoresProps) {
  return (
    <Card className="min-h-[100%] max-h-[100%] border border-gray-300 rounded-md shadow-none">
      <CardHeader className="p-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
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

                <Bar dataKey="total" name="Total">
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
