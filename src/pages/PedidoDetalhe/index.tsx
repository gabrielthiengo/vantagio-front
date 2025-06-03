import { PageHeader } from '@/components/PageHeader';
import { ShoppingBasket } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useDatalhePedido } from './useDetalhePedido';
import LoadingComponent from '@/components/LoadingComponent';
import { Card } from '@/components/ui/card';
import InputBlock from '@/components/InputBlock';
import { formatarCurrency, formatarData, formatarTelefone } from '@/lib/utils';
import { Status, StatusPedido } from '@/components/StatusPedido';

export default function PedidoDetalhe() {
  const { id } = useParams();
  const { isFetching, pedido } = useDatalhePedido({ pedidoId: Number(id) });

  return (
    <div className="w-full">
      <PageHeader title="Detalhes do pedido" icon={<ShoppingBasket size={18} />}></PageHeader>

      {!isFetching ? (
        <div className="flex gap-3">
          <Card className="flex-1 p-4 shadow-sm flex flex-col gap-2">
            <span className="text-sm text-gray-500">Detalhes</span>

            <div className="flex gap-2">
              <Card className="flex-1 p-4 shadow-sm grid grid-cols-2 gap-2">
                <InputBlock label="Nome do cliente">
                  <span className="text-sm text-gray-700">{pedido.cliente?.pessoa.nome}</span>
                </InputBlock>

                <InputBlock label="CPF">
                  <span className="text-sm text-gray-700">{pedido.cliente?.pessoa.cpf ?? 'Sem CPF'}</span>
                </InputBlock>

                <InputBlock label="RG">
                  <span className="text-sm text-gray-700">{pedido.cliente?.pessoa.rg ?? 'Sem RG'}</span>
                </InputBlock>

                <InputBlock label="Data de nascimento">
                  <span className="text-sm text-gray-700">
                    {pedido.cliente?.pessoa.dataNascimento
                      ? formatarData(String(pedido.cliente?.pessoa.dataNascimento))
                      : 'Sem data de nascimento'}
                  </span>
                </InputBlock>

                <InputBlock label="Gênero">
                  <span className="text-sm text-gray-700">{pedido.cliente?.pessoa.genero ?? 'Sem gênero'}</span>
                </InputBlock>

                <InputBlock label="Telefone">
                  <span className="text-sm text-gray-700">
                    {formatarTelefone(pedido.cliente?.telefone) ?? 'Sem gênero'}
                  </span>
                </InputBlock>

                <InputBlock label="Email">
                  <span className="text-sm text-gray-700">{pedido.cliente?.email ?? 'Sem gênero'}</span>
                </InputBlock>
              </Card>

              <Card className="flex-1 p-4 shadow-sm grid grid-cols-2 gap-2">
                <InputBlock label="Valor total">
                  <span className="text-sm text-gray-700">{formatarCurrency(Number(pedido.valorTotal))}</span>
                </InputBlock>

                <InputBlock label="Valor desconto">
                  <span className="text-sm text-gray-700">{formatarCurrency(Number(pedido.valorDesconto))}</span>
                </InputBlock>

                <InputBlock label="Valor entrega">
                  <span className="text-sm text-gray-700">{formatarCurrency(Number(pedido.valorEntrega))}</span>
                </InputBlock>

                <InputBlock label="Status do pedido">
                  <span className="text-sm text-gray-700">{<StatusPedido status={pedido.status as Status} />}</span>
                </InputBlock>

                <InputBlock label="Método pagamento">
                  <span className="text-sm text-gray-700">{pedido.metodoPagamento}</span>
                </InputBlock>

                <InputBlock label="Data pagamento">
                  <span className="text-sm text-gray-700">
                    {pedido.dataPagamento ? formatarData(String(pedido.dataPagamento)) : 'Sem data de pagamento'}
                  </span>
                </InputBlock>

                <InputBlock label="Data finalização">
                  <span className="text-sm text-gray-700">
                    {pedido.dataFinalizacao ? formatarData(String(pedido.dataFinalizacao)) : 'Sem data de finalização'}
                  </span>
                </InputBlock>

                <InputBlock label="Data criação">
                  <span className="text-sm text-gray-700">{formatarData(String(pedido.dataCadastroExterno))}</span>
                </InputBlock>

                <InputBlock label="Carrinho hash">
                  <span className="text-sm text-gray-700">{pedido.carrinhoHash}</span>
                </InputBlock>
              </Card>
            </div>
          </Card>
          <Card className="flex-1 p-4 shadow-sm flex flex-col gap-2">
            <span className="text-sm text-gray-500">Produtos do pedido</span>
            {pedido.produtos.map((produto) => {
              return (
                <Card className="flex-1 p-4 shadow-sm" key={produto.id}>
                  <InputBlock label="Produto">
                    <span className="text-sm text-gray-700">{produto.nomeProduto}</span>
                  </InputBlock>

                  <div className="grid grid-cols-4 mt-3">
                    <InputBlock label="Quantidade">
                      <span className="text-sm text-gray-700">{produto.quantidade}</span>
                    </InputBlock>

                    <InputBlock label="Valor total taxa">
                      <span className="text-sm text-gray-700">{formatarCurrency(Number(produto.valorTotalTaxa))}</span>
                    </InputBlock>

                    <InputBlock label="Valor subtotal">
                      <span className="text-sm text-gray-700">{formatarCurrency(Number(produto.valorSubTotal))}</span>
                    </InputBlock>

                    <InputBlock label="Valor total">
                      <span className="text-sm text-gray-700">{formatarCurrency(Number(produto.valorTotal))}</span>
                    </InputBlock>
                  </div>
                </Card>
              );
            })}
          </Card>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
}
