import { IHabilidadeBNCC } from "@/entities/models/habilidadeBNCC.interface";

export interface IHabilidadeBNCCRepository{
    create (habilidadeBNCC: IHabilidadeBNCC): Promise<IHabilidadeBNCC | undefined>
    findByAnoComponente(ano_serie: string, componente_curricular: string): Promise<IHabilidadeBNCC[]>
    findHabilidadeBncc(): Promise<IHabilidadeBNCC[]>
    
}