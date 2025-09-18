import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import axios from "axios";
import https from "https";
import { env } from "@/env";


// Schema de validação do corpo
const bodySchema = z.object({
  prompt: z.string().min(10, "O prompt deve conter pelo menos 10 caracteres."),
});

export async function gerarPlanoAula(request: FastifyRequest, reply: FastifyReply) {
  // 1) Validação do payload
  const parseResult = bodySchema.safeParse(request.body);
  if (!parseResult.success) {
    const messages = parseResult.error.errors.map(e => e.message).join("; ");
    return reply.status(400).send({ message: `Erro de validação: ${messages}` });
  }
  const { prompt } = parseResult.data;

  // 2) Lê as variáveis de ambiente
  const apiKey = env.GEMINI_API_KEY;
  const apiIp  = env.GEMINI_API_IP;
  if (!apiKey || !apiIp) {
    return reply
      .status(500)
      .send({ message: "GEMINI_API_KEY ou GEMINI_API_IP não configurados." });
  }

  // 3) Monta a URL usando o IP
  const url = `https://${apiIp}/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    // 4) Configura um https.Agent para pular verificação de certificado
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    // 5) Chama a API com Host header correto
    const response = await axios.post(
      url,
      { contents: [{ parts: [{ text: prompt }] }] },
      {
        httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Host: "generativelanguage.googleapis.com",
        },
      }
    );

    // 6) Extrai texto gerado
    const generatedText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return reply.status(200).send({
      planoAula: generatedText ?? "Nenhuma resposta gerada pela API.",
    });
  } catch (err: any) {
    const details = err.response?.data || err.message;
    console.error("Erro ao acessar a API Gemini:", details);
    return reply.status(500).send({
      message: "Erro ao gerar plano de aula.",
      details,
    });
  }
}



