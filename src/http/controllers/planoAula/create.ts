import { makeCreatePlanoAulaUseCase } from "@/use-cases/factory/make-create-plano-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registrerBodySchema = z.object({
        titulo: z.string(),
        objetivos: z.string(),
        atividades: z.string(),
        recursos: z.string(),
    })

    const  {titulo, objetivos, atividades, recursos} = registrerBodySchema.parse(request.body)  
    const plano = {titulo,  objetivos, atividades, recursos} 
    const createPlanoAulaUseCase = makeCreatePlanoAulaUseCase();
    const planoAula = await createPlanoAulaUseCase.handler(plano)
    return reply.status(201).send({id: planoAula?.id, titulo: planoAula?.id, objetivos: planoAula?.objetivos, atividades: planoAula?.atividades, recursos: planoAula?.recursos})
}


