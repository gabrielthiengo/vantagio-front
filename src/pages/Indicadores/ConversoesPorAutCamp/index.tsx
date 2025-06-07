import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IndicadoresProps } from '../useIndicadores';
import { Separator } from '@/components/ui/separator';
import { Cell, Funnel, FunnelChart, LabelList, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { getRandomBlueShade } from '@/lib/grafico-cores';
import LoadingComponent from '@/components/LoadingComponent';

export default function ConversoesPorAutCamp({
  data,
  chartConfig,
  colors,
  title,
  description,
  isFetching,
}: IndicadoresProps) {
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
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="total" data={data} isAnimationActive nameKey="label">
                  {data.map((_, index) =>
                    colors ? (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ) : (
                      <Cell key={`cell-${index}`} fill={getRandomBlueShade()} />
                    ),
                  )}
                  <LabelList position="right" fill="#000" stroke="none" dataKey="total" />
                </Funnel>
              </FunnelChart>
            </ChartContainer>
          </ResponsiveContainer>
        ) : (
          <LoadingComponent />
        )}
      </CardContent>
    </Card>
  );
}
