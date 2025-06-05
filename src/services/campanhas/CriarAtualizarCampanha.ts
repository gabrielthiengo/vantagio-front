import { Api } from '../api';

type CriarCampanha = {
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  recorrenciaPreviaDias: number;
  filtros: string;
  tipoEvento: string;
  assunto: string;
  mensagem: string;
  canalComunicacao: string;
  quantidadeProcessamento: number;
  diferencaDiasProcessamento: number;
  templateEmailId: number;
};

class CriarAtualizarCampanha {
  async createOrUpdate(campanha: any) {
    if (!campanha?.id) {
      const data = await this.create({
        nome: campanha.nome,
        descricao: campanha.descricao,
        dataInicio: campanha.dataInicio,
        dataFim: campanha.dataFim,
        recorrenciaPreviaDias: campanha.recorrenciaPreviaDias,
        filtros: JSON.stringify(campanha.evento.filtros),
        tipoEvento: campanha.evento.tipoEvento,
        assunto: campanha.mensagem.assunto,
        mensagem: campanha.mensagem.mensagem,
        canalComunicacao: campanha.mensagem.canalComunicacao,
        quantidadeProcessamento: campanha.quantidadeProcessamento,
        diferencaDiasProcessamento: campanha.diferencaDiasProcessamento,
        templateEmailId: campanha.mensagem.templateId,
      });

      return data;
    } else {
      const data = await this.update({
        id: campanha?.id,
        nome: campanha.nome,
        descricao: campanha.descricao,
        dataInicio: campanha.dataInicio,
        dataFim: campanha.dataFim,
        recorrenciaPreviaDias: campanha.recorrenciaPreviaDias,
        filtros: JSON.stringify(campanha.evento.filtros),
        tipoEvento: campanha.evento.tipoEvento,
        assunto: campanha.mensagem.assunto,
        mensagem: campanha.mensagem.mensagem,
        canalComunicacao: campanha.mensagem.canalComunicacao,
        quantidadeProcessamento: campanha.quantidadeProcessamento,
        diferencaDiasProcessamento: campanha.diferencaDiasProcessamento,
        templateEmailId: campanha.mensagem.templateId,
        mensagemId: campanha.mensagem?.id,
        eventoId: campanha.evento.id,
        isAtivo: campanha.isAtivo,
      });

      return data;
    }
  }

  async create(campanha: CriarCampanha) {
    const response = await Api.post('campanha/criar', campanha);

    return response.data;
  }

  async update(campanha: any) {
    const response = await Api.put('campanha/atualizar', campanha);

    return response.data;
  }
}

export default new CriarAtualizarCampanha();
