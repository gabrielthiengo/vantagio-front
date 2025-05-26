import { RecomendacoesData } from '@/components/Recomendacoes/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ListarInfoClienteComunicacao from '@/services/cliente/ListarInfoClienteComunicacao';
import { useEffect, useState } from 'react';
import { DadosClienteComunicacao } from './type';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle, MessageCircleHeart, Send } from 'lucide-react';
import { formatarCurrency, formatarData, formatarEndereco, removerMascaraTelefone } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import ListaEmojis from '@/components/ListaEmojis';
import { Status, StatusPedido } from '@/components/StatusPedido';
import CriarMensagemCliente from '@/services/mensagem-cliente/CriarMensagemCliente';

type ClienteDetalheComunicacaoProps = {
  cliente: RecomendacoesData;
  esconderPedidos?: boolean;
  callback?: () => void;
};

export default function ClienteDetalheComunicacao({
  cliente,
  esconderPedidos,
  callback,
}: ClienteDetalheComunicacaoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [dadosCliente, setDadosCliente] = useState<DadosClienteComunicacao | null>(null);
  const [toggleWhatsapp, setToggleWhatsapp] = useState(false);
  const [mensagemWhatsapp, setMensagemWhatsapp] = useState('');

  const obterDadosCliente = () => {
    ListarInfoClienteComunicacao.listar(cliente.id)
      .then((data) => {
        setDadosCliente(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    obterDadosCliente();
  }, []);

  const enviarWhatsappOnClick = () => {
    setToggleWhatsapp(!toggleWhatsapp);
  };

  const openWhatsappWindow = () => {
    setIsSendingMessage(true);

    CriarMensagemCliente.create({
      clienteId: cliente.id,
      mensagem: mensagemWhatsapp,
    })
      .then(() => {
        window.open(
          `https://web.whatsapp.com/send?phone=55${removerMascaraTelefone(cliente.telefone)}&text=` +
            encodeURIComponent(mensagemWhatsapp),
          '_blank',
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSendingMessage(false);

        if (callback) {
          callback();
        }
      });
  };

  return (
    <div>
      {!isLoading && (
        <div className="flex gap-2">
          <Card className="flex-1 grid grid-cols-2 gap-2 shadow-none border-gray-300 rounded-md p-4">
            <div className="flex flex-col">
              <label className="text-xs text-gray-600">CPF: </label>
              <span>{dadosCliente?.pessoa.cpf || 'Não cadastrado'}</span>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-600">RG: </label>
              <span>{dadosCliente?.pessoa.rg || 'Não cadastrado'}</span>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-600">Data de nascimento: </label>
              <span>{dadosCliente?.pessoa.dataNascimento || 'Não cadastrado'}</span>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-600">Gênero: </label>
              <span>{dadosCliente?.pessoa.genero || 'Não cadastrado'}</span>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-600">E-mail: </label>
              <span>{dadosCliente?.email || 'Não cadastrado'}</span>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-600">Telefone: </label>
              <span>{dadosCliente?.telefone || 'Não cadastrado'}</span>
            </div>

            <div className="flex flex-col lg:col-span-2">
              <label className="text-xs text-gray-600">Endereço: </label>
              <span>
                {formatarEndereco({
                  logradouro: dadosCliente?.endereco?.logradouro,
                  numero: dadosCliente?.endereco?.numero,
                  bairro: dadosCliente?.endereco?.bairro,
                  complemento: dadosCliente?.endereco?.complemento,
                  cep: dadosCliente?.endereco?.cep,
                  cidade: dadosCliente?.endereco?.cidade?.nome,
                  uf: dadosCliente?.endereco?.cidade?.uf?.sigla,
                }) !== ''
                  ? formatarEndereco({
                      logradouro: dadosCliente?.endereco?.logradouro,
                      numero: dadosCliente?.endereco?.numero,
                      bairro: dadosCliente?.endereco?.bairro,
                      complemento: dadosCliente?.endereco?.complemento,
                      cep: dadosCliente?.endereco?.cep,
                      cidade: dadosCliente?.endereco?.cidade?.nome,
                      uf: dadosCliente?.endereco?.cidade?.uf?.sigla,
                    })
                  : 'Não cadastrado'}
              </span>
            </div>

            <div className="flex flex-col lg:col-span-2">
              <Separator className="bg-gray-300" />
            </div>

            {!toggleWhatsapp && (
              <div className="flex flex-col lg:col-span-2">
                <Button
                  variant={'ghost'}
                  disabled={cliente.telefone === null}
                  className="flex items-center gap-1 text-green-600 hover:text-green-700"
                  onClick={() => enviarWhatsappOnClick()}
                >
                  Enviar whatsapp <MessageCircleHeart size={14} />
                </Button>
              </div>
            )}

            {toggleWhatsapp && (
              <div className="flex flex-col gap-2 lg:col-span-2">
                <div>
                  <span className="text-xs text-gray-600">Mensagem: </span>
                  <Textarea
                    value={mensagemWhatsapp}
                    onChange={(val) => setMensagemWhatsapp(val.target.value)}
                    placeholder="Personalize sua mensagem aqui 😊"
                  />
                  <div className="mt-1">
                    <ListaEmojis
                      totalExibicao={15}
                      selectedEmoji={(emogi) => {
                        setMensagemWhatsapp(`${mensagemWhatsapp} ${emogi}`);
                      }}
                    />
                  </div>
                </div>

                <Button
                  variant={'outline'}
                  className=" text-green-600 border-green-300 hover:text-green-700"
                  disabled={mensagemWhatsapp === '' || isSendingMessage}
                  onClick={() => openWhatsappWindow()}
                >
                  {isSendingMessage ? (
                    <span className="flex items-center gap-1">
                      Preparando mensagem <LoaderCircle className="animate-spin" size={14} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      Enviar mensagem <Send size={14} />
                    </span>
                  )}
                </Button>
              </div>
            )}
          </Card>

          {!esconderPedidos && (
            <Card className="flex-1 flex flex-col gap-2 shadow-none border-gray-300 rounded-md p-4">
              <span className="text-xs text-gray-600">Últimas compras:</span>

              {dadosCliente?.pedidos?.map((pedido) => {
                return (
                  <Card key={pedido.id} className="flex flex-col p-4 shadow-none border-gray-300 rounded-md mb-1">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <label className="text-xs text-gray-600">Valor total: </label>
                        <span>{formatarCurrency(Number(pedido.valorTotal))}</span>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs text-gray-600">Data do pedido: </label>
                        <span>{formatarData(pedido.dataCadastroExterno)}</span>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs text-gray-600">Status: </label>
                        <StatusPedido status={pedido.status as Status} />
                      </div>
                    </div>

                    <div className="mt-1">
                      <label className=" text-gray-600 ">Produtos: </label>

                      <Separator className="mt-1 mb-1 bg-gray-300" />

                      {pedido.produtos.map((produto) => {
                        return (
                          <div className="grid grid-cols-[2fr_1fr_1fr] gap-1">
                            <div className="flex flex-col mb-1">
                              <label className="text-xs text-gray-600">Descrição: </label>
                              <span>{produto.nomeProduto}</span>
                            </div>

                            <div className="flex flex-col mb-1 text-center">
                              <label className="text-xs text-gray-600">Quantidade: </label>
                              <span>{produto.quantidade}</span>
                            </div>

                            <div className="flex flex-col mb-1 text-right">
                              <label className="text-xs text-gray-600">Valor total: </label>
                              <span>{formatarCurrency(Number(produto.valorTotal))}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </Card>
          )}
        </div>
      )}

      {isLoading && (
        <div>
          <Skeleton className="h-5 mb-1" />
          <Skeleton className="h-5 mb-1" />
          <Skeleton className="h-5 mb-1" />
          <Skeleton className="h-5 mb-1" />
          <Skeleton className="h-5" />
        </div>
      )}
    </div>
  );
}
