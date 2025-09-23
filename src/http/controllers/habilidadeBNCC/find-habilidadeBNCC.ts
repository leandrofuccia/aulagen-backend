import { makeFindHabilidadeBNCCUseCase } from "@/use-cases/factory/make-find-habilidadeBNCC";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findHabilidadeBNCC(request: FastifyRequest,  reply: FastifyReply,) {

  const findHabilidadeBNCCUseCase = makeFindHabilidadeBNCCUseCase();
  const HabilidadeBNCC =  await findHabilidadeBNCCUseCase.handler();
  return reply.status(200).send(HabilidadeBNCC);
}
