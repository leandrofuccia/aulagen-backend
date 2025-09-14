import { Repository } from "typeorm";
import { appDataSource } from "./typeorm";
import { IPlanoAula, IPlanoAulaRepository } from "@/repositories/planoAula.repository.interface";
import { PlanoAula } from "@/entities/planoAula.entity";


export class PlanoAulaRepository implements IPlanoAulaRepository{
    
    private repository: Repository<PlanoAula>

    constructor(){
        this.repository = appDataSource.getRepository(PlanoAula)
    }

    create(PlanoAula: IPlanoAula): Promise<IPlanoAula | undefined> {
       
        return this.repository.save(PlanoAula)
    }
    

   
    
}