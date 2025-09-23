import { makeFindPlanoAulaByIdUseCase } from "@/use-cases/factory/make-find-plano-by-Id-use-case"
import { makeFindPlanoAulaByUsuarioIdUseCase } from "@/use-cases/factory/make-find-plano-by-usuarioId-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findPlanoAulaById(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    const registreParamSchema = z.object({
        planoAulaId: z.coerce.number(),
    })

    try {

        const { planoAulaId } = registreParamSchema.parse(request.params)
        const findPlanoAulaByIdUseCase = makeFindPlanoAulaByIdUseCase()
        const { data } = await findPlanoAulaByIdUseCase.handler(planoAulaId);

        return reply.status(200).send({
            planos: data,
        });
    } catch (err: any) {
        console.error("Erro ao listar planos de aula:", err.message);
        return reply.status(500).send({ message: "Erro interno ao buscar planos de aula." });
    }
}




