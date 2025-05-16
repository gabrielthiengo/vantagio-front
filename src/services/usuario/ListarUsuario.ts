import { Api } from '../api';

class ListarUsuario {
  async listarUsuariosPorEmpresaId(empresaId: number) {
    const response = await Api.get('/usuario/listar', {
      params: {
        tenantId: empresaId,
      },
    });

    return response.data?.usuarios;
  }
}

export default new ListarUsuario();
