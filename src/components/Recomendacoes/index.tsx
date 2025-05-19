import { Send } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { RecomendacoesTable } from '@/components/Recomendacoes/RecomendacoesTable';
import { useEffect, useState } from 'react';
import { RecomendacoesRetorno } from './types';
import ObterRecomendacoes from '@/services/recomendacoes/ObterRecomendacoes';
import { Skeleton } from '../ui/skeleton';

export default function Recomendacoes() {
  const [recomendacoes, setRecomendacoes] = useState<RecomendacoesRetorno>();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  async function obterRecomendacoes() {
    try {
      const data = await ObterRecomendacoes.listar(page);

      if (data) {
        setRecomendacoes(data);
      }

      setIsLoading(false);
    } catch (er) {
      setIsLoading(false);
    }
  }

  function paginate(newPage: number) {
    setPage(newPage);
  }

  useEffect(() => {
    obterRecomendacoes();
  }, [page]);

  return (
    <div>
      {!isLoading && (
        <Card className="lg:col-span-2 rounded-md shadow-none border-gray-300">
          <CardContent className="p-4">
            <div className="w-full flex items-start gap-4">
              <Send className="text-blue-500 w-5 h-5 mt-1" />
              <div className="w-full">
                <h3 className="text-lg font-semibold">Recomendação Inteligente</h3>
                <p className="text-xs text-muted-foreground mb-2">{recomendacoes?.meta.descricao}</p>

                <div className="w-full mt-3">
                  {recomendacoes?.data && (
                    <RecomendacoesTable
                      data={recomendacoes?.data}
                      currentPage={page}
                      totalPages={recomendacoes.meta.totalPages}
                      paginate={paginate}
                    />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <Card className="lg:col-span-2 rounded-md shadow-none border-gray-300 p-6">
          <Skeleton className="h-16 mb-1" />
          <Skeleton className="h-5 mb-1" />
          <Skeleton className="h-16 mb-1" />
          <Skeleton className="h-5 mb-1" />
          <Skeleton className="h-16" />
        </Card>
      )}
    </div>
  );
}
