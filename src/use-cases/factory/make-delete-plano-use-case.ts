import { PlanoAulaRepository } from "@/lib/typeorm/planoAula.repository"
import { deletePlanoAulaUseCase } from "../delete-planoAula"

export function makeDeletePlanoAulaUseCase(){
    const planoAulaRepository = new  PlanoAulaRepository()
    const deletePlanoAulaByUseCase = new   deletePlanoAulaUseCase(planoAulaRepository)
    return deletePlanoAulaByUseCase
}