/*import { UpdateAulaDto } from "./updateAula.dto";
import { UpdateAtividadeDto } from "./updateAtividade.dto";

export interface UpdatePlanoAulaDto {
  titulo?: string;
  descricao?: string;
  recursos_gerais?:string[];
  duracao_total?:string;
  avaliacao?:string;
  aulas?: UpdateAulaDto[];
  atividades?: UpdateAtividadeDto[];
}
*/

import { z } from "zod";
import { updateAulaSchema } from "./updateAula.dto";

export const updatePlanoAulaSchema = z.object({
  titulo: z.string().optional(),
  descricao: z.string().optional(),
  duracao_total: z.string().optional(),
  avaliacao: z.string().optional(),
  recursos_gerais: z.array(z.string()).optional(),
  detalhes_plano_completo: z.string().optional(),
  aulas: z.array(updateAulaSchema).optional(),
});

export type UpdatePlanoAulaInput = z.infer<typeof updatePlanoAulaSchema>;
