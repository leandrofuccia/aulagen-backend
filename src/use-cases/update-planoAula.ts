
import { UpdatePlanoAulaInput } from "@/dtos/updatePlanoAula.dto";
import { IPlanoAulaRepository } from "@/repositories/planoAula.repository.interface";


export class UpdatePlanoAulaUseCase {
  constructor(private planoAulaRepository: IPlanoAulaRepository) {}

  async handler(id: number, data: UpdatePlanoAulaInput) {
    return this.planoAulaRepository.updateWithRelations(id, data);
  }
}