/*import { IPlanoAula } from "@/entities/models/planoAula.interface"

export interface IPlanoAulaRepository{
    create (plano_aula: IPlanoAula): Promise<IPlanoAula | undefined>
}

export { IPlanoAula }

*/

import { IPlanoAula } from "@/entities/models/planoAula.interface";
import { IAula } from "@/entities/models/aula.interface";
import { IAtividade } from "@/entities/models/atividade.interface";
import { PlanoAula } from "@/entities/planoAula.entity";

export interface IPlanoAulaRepository {
  // Método original (se ainda for usado em outro lugar)
  create (plano_aula: IPlanoAula): Promise<IPlanoAula | undefined>

  // Novo método completo com relações
  createWithRelations(
    plano: IPlanoAula,
    aulas: IAula[],
    atividades: IAtividade[],
    usuarioId: number
  ): Promise<PlanoAula>;
}

export { IPlanoAula };



