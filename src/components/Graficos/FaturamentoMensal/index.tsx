'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { blueShades } from '@/lib/grafico-cores';
import ListarDadosHistoricoVendas from '@/services/graficos/ListarDadosHistoricoVendas';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatarCurrency } from '@/lib/utils';

const chartConfig = {
  total: {
    label: 'Total',
  },
} satisfies ChartConfig;

export function FaturamentoMensal() {
  const [dados, setDados] = useState([
    {
      month: '',
      total: 0,
      month_number: 0,
    },
  ]);
  const [variacao, setVariacao] = useState([{ mes: 'Atual', variacao: '0%', tendencia: 'Estabilidade' }]);
  const [isLoading, setIsLoading] = useState(true);

  async function listarDados() {
    try {
      const data = await ListarDadosHistoricoVendas.listar();

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
            <CardTitle>Faturamento mensal</CardTitle>
            <CardDescription className="text-xs">
              Exibindo o faturamento total de {new Date().getFullYear()}
            </CardDescription>
            <Separator className="bg-gray-300" />
          </CardHeader>

          <CardContent className="pl-3 pr-3 pb-0 m-0 ">
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={dados}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={2}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={true}
                  content={<ChartTooltipContent formatter={(val) => [formatarCurrency(Number(val))]} />}
                />

                <Bar dataKey="total" fill="red" radius={8}>
                  {dados.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={blueShades[index % blueShades.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm p-3">
            {variacao.length > 0 && (
              <div className="flex gap-2 font-medium leading-none text-sm">
                {variacao[variacao.length - 1].tendencia} de {variacao[variacao.length - 1].variacao} neste mês
                <TrendingUp
                  className={`h-4 w-4 ${
                    variacao[variacao.length - 1].tendencia === 'Crescimento' ? 'text-green-500' : 'text-red-500'
                  }`}
                />
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
