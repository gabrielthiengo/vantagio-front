import { z } from 'zod';

export const criarUsuarioSchema = z
  .object({
    id: z.number().optional(),
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('E-mail inválido'),
    senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').optional(),
    confirmarSenha: z.string().min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres').optional(),
    tenantId: z.number().min(1, 'Empresa não encontrada'),
  })
  .refine(
    (data) => {
      if (data.id === null || data.id === undefined) {
        return data.senha && data.confirmarSenha;
      }
      return true;
    },
    {
      message: 'Senha e confirmação de senha são obrigatórios',
      path: ['senha', 'confirmarSenha'],
    },
  );

export type CriarUsuarioSchema = z.infer<typeof criarUsuarioSchema>;
