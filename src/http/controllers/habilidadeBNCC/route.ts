import { z } from "zod";
import { FastifyInstance } from "fastify";
import { findHabilidadeBNCCByAnoComponente } from "./find-habilidadeBNCC-By-AnoComponenteId";

export async function habilidadeBNCCRoutes(app: FastifyInstance) {
  const habilidadeSchema = z.object({
    id: z.number(),
    codigo: z.string(),
    descricao: z.string(),
    etapa_ensino: z.string(),
    componente_curricular: z.string(),
    ano_serie: z.string(),
    versao: z.string(),
    status: z.string(),
  });

  const findSchema = {
    tags: ["Habilidade BNCC"],
    params: z.object({
      anoSerie: z.string(),
    }),
    querystring: z.object({
      componenteCurricular: z.string(),
    }),
    response: {
      200: z.array(habilidadeSchema),
    },
  };

  app.get(
    "/habilidade/:anoSerie",
    { schema: findSchema },
    findHabilidadeBNCCByAnoComponente
  );
}
