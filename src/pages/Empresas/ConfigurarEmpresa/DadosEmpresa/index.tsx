import { InputError } from '@/components/InputErrors';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IEmpresa } from '@/interfaces/IEmpresa';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useEditarEmpresa } from './useEditarEmpresa';
import LoadingComponent from '@/components/LoadingComponent';

export const DadosEmpresa = ({ empresa }: { empresa: IEmpresa }) => {
  const { isLoading, errors, register, handleSubmit, handleFormSubmit } = useEditarEmpresa();

  return (
    <div className="h-full">
      {!isLoading ? (
        <Card className="p-2 rounded">
          <form action="submit" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  {...register('cnpj')}
                  value={empresa.cnpj}
                  disabled
                  className={`${errors.cnpj && 'border-red-500'}`}
                />
                {errors.cnpj && <InputError error={errors.cnpj?.message ?? ''} />}
              </div>

              <div>
                <Label htmlFor="razaoSocial">Razão social</Label>
                <Input
                  {...register('razaoSocial')}
                  value={empresa.razaoSocial}
                  disabled
                  className={`${errors.razaoSocial && 'border-red-500'}`}
                />
                {errors.razaoSocial && <InputError error={errors.razaoSocial?.message ?? ''} />}
              </div>

              <div>
                <Label htmlFor="nomeFantasia">NomeFantasia</Label>
                <Input
                  {...register('nomeFantasia')}
                  value={empresa.nomeFantasia}
                  disabled
                  className={`${errors.nomeFantasia && 'border-red-500'}`}
                />
                {errors.nomeFantasia && <InputError error={errors.nomeFantasia?.message ?? ''} />}
              </div>

              <div>
                <Label htmlFor="dominio">Dominio</Label>
                <Input
                  {...register('dominio')}
                  disabled
                  value={empresa.dominio}
                  className={`${errors.dominio && 'border-red-500'}`}
                />
                {errors.dominio && <InputError error={errors.dominio?.message ?? ''} />}
              </div>

              <div>
                <Label htmlFor="ecommerce">Ecommerce</Label>
                <Input
                  {...register('ecommerce')}
                  value={empresa.sistema}
                  disabled
                  className={`${errors.ecommerce && 'border-red-500'}`}
                />
                {errors.ecommerce && <InputError error={errors.ecommerce?.message ?? ''} />}
              </div>

              <div>
                <Label htmlFor="apiKey">API key</Label>
                <Input
                  {...register('apiKey')}
                  value={empresa.apiKey}
                  disabled
                  className={`${errors.apiKey && 'border-red-500'}`}
                />
                {errors.apiKey && <InputError error={errors.apiKey?.message ?? ''} />}
              </div>
              <div>
                <Label htmlFor="apiSecret">API secret</Label>
                <Input
                  {...register('apiSecret')}
                  value={empresa.apiSecret}
                  disabled
                  className={`${errors.apiSecret && 'border-red-500'}`}
                />
                {errors.apiSecret && <InputError error={errors.apiSecret?.message ?? ''} />}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-gray-500 mb-4">Endereço</div>

              <div className="w-80">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  {...register('cep')}
                  disabled
                  value={empresa.cep}
                  className={`${errors.cep && 'border-red-500'}`}
                />
                {errors.cep && <InputError error={errors.cep?.message ?? ''} />}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="logradouro">Logradouro</Label>
                  <Input
                    {...register('logradouro')}
                    value={empresa.logradouro}
                    disabled
                    className={`${errors.logradouro && 'border-red-500'}`}
                  />
                  {errors.logradouro && <InputError error={errors.logradouro?.message ?? ''} />}
                </div>
                <div>
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    {...register('numero')}
                    value={empresa.numero}
                    disabled
                    className={`${errors.numero && 'border-red-500'}`}
                  />
                  {errors.numero && <InputError error={errors.numero?.message ?? ''} />}
                </div>
                <div>
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input
                    {...register('bairro')}
                    value={empresa.bairro}
                    disabled
                    className={`${errors.bairro && 'border-red-500'}`}
                  />
                  {errors.bairro && <InputError error={errors.bairro?.message ?? ''} />}
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    {...register('cidade')}
                    disabled
                    value={empresa.cidade?.nome}
                    className={`${errors.cidade && 'border-red-500'}`}
                  />
                  {errors.cidade && <InputError error={errors.cidade?.message ?? ''} />}
                </div>
                <div>
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    {...register('complemento')}
                    disabled
                    value={empresa.complemento}
                    className={`${errors.complemento && 'border-red-500'}`}
                  />
                  {errors.complemento && <InputError error={errors.complemento?.message ?? ''} />}
                </div>
              </div>
            </div>

            <div className="w-full text-right mt-4">
              {!isLoading ? (
                <Button type="submit" disabled className="mt-4">
                  Atualizar empresa
                </Button>
              ) : (
                <Button disabled className="flex items-center bg-secondaryBackground mt-4">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </Button>
              )}
            </div>
          </form>
        </Card>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};
