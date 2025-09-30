// import { Container } from './styles';

import { Tag } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { useCupomDesconto } from './useCupomDesconto';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ClienteCombobox } from '../Combobox/ClienteCombobox';
import { ReloadIcon } from '@radix-ui/react-icons';
import CardFeedback from '../CardFeedback';
import { formatarData } from '@/lib/utils';
import { NumericFormat } from 'react-number-format';

const CupomDesconto = () => {
  const {
    loading,
    codigoCupom,
    clienteId,
    cupom,
    valorPedido,
    setValorPedido,
    setClienteId,
    setCodigoCupom,
    aplicarCupomCliente,
    validarCupomCliente,
  } = useCupomDesconto();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Tag size={20} color="orange" /> <h3 className="font-semibold">Cupons de desconto</h3>
        </div>
      </CardHeader>

      <CardContent className="flex gap-6">
        <div className="space-y-4 w-full">
          {/* Busca do cliente */}
          <ClienteCombobox
            isClearSelectedValue={clienteId === null}
            handleClienteSelected={(clienteId: number) => {
              setClienteId(clienteId);
            }}
          />

          {/* Cupom */}
          <div className="flex gap-2">
            <Input placeholder="Digite o cupom " value={codigoCupom} onChange={(e) => setCodigoCupom(e.target.value)} />

            <NumericFormat
              className='"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",'
              placeholder="Valor do pedido"
              value={valorPedido}
              onValueChange={(value) => setValorPedido(value.floatValue ?? 0)}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
            />

            {loading === 'validando' ? (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Validando...
              </Button>
            ) : (
              <Button
                disabled={codigoCupom === '' || clienteId === null || loading !== ''}
                onClick={validarCupomCliente}
              >
                Validar cupom
              </Button>
            )}
          </div>
        </div>

        <div className="w-full">
          {/* Resumo */}

          {cupom?.id ? (
            <div className="flex flex-col gap-2">
              <span>Resumo</span>
              <div>
                {cupom?.valorMinimoCompra && cupom?.valorMinimoCompra > 0 && (
                  <p className={`${valorPedido < cupom?.valorMinimoCompra && 'text-red-500'}`}>
                    <b>Valor mínimo:</b>{' '}
                    {cupom?.valorMinimoCompra !== undefined
                      ? new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(cupom.valorMinimoCompra)
                      : '-'}
                  </p>
                )}
                <p>
                  <b>Total utilização:</b> {cupom?.qtdTotalUso ?? 0}
                </p>
                <p>
                  <b>Total utilizado:</b> {cupom?.qtdUtilizado ?? 0}
                </p>
                <p>
                  <b>Cupom: </b>
                  {`${cupom?.codigo} (${cupom?.valorDesconto})${cupom?.tipoDesconto === 'percentual' ? '%' : ''}`}
                </p>
                <p>
                  <b>Validade:</b> até {formatarData(String(cupom?.dataFimValidade ?? ''), true)}
                </p>
              </div>

              {/* Ação */}

              {loading === 'aplicando' ? (
                <Button disabled className="w-full">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  aplicando cupom...
                </Button>
              ) : (
                <Button
                  className="w-full"
                  disabled={codigoCupom === '' || clienteId === null || valorPedido < (cupom?.valorMinimoCompra ?? 0)}
                  onClick={aplicarCupomCliente}
                >
                  Aplicar cupom ao cliente
                </Button>
              )}
            </div>
          ) : (
            <CardFeedback text="Selecione o cliente e o cupom para validar" className="mt-0" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CupomDesconto;
