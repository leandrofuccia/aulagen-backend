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

import { Repository } from "typeorm";
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
  async createWithRelations(
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
  }
}




