import { Api } from '../api';

export type CampanhaResponse = {
  id: number;
  tenantId: number;
  nome: string;
  descricao: string;
  isAtivo: true;
  dataInicio: Date;
  dataFim: Date;
  recorrenciaPreviaDias: number;
  quantidadeProcessamento: number;
  diferencaDiasProcessamento: number;
  dataUltimoProcessamento: null;
  isProcessado: false;
  quantidadeProcessado: number;
  createdAt: Date;
  updatedAt: Date;
  mensagem: {
    id: number;
    campanhaId: number;
    canalComunicacao: string;
    templateId: number;
    assunto: string;
    mensagem: string;
    createdAt: Date;
    updatedAt: Date;
  };
  evento: {
    id: number;
    campanhaId: number;
    tipoEvento: string;
    filtros: {
      campo: string;
      operador: string;
      valor: string;
      isDisabledValor: false;
      isDisabledOperador: false;
      tipoInput: string;
      placeholder: string;
      maxLength: number;
    }[];

    createdAt: Date;
    updatedAt: Date;
  };
};

class ListarCampanhas {
  async list(page: number) {
    const response = await Api.get('campanha', {
      params: {
        page,
        limit: 10,
      },
    });

    return response.data;
  }
}

export default new ListarCampanhas();
