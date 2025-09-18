import { Repository } from "typeorm";
import { appDataSource } from "./typeorm";
import { IAula, IAulaRepository } from "@/repositories/aula.repository.interface";
import { Aula } from "@/entities/aula.entity";

export class AulaRepository implements IAulaRepository{

    private repository: Repository<Aula>

    constructor(){
        this.repository = appDataSource.getRepository(Aula)
    }

    create(aula: IAula): Promise<IAula | undefined> {
        return this.repository.save(aula)
    }

    
}