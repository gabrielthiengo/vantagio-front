import { Api } from '../api';

export type TemplateAutomacaoResponse = {
  id: number;
  tenantId: number;
  nome: string;
  descricao: string;
  createdAt: Date;
  updatedAt: Date;
};

class ListarTemplatesAutomacao {
  async listar() {
    const response = await Api.get('automacao/templates');

    return response.data;
  }
}

export default new ListarTemplatesAutomacao();
