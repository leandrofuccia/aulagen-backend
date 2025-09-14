import { IPlanoAula } from "@/entities/models/planoAula.interface"


export interface IPlanoAulaRepository{
    create (planoAula: IPlanoAula): Promise<IPlanoAula | undefined>
    }

export { IPlanoAula }
