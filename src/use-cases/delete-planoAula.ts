import { IPlanoAulaRepository } from "@/repositories/planoAula.repository.interface";

export class deletePlanoAulaUseCase {
  constructor(private planoAulaRepository: IPlanoAulaRepository){}
            
      async handler(id: number): Promise<void> {
        
          return this.planoAulaRepository.delete(id)
      }
}


