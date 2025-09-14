
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { z } from "zod";

export async function planoAulaRoutes(app: FastifyInstance) {
  const createPlanoAulaSchema = {
    tags: ["Plano Aula"], 
    body: z.object({
      titulo: z.string(),
      objetivos: z.string(),
      atividades: z.string(),
      recursos: z.string(),
    }),
    response: {
      200: z.object({
        token: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
  }
  app.post("/planoAula", { schema: createPlanoAulaSchema }, create);
 
  app.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      const menssage = error.message.replace('body/username ', '');
      return reply.status(400).send({ message: "Erro de validação: " + menssage });
    }
    console.error("Erro inesperado:", error);
    return reply.status(500).send({ message: "Erro interno no servidor." });
  });
}