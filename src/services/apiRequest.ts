import { Api } from './api';

export type MetodoHttp = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ApiResponse<T = unknown> = {
  sucesso: boolean;
  mensagem: string;
  data?: T;
  total?: number;
};

export const apiRequest = async <T>(
  endpoint: string,
  method: MetodoHttp = 'GET',
  body?: any,
  params?: any,
): Promise<ApiResponse<T>> => {
  try {
    const response = await Api.request<ApiResponse<T>>({
      url: endpoint,
      method,
      params: params,
      data: body,
    });

    return response.data;
  } catch (err) {
    console.log(err);
    return {
      sucesso: false,
      mensagem: String(err) || 'Erro inesperado na API',
      data: undefined,
    };
  }
};
