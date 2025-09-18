import { HabilidadeBNCC } from "@/entities/habilidadeBNCC.entity"
import { IHabilidadeBNCCRepository } from "@/repositories/habilidadeBNCC.repository.interface"
import { Repository } from "typeorm"
import { appDataSource } from "./typeorm"
import { IHabilidadeBNCC } from "@/entities/models/habilidadeBNCC.interface"

export class HabilidadeBNCCRepository implements IHabilidadeBNCCRepository{

    private repository: Repository<HabilidadeBNCC>

    constructor(){
        this.repository = appDataSource.getRepository(HabilidadeBNCC)
    }

    create(habilidadeBNCC: IHabilidadeBNCC): Promise<IHabilidadeBNCC | undefined> {
        return this.repository.save(habilidadeBNCC)
    }


   findByAnoComponente(ano_serie: string, componente_curricular: string): Promise<IHabilidadeBNCC[]> {
        return this.repository.find({
            where: {
            anoSerie: ano_serie,
            componenteCurricular: componente_curricular,
            },
        }).then((habilidades) =>
            habilidades.map((h) => ({
            id: h.id,
            codigo: h.codigo,
            descricao: h.descricao,
            etapa_ensino: h.etapaEnsino,
            componente_curricular: h.componenteCurricular,
            ano_serie: h.anoSerie,
            versao: h.versao,
            status: h.status,
            }))
        );
    }



}