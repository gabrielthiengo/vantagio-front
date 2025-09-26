import { Card, CardContent, CardHeader } from '../ui/card';
import { MessageCircle } from 'lucide-react';
import { useMensagens } from './useMensagens';
import LoadingComponent from '../LoadingComponent';
import { formatarData } from '@/lib/utils';
import { Button } from '../ui/button';
import CardFeedback from '../CardFeedback';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { ReloadIcon } from '@radix-ui/react-icons';

const WhatsappMensagem = () => {
  const {
    isLoading,
    status,
    mensagens,
    isEncerrando,
    setStatus,
    toggleEncerrar,
    nomeCliente,
    setNomeCliente,
    setToggleEncerrar,
    inativarConversa,
  } = useMensagens();

  return (
    <Card>
      {!isLoading && (
        <>
          <CardHeader>
            <div>
              <div className="flex items-center gap-2">
                <MessageCircle size={22} color="#25D366" />
                <h3 className="font-semibold text-lg">Mensagems do whatsapp</h3>
              </div>

              <p className="text-xs text-muted-foreground mb-2 mt-0">
                Mensagens recebidas de clientes que responderam às mensagens enviadas pela automação.
              </p>

              <div className="flex items-center gap-2">
                <button
                  className={`px-4 rounded-xl text-xs border bg-gray-200 text-gray-600 font-semibold hover:bg-gray-300 ${
                    status === 'ativas' && 'bg-green-200 text-green-600 hover:bg-green-300'
                  }`}
                  onClick={() => setStatus('ativas')}
                >
                  Ativas
                </button>
                <button
                  className={`px-4 rounded-xl text-xs border bg-gray-200 text-gray-600 font-semibold hover:bg-gray-300 ${
                    status === 'encerradas' && 'bg-red-200 text-red-600 hover:bg-red-300'
                  }`}
                  onClick={() => setStatus('encerradas')}
                >
                  Encerradas
                </button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {mensagens.map((mensagem) => {
              return (
                <div className="flex-1 p-4 overflow-y-auto space-y-4 mb-2 bg-gray-200/90 rounded shadow">
                  <div className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/40?img=3" alt="Cliente" className="w-6 h-6 rounded-full" />
                    <div>
                      <span className="text-sm">{mensagem.pessoa?.nome}</span>
                      <p className="text-xs text-gray-600">{mensagem.telefone}</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto mb-4 space-y-2 ">
                    {mensagem.mensagens.map((m) => {
                      return (
                        <div className="flex items-start space-x-3">
                          <div className="mb-1">
                            <div className="bg-white p-3 rounded-xl shadow max-w-xs relative min-w-96">
                              <p className="text-gray-800 mb-2 text-sm">{m.mensagem}</p>
                              <span className="text-xs text-gray-400 absolute bottom-1 right-2 mt-1">
                                {formatarData(String(m.createdAt))}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant={'ghost'}
                      disabled={mensagem.isEncerrada}
                      className="hover:bg-gray-300"
                      onClick={() => {
                        setNomeCliente(mensagem.mensagens[0].nome);
                        setToggleEncerrar(true);
                      }}
                    >
                      Encerrar conversa
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => {
                        window.open(`https://web.whatsapp.com/send?phone=55${mensagem.telefone}`, '_blank');
                      }}
                    >
                      Iniciar conversa
                    </Button>
                  </div>
                </div>
              );
            })}

            {mensagens.length === 0 && <CardFeedback text="Nenhuma mensagem encontrada" />}
          </CardContent>
        </>
      )}

      <AlertDialog open={toggleEncerrar} onOpenChange={setToggleEncerrar}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja realmente encerrar esta conversa?</AlertDialogTitle>
            <AlertDialogDescription>As conversas serão automaticamente encerradas após 24 horas</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-5">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            {!isEncerrando ? (
              <Button onClick={() => inativarConversa(nomeCliente)}>Continuar</Button>
            ) : (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isLoading && <LoadingComponent />}
    </Card>
  );
};

export default WhatsappMensagem;
