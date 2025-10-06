import { z } from "zod";

export const updateAtividadeSchema = z.object({
  id: z.number(),
  etapa: z.string().optional(),
  tempo: z.string().optional(),
  descricao: z.string().optional(),
  numero_aula: z.number().optional(),
});

export type UpdateAtividadeDto = z.infer<typeof updateAtividadeSchema>;

