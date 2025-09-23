import { HabilidadeBNCCRepository } from "@/lib/typeorm/habilidadeBNCC.repository"
import { FindHabilidadeBNCC } from "../find-habilidadeBNCC"

export function makeFindHabilidadeBNCCUseCase(){
    const habilidadeBNCC = new  HabilidadeBNCCRepository()
    const findHabilidadeBNCCUseCase = new  FindHabilidadeBNCC(habilidadeBNCC)
    return findHabilidadeBNCCUseCase;
}