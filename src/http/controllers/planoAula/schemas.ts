import { z } from "zod";

// Schema de saída para IPlanoAula
export const planoAulaOutputSchema = z.object({
  id: z.number().optional(),
  titulo: z.string(),
  duracao_total: z.string(),
  recursos_gerais: z.array(z.string()).optional(),
  detalhes_plano_completo: z.string().optional(),
  avaliacao: z.string().optional(),
  habilidade_bncc: z.object({
    codigo: z.string(),
    descricao: z.string(),
  }),

  criador: z.any().optional(),    // ajuste conforme o schema de Usuario
});

// Schema de saída para IAula
export const aulaOutputSchema = z.object({
  id: z.number().optional(),
  numero_aula: z.number(),
  titulo: z.string(),
  objetivo: z.string(),
});

// Schema de saída para IAtividade
export const atividadeOutputSchema = z.object({
  id: z.number().optional(),
  etapa: z.string(),
  tempo: z.string(),
  descricao: z.string(),
});