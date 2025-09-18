import { HabilidadeBNCCRepository } from "@/lib/typeorm/habilidadeBNCC.repository"
import { FindHabilidadeBNCCByAnoComponenteUseCase } from "../find-habilidadeBNCC-by-AnoComponente"

export function makeFindHabilidadeBNCCByAnoComponenteUseCase(){
    const habilidadeBNCC = new  HabilidadeBNCCRepository()
    const findHabilidadeBNCCByAnoComponenteUseCase = new  FindHabilidadeBNCCByAnoComponenteUseCase(habilidadeBNCC)
    return findHabilidadeBNCCByAnoComponenteUseCase
}