import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useCriarEmpresa } from './useCriarEmpresa';
import { InputError } from '@/components/InputErrors';
import { ReloadIcon } from '@radix-ui/react-icons';

export function CriarEmpresa() {
  const { isLoading, isValid, errors, register, handleSubmit, handleFormSubmit } = useCriarEmpresa();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus size={18} className="mr-1" />
          Empresa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Criar empresa</DialogTitle>
          <DialogDescription>Início do processo de cadastro e configuração de uma nova empresa.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form action="submit" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input {...register('cnpj')} className={`${errors.cnpj && 'border-red-500'}`} />
              {errors.cnpj && <InputError error={errors.cnpj?.message ?? ''} />}
            </div>

            <div>
              <Label htmlFor="dominio">Dominio</Label>
              <Input {...register('dominio')} className={`${errors.dominio && 'border-red-500'}`} />
              {errors.dominio && <InputError error={errors.dominio?.message ?? ''} />}
            </div>

            <div>
              <Label htmlFor="ecommerce">Ecommerce</Label>
              <Input {...register('ecommerce')} className={`${errors.ecommerce && 'border-red-500'}`} />
              {errors.ecommerce && <InputError error={errors.ecommerce?.message ?? ''} />}
            </div>

            <div>
              <div>
                <Label htmlFor="apiKey">API key</Label>
                <Input {...register('apiKey')} className={`${errors.apiKey && 'border-red-500'}`} />
                {errors.apiKey && <InputError error={errors.apiKey?.message ?? ''} />}
              </div>
              <div>
                <Label htmlFor="apiSecret">API secret</Label>
                <Input {...register('apiSecret')} className={`${errors.apiSecret && 'border-red-500'}`} />
                {errors.apiSecret && <InputError error={errors.apiSecret?.message ?? ''} />}
              </div>
            </div>

            <DialogFooter>
              {!isLoading ? (
                <Button type="submit" className="mt-4" disabled={!isValid}>
                  Criar empresa
                </Button>
              ) : (
                <Button disabled className="flex items-center bg-secondaryBackground mt-4">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </Button>
              )}
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
