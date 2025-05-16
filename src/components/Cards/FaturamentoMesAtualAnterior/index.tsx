import { Skeleton } from '@/components/ui/skeleton';
import ListarDadosFatMesAtAnt from '@/services/graficos/ListarDadosFatMesAtAnt';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FaturamentoMesAtualAnterior() {
  const [dados, setDados] = useState({
    mesAtual: 0,
    totalPedidos: 0,
    variacao: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  async function listarDados() {
    try {
      const data = await ListarDadosFatMesAtAnt.listar();

      setIsLoading(false);

      setDados(data);
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listarDados();
  }, []);

  return (
    <div>
      {' '}
      {!isLoading ? (
        <div className="bg-white border border-gray-300 rounded-md p-4 hover:transition min-h-[130px]">
          <h3 className="text-gray-500 text-sm mb-1">Faturamento no Mês</h3>
          <p className="text-2xl font-bold text-gray-800">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(dados.mesAtual)}
          </p>

          <div className={`flex items-center text-sm ${dados.variacao > 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
            {dados.variacao > 0 ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown className="mr-1" size={12} />}{' '}
            {dados.variacao > 100 ? '+' + 100 : dados.variacao}% vs mês anterior
          </div>
          <div className="text-xs text-gray-400">{dados.totalPedidos} pedidos</div>
        </div>
      ) : (
        <div className="bg-white border border-gray-300 rounded-md p-4 hover:transition min-h-[130px]">
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
