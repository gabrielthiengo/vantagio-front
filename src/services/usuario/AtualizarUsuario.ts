import { Api } from '../api';
import { CriarUsuarioSchema } from '@/pages/Empresas/ConfigurarEmpresa/DadosUsuario/CriarUsuario/types';

class AtualizarUsuario {
  async execute(usuario: CriarUsuarioSchema) {
    try {
      await Api.post('/usuario/atualizar', usuario);

      return {
        isSuccess: true,
        message: '',
      };
    } catch (err: any) {
      return {
        isSuccess: false,
        message: err?.response?.data?.message,
      };
    }
  }
}

export default new AtualizarUsuario();
