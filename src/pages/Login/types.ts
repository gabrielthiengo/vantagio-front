import { z } from 'zod';

export const authenticateSchema = z.object({
  email: z.string().min(1, 'O campo email é obrigatório').email('Insira um email válido'),
  password: z.string().min(1, 'O campo senha é obrigatório'),
});

export type AuthSchema = z.infer<typeof authenticateSchema>;
