import { PlanoAula } from "@/entities/planoAula.entity";
import { IPlanoAulaRepository } from "@/repositories/planoAula.repository.interface";



export class FindPlanoAulaByUsuarioIdUseCase{
    constructor(private planoAuloRepository: IPlanoAulaRepository){}

    async handler(
      usuarioId: number,
      page: number,
      limit: number
    ): Promise<{ data: PlanoAula[]; total: number }> {
    return this.planoAuloRepository.findPlanoAulaByUsuarioid(usuarioId, page, limit);
    }

}