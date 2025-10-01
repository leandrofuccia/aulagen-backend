import { makeUpdatePlanoAulaUseCase } from "@/use-cases/factory/make-update-planoAula-use-case";
import { FastifyReply, FastifyRequest } from "fastify";


export async function updatePlanoAula(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { planoAulaId } = request.params as { planoAulaId: string };
  const data = request.body as any;

  try {
    const useCase = makeUpdatePlanoAulaUseCase();
    const planoAula = await useCase.handler(Number(planoAulaId), data);

    return reply.status(200).send({
      message: "Plano de aula atualizado com sucesso",
      planoAula,
    });
  } catch (error: any) {
    return reply.status(400).send({
      message: error.message || "Erro ao atualizar plano de aula",
    });
  }
}
