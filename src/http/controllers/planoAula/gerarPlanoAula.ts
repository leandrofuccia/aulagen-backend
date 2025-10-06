import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { AiService } from "@/services/ai/AiService";
import { IPlanoAula } from "@/entities/models/planoAula.interface";
import { IAula } from "@/entities/models/aula.interface";
import { IAtividade } from "@/entities/models/atividade.interface";
import { makeCreatePlanoAulalUseCase } from "@/use-cases/factory/make-create-plano-use-case";
import { InvalidUsuarioError } from "@/use-cases/errors/invalid-usuario-error";
import { makeFindUsuarioByCredencialUseCase } from "@/use-cases/factory/make-find-usuario-by-credencial";
import { unauthorizedPerfilError } from "@/use-cases/errors/unauthorized-perfil-error";

const bodySchema = z.object({
  codigo_BNCC: z.string().min(5, "Código BNCC obrigatório."),
  componente_Curricular: z.string().min(3, "Componente Curricular obrigatório."),
  serie: z.string().min(2, "Série obrigatória."),
  duracao_aula: z.string().min(2, "Duração da aula obrigatória."),
  credencialId: z.coerce.number(),
});

function montarPrompt({ codigo_BNCC, componente_Curricular, serie, duracao_aula }: any): string {
  return [
    "Elaborar um plano de aula detalhado com base na BNCC sem redundâncias desnecessárias para professores de escolas públicas.",
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
  
  console.log('gerarPlanoAula parse.data ', parse.data);
  if (!parse.success) {
    const errMsg = parse.error.errors.map((e) => e.message).join("; ");
    return reply.status(400).send({ message: `Erro de validação: ${errMsg}` });
  }

  

  const { codigo_BNCC, componente_Curricular, serie, duracao_aula, credencialId } = parse.data;

  console.log('gerarPlanoAula credencialId', credencialId)
  
  const findUsuarioByCredencialIdUseCase = makeFindUsuarioByCredencialUseCase();
  const usuario = await findUsuarioByCredencialIdUseCase.handler(credencialId);
    
  if (!usuario || (usuario).length === 0){
      throw new InvalidUsuarioError()
  } 
   
  if (usuario[0].ocupacaoid !== 2) {
      throw new unauthorizedPerfilError()
        
  }
  const usuarioId = usuario[0].id;
  console.log('usuarioId ', usuarioId)  
  
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

       
    const createPlanoAulaUseCase = makeCreatePlanoAulalUseCase();
    const planoSalvo = await createPlanoAulaUseCase.handlerWithRelations(planoAula, aulas, atividades, usuarioId!);

    //return reply.status(200).send({ planoAula, aulas, atividades });
    return reply.status(200).send({
      planoAula: {
        ...planoSalvo,
        detalhes_plano_completo: planoAula.detalhes_plano_completo,
        recursos_gerais: planoAula.recursos_gerais,
        avaliacao: planoAula.avaliacao,
        habilidade_bncc: planoAula.habilidade_bncc,
      },
      aulas,
      atividades,
    });

  } catch (err: any) {
    console.error("Erro ao gerar plano de aula:", err.message);
    return reply.status(500).send({
      message: "Erro ao gerar plano de aula.",
      details: err.message,
    });
  }
}