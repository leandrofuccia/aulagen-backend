

import { FastifyInstance } from "fastify";
import { create } from "./create";
import { z } from "zod";

import { gerarPlanoAula } from "./gerarPlanoAula";
import { atividadeOutputSchema, aulaOutputSchema, planoAulaOutputSchema } from "./schemas";

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

  const gerarPlanoAulaSchema = {
    tags: ["Plano Aula"],
    summary: "Gera um plano de aula com base em um prompt textual",
    body: z.object({
      codigo_BNCC: z.string().min(5, "Código BNCC obrigatório."),
      componente_Curricular: z.string().min(3, "Componente curricular obrigatório."),
      serie: z.string().min(3, "Série obrigatória."),
      duracao_aula: z.string().min(2, "Duração da aula obrigatória."),
    }),
    response: {
      200: z.object({
        planoAula: planoAulaOutputSchema,
        aulas: z.array(aulaOutputSchema),
        atividades: z.array(atividadeOutputSchema),
      }),
      400: z.object({ message: z.string() }),
      500: z.object({
        message: z.string(),
        details: z.any().optional(),
      }),
    },
  };




  app.post("/planoAula", { schema: createPlanoAulaSchema }, create);
  app.post("/planoAula/gerar", { schema: gerarPlanoAulaSchema }, gerarPlanoAula);

   
  app.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      const menssage = error.message.replace('body/username ', '');
      return reply.status(400).send({ message: "Erro de validação: " + menssage });
    }
    console.error("Erro inesperado:", error);
    return reply.status(500).send({ message: "Erro interno no servidor." });
  });

  
}
 



