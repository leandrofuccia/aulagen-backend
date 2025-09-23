import { PlanoAula } from "@/entities/planoAula.entity";
import { IPlanoAulaRepository } from "@/repositories/planoAula.repository.interface";

export class FindPlanoAulaSearchByUsuarioidUseCase{
    constructor(private planoAuloRepository: IPlanoAulaRepository){}

    async handler(
      usuarioId: number,
      search: string,
      page: number,
      limit: number
    ): Promise<{ data: PlanoAula[]; total: number }> {
    return this.planoAuloRepository.findPlanoAulaSearchByUsuarioid(usuarioId, search, page, limit);
    }

}