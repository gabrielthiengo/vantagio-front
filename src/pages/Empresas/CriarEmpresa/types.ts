import { z } from 'zod';

export const criarEmpresaSchema = z.object({
  cnpj: z
    .string()
    .min(13, 'CNPJ inválido')
    .max(14, 'CNPJ inválido')
    .regex(/^\d{14}$/, 'CNPJ inválido'),
  dominio: z.string().min(1, 'Domínio inválido'),
  subdominio: z.string().min(1, 'Subdominio é obrigatório'),
  apiKey: z.string().min(1, 'API Key é obrigatória'),
  apiSecret: z.string().min(1, 'API Secret é obrigatória'),
  ecommerce: z.string().min(1, 'E-commerce é obrigatório'),
  logoFile: z
    .custom<File>((file) => file instanceof File, {
      message: 'Arquivo inválido',
    })
    .optional(),
  logo: z.string().optional(),
});

export type CriarEmpresaSchema = z.infer<typeof criarEmpresaSchema>;
