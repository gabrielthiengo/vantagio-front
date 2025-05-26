import NaoCadastrado from '@/components/NaoCadastrado';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatarCPF, formatarData, formatarTelefone } from '@/lib/utils';
import ObterCliente, { Cliente } from '@/services/cliente/ObterCliente';
import { UserRoundSearch } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PedidosCliente from './PedidosCliente';
import ContatosCliente from './ContatosCliente';
import LoadingComponent from '@/components/LoadingComponent';
import AutomacoesCliente from './AutomcaoesCliente';

export default function ClienteDetalhe() {
  const { id } = useParams();
  const [cliente, setCliente] = useState<Cliente>({} as Cliente);

  const [isFetching, setIsFetching] = useState(true);

  const obterCliente = () => {
    ObterCliente.obter(Number(id))
      .then((data) => {
        setCliente(data);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    obterCliente();
  }, []);

  return (
    <div>
      {!isFetching && (
        <div>
          <PageHeader title={`Cliente - ${cliente?.pessoa?.nome}`} icon={<UserRoundSearch size={18} />} />

          <Card className="rounded shadow-none border border-gray-300 p-4 grid grid-cols-2 gap-3">
            <Card className="rounded shadow-none border border-gray-300 p-4">
              <span className="text-gray-600 text-sm">Dados do cliente</span>

              <Separator className="bg-gray-300 my-2" />

              <div className="grid grid-cols-[1fr_2fr] gap-2 text-sm mt-4">
                <span>CPF:</span>
                <span className="text-right">
                  {cliente?.pessoa?.cpf ? formatarCPF(cliente?.pessoa?.cpf) : <NaoCadastrado />}
                </span>

                <span>RG:</span>
                <span className="text-right">{cliente?.pessoa?.rg ? cliente?.pessoa?.rg : <NaoCadastrado />}</span>

                <span>Aniversário:</span>
                <span className="text-right">
                  {cliente?.pessoa?.dataNascimento ? (
                    formatarData(String(cliente?.pessoa?.dataNascimento), true)
                  ) : (
                    <NaoCadastrado />
                  )}
                </span>

                <span>Gênero:</span>
                <span className="text-right">
                  {cliente?.pessoa?.genero ? cliente?.pessoa?.genero : <NaoCadastrado />}
                </span>

                <span>Email:</span>
                <span className="text-right">{cliente?.email ? cliente?.email : <NaoCadastrado />}</span>

                <span>Telefone:</span>
                <span className="text-right">
                  {cliente?.telefone ? formatarTelefone(cliente?.telefone) : <NaoCadastrado />}
                </span>

                <span>Cadastro:</span>
                <span className="text-right">
                  {cliente?.dataCadastroExterno ? (
                    formatarData(String(cliente?.dataCadastroExterno))
                  ) : (
                    <NaoCadastrado />
                  )}
                </span>
              </div>
            </Card>
            <Card className="rounded shadow-none border border-gray-300 p-4">
              <span className="text-gray-600 text-sm">Pedidos do cliente</span>

              <Separator className="bg-gray-300 my-2" />

              {id && <PedidosCliente clienteId={Number(id)} />}
            </Card>
            <Card className="rounded shadow-none border border-gray-300 p-4">
              <span className="text-gray-600 text-sm">Automações</span>

              <Separator className="bg-gray-300 my-2" />

              {id && <AutomacoesCliente clienteId={Number(id)} />}
            </Card>
            <Card className="rounded shadow-none border border-gray-300 p-4">
              <span className="text-gray-600 text-sm">Contatos com cliente</span>

              <Separator className="bg-gray-300 my-2" />

              {id && cliente && <ContatosCliente cliente={cliente} />}
            </Card>
          </Card>
        </div>
      )}

      {isFetching && <LoadingComponent />}
    </div>
  );
}
