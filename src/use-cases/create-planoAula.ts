import { IPlanoAula, IPlanoAulaRepository } from "@/repositories/planoAula.repository.interface";

export class CreatePlanoAulaUseCase {
  constructor(private planoAulaRepository: IPlanoAulaRepository) {}

  handler (planoAula: IPlanoAula): Promise<IPlanoAula | undefined> {
    return this.planoAulaRepository.create(planoAula)
  }
}


