/*import { UpdateAtividadeDto } from "./updateAtividade.dto";

export interface UpdateAulaDto {
  id: number;
  numero_aula?: number;
  titulo?: string;
  objetivo?: string;
  duracao?: string;
  atividades?: UpdateAtividadeDto[];
}
*/

import { z } from "zod";
import { updateAtividadeSchema } from "./updateAtividade.dto";

export const updateAulaSchema = z.object({
  id: z.number(),
  numero_aula: z.number().optional(),
  titulo: z.string().optional(),
  objetivo: z.string().optional(),
  duracao: z.string().optional(),
  atividades: z.array(updateAtividadeSchema).optional(),
});

export type UpdateAulaDto = z.infer<typeof updateAulaSchema>;

