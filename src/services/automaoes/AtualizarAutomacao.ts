import { AutomacaoProp } from '@/pages/AutomcacaoCriar/type';
import { Api } from '../api';

class AtualizarAutomacao {
  async update(automacao: AutomacaoProp, automacaoId: number) {
    console.log(automacao);
    const response = await Api.put('automacao/atualizar', automacao, {
      params: {
        automacaoId: automacaoId,
      },
    });

    return response.data;
  }
}

export default new AtualizarAutomacao();
