import { Api } from '../api';

export type TemplateAutomacaoResponse = {
  id: number;
  tenantId: number;
  nome: string;
  header: string;
  content: string;
  footer: string;
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
