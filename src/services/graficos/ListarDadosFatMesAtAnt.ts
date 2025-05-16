import { Api } from '../api';

class ListarDadosFatMesAtAnt {
  async listar() {
    const response = await Api.get('grafico/fatAtualAnterior');

    return response.data;
  }
}

export default new ListarDadosFatMesAtAnt();
