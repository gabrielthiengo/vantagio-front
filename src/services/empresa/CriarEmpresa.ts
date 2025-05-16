import { CriarEmpresaSchema } from '@/pages/Empresas/CriarEmpresa/types';
import { Api } from '../api';

class CriarEmpresa {
  async execute(empresa: CriarEmpresaSchema) {
    try {
      const response = await Api.post('/empresa/criar', empresa);

      return {
        isSuccess: true,
        message: '',
        cnpj: response.data.cnpj,
      };
    } catch (err: any) {
      return {
        isSuccess: false,
        message: err?.response?.data?.message,
        cnpj: null,
      };
    }
  }
}

export default new CriarEmpresa();
