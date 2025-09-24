import { z } from 'zod';

export type ReguaEtapaRequest = {
  ordem: number;
  delayDias: number;
  canal: string;
  templateId: number;
  condicaoSaida: string | null;
};

export type ReguaRequest = {
  id?: number;
  tenantId: number;
  nome: string;
  descricao?: string | null;
  gatilhoId: number;
  dataInicio: Date;
  dataFim: Date | null;
  etapas: ReguaEtapaRequest[];
};

const hoje = new Date();
hoje.setDate(hoje.getDate() - 1);

export const etapaSchema = z.object({
  ordem: z.number().nullable(),
  delayDias: z.number().nullable(),
  canal: z.string().nullable(),
  templateId: z.number().nullable(),
  condicaoSaida: z.string().nullable(),
  qtdEnviosDia: z
    .number()
    .min(5, 'O valor mínimo deve ser maior ou igual a 5')
    .max(1000, 'O valor máxio deve ser menor ou igual a 1000'),
});

export type EtapaSchema = z.infer<typeof etapaSchema>;

export const reguaDetalheSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, 'O campo nome é obrigatório'),
  descricao: z.string().nullable(),
  gatilhoId: z.number(),
  dataInicio: z.coerce
    .date({
      errorMap: (issue, ctx) => {
        if (issue.code === 'invalid_date') {
          return { message: 'Data inválida' };
        }
        return { message: ctx.defaultError };
      },
    })
    .min(hoje, {
      message: 'A data de início não pode ser menor que a data atual',
    }),
  dataFim: z.string().nullable(),
});

export type ReguaDetalheSchema = z.infer<typeof reguaDetalheSchema>;
