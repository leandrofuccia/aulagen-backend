/*import { IPlanoAula, IPlanoAulaRepository } from "@/repositories/planoAula.repository.interface";

export class CreatePlanoAulaUseCase {
  constructor(private planoAulaRepository: IPlanoAulaRepository) {}

  handler (planoAula: IPlanoAula): Promise<IPlanoAula | undefined> {
    return this.planoAulaRepository.create(planoAula)
  }
}
*/

import {
  IPlanoAula,
  IPlanoAulaRepository,
} from "@/repositories/planoAula.repository.interface";
import { IAula } from "@/entities/models/aula.interface";
import { IAtividade } from "@/entities/models/atividade.interface";
import { PlanoAula } from "@/entities/planoAula.entity";

export class CreatePlanoAulaUseCase {
  constructor(private planoAulaRepository: IPlanoAulaRepository) {}

  handler(planoAula: IPlanoAula): Promise<IPlanoAula | undefined> {
    return this.planoAulaRepository.create(planoAula);
  }

  handlerWithRelations(
    plano: IPlanoAula,
    aulas: IAula[],
    atividades: IAtividade[],
    usuarioId: number
  ): Promise<PlanoAula> {
    return this.planoAulaRepository.createWithRelations(
      plano,
      aulas,
      atividades,
      usuarioId
    );
  }
}

