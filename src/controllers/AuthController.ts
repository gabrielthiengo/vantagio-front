import { IUser } from '@/context/AuthProvider/types';
import { IResponse } from '@/interfaces/response';
import { Api } from '@/services/api';

class AuthController {
  async loginRequest(email: string, password: string): Promise<IResponse<IUser>> {
    try {
      const response = await Api.post('autenticar', { email: email, senha: password });

      return {
        type: 'success',
        message: 'Login efetuado com sucesso',
        response: response.data,
      };
    } catch (error: any) {
      return {
        type: 'error',
        message: error.response?.data?.message || 'Erro desconhecido',
      };
    }
  }
}

export default new AuthController();
