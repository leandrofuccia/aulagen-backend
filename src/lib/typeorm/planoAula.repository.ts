import { Repository } from "typeorm";
import { appDataSource } from "./typeorm";
import { IPlanoAulaRepository } from "@/repositories/planoAula.repository.interface";
import { PlanoAula } from "@/entities/planoAula.entity";
import { IPlanoAula } from "@/entities/models/planoAula.interface";

export class PlanoAulaRepository implements IPlanoAulaRepository{

    private repository: Repository<PlanoAula>

    constructor(){
        this.repository = appDataSource.getRepository(PlanoAula)
    }

    create(planoAula: IPlanoAula): Promise<IPlanoAula | undefined> {
        return this.repository.save(planoAula)
        
    }

    
}