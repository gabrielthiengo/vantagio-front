import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { OctagonAlert, Plus, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { NumericFormat } from 'react-number-format';

type Operador = '' | 'IGUAL' | 'MAIOR_QUE' | 'MENOR_QUE' | 'DIFERENTE';

type CampoFiltro =
  | ''
  | 'diasSemPedido'
  | 'cidade'
  | 'valorTotalPedido'
  | 'genero'
  | 'ticketMedio'
  | 'dataCadastro'
  | 'diasPedido'
  | 'dataAniversario'
  | 'naoAplicaFiltros'
  | 'estado'
  | 'statusPedido';

export interface Filtro {
  campo: CampoFiltro;
  operador: Operador;
  valor: string;
  isDisabledOperador?: boolean;
  isDisabledValor?: boolean;
  placeholder?: string;
  tipoInput?: string;
  maxLength?: number;
}

const filtrosPermitidosPorEvento: Record<string, CampoFiltro[]> = {
  BOAS_VINDAS: ['naoAplicaFiltros', 'cidade', 'estado', 'genero', 'diasPedido'],
  INATIVIDADE: ['diasSemPedido', 'cidade', 'estado'],
  ANIVERSARIO: ['dataAniversario', 'cidade', 'estado', 'genero'],
  COMPRA_REALIZADA: ['valorTotalPedido', 'cidade', 'estado', 'genero'],
  STATUS_PEDIDO: ['statusPedido', 'cidade', 'estado', 'genero'],
  FEEDBACK: ['diasSemPedido', 'ticketMedio', 'valorTotalPedido', 'diasPedido', 'cidade', 'estado', 'genero'],
};

type FiltrosAutomacaoProps = {
  evento: string;
  filtrosIn?: Filtro[];
  filtroSelecionado: (filtros: string) => void;
};

type ResponseFunction = {
  valor: string;
  operador: Operador;
  isDisabledOperador?: boolean;
  isDisabledValor?: boolean;
  placeholder?: string;
  tipoInput?: string;
  maxLength?: number;
};

export function FiltrosAutomacao({ evento, filtrosIn, filtroSelecionado }: FiltrosAutomacaoProps) {
  const [eventoSelecionado, setEventoSelecionado] = useState<string>(evento);
  const [filtros, setFiltros] = useState<Filtro[]>([]);
  const [operadores, setOperadores] = useState<Operador[]>([]);

  const camposDisponiveis = filtrosPermitidosPorEvento[eventoSelecionado] || [];

  const handleAdicionarFiltro = () => {
    if (camposDisponiveis.length === 0) return;
    setFiltros([...filtros, { campo: '', operador: '', valor: '' }]);
    handleSalvar([...filtros, { campo: '', operador: '', valor: '' }]);
  };

  const handleAlterarFiltro = (index: number, campo: keyof Filtro, valor: string) => {
    console.log({ valor, campo });
    const novosFiltros = [...filtros];
    if (campo === 'campo' || campo === 'operador' || campo === 'valor') {
      novosFiltros[index] = {
        ...novosFiltros[index],
        [campo]: valor,
        valor: campo === 'campo' ? preencherValorAutomatico(valor).valor : campo === 'valor' ? valor : '',
        operador:
          campo === 'campo'
            ? preencherValorAutomatico(valor).operador
            : campo === 'operador'
            ? (valor as Operador)
            : novosFiltros[index].operador,
        isDisabledValor: campo === 'campo' ? preencherValorAutomatico(valor).isDisabledValor : false,
        isDisabledOperador: campo === 'campo' ? preencherValorAutomatico(valor).isDisabledOperador : false,
        tipoInput: campo === 'campo' ? preencherValorAutomatico(valor).tipoInput : novosFiltros[index].tipoInput,
        placeholder: campo === 'campo' ? preencherValorAutomatico(valor).placeholder : novosFiltros[index].placeholder,
        maxLength: campo === 'campo' ? preencherValorAutomatico(valor).maxLength : novosFiltros[index].maxLength,
      };
    }
    setFiltros(novosFiltros);

    if (campo === 'campo') {
      preencherOperadores(valor);
    }

    handleSalvar(novosFiltros);
  };

  const handleRemoverFiltro = (index: number) => {
    const novosFiltros = [...filtros];
    novosFiltros.splice(index, 1);
    setFiltros(novosFiltros);

    handleSalvar(novosFiltros);
  };

  const handleSalvar = (sendFiltros: Filtro[]) => {
    filtroSelecionado(JSON.stringify(sendFiltros, null, 2));
  };

  useEffect(() => {
    if (filtrosIn) {
      setOperadores(['IGUAL', 'MAIOR_QUE', 'MENOR_QUE', 'DIFERENTE']);
      setFiltros(filtrosIn);
    }
  }, [filtrosIn]);

  useEffect(() => {
    setEventoSelecionado(evento);

    setFiltros([]);
  }, [evento]);

  const preencherOperadores = (opcao: string) => {
    switch (opcao) {
      case 'dataAniversario':
        setOperadores(['IGUAL']);
        break;

      case 'genero':
        setOperadores(['IGUAL', 'DIFERENTE']);
        break;

      case 'cidade':
        setOperadores(['IGUAL', 'DIFERENTE']);
        break;

      case 'estado':
        setOperadores(['IGUAL', 'DIFERENTE']);
        break;

      case 'statusPedido':
        setOperadores(['IGUAL', 'DIFERENTE']);
        break;

      default:
        setOperadores(['IGUAL', 'MAIOR_QUE', 'MENOR_QUE', 'DIFERENTE']);
    }
  };

  const preencherValorAutomatico = (opcao: string): ResponseFunction => {
    let response: ResponseFunction = {
      isDisabledValor: false,
      isDisabledOperador: false,
      operador: 'IGUAL',
      valor: '',
      placeholder: 'Valor',
      tipoInput: 'text',
      maxLength: 50,
    };

    switch (opcao) {
      case 'dataAniversario':
        response.isDisabledValor = true;
        response.isDisabledOperador = true;
        response.operador = 'IGUAL';
        response.valor = 'MES_ATUAL';

        return response;

      case 'valorTotalPedido':
        response.tipoInput = 'currency';
        return response;

      case 'cidade':
        response.placeholder = 'Ex: Belo Horizonte';
        return response;

      case 'estado':
        response.placeholder = 'Ex: MG';
        response.maxLength = 2;
        return response;

      case 'genero':
        response.placeholder = 'Ex: Feminino';
        return response;

      case 'statusPedido':
        response.placeholder = 'Ex: CONCLUIDO';
        return response;

      case 'diasSemPedido':
        response.placeholder = 'Ex: 20 dias';
        response.tipoInput = 'number';
        return response;

      case 'diasPedido':
        response.placeholder = 'Ex: 20 dias';
        response.tipoInput = 'number';
        return response;

      case 'ticketMedio':
        response.tipoInput = 'currency';
        return response;

      default:
        return response;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4 items-center">
          <h2 className="text-lg font-semibold">Filtros</h2>
        </div>

        <Button variant={'ghost'} onClick={handleAdicionarFiltro} disabled={evento === ''}>
          <Plus size={14} /> Adicionar Filtro
        </Button>
      </div>

      <div className="mt-3">
        {filtros.map((filtro, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr_1fr_60px] gap-2 mb-2 items-center">
            <Select
              name="filtro-automacao"
              value={filtro.campo}
              onValueChange={(e) => {
                handleAlterarFiltro(index, 'campo', e);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Selecione</SelectItem>
                {camposDisponiveis.map((campo) => (
                  <SelectItem key={campo} value={campo}>
                    {campo === 'diasSemPedido'
                      ? 'Dias sem pedido'
                      : campo === 'valorTotalPedido'
                      ? 'Valor total do pedido'
                      : campo === 'cidade'
                      ? 'Cidade'
                      : campo === 'ticketMedio'
                      ? 'Ticket médio'
                      : campo === 'dataCadastro'
                      ? 'Data do cadastro'
                      : campo === 'diasPedido'
                      ? 'Dias com pedido'
                      : campo === 'dataAniversario'
                      ? 'Data do aniversário'
                      : campo === 'naoAplicaFiltros'
                      ? 'Não se aplica filtros'
                      : campo === 'statusPedido'
                      ? 'Status do pedido'
                      : campo === 'estado'
                      ? 'Estado'
                      : 'Gênero'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              disabled={filtro.isDisabledOperador}
              value={filtro.operador}
              onValueChange={(e) => handleAlterarFiltro(index, 'operador', e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {operadores.map((operador) => {
                  return (
                    <SelectItem key={operador} value={operador}>
                      {operador.replace('_', ' ')}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            {filtro.tipoInput === 'currency' ? (
              <NumericFormat
                disabled={filtro.isDisabledValor}
                prefix="R$ "
                decimalSeparator=","
                thousandSeparator="."
                decimalScale={2}
                fixedDecimalScale
                value={Number(filtro.valor) || 0}
                allowNegative={false}
                placeholder="R$ 0,00"
                onValueChange={(value) => {
                  handleAlterarFiltro(index, 'valor', String(value.floatValue));
                }}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            ) : (
              <Input
                className="border p-1 rounded uppercase"
                disabled={filtro.isDisabledValor}
                type={filtro.tipoInput ?? 'text'}
                maxLength={filtro.maxLength}
                placeholder={filtro.placeholder ?? 'Valor'}
                value={filtro.valor}
                onChange={(e) => handleAlterarFiltro(index, 'valor', e.target.value.toUpperCase())}
              />
            )}

            <Button
              variant={'outline'}
              className="text-red-500 border-red-200 hover:text-red-700 hover:border-red-500"
              onClick={() => handleRemoverFiltro(index)}
            >
              <Trash2 size={13} />
            </Button>
          </div>
        ))}

        {filtros.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2">
            <OctagonAlert className="text-orange-500" />

            <span className="text-gray-500">Nenhum filtro adicionado</span>
          </div>
        )}
      </div>
    </div>
  );
}
