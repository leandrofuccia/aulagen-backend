import { IAtividade } from "@/entities/models/atividade.interface"

export interface IAtividadeRepository{
    create (atividade: IAtividade): Promise<IAtividade | undefined>
}

export { IAtividade }
