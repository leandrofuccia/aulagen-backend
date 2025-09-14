
import { makeUpdateUsuarioUseCase } from "@/use-cases/factory/make-update-usuario-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { number, z } from "zod"


export async function update(request: FastifyRequest, reply: FastifyReply) {
   
    const registreParamSchema = z.object({
        usuarioId: z.coerce.number()
    })
    
    const registrerBodySchema = z.object({
        nome: z.string(),
        ocupacaoid: z.coerce.number(),
        
    })

    const { usuarioId } = registreParamSchema.parse(request.params)
    const {nome, ocupacaoid} = registrerBodySchema.parse(request.body)
    
    const updateUsuarioUseCase = makeUpdateUsuarioUseCase()
    const usuario = await updateUsuarioUseCase.handler(
        usuarioId,
        nome,
        ocupacaoid,
        
    )    
    reply.code(200).send(usuario)
 }

