import { IPessoa } from '@/interfaces/IPessoa';

interface IMensagem {
  id: number;
  tipoMensagem: string;
  nome: string;
  mensagem: string;
  createdAt: Date;
}
export interface IMensagemWhatsapp {
  clienteId?: number | null;
  telefone?: string | null;
  email?: string | null;
  pessoa?: IPessoa | null;
  mensagens: IMensagem[];
}
