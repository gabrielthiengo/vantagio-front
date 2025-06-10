import LoadingComponent from '@/components/LoadingComponent';
import { useCamposCustomizados } from './useCamposCustomizados';
import { Card } from '@/components/ui/card';
import InputBlock from '@/components/InputBlock';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import CardFeedback from '@/components/CardFeedback';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function CamposCustomizadosIntegracao({ empresaId }: { empresaId: number }) {
  const {
    isFetching,
    camposIntegracao,
    isSalvando,
    toggleDialogCriar,
    campoIntegracaoRecord,
    setCampoIntegracaoRecord,
    setToggleDialogCriar,
    excluirCampoIntegracao,
    criarCampoIntegracao,
  } = useCamposCustomizados(empresaId);

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-800">Campos customizados integração</span>

        <Button onClick={() => setToggleDialogCriar(true)}>+ Campo customizado</Button>
      </div>

      <Separator className="mt-2 mb-2" />

      {!isFetching && (
        <div className="flex flex-wrap gap-2">
          {camposIntegracao.map((campo) => {
            return (
              <Card key={campo.id} className="p-4 rounded flex flex-col gap-2">
                <InputBlock label="Nome do campo">
                  <Input value={campo.campo} disabled />
                </InputBlock>

                <InputBlock label="Path">
                  <Input value={campo.path} disabled />
                </InputBlock>

                <InputBlock label="Funcionalidade">
                  <Input value={campo.funcionalidade.nome} disabled />
                </InputBlock>

                {!campo.isExcluindo ? (
                  <Button
                    variant={'destructive'}
                    className="mt-5"
                    onClick={() => {
                      excluirCampoIntegracao(campo.id);
                    }}
                  >
                    Remover
                  </Button>
                ) : (
                  <Button variant={'destructive'} disabled className="mt-5 flex items center gap-2">
                    <LoaderCircle className="animate-spin" size={14} /> Removendo
                  </Button>
                )}
              </Card>
            );
          })}

          {camposIntegracao.length === 0 && <CardFeedback text="Nenhum campo configurado" />}
        </div>
      )}

      <Dialog open={toggleDialogCriar} onOpenChange={setToggleDialogCriar}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Criar campo integração</DialogTitle>
            <DialogDescription>
              Início do processo de cadastro do mapeamento dos campos retornados pela api.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1">
            <InputBlock label="Nome do campo">
              <Input
                onChange={(e) => {
                  setCampoIntegracaoRecord({
                    ...campoIntegracaoRecord,
                    campo: e.target.value,
                  });
                }}
              />
            </InputBlock>

            <InputBlock label="Path">
              <Input
                onChange={(e) => {
                  setCampoIntegracaoRecord({
                    ...campoIntegracaoRecord,
                    path: e.target.value,
                  });
                }}
              />
            </InputBlock>

            <InputBlock label="Funcionalidade">
              <Input
                onChange={(e) => {
                  setCampoIntegracaoRecord({
                    ...campoIntegracaoRecord,
                    funcionalidade: e.target.value,
                  });
                }}
              />
            </InputBlock>

            <DialogFooter>
              {!isSalvando ? (
                <Button className="mt-4" onClick={criarCampoIntegracao}>
                  Salvar campo
                </Button>
              ) : (
                <Button disabled className="flex items-center bg-secondaryBackground mt-4">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </Button>
              )}
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {isFetching && <LoadingComponent />}
    </div>
  );
}
