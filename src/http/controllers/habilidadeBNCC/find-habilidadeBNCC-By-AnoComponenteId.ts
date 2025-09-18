import { makeFindHabilidadeBNCCByAnoComponenteUseCase } from "@/use-cases/factory/make-find-habilidadeBNCC-by-AnoComponente"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findHabilidadeBNCCByAnoComponente(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registreParamSchema = z.object({
    anoSerie: z.string(),
  });

  const registrerQuerySchema = z.object({
    componenteCurricular: z.string(),
  });

  const { anoSerie } = registreParamSchema.parse(request.params);
  const { componenteCurricular } = registrerQuerySchema.parse(request.query);

  const findHabilidadeBNCCByAnoComponenteUseCase =
    makeFindHabilidadeBNCCByAnoComponenteUseCase();

  const HabilidadeBNCC =
    await findHabilidadeBNCCByAnoComponenteUseCase.handler(
      anoSerie,
      componenteCurricular,
    );

  return reply.status(200).send(HabilidadeBNCC);
}
