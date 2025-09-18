import { Repository } from "typeorm";
import { appDataSource } from "./typeorm";
import { IAtividade, IAtividadeRepository } from "@/repositories/atividade.repository.interface";
import { Atividade } from "@/entities/atividade.entity";

export class AtividadeRepository implements IAtividadeRepository{

    private repository: Repository<Atividade>

    constructor(){
        this.repository = appDataSource.getRepository(Atividade)
    }

    create(atividade: IAtividade): Promise<IAtividade | undefined> {
        return this.repository.save(atividade)
    }

    
}