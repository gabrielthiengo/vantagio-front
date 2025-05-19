import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { OctagonAlert, Plus, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type Operador = 'IGUAL' | 'MAIOR_QUE' | 'MENOR_QUE';

type CampoFiltro =
  | 'diasSemPedido'
  | 'cidade'
  | 'valorTotalPedido'
  | 'genero'
  | 'ticketMedio'
  | 'dataCadastro'
  | 'diasPedido';

interface Filtro {
  campo: CampoFiltro;
  operador: Operador;
  valor: string;
}

const filtrosPermitidosPorEvento: Record<string, CampoFiltro[]> = {
  BOAS_VINDAS: ['cidade', 'genero', 'diasPedido'],
  INATIVIDADE: ['diasSemPedido'],
  COMPRA_REALIZADA: ['valorTotalPedido', 'cidade', 'genero'],
  STATUS_PEDIDO: ['cidade', 'genero'],
  ANIVERSARIO: ['genero'],
  ALERTA_PROMOCAO: ['cidade', 'diasSemPedido', 'ticketMedio', 'diasPedido'],
  EVENTO_PERSONALIZADO: ['cidade', 'valorTotalPedido', 'genero'],
  FEEDBACK: ['cidade', 'valorTotalPedido', 'diasPedido', 'genero'],
};

type FiltrosAutomacaoProps = {
  evento: string;
  filtroSelecionado: (filtros: string) => void;
};

export function FiltrosAutomacao({ evento, filtroSelecionado }: FiltrosAutomacaoProps) {
  const [eventoSelecionado, setEventoSelecionado] = useState<string>(evento);
  const [filtros, setFiltros] = useState<Filtro[]>([]);

  const camposDisponiveis = filtrosPermitidosPorEvento[eventoSelecionado] || [];

  const handleAdicionarFiltro = () => {
    if (camposDisponiveis.length === 0) return;
    setFiltros([...filtros, { campo: camposDisponiveis[0], operador: 'IGUAL', valor: '' }]);
    handleSalvar([...filtros, { campo: camposDisponiveis[0], operador: 'IGUAL', valor: '' }]);
  };

  const handleAlterarFiltro = (index: number, campo: keyof Filtro, valor: string) => {
    const novosFiltros = [...filtros];
    if (campo === 'campo' || campo === 'operador' || campo === 'valor') {
      novosFiltros[index] = {
        ...novosFiltros[index],
        [campo]: valor,
      };
    }
    setFiltros(novosFiltros);

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
    setFiltros([]);
    setEventoSelecionado(evento);
  }, [evento]);

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
            <Select value={filtro.campo} onValueChange={(e) => handleAlterarFiltro(index, 'campo', e)}>
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
                      : 'Gênero'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtro.operador} onValueChange={(e) => handleAlterarFiltro(index, 'operador', e)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IGUAL">Igual</SelectItem>
                <SelectItem value="MAIOR_QUE">Maior que</SelectItem>
                <SelectItem value="MENOR_QUE">Menor que</SelectItem>
              </SelectContent>
            </Select>

            <Input
              className="border p-1 rounded"
              type="text"
              placeholder="Valor"
              value={filtro.valor}
              onChange={(e) => handleAlterarFiltro(index, 'valor', e.target.value)}
            />

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
