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


import axios from 'axios';

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