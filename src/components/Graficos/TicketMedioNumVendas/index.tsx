'use client';

import { MoveRight, TrendingDown, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { formatarCurrency } from '@/lib/utils';
import { useEffect, useState } from 'react';
import ListarDadosTicketMedioXTotalVendas from '@/services/graficos/ListarDadosTicketMedioXTotalVendas';
import { Skeleton } from '@/components/ui/skeleton';

const chartConfig = {
  ticketMedio: {
    label: 'Ticket médio',
    color: 'hsl(var(--chart-1))',
  },
  numeroVendas: {
    label: 'Total vendas',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function TicketMedioXNumeroVendas() {
  const [dados, setDados] = useState([
    {
      month: '',
      ticketmedio: 0,
      month_number: 0,
      numerovendas: 0,
    },
  ]);
  const [variacao, setVariacao] = useState([{ mes: 'Atual', variacao: '0%', tendencia: 'Estabilidade' }]);
  const [isLoading, setIsLoading] = useState(true);

  async function listarDados() {
    try {
      const data = await ListarDadosTicketMedioXTotalVendas.listar();

      if (data?.length === 0) {
        setIsLoading(false);
        return;
      }

      const variacoes = [];

      for (let i = 1; i < data.length; i++) {
        const anterior = parseFloat(data[i - 1].total);
        const atual = parseFloat(data[i].total);

        const variacao = ((atual - anterior) / anterior) * 100;

        variacoes.push({
          mes: data[i].month,
          variacao: variacao.toFixed(2) + '%',
          tendencia: variacao > 0 ? 'Crescimento' : variacao < 0 ? 'Queda' : 'Estabilidade',
        });
      }

      if (variacoes.length > 0) {
        setVariacao(variacoes);
      }

      setDados(data);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listarDados();
  }, []);

  return (
    <div>
      {!isLoading && (
        <Card className="min-h-[100%] max-h-[100%] border border-gray-300 rounded-md shadow-none">
          <CardHeader className="p-3">
            <CardTitle>Ticket médio X Total de vendas</CardTitle>
            <CardDescription className="text-xs">
              Exibindo o ticket médio x total de vendas de {new Date().getFullYear()}
            </CardDescription>
            <Separator className="bg-gray-300" />
          </CardHeader>
          <CardContent className="pl-3 pr-3 pb-0 m-0">
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={dados}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="dot"
                      formatter={(val, label) => [
                        label === 'ticketmedio' ? 'Ticket médio ' : 'Total de vendas ',
                        label === 'ticketmedio' ? formatarCurrency(Number(val)) : val,
                      ]}
                    />
                  }
                />
                <Area
                  dataKey="ticketmedio"
                  type="natural"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.4}
                  stroke="hsl(var(--chart-1))"
                  stackId="a"
                />
                <Area
                  dataKey="numerovendas"
                  type="natural"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.4}
                  stroke="hsl(var(--chart-2))"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="p-3">
            {variacao.length > 0 && (
              <div className="flex gap-2">
                {variacao[variacao.length - 1].tendencia === 'Crescimento' && (
                  <div className="flex items-center gap-2">
                    Crescimento de {variacao[variacao.length - 1].variacao} neste mês
                    <TrendingUp className={`h-4 w-4 'text-green-500`} />
                  </div>
                )}

                {variacao[variacao.length - 1].tendencia === 'Queda' && (
                  <div className="flex items-center gap-2">
                    Queda de {variacao[variacao.length - 1].variacao} neste mês
                    <TrendingDown className={`h-4 w-4 'text-green-500`} />
                  </div>
                )}

                {variacao[variacao.length - 1].tendencia === 'Estabilidade' && (
                  <div className="flex items-center gap-2 text-sm font-medium leading-none">
                    Mantendo estável neste mês
                    <MoveRight className="h-4 w-4 text-orange-500" />
                  </div>
                )}
              </div>
            )}
          </CardFooter>
        </Card>
      )}

      {isLoading && (
        <div>
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4 mb-1" />
          <Skeleton className="h-4" />
        </div>
      )}
    </div>
  );
}
