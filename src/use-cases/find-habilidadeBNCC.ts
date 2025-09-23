import { IHabilidadeBNCCRepository } from "@/repositories/habilidadeBNCC.repository.interface"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"


export class FindHabilidadeBNCC{
    constructor(private habilidadeBNCCRepository: IHabilidadeBNCCRepository){}

    async handler (){
        const habilidadeNBCC = await this.habilidadeBNCCRepository.findHabilidadeBncc()

        if (!habilidadeNBCC) throw new ResourceNotFoundError()

        return habilidadeNBCC    
    }
}