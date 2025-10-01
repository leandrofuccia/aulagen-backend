
import { makeDeletePlanoAulaUseCase } from "@/use-cases/factory/make-delete-plano-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function deletePlanoAula(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    const registreParamSchema = z.object({
        planoAulaId: z.coerce.number()
    })

    const { planoAulaId } = registreParamSchema.parse(request.params)
   
    const deletePlanoAulaUseCase = makeDeletePlanoAulaUseCase()
    await deletePlanoAulaUseCase.handler(planoAulaId);
    let mensagem = "OK"
    return reply.code(200).send({ message: mensagem });
    
}