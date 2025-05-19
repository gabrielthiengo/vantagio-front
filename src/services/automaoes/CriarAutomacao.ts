import { AutomacaoProp } from '@/pages/AutomcacaoCriar/type';
import { Api } from '../api';

class CriarAutomacao {
  async create(automacao: AutomacaoProp) {
    const response = await Api.post('automacao/criar', automacao);

    return response.data;
  }
}

export default new CriarAutomacao();
