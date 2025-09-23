/*import { Repository } from "typeorm";
import { appDataSource } from "./typeorm";
import { IPlanoAulaRepository } from "@/repositories/planoAula.repository.interface";
import { PlanoAula } from "@/entities/planoAula.entity";
import { IPlanoAula } from "@/entities/models/planoAula.interface";

export class PlanoAulaRepository implements IPlanoAulaRepository{

    private repository: Repository<PlanoAula>

    constructor(){
        this.repository = appDataSource.getRepository(PlanoAula)
    }

    create(planoAula: IPlanoAula): Promise<IPlanoAula | undefined> {
        return this.repository.save(planoAula)
        
    }

    
}*/


// src/lib/typeorm/planoAula.repository.ts

import { DeepPartial, ILike, Repository } from "typeorm";
import { appDataSource } from "./typeorm";
import { IPlanoAulaRepository } from "@/repositories/planoAula.repository.interface";
import { PlanoAula } from "@/entities/planoAula.entity";
import { Aula } from "@/entities/aula.entity";
import { Atividade } from "@/entities/atividade.entity";
import { HabilidadeBNCC } from "@/entities/habilidadeBNCC.entity";
import { Usuario } from "@/entities/usuario.entity";

import { IPlanoAula } from "@/entities/models/planoAula.interface";
import { IAula } from "@/entities/models/aula.interface";
import { IAtividade } from "@/entities/models/atividade.interface";

export class PlanoAulaRepository implements IPlanoAulaRepository {
  private planoRepo: Repository<PlanoAula>;
  private aulaRepo: Repository<Aula>;
  private atividadeRepo: Repository<Atividade>;
  private habilidadeRepo: Repository<HabilidadeBNCC>;
  private usuarioRepo: Repository<Usuario>;

  constructor() {
    this.planoRepo = appDataSource.getRepository(PlanoAula);
    this.aulaRepo = appDataSource.getRepository(Aula);
    this.atividadeRepo = appDataSource.getRepository(Atividade);
    this.habilidadeRepo = appDataSource.getRepository(HabilidadeBNCC);
    this.usuarioRepo = appDataSource.getRepository(Usuario);
  }

  // Método original (se ainda for necessário)
  create(planoAula: IPlanoAula): Promise<IPlanoAula | undefined> {
    return this.planoRepo.save(planoAula);
  }

  // Novo método com relações
  /*async createWithRelations(
    plano: IPlanoAula,
    aulas: IAula[],
    atividades: IAtividade[],
    usuarioId: number
  ): Promise<PlanoAula> {
    const usuario = await this.usuarioRepo.findOneBy({ id: usuarioId });
    if (!usuario) throw new Error("Usuário não encontrado");

    let habilidade: HabilidadeBNCC | null = null;
    if (plano.habilidade_bncc) {
      habilidade = await this.habilidadeRepo.findOneBy({
        codigo: plano.habilidade_bncc as unknown as string,
      });
    }

    const planoEntity = this.planoRepo.create({
      titulo: plano.titulo,
      duracao_total: plano.duracao_total,
      recursos_gerais: plano.recursos_gerais,
      detalhes_plano_completo: plano.detalhes_plano_completo,
      avaliacao: plano.avaliacao,
      criador: { id: usuario.id },
      habilidade_bncc: habilidade ? { id: habilidade.id } : undefined,
    });

    const planoSalvo = await this.planoRepo.save(planoEntity);

    for (const aula of aulas) {
      const aulaEntity = this.aulaRepo.create({
        numero_aula: aula.numero_aula,
        titulo: aula.titulo,
        objetivo: aula.objetivo,
        duracao: plano.duracao_total,
        planoAula: { id: planoSalvo.id },
      });

      const aulaSalva = await this.aulaRepo.save(aulaEntity);

      const atividadesDaAula = atividades.filter(
        (atv) => atv.numero_aula === aula.numero_aula
      );

      for (const atividade of atividadesDaAula) {
        const atividadeEntity = this.atividadeRepo.create({
          etapa: atividade.etapa,
          tempo: atividade.tempo,
          descricao: atividade.descricao,
          aula: { id: aulaSalva.id },
        });

        await this.atividadeRepo.save(atividadeEntity);
      }
    }

    return planoSalvo;
  }*/

  async createWithRelations(
    plano: IPlanoAula,
    aulas: IAula[],
    atividades: IAtividade[],
    usuarioId: number
  ): Promise<PlanoAula> {
    // 1) usuário
    const usuario = await this.usuarioRepo.findOneBy({ id: usuarioId });
    if (!usuario) throw new Error("Usuário não encontrado");

    // 2) extrair e normalizar o código da habilidade, aceitando string OU objeto { codigo: '...' }
    let codigoHabilidade: string | undefined;
    if (plano.habilidade_bncc) {
      if (typeof plano.habilidade_bncc === "string") {
        codigoHabilidade = plano.habilidade_bncc;
      } else if (typeof plano.habilidade_bncc === "object" && "codigo" in plano.habilidade_bncc) {
        codigoHabilidade = (plano.habilidade_bncc as any).codigo;
      }
      if (codigoHabilidade) codigoHabilidade = codigoHabilidade.trim();
    }

    console.log("codigo extraido createWithRelations", codigoHabilidade);

    // 3) buscar habilidade no banco (tenta exata e depois case-insensitive)
    let habilidade: HabilidadeBNCC | null = null;
    if (codigoHabilidade) {
      habilidade = await this.habilidadeRepo.findOneBy({ codigo: codigoHabilidade });
      if (!habilidade) {
        // se Postgres, ILike funciona para case-insensitive; se der erro, cai no querybuilder
        try {
          habilidade = await this.habilidadeRepo.findOne({
            where: { codigo: ILike(codigoHabilidade) },
          });
        } catch (err) {
          habilidade = await this.habilidadeRepo
            .createQueryBuilder("h")
            .where("LOWER(h.codigo) = LOWER(:codigo)", { codigo: codigoHabilidade })
            .getOne();
        }
      }
    }

    console.log("habilidade encontrada", habilidade ? habilidade.id : null);

    // 4) criar plano (gravando apenas o id da habilidade/criador)
    const planoEntity = this.planoRepo.create({
      titulo: plano.titulo,
      duracao_total: plano.duracao_total,
      recursos_gerais: plano.recursos_gerais,
      detalhes_plano_completo: plano.detalhes_plano_completo,
      avaliacao: plano.avaliacao,
      criador: { id: usuario.id } as DeepPartial<Usuario>,
      habilidade_bncc: habilidade ? ({ id: habilidade.id } as DeepPartial<HabilidadeBNCC>) : undefined,
    } as DeepPartial<PlanoAula>);

    const planoSalvo = await this.planoRepo.save(planoEntity);

    // 5) criar aulas e atividades (mantendo somente os ids nas FKs)
    for (const aula of aulas) {
      const aulaEntity = this.aulaRepo.create({
        numero_aula: aula.numero_aula,
        titulo: aula.titulo,
        objetivo: aula.objetivo,
        duracao: plano.duracao_total,
        planoAula: { id: planoSalvo.id } as DeepPartial<PlanoAula>,
      } as DeepPartial<Aula>);

      const aulaSalva = await this.aulaRepo.save(aulaEntity);

      const atividadesDaAula = atividades.filter(
        (atv) => atv.numero_aula === aula.numero_aula
      );

      for (const atividade of atividadesDaAula) {
        const atividadeEntity = this.atividadeRepo.create({
          etapa: atividade.etapa,
          tempo: atividade.tempo,
          descricao: atividade.descricao,
          aula: { id: aulaSalva.id } as DeepPartial<Aula>,
        } as DeepPartial<Atividade>);

        await this.atividadeRepo.save(atividadeEntity);
      }
    }

    // 6) buscar o plano salvo com relações para retornar confirmação
    const planoComRels = await this.planoRepo.findOne({
      where: { id: planoSalvo.id },
      relations: ["habilidade_bncc", "aulas", "aulas.atividades"],
    });

    return planoComRels ?? planoSalvo;
  }




  async findPlanoAulaByUsuarioid(
  usuarioId: number,
  page: number = 1,
  limit: number = 10
  ): Promise<{ data: PlanoAula[]; total: number }> {
    const [data, total] = await this.planoRepo.findAndCount({
      where: { criador: { id: usuarioId } },
      relations: ["habilidade_bncc", "aulas"],
      order: { id: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });
      return { data, total };
    }

    
  async findPlanoAulaSearchByUsuarioid(
        usuarioId: number,
        search: string, // O termo de busca é obrigatório neste método
        page: number = 1,
        limit: number = 10,
    ): Promise<{ data: PlanoAula[], total: number }> {
            const query = this.planoRepo
            .createQueryBuilder('plano_aula')
            .leftJoinAndSelect('plano_aula.criador', 'criador')
            .leftJoinAndSelect('plano_aula.habilidade_bncc', 'habilidade_bncc')
            .where('plano_aula.criador_id = :usuarioId', { usuarioId })
            .andWhere(
                '(LOWER(plano_aula.titulo) LIKE LOWER(:search) OR LOWER(habilidade_bncc.codigo) LIKE LOWER(:search))',
                { search: `%${search}%` }
            );

        const [data, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return { data, total };
    }



  async findPlanoAulaById(id: number): Promise<{ data: PlanoAula }> {
    const [data] = await this.planoRepo.find({
      where: { id },
      relations: [
        "habilidade_bncc",
        "aulas",
        "aulas.atividades",
      ],
      order: {
        aulas: {
          numero_aula: "ASC", // aulas em ordem crescente
          atividades: {
            id: "ASC", // atividades em ordem crescente
          },
        },
      },
    });

    return { data };
  }

   
}




