import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { IndicadoresProps } from '../useIndicadores';
import LoadingComponent from '@/components/LoadingComponent';

export default function ClientesPorStatus({ data, chartConfig, colors, isFetching }: IndicadoresProps) {
  return (
    <Card className="min-h-[100%] max-h-[100%] border border-gray-300 rounded-md shadow-none">
      <CardHeader className="p-3">
        <CardTitle>Clientes por status</CardTitle>
        <CardDescription className="text-xs">Exibindo os dados dos clientes</CardDescription>
        <Separator className="bg-gray-300" />
      </CardHeader>

      <CardContent className="pl-3 pr-3 pb-3 m-0 ">
        {!isFetching ? (
          <ChartContainer config={chartConfig}>
            <PieChart>
              <Pie data={data} dataKey="total" nameKey="label" cx="50%" cy="50%" outerRadius={100} label>
                {data.map((_, index) =>
                  colors ? (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ) : (
                    <Cell key={`cell-${index}`} />
                  ),
                )}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartContainer>
        ) : (
          <LoadingComponent />
        )}
      </CardContent>
    </Card>
  );
}
