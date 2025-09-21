/*import { FastifyRequest, FastifyReply } from "fastify";
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

*/

/*import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import axios from "axios";
import https from "https";
import { env } from "@/env";
import { IPlanoAula } from "@/entities/models/planoAula.interface";
import { IAula } from "@/entities/models/aula.interface";
import { IAtividade } from "@/entities/models/atividade.interface";
import { PlanoAulaRepository } from "@/lib/typeorm/planoAula.repository";
import { text } from "body-parser";

// validação do payload
const bodySchema = z.object({
  prompt: z.string().min(10, "O prompt deve conter pelo menos 10 caracteres."),
});

// helper: remove crases e cabeçalhos de Markdown
function stripCodeFences(text: string): string {
  return text.replace(/```(?:json)?/g, "").trim();
}


export async function gerarPlanoAula(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // 1) validação do body
  const parse = bodySchema.safeParse(request.body);
  if (!parse.success) {
    const errMsg = parse.error.errors.map(e => e.message).join("; ");
    return reply.status(400).send({ message: `Erro de validação: ${errMsg}` });
  }
  const { prompt } = parse.data;

  // 2) fetch de variáveis de ambiente
  const apiKey = env.GEMINI_API_KEY;
  const apiIp = env.GEMINI_API_IP;
  if (!apiKey || !apiIp) {
    return reply
      .status(500)
      .send({ message: "GEMINI_API_KEY ou GEMINI_API_IP não configurados." });
  }

  // 3) monta URL e agent HTTPS
  const url = `https://${apiIp}/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  try {
    // 4) chamada à Gemini via IP
    const resp = await axios.post(
      url,
      { contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 65536,
    },
  },
    
      {
        httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Host: "generativelanguage.googleapis.com",
        },
      }
    );

    // 5) extrai e limpa o texto cru
    const rawText =
      resp.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

      console.log('rawText', rawText)

    const jsonString = stripCodeFences(rawText);

    console.log('JSON String recebida (para depuração):', jsonString);

    // 6) parse do JSON retornado
    let raw: {
      plano_aula: any;
      aulas?: Array<{
        numero_aula: number;
        titulo: string;
        objetivo: string;
        atividades?: Array<{
          etapa: string;
          tempo: string;
          descricao: string;
        }>;
      }>;
    };
    try {
      raw = JSON.parse(jsonString);
    } catch {
      return reply
        .status(500)
        .send({ message: "Falha ao interpretar JSON retornado pela API." });
    }

    // 7) valida formato de raw.aulas
    if (!Array.isArray(raw.aulas)) {
      return reply
        .status(500)
        .send({ message: "Formato inesperado: campo 'aulas' inválido." });
    }

    // 8) mapeia para suas interfaces
    const planoAula: IPlanoAula = {
      titulo: raw.plano_aula.titulo,
      duracao_total: raw.plano_aula.duracao_total,
      recursos_gerais: raw.plano_aula.recursos_gerais,
      detalhes_plano_completo: JSON.stringify(
        raw.plano_aula.detalhes_plano_completo
      ),
      avaliacao: JSON.stringify(raw.plano_aula.avaliacao),
      habilidade_bncc: raw.plano_aula.habilidade_bncc,
    };

    const aulas: IAula[] = raw.aulas.map(a => ({
      numero_aula: a.numero_aula,
      titulo: a.titulo,
      objetivo: a.objetivo,
    }));

    const atividades: IAtividade[] = raw.aulas.flatMap(aula => {
      if (!Array.isArray(aula.atividades)) {
        return [];
      }
      return aula.atividades.map(act => ({
        etapa: act.etapa,
        tempo: act.tempo,
        descricao: act.descricao,
      }));
    });


    const usuarioId = 1;

const planoRepo = new PlanoAulaRepository();
const planoSalvo = await planoRepo.createWithRelations(
  planoAula,
  aulas,
  atividades.map((a, i) => ({ ...a, numero_aula: aulas[i]?.numero_aula })),
  usuarioId
);


    // 9) envia a resposta estruturada
    return reply.status(200).send({ planoAula, aulas, atividades });
  } catch (err: any) {
    const details = err.response?.data || err.message;
    console.error("Erro ao acessar a API Gemini:", details);
    return reply.status(500).send({
      message: "Erro ao gerar plano de aula.",
      details,
    });
  }
}

*/



/*import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import axios from "axios";
import https from "https";
import { env } from "@/env";
import { IPlanoAula } from "@/entities/models/planoAula.interface";
import { IAula } from "@/entities/models/aula.interface";
import { IAtividade } from "@/entities/models/atividade.interface";
import { PlanoAulaRepository } from "@/lib/typeorm/planoAula.repository";

// validação do payload
const bodySchema = z.object({
  prompt: z.string().min(10, "O prompt deve conter pelo menos 10 caracteres."),
});

// Helper para extrair o JSON de forma robusta
function extractJson(text: string): string {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    return text.substring(start, end + 1);
  }
  return '';
}

export async function gerarPlanoAula(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parse = bodySchema.safeParse(request.body);
  if (!parse.success) {
    const errMsg = parse.error.errors.map((e) => e.message).join("; ");
    return reply.status(400).send({ message: `Erro de validação: ${errMsg}` });
  }
  const { prompt } = parse.data;

  const apiKey = env.GEMINI_API_KEY;
  const apiIp = env.GEMINI_API_IP;
  if (!apiKey || !apiIp) {
    return reply
      .status(500)
      .send({ message: "GEMINI_API_KEY ou GEMINI_API_IP não configurados." });
  }

  const url = `https://${apiIp}/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  let promptteste = [
  "Elaborar um plano de aula detalhado com base na BNCC para professores de escolas públicas.",
  "**Informações:**",
  "- **Código BNCC:** EF01MA01",
  "- **Componente Curricular:** Matemática",
  "- **Série:** 1º ano do Ensino Fundamental",
  "- **Duração das aulas:** 50 minutos cada. O plano deve ser dividido em quantas aulas forem necessárias.",
  "**Formato de Saída:** JSON, com a seguinte estrutura:",
  "```json",
  "{",
  '  "plano_aula": {',
  '    "titulo": "Título do Plano de Aula",',
  '    "duracao_total": "X aulas de 50 minutos (Y minutos)",',
  '    "detalhes_plano_completo": "todo o conteudo gerado separado dentro em markdown",',
  '    "recursos_gerais": [',
  '      "Lista de recursos"',
  "    ],",
  '    "habilidade_bncc": {',
  '      "codigo": "EF01MA01",',
  '      "descricao": "Descrição da habilidade BNCC."',
  "    },",
  '    "avaliacao": "Breve descrição da avaliação."',
  "  },",
  '  "aulas": [',
  "    {",
  '      "numero_aula": 1,',
  '      "titulo": "Título da Aula",',
  '      "objetivo": "Objetivo da aula",',
  '      "duracao": "50 minutos"',
  "    }",
  "  ],",
  '  "atividades": [',
  "    {",
  '      "aula_associada": 1,',
  '      "etapa": "Etapa da Atividade",',
  '      "tempo": "Tempo da Atividade",',
  '      "descricao": "Descrição da atividade"',
  "    }",
  "  ]",
  "}",
  "```"
].join("\n");

console.log('promptteste', promptteste);


  try {
    const resp = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: promptteste }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 8192,
        },
      },
      {
        httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Host: "generativelanguage.googleapis.com",
        },
      }
    );

    const rawText =
      resp.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    console.log("rawText", rawText);

    const jsonString = extractJson(rawText);

    console.log("JSON String recebida (para depuração):", jsonString);

    let raw: any;
    try {
      raw = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Erro de parse JSON:", parseError);
      return reply
        .status(500)
        .send({ message: "Falha ao interpretar JSON retornado pela API." });
    }
    
    // **Ajuste principal aqui:**
    // O modelo retornou 'aula' e 'atividade' como arrays no nível superior.
    const planoAulaRaw = raw.plano_aula;
    const aulasRaw = raw.aula;      // Corrigido para 'aula'
    const atividadesRaw = raw.atividade;  // Corrigido para 'atividade'

    // Garante que 'aulas' e 'atividades' são arrays antes de mapear
    if (!Array.isArray(aulasRaw) || !Array.isArray(atividadesRaw)) {
        return reply
          .status(500)
          .send({ message: "Formato inesperado: campos 'aula' ou 'atividade' inválidos." });
    }

    // Mapeamento dos dados
    const planoAula: IPlanoAula = {
      titulo: planoAulaRaw.titulo,
      duracao_total: planoAulaRaw.duracao_total,
      recursos_gerais: Array.isArray(planoAulaRaw.recursos_gerais)
        ? planoAulaRaw.recursos_gerais
        : planoAulaRaw.recursos_gerais.split(',').map((item: string) => item.trim()),
      detalhes_plano_completo: planoAulaRaw.detalhes_plano_completo,
      avaliacao: planoAulaRaw.avaliacao,
      habilidade_bncc: {
        codigo: planoAulaRaw.habilidade_bncc, // Agora a API retorna apenas o código
        descricao: planoAulaRaw.habilidade_bncc,
        id: 0,
        etapaEnsino: "",
        componenteCurricular: "",
        anoSerie: "",
        versao: "",
        status: ""
      },
    };

    const aulas: IAula[] = aulasRaw.map((a: any) => ({
      numero_aula: a.numero_aula,
      titulo: a.titulo,
      objetivo: a.objetivo,
      duracao: a.duracao,
    }));

    const atividades: IAtividade[] = atividadesRaw.map((act: any) => ({
      etapa: act.etapa,
      tempo: act.tempo,
      descricao: act.descricao,
      // Como o prompt não pediu aula_associada, este campo pode ser omitido aqui.
      // Se precisar, o mapeamento precisará ser refeito para ter esta informação.
      numero_aula: 0, // Valor padrão ou lógica de mapeamento se necessário
    }));

    const usuarioId = 1;
    const planoRepo = new PlanoAulaRepository();
    const planoSalvo = await planoRepo.createWithRelations(
      planoAula,
      aulas,
      atividades,
      usuarioId
    );

    return reply.status(200).send({ planoAula, aulas, atividades });
  } catch (err: any) {
    const details = err.response?.data || err.message;
    console.error("Erro ao acessar a API Gemini:", details);
    return reply.status(500).send({
      message: "Erro ao gerar plano de aula.",
      details,
    });
  }
}*/


/*import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import axios from "axios";
import https from "https";
import { env } from "@/env";
import { IPlanoAula } from "@/entities/models/planoAula.interface";
import { IAula } from "@/entities/models/aula.interface";
import { IAtividade } from "@/entities/models/atividade.interface";
import { PlanoAulaRepository } from "@/lib/typeorm/planoAula.repository";

// validação do payload
const bodySchema = z.object({
  prompt: z.string().min(10, "O prompt deve conter pelo menos 10 caracteres."),
});

// Helper para extrair o JSON de forma robusta
function extractJson(text: string): string {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return text.substring(start, end + 1);
  }
  return "";
}

// Limpa e sanitiza a string JSON para corrigir erros comuns do LLM
function sanitizeJson(jsonStr: string): string {
  let sanitized = jsonStr.replace(/,\s*([\]}])/g, "$1");
  sanitized = sanitized.replace(
    /"(\w+?)":\s*(\S+?),?\s*"(\1)":\s*(\S+?),?/g,
    (match, key, val1, key2, val2) => {
      return `"${key}": ${val2},`;
    }
  );
  sanitized = sanitized.replace(/\{(\s*,\s*)*\}\s*]/g, "]");
  return sanitized;
}

export async function gerarPlanoAula(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parse = bodySchema.safeParse(request.body);
  if (!parse.success) {
    const errMsg = parse.error.errors.map((e) => e.message).join("; ");
    return reply.status(400).send({ message: `Erro de validação: ${errMsg}` });
  }
  const { prompt } = parse.data;

  let promptteste = [
  "Elaborar um plano de aula detalhado com base na BNCC para professores de escolas públicas.",
  "**Informações:**",
  "- **Código BNCC:** EF01MA01",
  "- **Componente Curricular:** Matemática",
  "- **Série:** 1º ano do Ensino Fundamental",
  "- **Duração das aulas:** 50 minutos cada. O plano deve ser dividido em quantas aulas forem necessárias.",
  "**Formato de Saída:** JSON, com a seguinte estrutura:",
  "```json",
  "{",
  '  "plano_aula": {',
  '    "titulo": "Título do Plano de Aula",',
  '    "duracao_total": "X aulas de 50 minutos (Y minutos)",',
  '    "detalhes_plano_completo": "todo o conteudo gerado separado dentro em markdown",',
  '    "recursos_gerais": [',
  '      "Lista de recursos"',
  "    ],",
  '    "habilidade_bncc": {',
  '      "codigo": "EF01MA01",',
  '      "descricao": "Descrição da habilidade BNCC."',
  "    },",
  '    "avaliacao": "Breve descrição da avaliação."',
  "  },",
  '  "aulas": [',
  "    {",
  '      "numero_aula": 1,',
  '      "titulo": "Título da Aula",',
  '      "objetivo": "Objetivo da aula",',
  '      "duracao": "50 minutos"',
  "    }",
  "  ],",
  '  "atividades": [',
  "    {",
  '      "aula_associada": 1,',
  '      "etapa": "Etapa da Atividade",',
  '      "tempo": "Tempo da Atividade",',
  '      "descricao": "Descrição da atividade"',
  "    }",
  "  ]",
  "}",
  "```"
].join("\n");

console.log('promptteste', promptteste);

  const apiKey = env.GEMINI_API_KEY;
  const apiIp = env.GEMINI_API_IP;
  if (!apiKey || !apiIp) {
    return reply
      .status(500)
      .send({ message: "GEMINI_API_KEY ou GEMINI_API_IP não configurados." });
  }

  const url = `https://${apiIp}/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  try {
    const resp = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: promptteste }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 8192,
        },
      },
      {
        httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Host: "generativelanguage.googleapis.com",
        },
      }
    );

    const rawText =
      resp.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    console.log("rawText", rawText);

    let jsonString = extractJson(rawText);
    jsonString = sanitizeJson(jsonString);

    console.log("JSON String recebida (para depuração):", jsonString);

    let raw: any;
    try {
      raw = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Erro de parse JSON:", parseError);
      return reply
        .status(500)
        .send({ message: "Falha ao interpretar JSON retornado pela API." });
    }

    // 🔹 Ajuste para plural
    const planoAulaRaw = raw.plano_aula;
    const aulasRaw = raw.aulas;
    const atividadesRaw = raw.atividades;

    if (!Array.isArray(aulasRaw) || !Array.isArray(atividadesRaw)) {
      return reply.status(500).send({
        message: "Formato inesperado: campos 'aulas' ou 'atividades' inválidos.",
      });
    }

    const planoAula: IPlanoAula = {
      titulo: planoAulaRaw.titulo,
      duracao_total: planoAulaRaw.duracao_total,
      recursos_gerais: Array.isArray(planoAulaRaw.recursos_gerais)
        ? planoAulaRaw.recursos_gerais
        : planoAulaRaw.recursos_gerais
            .split(",")
            .map((item: string) => item.trim()),
      detalhes_plano_completo: planoAulaRaw.detalhes_plano_completo,
      avaliacao: planoAulaRaw.avaliacao,
      habilidade_bncc: {
        codigo: planoAulaRaw.habilidade_bncc?.codigo ?? "",
        descricao: planoAulaRaw.habilidade_bncc?.descricao ?? "",
        id: 0,
        etapaEnsino: "",
        componenteCurricular: "",
        anoSerie: "",
        versao: "",
        status: "",
      },
    };

    const aulas: IAula[] = aulasRaw.map((a: any) => ({
      numero_aula: a.numero_aula,
      titulo: a.titulo,
      objetivo: a.objetivo,
      duracao: a.duracao,
    }));

    const atividades: IAtividade[] = atividadesRaw
      .filter(
        (act: any) => act && act.etapa && act.tempo && act.descricao
      ) // Filtra malformados
      .map((act: any) => ({
        etapa: act.etapa,
        tempo: act.tempo,
        descricao: act.descricao,
        numero_aula: act.aula_associada,
      }));

    // Persistência no banco
    const usuarioId = 1;
    const planoRepo = new PlanoAulaRepository();
    const planoSalvo = await planoRepo.createWithRelations(
      planoAula,
      aulas,
      atividades,
      usuarioId
    );

    return reply.status(200).send({ planoAula, aulas, atividades });
  } catch (err: any) {
    const details = err.response?.data || err.message;
    console.error("Erro ao acessar a API Gemini:", details);
    return reply.status(500).send({
      message: "Erro ao gerar plano de aula.",
      details,
    });
  }
}
*/



/*import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import axios from "axios";
import https from "https";
import { env } from "@/env";
import { IPlanoAula } from "@/entities/models/planoAula.interface";
import { IAula } from "@/entities/models/aula.interface";
import { IAtividade } from "@/entities/models/atividade.interface";
import { PlanoAulaRepository } from "@/lib/typeorm/planoAula.repository";
import { makeCreatePlanoAulalUseCase } from "@/use-cases/factory/make-create-plano-use-case";

// validação do payload
const bodySchema = z.object({
  codigo_BNCC: z.string().min(5, "Código BNCC obrigatório."),
  componente_Curricular: z.string().min(3, "Componente Curricular obrigatório."),
  serie: z.string().min(2, "Série obrigatória."),
  duracao_aula: z.string().min(2, "Duração da aula obrigatória."),
});

// Helper para extrair o JSON de forma robusta
function extractJson(text: string): string {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return text.substring(start, end + 1);
  }
  return "";
}

// Limpa e sanitiza a string JSON para corrigir erros comuns do LLM
function sanitizeJson(jsonStr: string): string {
  let sanitized = jsonStr.replace(/,\s*([\]}])/g, "$1");
  sanitized = sanitized.replace(
    /"(\w+?)":\s*(\S+?),?\s*"(\1)":\s*(\S+?),?/g,
    (match, key, val1, key2, val2) => {
      return `"${key}": ${val2},`;
    }
  );
  sanitized = sanitized.replace(/\{(\s*,\s*)*\}\s*]/g, "]");
  return sanitized;
}

export async function gerarPlanoAula(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parse = bodySchema.safeParse(request.body);
  if (!parse.success) {
    const errMsg = parse.error.errors.map((e) => e.message).join("; ");
    return reply.status(400).send({ message: `Erro de validação: ${errMsg}` });
  }

  const { codigo_BNCC, componente_Curricular, serie, duracao_aula } = parse.data;

  // 🔹 Monta o prompt dinamicamente
  const prompt = [
    "Elaborar um plano de aula detalhado com base na BNCC para professores de escolas públicas.",
    "**Informações:**",
    `- **Código BNCC:** ${codigo_BNCC}`,
    `- **Componente Curricular:** ${componente_Curricular}`,
    `- **Série:** ${serie}`,
    `- **Duração das aulas:** ${duracao_aula}. O plano deve ser dividido em quantas aulas forem necessárias.`,
    "**Formato de Saída:** JSON, com a seguinte estrutura:",
    "```json",
    "{",
    '  "plano_aula": {',
    '    "titulo": "Título do Plano de Aula",',
    '    "duracao_total": "X aulas de 50 minutos (Y minutos)",',
    '    "detalhes_plano_completo": "todo o conteudo gerado separado dentro em markdown",',
    '    "recursos_gerais": [',
    '      "Lista de recursos"',
    "    ],",
    '    "habilidade_bncc": {',
    `      "codigo": "${codigo_BNCC}",`,
    '      "descricao": "Descrição da habilidade BNCC."',
    "    },",
    '    "avaliacao": "Breve descrição da avaliação."',
    "  },",
    '  "aulas": [',
    "    {",
    '      "numero_aula": 1,',
    '      "titulo": "Título da Aula",',
    '      "objetivo": "Objetivo da aula",',
    `      "duracao": "${duracao_aula}"`,
    "    }",
    "  ],",
    '  "atividades": [',
    "    {",
    '      "aula_associada": 1,',
    '      "etapa": "Etapa da Atividade",',
    '      "tempo": "Tempo da Atividade",',
    '      "descricao": "Descrição da atividade"',
    "    }",
    "  ]",
    "}",
    "```",
  ].join("\n");

  const apiKey = env.GEMINI_API_KEY;
  const apiIp = env.GEMINI_API_IP;
  if (!apiKey || !apiIp) {
    return reply
      .status(500)
      .send({ message: "GEMINI_API_KEY ou GEMINI_API_IP não configurados." });
  }

  const url = `https://${apiIp}/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  try {
    const resp = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 8192,
        },
      },
      {
        httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Host: "generativelanguage.googleapis.com",
        },
      }
    );

    const rawText =
      resp.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

      console.log("rawText ", rawText)

    let jsonString = extractJson(rawText);
    jsonString = sanitizeJson(jsonString);

    let raw: any;
    try {
      raw = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Erro de parse JSON:", parseError);
      return reply
        .status(500)
        .send({ message: "Falha ao interpretar JSON retornado pela API." });
    }

    // 🔹 Ajuste para plural
    const planoAulaRaw = raw.plano_aula;
    const aulasRaw = raw.aulas;
    const atividadesRaw = raw.atividades;

    if (!Array.isArray(aulasRaw) || !Array.isArray(atividadesRaw)) {
      return reply.status(500).send({
        message: "Formato inesperado: campos 'aulas' ou 'atividades' inválidos.",
      });
    }

    const planoAula: IPlanoAula = {
      titulo: planoAulaRaw.titulo,
      duracao_total: planoAulaRaw.duracao_total,
      recursos_gerais: Array.isArray(planoAulaRaw.recursos_gerais)
        ? planoAulaRaw.recursos_gerais
        : planoAulaRaw.recursos_gerais
            .split(",")
            .map((item: string) => item.trim()),
      detalhes_plano_completo: planoAulaRaw.detalhes_plano_completo,
      avaliacao: planoAulaRaw.avaliacao,
      habilidade_bncc: {
        codigo: planoAulaRaw.habilidade_bncc?.codigo ?? "",
        descricao: planoAulaRaw.habilidade_bncc?.descricao ?? "",
        id: 0,
        etapaEnsino: "",
        componenteCurricular: "",
        anoSerie: "",
        versao: "",
        status: "",
      },
    };

    const aulas: IAula[] = aulasRaw.map((a: any) => ({
      numero_aula: a.numero_aula,
      titulo: a.titulo,
      objetivo: a.objetivo,
      duracao: a.duracao,
    }));

    const atividades: IAtividade[] = atividadesRaw
      .filter((act: any) => act && act.etapa && act.tempo && act.descricao)
      .map((act: any) => ({
        etapa: act.etapa,
        tempo: act.tempo,
        descricao: act.descricao,
        numero_aula: act.aula_associada,
      }));

    // Persistência no banco
    const usuarioId = 1;
    const planoRepo = new PlanoAulaRepository();
    const planoSalvo = await planoRepo.createWithRelations(
      planoAula,
      aulas,
      atividades,
      usuarioId
    );

     return reply.status(200).send({ planoAula, aulas, atividades });
  } catch (err: any) {
    const details = err.response?.data || err.message;
    console.error("Erro ao acessar a API Gemini:", details);
    return reply.status(500).send({
      message: "Erro ao gerar plano de aula.",
      details,
    });
  }
}

*/

import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { AiService } from "@/services/ai/AiService";
import { PlanoAulaRepository } from "@/lib/typeorm/planoAula.repository";
import { IPlanoAula } from "@/entities/models/planoAula.interface";
import { IAula } from "@/entities/models/aula.interface";
import { IAtividade } from "@/entities/models/atividade.interface";
import { makeCreatePlanoAulalUseCase } from "@/use-cases/factory/make-create-plano-use-case";

const bodySchema = z.object({
  codigo_BNCC: z.string().min(5, "Código BNCC obrigatório."),
  componente_Curricular: z.string().min(3, "Componente Curricular obrigatório."),
  serie: z.string().min(2, "Série obrigatória."),
  duracao_aula: z.string().min(2, "Duração da aula obrigatória."),
});

function montarPrompt({ codigo_BNCC, componente_Curricular, serie, duracao_aula }: any): string {
  return [
    "Elaborar um plano de aula detalhado com base na BNCC para professores de escolas públicas.",
    "**Informações:**",
    `- **Código BNCC:** ${codigo_BNCC}`,
    `- **Componente Curricular:** ${componente_Curricular}`,
    `- **Série:** ${serie}`,
    `- **Duração das aulas:** ${duracao_aula}. O plano deve ser dividido em quantas aulas forem necessárias.`,
    "**Formato de Saída:** JSON, com a seguinte estrutura:",
    "```json",
    "{",
    '  "plano_aula": {',
    '    "titulo": "Título do Plano de Aula",',
    '    "duracao_total": "X aulas de 50 minutos (Y minutos)",',
    '    "detalhes_plano_completo": "todo o conteudo gerado separado dentro em markdown",',
    '    "recursos_gerais": [',
    '      "Lista de recursos"',
    "    ],",
    '    "habilidade_bncc": {',
    `      "codigo": "${codigo_BNCC}",`,
    '      "descricao": "Descrição da habilidade BNCC."',
    "    },",
    '    "avaliacao": "Breve descrição da avaliação."',
    "  },",
    '  "aulas": [',
    "    {",
    '      "numero_aula": 1,',
    '      "titulo": "Título da Aula",',
    '      "objetivo": "Objetivo da aula",',
    `      "duracao": "${duracao_aula}"`,
    "    }",
    "  ],",
    '  "atividades": [',
    "    {",
    '      "aula_associada": 1,',
    '      "etapa": "Etapa da Atividade",',
    '      "tempo": "Tempo da Atividade",',
    '      "descricao": "Descrição da atividade"',
    "    }",
    "  ]",
    "}",
    "```",
  ].join("\n");
}

export async function gerarPlanoAula(request: FastifyRequest, reply: FastifyReply) {
  const parse = bodySchema.safeParse(request.body);
  if (!parse.success) {
    const errMsg = parse.error.errors.map((e) => e.message).join("; ");
    return reply.status(400).send({ message: `Erro de validação: ${errMsg}` });
  }

  const { codigo_BNCC, componente_Curricular, serie, duracao_aula } = parse.data;
  const prompt = montarPrompt({ codigo_BNCC, componente_Curricular, serie, duracao_aula });

  const aiService = new AiService();

  try {
    const raw = await aiService.gerarPlanoAula(prompt);

    const planoAulaRaw = raw.plano_aula;
    const aulasRaw = raw.aulas;
    const atividadesRaw = raw.atividades;

    if (!Array.isArray(aulasRaw) || !Array.isArray(atividadesRaw)) {
      return reply.status(500).send({
        message: "Formato inesperado: campos 'aulas' ou 'atividades' inválidos.",
      });
    }

    const planoAula: IPlanoAula = {
      titulo: planoAulaRaw.titulo,
      duracao_total: planoAulaRaw.duracao_total,
      recursos_gerais: Array.isArray(planoAulaRaw.recursos_gerais)
        ? planoAulaRaw.recursos_gerais
        : planoAulaRaw.recursos_gerais.split(",").map((item: string) => item.trim()),
      detalhes_plano_completo: planoAulaRaw.detalhes_plano_completo,
      avaliacao: planoAulaRaw.avaliacao,
      habilidade_bncc: {
        codigo: planoAulaRaw.habilidade_bncc?.codigo ?? "",
        descricao: planoAulaRaw.habilidade_bncc?.descricao ?? "",
        id: 0,
        etapaEnsino: "",
        componenteCurricular: "",
        anoSerie: "",
        versao: "",
        status: "",
      },
    };

    const aulas: IAula[] = aulasRaw.map((a: any) => ({
      numero_aula: a.numero_aula,
      titulo: a.titulo,
      objetivo: a.objetivo,
      duracao: a.duracao,
    }));

    const atividades: IAtividade[] = atividadesRaw
      .filter((act: any) => act && act.etapa && act.tempo && act.descricao)
      .map((act: any) => ({
        etapa: act.etapa,
        tempo: act.tempo,
        descricao: act.descricao,
        numero_aula: act.aula_associada,
      }));

    //const planoRepo = new PlanoAulaRepository();
    const usuarioId = 1;
    //await planoRepo.createWithRelations(planoAula, aulas, atividades, usuarioId);

    const createPlanoAulaUseCase = makeCreatePlanoAulalUseCase();
    await createPlanoAulaUseCase.handlerWithRelations(planoAula, aulas, atividades, usuarioId);


    return reply.status(200).send({ planoAula, aulas, atividades });
  } catch (err: any) {
    console.error("Erro ao gerar plano de aula:", err.message);
    return reply.status(500).send({
      message: "Erro ao gerar plano de aula.",
      details: err.message,
    });
  }
}