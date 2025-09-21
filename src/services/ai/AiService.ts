/*import axios from 'axios';

export class AiService {
  private readonly apiUrl: string;

  constructor() {
    const apiKey = process.env.AI_API_KEY ?? '';
    if (!apiKey) {
      throw new Error("AI_API_KEY não configurada no .env");
    }

    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  }

  async gerarPlanoAula(prompt: string): Promise<string> {
    try {

      console.log('this.apiUrl ', this.apiUrl)
      console.log('Node.js Version:', process.version)
      const response = await axios.post(this.apiUrl, {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        }
      });

      // A resposta do Axios é tipada e os dados estão em response.data
      return response.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    } catch (error: any) {
      console.error("Erro ao fazer a requisição para a API do Gemini:", error.message);
      
      // O Axios retorna o erro da resposta HTTP em error.response
      if (error.response) {
        console.error("Dados do erro da API:", error.response.data);
        throw new Error(`Erro na API de IA: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      
      // Se não for um erro de resposta, lança o erro original
      throw error;
    }
  }
}

*/


/*import axios from 'axios';


export async function AiService() {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBbeVyNWRk-iJhkVvoRVZqju2IYdJYROCk',
      {
        contents: [
          {
            parts: [
              {
                text: 'qual a previsão do tempo para são paulo amanhã',
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro na requisição:', error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
  }
}

AiService();*/


/*import axios from 'axios';

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export class AiService {
  private readonly apiUrl: string;

  constructor() {
    const apiKey = process.env.AI_API_KEY ?? '';
    if (!apiKey) {
      throw new Error("AI_API_KEY não configurada no .env");
    }
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  }

  async gerarPlanoAula(prompt: string): Promise<string> {
    try {
      console.log('this.apiUrl , this.apiUrl')
      const response = await axios.post(
        this.apiUrl,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data as GeminiResponse;
      return data?.candidates?.[0]?.content?.parts?.[0].text ?? "";

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Erro na requisição para a API:", error.message);
        throw new Error(`Erro na API de IA: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`);
      }
      console.error("Erro desconhecido:", error);
      throw error;
    }
  }
}

*/

import axios from "axios";
import https from "https";
import { env } from "@/env";

// Helpers internos
function extractJson(text: string): string {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return text.substring(start, end + 1);
  }
  return "";
}

function sanitizeJson(jsonStr: string): string {
  let sanitized = jsonStr.replace(/,\s*([\]}])/g, "$1");
  sanitized = sanitized.replace(
    /"(\w+?)":\s*(\S+?),?\s*"(\1)":\s*(\S+?),?/g,
    (match, key, val1, key2, val2) => `"${key}": ${val2},`
  );
  sanitized = sanitized.replace(/\{(\s*,\s*)*\}\s*]/g, "]");
  return sanitized;
}

export class AiService {
  async gerarPlanoAula(prompt: string): Promise<any> {
    const apiKey = env.GEMINI_API_KEY;
    const apiIp = env.GEMINI_API_IP;

    if (!apiKey || !apiIp) {
      throw new Error("GEMINI_API_KEY ou GEMINI_API_IP não configurados.");
    }

    const url = `https://${apiIp}/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const response = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 8192 },
      },
      {
        httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Host: "generativelanguage.googleapis.com",
        },
      }
    );

    const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const jsonString = sanitizeJson(extractJson(rawText));

    try {
      return JSON.parse(jsonString);
    } catch (error) {
      throw new Error("Falha ao interpretar JSON retornado pela API.");
    }
  }
}