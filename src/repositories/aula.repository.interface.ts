import { IAula } from "@/entities/models/aula.interface"

export interface IAulaRepository{
    create (aula: IAula): Promise<IAula | undefined>
}

export { IAula }
