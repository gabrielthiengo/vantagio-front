import { PageHeader } from '@/components/PageHeader';
import { Timer } from 'lucide-react';
import { useTimer } from './useTimer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CardFeedback from '@/components/CardFeedback';
import LoadingComponent from '@/components/LoadingComponent';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

const Timers = () => {
  const { loading, timers, executarTimer } = useTimer();

  return (
    <div>
      <PageHeader title="Timers" icon={<Timer size={18} />} />

      <Card>
        <CardHeader>Lista de timers da Vantagio</CardHeader>

        <CardContent>
          {timers.map((timer) => {
            return (
              <div key={timer.slug} className="flex items-center justify-between mb-2 p-2 border rounded">
                <div className="flex flex-col">
                  {timer.nome}
                  <p className="text-xs text-gray-400">{timer.descricao}</p>
                </div>

                {loading === timer.slug ? (
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Executando...
                  </Button>
                ) : (
                  <Button
                    disabled={loading !== ''}
                    onClick={() => {
                      executarTimer(timer.slug);
                    }}
                  >
                    Executar
                  </Button>
                )}
              </div>
            );
          })}

          {loading === 'loading' && <LoadingComponent />}

          {loading === '' && timers.length === 0 && <CardFeedback text="Nenhum timer encontrado" />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Timers;
