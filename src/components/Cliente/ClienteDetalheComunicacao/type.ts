export type DadosClienteComunicacao = {
  id: number;
  email: string;
  telefone: string;
  dataCadastroExterno: string;
  pessoa: {
    id: number;
    nome: string;
    cpf: string | null;
    rg: string | null;
    dataNascimento: string | null;
    genero: string | null;
    createdAt: string;
    updatedAt: string;
  };
  endereco: {
    logradouro: string;
    complemento: string;
    numero: string;
    bairro: string;
    cep: string;
    cidade: {
      nome: string;
      uf: {
        sigla: string;
      };
    };
  };
  pedidos: {
    id: number;
    tenantId: number;
    clienteId: number;
    pedidoExternoId: number;
    clienteExternoId: number;
    status: string;
    valorTotal: string;
    valorTotalTaxa: string;
    valorDescontoTaxa: string;
    valorDesconto: string;
    valorEntregaTaxa: string;
    valorEntrega: string;
    metodoPagamento: string;
    carrinhoHash: string;
    dataPagamento: string | null;
    dataFinalizacao: string;
    dataCadastroExterno: string;
    isCriacaoInterna: boolean;
    createdAt: string;
    updatedAt: string;
    produtos: {
      nomeProduto: string;
      quantidade: number;
      valorTotal: number;
    }[];
  }[];
};
