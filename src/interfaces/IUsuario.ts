export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  telefone?: string;
  tenantId?: number;
  createdAt: Date;
  updatedAt: Date;
}
