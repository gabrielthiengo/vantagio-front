import { CriarEmpresaSchema } from '@/pages/Empresas/CriarEmpresa/types';
import { Api } from '../api';
import { convertToBase64 } from '@/lib/convert-base64';

class CriarEmpresa {
  async execute(empresa: CriarEmpresaSchema) {
    try {
      if (empresa.logo) {
        empresa.logoBase64 = await convertToBase64(empresa.logo);
      }

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
