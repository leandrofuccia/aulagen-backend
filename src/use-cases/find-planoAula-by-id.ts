import { PlanoAula } from "@/entities/planoAula.entity";
import { IPlanoAulaRepository } from "@/repositories/planoAula.repository.interface";

export class FindPlanoAulaByIdUseCase{
    constructor(private planoAuloRepository: IPlanoAulaRepository){}

    async handler(planoAulaId: number): Promise<{ data: PlanoAula}> {
      return this.planoAuloRepository.findPlanoAulaById(planoAulaId);
    }

}