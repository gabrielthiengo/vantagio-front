import { z } from 'zod';

export const atualizarEmpresaSchema = z.object({
  cnpj: z
    .string()
    .min(13, 'CNPJ inválido')
    .max(14, 'CNPJ inválido')
    .regex(/^\d{14}$/, 'CNPJ inválido'),
  razaoSocial: z.string().min(1, 'Razão social é obrigatório'),
  nomeFantasia: z.string().min(1, 'Nome fantasia é obrigatório'),
  dominio: z.string().min(1, 'Domínio inválido'),
  apiKey: z.string().min(1, 'API Key é obrigatória'),
  apiSecret: z.string().min(1, 'API Secret é obrigatória'),
  cep: z.string().nullable(),
  logradouro: z.string().nullable(),
  numero: z.string().nullable(),
  complemento: z.string().nullable(),
  bairro: z.string().nullable(),
  cidadeId: z.number().nullable(),
  cidade: z.string().nullable(),
  ecommerce: z.string().min(1, 'E-commerce é obrigatório'),
});

export type AtualizarEmpresaSchema = z.infer<typeof atualizarEmpresaSchema>;
