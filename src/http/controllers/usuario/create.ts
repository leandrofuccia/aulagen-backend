import { makeCreateUsuarioUseCase } from "@/use-cases/factory/make-create-usuario-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registrerBodySchema = z.object({
        nome: z.string(),
        ocupacaoid: z.coerce.number(),
        credencialId: z.coerce.number(),
    })

    const  {nome, ocupacaoid, credencialId} = registrerBodySchema.parse(request.body)  
    const user = {nome,  ocupacaoid, credencialId} 
    const createUsuarioUseCase = makeCreateUsuarioUseCase();
    const usuario = await createUsuarioUseCase.handler(user)
    return reply.status(201).send({id: usuario?.id, nome: usuario?.nome, ocupacaoid: usuario?.ocupacaoid, credencialId: usuario?.credencialId})
}



