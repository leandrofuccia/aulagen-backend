import { IHabilidadeBNCCRepository } from "@/repositories/habilidadeBNCC.repository.interface"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

export class FindHabilidadeBNCCByAnoComponenteUseCase{
    constructor(private habilidadeBNCCRepository: IHabilidadeBNCCRepository){}

    async handler (ano_serie: string, componente_curricular: string){
        const habilidadeNBCC = await this.habilidadeBNCCRepository.findByAnoComponente(ano_serie,componente_curricular )

        if (!habilidadeNBCC) throw new ResourceNotFoundError()

        return habilidadeNBCC    
    }
}