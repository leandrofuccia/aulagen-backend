import { IPlanoAula } from "@/entities/models/planoAula.interface";
import { IAula } from "@/entities/models/aula.interface";
import { IAtividade } from "@/entities/models/atividade.interface";
import { PlanoAula } from "@/entities/planoAula.entity";
import { UpdatePlanoAulaInput } from "@/dtos/updatePlanoAula.dto";


export interface IPlanoAulaRepository {
  create (plano_aula: IPlanoAula): Promise<IPlanoAula | undefined>

   createWithRelations(
    plano: IPlanoAula,
    aulas: IAula[],
    atividades: IAtividade[],
    usuarioId: number
  ): Promise<PlanoAula>;


  findPlanoAulaByUsuarioid(
    usuarioId: number,
    page: number,
    limit: number
  ): Promise<{ data: PlanoAula[]; total: number }>;

  
  findPlanoAulaSearchByUsuarioid(
        usuarioId: number,
        search: string,
        page: number,
        limit: number,
    ): Promise<{ data: PlanoAula[], total: number }> ;


  findPlanoAulaById( planoAulaId: number ): Promise<{ data: PlanoAula }>;
  delete (id: number): Promise<void>;
  updateWithRelations(planoId: number,dto: UpdatePlanoAulaInput): Promise<PlanoAula> 

}

export { IPlanoAula };



