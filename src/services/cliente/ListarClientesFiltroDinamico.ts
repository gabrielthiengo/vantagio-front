import { Filtro } from '@/components/FiltrosAutomacao';
import { Api } from '../api';

export type ClientesFiltroDinamicoResponse = {
  clientes: {
    id: number;
    tenantId: number;
    pessoaId: number;
    email: string;
    telefone: string;
    clienteExternoId: number;
    dataCadastroExterno: Date;
    isCriacaoInterna: boolean;
    convertidoLead: boolean;
    dataConversao: null;
    createdAt: Date;
    updatedAt: Date;
    pessoa: {
      id: number;
      nome: string;
      cpf: string;
      rg: string;
      dataNascimento: Date;
      genero: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
  total: number;
};

class ListarClientesFiltroDinamico {
  async listar(filtros: Filtro) {
    const response = await Api.post('cliente/filtro/dinamico', filtros);

    return response.data;
  }
}

export default new ListarClientesFiltroDinamico();
