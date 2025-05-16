import { Skeleton } from '@/components/ui/skeleton';
import ListarDadosClientesInativos from '@/services/graficos/ListarDadosClientesInativos';
import { useEffect, useState } from 'react';

export default function ClientesInativos() {
  const [dados, setDados] = useState({
    clientesInativos: 0,
    percentual: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  async function listarDados() {
    try {
      const data = await ListarDadosClientesInativos.listar();

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
          <h3 className="text-gray-500 text-sm mb-1">Clientes Inativos</h3>
          <p className="text-2xl font-bold text-gray-800">{dados.clientesInativos}</p>
          <div className="text-sm text-red-600 mt-1">{dados.percentual}% da base</div>
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
