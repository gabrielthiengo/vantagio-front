import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader } from '../../components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { InputError } from '@/components/InputErrors';
import logotipo from '@/assets/logo-vantagio.jpeg';
import { useLogin } from './useLogin';
import { Link } from 'react-router-dom';

export const Login = () => {
  const { isLoading, isValid, errors, register, handleSubmit, handleFormSubmit } = useLogin();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="rounded-md w-1/3 min-h-1/2 p-8">
        <CardHeader className="flex flex-col items-center">
          <img src={logotipo} alt="logo" style={{ width: '250px' }} />

          <CardDescription>Venda com vantagem todos os dias</CardDescription>
        </CardHeader>

        <CardContent>
          <form action="submit" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input {...register('email')} className={`${errors.email && 'border-red-500'}`} />
              {errors.email && <InputError error={errors.email?.message ?? ''} />}
            </div>

            <div className="mt-2">
              <Label htmlFor="senha">Senha</Label>
              <Input {...register('password')} type="password" className={`${errors.password && 'border-red-500'}`} />
              {errors.password && <InputError error={errors.password?.message ?? ''} />}
            </div>

            {!isLoading ? (
              <Button type="submit" className="w-full mt-8 px-4" disabled={!isValid}>
                ACESSAR
              </Button>
            ) : (
              <Button disabled className="w-full mt-8 bg-secondaryBackground">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
              </Button>
            )}
          </form>

          <div className="mt-6 text-sm w-full text-right">
            <span className="text-gray-600">Não possui usuário?</span>{' '}
            <Link to="/acesso" className="text-primary font-semibold">
              Cadastre-se aqui!
            </Link>{' '}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
