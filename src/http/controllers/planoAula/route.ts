
/*import { FastifyInstance } from "fastify";
import { create } from "./create";
import { z } from "zod";
import { gerarPlanoAula } from "./gerarPlanoAula";

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
    body: z.object({
      prompt: z.string(),
    }),
    response: {
      200: z.object({
        answer: z.string(),
      }),
      400: z.object({
        message: z.string(),
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

*/


import { FastifyInstance } from "fastify";
import { create } from "./create";
import { z } from "zod";

import axios from "axios";
import { gerarPlanoAula } from "./gerarPlanoAula";

export async function planoAulaRoutes(app: FastifyInstance) {
    
  
  // Rota de teste temporária
 /* app.post('/testar-api-externa', async (request, reply) => {
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBbeVyNWRk-iJhkVvoRVZqju2IYdJYROCk',
        {
          contents: [{ parts: [{ text: 'Olá!' }] }],
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      return reply.status(200).send({ message: 'Requisição de teste funcionou!' });
    } catch (error: any) {
      console.error('Erro na rota de teste:', error.message);
      return reply.status(500).send({ message: 'Erro na rota de teste.' });
    }
  });
  */
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
      prompt: z.string().min(10, "O prompt deve conter pelo menos 10 caracteres."),
    }),
    response: {
      200: z.object({
        planoAula: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
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
 


 



