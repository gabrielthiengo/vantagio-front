import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

import logotipo from '@/assets/logo-vantagio.jpeg';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import PrimeiroAcessoService from '@/services/primeiro-acesso/PrimeiroAcessoService';
import { toast } from 'react-toastify';
import { InputError } from '@/components/InputErrors';
import { useCriarUsuario } from './useCriarUsuario';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

export default function PrimeiroAcesso() {
  const navigate = useNavigate();
  const { errors, register } = useCriarUsuario();
  const [step, setStep] = useState(1);
  const [cnpj, setCnpj] = useState('');
  const [isFetchingEmpresa, setIsFetchingEmpresa] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [dadosPrimeiroAcesso, setDadosPrimeiroAcesso] = useState<any>({});
  const [usuario, setUsuario] = useState<any>({});
  const [isTermoChecked, setIsTermoChecked] = useState(false);

  const buscarEmpresa = () => {
    setIsFetchingEmpresa(true);

    PrimeiroAcessoService.obterEmpresa(cnpj)
      .then((data) => {
        if (data.message !== '') {
          toast.error(data.message);

          return;
        }

        setUsuario({
          ...usuario,
          tenantId: data.empresa.id,
        });

        setDadosPrimeiroAcesso(data);

        setStep(2);
      })
      .finally(() => {
        setIsFetchingEmpresa(false);
      });
  };

  const handleUserSubmit = () => {
    setStep(3);
  };

  const finalizarConfiguracao = () => {
    setIsFinishing(true);

    PrimeiroAcessoService.criar(
      {
        nome: usuario?.nome,
        email: usuario?.email,
        senha: usuario?.senha,
        confirmarSenha: usuario?.confirmarSenha,
        tenantId: usuario?.tenantId,
      },
      { isAceito: isTermoChecked, ipCliente: navigator.userAgent, termoId: dadosPrimeiroAcesso.termo.id },
      usuario?.tenantId,
    )
      .then(() => {
        toast.success(
          'Parabéns! A configuração foi finalizada com sucesso. Agora você já pode começar a usar o sistema.',
        );

        navigate('/authenticate');
      })
      .catch((err) => {
        toast.error(err.response.data.message);

        if (err.response.data.message === 'O email informado já está sendo utilizado por outro usuário') {
          setStep(2);
        }
      })
      .finally(() => {
        setIsFinishing(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <Card className="rounded-md p-6 w-1/3 border border-gray-300">
        <CardHeader className="flex flex-col items-center">
          <img src={logotipo} alt="logo" style={{ width: '250px' }} />

          <CardDescription>A jornada de sucesso do seu e-commerce começa aqui</CardDescription>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <div>
              <div className="text-center text-sm">
                <span>
                  Bem-vindo! Para começarmos, digite o CNPJ da sua empresa e vamos buscar seus dados automaticamente.
                </span>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="Digite o CNPJ" />
                <Button className="w-52" disabled={cnpj.length < 14 || isFetchingEmpresa} onClick={buscarEmpresa}>
                  {!isFetchingEmpresa ? (
                    'Pesquisar'
                  ) : (
                    <div className="flex items-center">
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Pesquisando
                    </div>
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-center text-sm">
                <span>
                  Tudo certo com os dados da sua empresa! Agora, crie seu usuário para começar a usar o sistema.
                </span>

                <form className="flex flex-col gap-3 mt-5" action="submit" onSubmit={handleUserSubmit}>
                  <div className="flex flex-col items-start gap-1">
                    <Input
                      {...register('nome')}
                      onChange={(e) =>
                        setUsuario({
                          ...usuario,
                          nome: e.target.value,
                        })
                      }
                      placeholder="Seu nome completo"
                      className={`${errors.nome && 'border-red-500'}`}
                    />
                    {errors.nome && <InputError error={errors.nome?.message ?? ''} />}
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <Input
                      {...register('email')}
                      onChange={(e) =>
                        setUsuario({
                          ...usuario,
                          email: e.target.value,
                        })
                      }
                      placeholder="Seu email"
                      className={`${errors.email && 'border-red-500'}`}
                    />
                    {errors.email && <InputError error={errors.email?.message ?? ''} />}
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <Input
                      {...register('senha')}
                      onChange={(e) =>
                        setUsuario({
                          ...usuario,
                          senha: e.target.value,
                        })
                      }
                      type="password"
                      placeholder="Sua senha"
                      className={`${errors.senha && 'border-red-500'}`}
                    />
                    {errors.senha && <InputError error={errors.senha?.message ?? ''} />}
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <Input
                      {...register('confirmarSenha')}
                      onChange={(e) =>
                        setUsuario({
                          ...usuario,
                          confirmarSenha: e.target.value,
                        })
                      }
                      type="password"
                      placeholder="Confirme sua senha"
                      className={`${errors.confirmarSenha && 'border-red-500'}`}
                    />
                    {errors.confirmarSenha && <InputError error={errors.confirmarSenha?.message ?? ''} />}
                  </div>

                  <Button
                    type="submit"
                    className="mt-4"
                    disabled={
                      !usuario?.nome ||
                      !usuario?.email ||
                      !usuario?.senha ||
                      !usuario.confirmarSenha ||
                      usuario?.senha !== usuario?.confirmarSenha
                    }
                  >
                    Continuar
                  </Button>
                </form>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-center text-sm">
                <span>
                  Quase lá! Leia o termo de consentimento com atenção e, se estiver de acordo, confirme para seguir.
                </span>
              </div>

              <div className="mt-5 text-xs h-96 overflow-y-scroll">
                <div dangerouslySetInnerHTML={{ __html: dadosPrimeiroAcesso.termo.termo }} />

                <div className="flex items-center gap-2 text-sm ml-5 mt-4">
                  <Checkbox checked={isTermoChecked} onClick={() => setIsTermoChecked(!isTermoChecked)} />{' '}
                  <span>Li e concordo com os termos de consentimento.</span>
                </div>
              </div>

              <Button
                className="mt-4 w-full bg-green-500 hover:bg-green-600"
                disabled={!isTermoChecked}
                onClick={finalizarConfiguracao}
              >
                {!isFinishing ? (
                  'Finalizar'
                ) : (
                  <div className="flex items-center">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Salvando
                  </div>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
