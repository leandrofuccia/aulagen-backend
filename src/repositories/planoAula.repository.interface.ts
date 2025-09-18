import { IPlanoAula } from "@/entities/models/planoAula.interface"

export interface IPlanoAulaRepository{
    create (plano_aula: IPlanoAula): Promise<IPlanoAula | undefined>
}

export { IPlanoAula }
