import { Api } from '../api';

export type WebhooksEmpresaRes = {
  id: number;
  name: string;
  status: string;
  topic: string;
  resource: string;
  event: string;
  delivery_url: string;
  date_created: Date;
};

class WebhooksEmpresa {
  async create(page: number) {
    const response = await Api.get('/empresa', {
      params: {
        page,
      },
    });

    return response.data;
  }

  async list(empresaId: number) {
    const response = await Api.get('/empresa/webhooks', {
      params: {
        empresaId,
      },
    });

    return response.data;
  }
}

export default new WebhooksEmpresa();
