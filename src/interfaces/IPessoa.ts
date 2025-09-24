export interface IPessoa {
  id: number;
  nome: string;
  cpf?: string | null;
  rg?: string | null;
  dataNascimento?: string | null;
  genero?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
