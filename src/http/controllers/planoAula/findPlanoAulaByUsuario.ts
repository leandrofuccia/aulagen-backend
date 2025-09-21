import { makeFindPlanoAulaByUsuarioIdUseCase } from "@/use-cases/factory/make-find-plano-by-usuarioId-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findPlanoAulaByUsuario(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    
    const registreParamSchema = z.object({
        usuarioId: z.coerce.number(),
    })

    const registrerQuerySchema = z.object({
        page: z.coerce.number().optional(),
        limit: z.coerce.number().optional(),
    })

    const { usuarioId } = registreParamSchema.parse(request.params)
    const { page, limit } = registrerQuerySchema.parse(request.query)
    const pageNumber = page ?? 1
    const limitNumber = limit ?? 10
    try {

        const findPlanoAulaByUsuarioUseCase = makeFindPlanoAulaByUsuarioIdUseCase()
         const { data, total } = await findPlanoAulaByUsuarioUseCase.handler(usuarioId, pageNumber, limitNumber);

        return reply.status(200).send({
        planos: data,
        meta: {
            total,
            pageNumber,
            limitNumber,
            totalPages: Math.ceil(total / limitNumber),
        },
        });
    } catch (err: any) {
        console.error("Erro ao listar planos de aula:", err.message);
        return reply.status(500).send({ message: "Erro interno ao buscar planos de aula." });
    }
}




