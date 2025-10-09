import axios from "axios";
import https from "https";
import { env } from "@/env";

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

    console.log('gerarPlanoAula apiKey', apiKey)
    console.log('gerarPlanoAula apiIp', apiIp)


    if (!apiKey || !apiIp) {
      throw new Error("GEMINI_API_KEY ou GEMINI_API_IP não configurados.");
    }

    const url = `https://${apiIp}/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    console.log('gerarPlanoAula url', url)
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