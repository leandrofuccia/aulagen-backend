import { Aula } from "../aula.entity";
import { HabilidadeBNCC } from "../habilidadeBNCC.entity";
import { Usuario } from "../usuario.entity";

export interface IPlanoAula {
  id?: number;
  titulo: string;
  duracao_total: string;
  recursos_gerais?: string[]; // compatível com @Column({ array: true })
  detalhes_plano_completo?: string; // compatível com @Column({ type: 'text' })
  avaliacao?: string;
  habilidade_bncc?: HabilidadeBNCC;
  criador?: Usuario;
  aulas?: Aula[];
}



  

 