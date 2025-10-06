

import { FastifyInstance } from "fastify";
import { z } from "zod";

import { gerarPlanoAula } from "./gerarPlanoAula";
import { atividadeOutputSchema, aulaOutputSchema, planoAulaOutputSchema } from "./schemas";
import { findPlanoAulaByUsuario } from "./findPlanoAulaByUsuario";
import { FindPlanoAulaSearchByUsuario } from "./findPlanoAulaSearchByUsuarioId";
import { findPlanoAulaById } from "./findPlanoAulaById";
import { deletePlanoAula } from "./delete";
import { update } from "../usuario/update";
import { updatePlanoAula } from "./updatePlanoAula.controller";

export async function planoAulaRoutes(app: FastifyInstance) {
  const gerarPlanoAulaSchema = {
    tags: ["Plano Aula"],
    summary: "Gera um plano de aula com base em um prompt textual",
    body: z.object({
      codigo_BNCC: z.string().min(5, "Código BNCC obrigatório."),
      componente_Curricular: z.string().min(3, "Componente curricular obrigatório."),
      serie: z.string().min(3, "Série obrigatória."),
      duracao_aula: z.string().min(2, "Duração da aula obrigatória."),
      credencialId: z.union([z.string(), z.number()]),
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

  
  const requestQuerySchema = {
    tags: ["Plano Aula"], 
      querystring: z.object({
      search: z.string(),
      page: z.coerce.number().optional().default(1),
      limit: z.coerce.number().optional().default(10),
    }),
   response: {
    200: z.object({
      planos: z.array(z.any()), // Permite qualquer tipo dentro do array de planos
      meta: z.object({
        total: z.number(),
        pageNumber: z.number(),
        limitNumber: z.number(),
        totalPages: z.number(),
      }),
    }),
    500: z.object({
      message: z.string(),
    }),
  },
};


const updatePlanoAulaSchema = {
  tags: ["Plano Aula"],
  // só o parametro do plano de aula — sem usuarioId
  params: z.object({
    planoAulaId: z.coerce.number(), // força conversão para number
  }),
  body: z.object({
    titulo: z.string().optional(),
    duracao_total: z.string().optional(),
    recursos_gerais: z.array(z.string()).optional(),
    detalhes_plano_completo: z.string().optional(),
    avaliacao: z.string().optional(),
    aulas: z
      .array(
        z.object({
          id: z.number().optional(),
          numero_aula: z.number().optional(),
          titulo: z.string().optional(),
          objetivo: z.string().optional(),
          duracao: z.string().optional(),
          atividades: z
            .array(
              z.object({
                id: z.number().optional(),
                etapa: z.string().optional(),
                tempo: z.string().optional(),
                descricao: z.string().optional(),
              })
            )
            .optional(),
        })
      )
      .optional(),
  }),
  response: {
    200: z.object({
      message: z.string(),
      planoAula: z.any(),
    }),
    400: z.object({
      message: z.string(),
    }),
  },
};
  

  app.post("/planoAula/gerar", { schema: gerarPlanoAulaSchema }, gerarPlanoAula);
  app.get("/planoAula/usuario/:usuarioId", { schema: { tags: ['Plano Aula'] } }, findPlanoAulaByUsuario);
  app.get("/planoAula/search/usuario/:usuarioId", { schema: requestQuerySchema }, FindPlanoAulaSearchByUsuario);
  app.get("/planoAula/:planoAulaId", { schema: { tags: ['Plano Aula'] } }, findPlanoAulaById);
  app.delete('/planoAula/:planoAulaId', { schema: { tags: ['Plano Aula'] } }, deletePlanoAula);
  app.put('/planoAula/:planoAulaId', { schema: updatePlanoAulaSchema }, updatePlanoAula)

   
  app.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      const menssage = error.message.replace('body/username ', '');
      return reply.status(400).send({ message: "Erro de validação: " + menssage });
    }
    console.error("Erro inesperado:", error);
    return reply.status(500).send({ message: "Erro interno no servidor." });
  });

  
}
 



