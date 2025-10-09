import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { IEtapa } from '@/interfaces/IRegua';
import { ClipboardList, Mail, MessageCircle, Trash2 } from 'lucide-react';

type IEtapaListProps = {
  etapas: IEtapa[];
  isDisabledRemover: boolean;
  removerOnClick: (index: number) => void;
};

const EtapaList = ({ etapas, isDisabledRemover, removerOnClick }: IEtapaListProps) => {
  const getActionIcon = (action: string) => {
    return action === 'whatsapp' ? (
      <MessageCircle className="h-4 w-4" />
    ) : action === 'email' ? (
      <Mail className="h-4 w-4" />
    ) : (
      <ClipboardList className="h-4 w-4" />
    );
  };

  const getActionColor = (action: string) => {
    return action === 'whatsapp' ? 'whatsapp' : action === 'email' ? 'email' : 'atividade';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {etapas.map((etapa, index) => {
        return (
          <Card
            key={etapa.ordem}
            className="group relative overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 rounded-lg"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary from-primary" />

            <CardHeader className='className="flex items-start justify-between"'>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center gap-5 h-8 rounded-full bg-muted text-muted-foreground font-semibold text-sm">
                  {index}

                  <Badge
                    variant="outline"
                    className={`gap-1.5 border-${getActionColor(etapa.canal)} text-${getActionColor(etapa.canal)}`}
                    style={{
                      borderColor: `hsl(var(--${getActionColor(etapa.canal)}))`,
                      color: `hsl(var(--${getActionColor(etapa.canal)}))`,
                    }}
                  >
                    {getActionIcon(etapa.canal)}
                    {etapa.canal.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
              <div className="space-y-4">
                <div className="space-y-0">
                  <p className="text-xs font-medium text-muted-foreground">Template </p>
                  <p className="text-sm font-medium text-foreground">{etapa.template?.nome ?? 'Sem template'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-0">
                  <p className="text-xs font-medium text-muted-foreground">Tempo de espera</p>
                  <p className="text-sm font-medium text-foreground">{etapa.delayDias} dias</p>
                </div>

                <div className="space-y-0">
                  <p className="text-xs font-medium text-muted-foreground">Máx. envios/dia</p>
                  <p className="text-sm font-medium text-foreground">{etapa.qtdEnviosDia}</p>
                </div>
              </div>

              <div className="space-y-0">
                <p className="text-xs font-medium text-muted-foreground">Critério de saída</p>
                <p className="text-sm font-medium text-foreground">{etapa.condicao?.nome ?? 'Sem critério de saída'}</p>
              </div>

              <div className="space-y-0">
                <p className="text-xs font-medium text-muted-foreground">Envia cupom da etapa anterior?</p>
                <p className="text-sm font-medium text-foreground">
                  {etapa.isEnviarCupomEtapaAnterior ? 'SIM' : 'NÃO'}
                </p>
              </div>

              <div className="space-y-0">
                <p className="text-xs font-medium text-muted-foreground">Criar cupom de desconto?</p>
                <p className="text-sm font-medium text-foreground">{etapa.isUtilizaCupom ? 'SIM' : 'NÃO'}</p>
              </div>

              <div className="space-y-0">
                <p className="text-xs font-medium text-muted-foreground">Envia cupom existente?</p>
                <p className="text-sm font-medium text-foreground">{etapa.isUtilizaCupomExistente ? 'SIM' : 'NÃO'}</p>
              </div>

              {etapa.isUtilizaCupom && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-0">
                    <p className="text-xs font-medium text-muted-foreground">Tipo do desconto</p>
                    <p className="text-sm font-medium text-foreground">{etapa.cupom?.tipoDesconto}</p>
                  </div>
                  <div className="space-y-0">
                    <p className="text-xs font-medium text-muted-foreground">Valor do desconto</p>
                    <p className="text-sm font-medium text-foreground">{etapa.cupom?.valorDesconto}</p>
                  </div>
                  <div className="space-y-0">
                    <p className="text-xs font-medium text-muted-foreground">Valor mínimo da compra</p>
                    <p className="text-sm font-medium text-foreground">
                      {etapa.cupom?.valorMinimoCompra ?? 'Não informado'}
                    </p>
                  </div>
                  <div className="space-y-0">
                    <p className="text-xs font-medium text-muted-foreground">Qtd dias validade</p>
                    <p className="text-sm font-medium text-foreground">
                      {etapa.cupom?.qtdDiasValidade ?? 'Não informado'}
                    </p>
                  </div>
                  <div className="space-y-0">
                    <p className="text-xs font-medium text-muted-foreground">Qtd total de utilização</p>
                    <p className="text-sm font-medium text-foreground">{etapa.cupom?.qtdTotalUso ?? 'Não informado'}</p>
                  </div>
                  <div className="space-y-0">
                    <p className="text-xs font-medium text-muted-foreground">Qtd total utili. por cliente</p>
                    <p className="text-sm font-medium text-foreground">
                      {etapa.cupom?.qtdUsoCliente ?? 'Não informado'}
                    </p>
                  </div>
                </div>
              )}

              {etapa.isUtilizaCupomExistente && (
                <div className="space-y-0">
                  <p className="text-xs font-medium text-muted-foreground">Código do cupom</p>
                  <p className="text-sm font-medium text-foreground">{etapa.cupom?.codigo}</p>
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Button
                variant="destructive"
                className="w-full gap-2"
                disabled={isDisabledRemover}
                onClick={(e) => {
                  e.preventDefault();

                  removerOnClick(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
                Remover etapa
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default EtapaList;
