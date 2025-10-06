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
import { UpdatePlanoAulaInput } from "@/dtos/updatePlanoAula.dto";

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


  async delete (id: number): Promise<void>{
        await this.planoRepo.delete(id)
  }


  
  async updateWithRelations(
    planoId: number,
    dto: UpdatePlanoAulaInput
  ): Promise<PlanoAula> {
    // 1. Buscar plano existente com relações
    const plano = await this.planoRepo.findOne({
      where: { id: planoId },
      relations: ["aulas", "aulas.atividades"],
    });

    if (!plano) {
      throw new Error("Plano de aula não encontrado");
    }

    // 2. Atualizar dados básicos do plano
    if (dto.titulo !== undefined) plano.titulo = dto.titulo;
    if (dto.descricao !== undefined)
      plano.detalhes_plano_completo = dto.descricao;
    if (dto.recursos_gerais !== undefined)
      plano.recursos_gerais = dto.recursos_gerais;
    if (dto.duracao_total !== undefined)
      plano.duracao_total = dto.duracao_total;
    if (dto.avaliacao !== undefined) plano.avaliacao = dto.avaliacao;
    if (dto.detalhes_plano_completo !== undefined)
      plano.detalhes_plano_completo = dto.detalhes_plano_completo;

    // 3. Atualizar aulas existentes
    if (dto.aulas) {
      for (const aulaDto of dto.aulas) {
        const aula = plano.aulas.find((a) => a.id === aulaDto.id);

        if (!aula) {
          throw new Error(
            `Aula com id ${aulaDto.id} não encontrada neste plano`
          );
        }

        // Atualiza aula
        if (aulaDto.numero_aula !== undefined)
          aula.numero_aula = aulaDto.numero_aula;
        if (aulaDto.titulo !== undefined) aula.titulo = aulaDto.titulo;
        if (aulaDto.objetivo !== undefined) aula.objetivo = aulaDto.objetivo;
        if (aulaDto.duracao !== undefined) aula.duracao = aulaDto.duracao;

        // 4. Atualizar atividades da aula
        if (aulaDto.atividades) {
          for (const atividadeDto of aulaDto.atividades) {
            const atividade = aula.atividades.find(
              (atv) => atv.id === atividadeDto.id
            );

            if (!atividade) {
              throw new Error(
                `Atividade com id ${atividadeDto.id} não encontrada na aula ${aula.id}`
              );
            }

            if (atividadeDto.etapa !== undefined)
              atividade.etapa = atividadeDto.etapa;
            if (atividadeDto.tempo !== undefined)
              atividade.tempo = atividadeDto.tempo;
            if (atividadeDto.descricao !== undefined)
              atividade.descricao = atividadeDto.descricao;
            if (atividadeDto.numero_aula !== undefined)
              atividade.numero_aula = atividadeDto.numero_aula;
          }
        }
      }
    }

    // 5. Salvar alterações
    return await this.planoRepo.save(plano);
  }
}







   





