import { AlertCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import ListarNotificacoesAlerta from '@/services/notificacoes/ListarNotificacoesAlerta';
import { useNavigate } from 'react-router-dom';

export default function NotificacaoAlertas() {
  const navigate = useNavigate();
  const [notificacoes, setNotificacoes] = useState([
    {
      percentual: '',
      icon: '',
      titulo: '',
      tituloBtn: '',
      descricao: '',
      path: '',
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  async function listarNotificacoes() {
    try {
      const data = await ListarNotificacoesAlerta.listar();

      setIsLoading(false);

      setNotificacoes(data);
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listarNotificacoes();
  }, []);

  return (
    <div>
      {!isLoading && notificacoes.length > 0 && (
        <div className={`w-full grid ${notificacoes.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
          {notificacoes.map((notificacao, index) => {
            return (
              <Card
                key={notificacao.titulo}
                className={`w-full rounded-md shadow-none border-gray-300 ${
                  index === notificacoes.length - 1 && notificacoes.length === 3 && 'lg:col-span-2'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {notificacao.icon === 'alert' && <AlertCircle className="text-red-500 w-6 h-6 mt-1" />}
                    {notificacao.icon === 'trending-up' && <TrendingUp className="text-red-500 w-6 h-6 mt-1" />}
                    <div>
                      <h3 className="text-lg font-semibold">{notificacao.titulo}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{notificacao.descricao}</p>
                      <Button
                        variant="default"
                        className="text-sm"
                        onClick={() => {
                          navigate(notificacao.path);
                        }}
                      >
                        {notificacao.tituloBtn}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
