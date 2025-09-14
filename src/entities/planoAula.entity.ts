import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { HabilidadeBNCC } from "./habilidadeBNCC.entity";


@Entity({ name: 'plano_aula' })
export class PlanoAula {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column({ name: 'titulo', type: 'varchar' }) titulo: string;
  @Column({ name: 'objetivos', type: 'text' }) objetivos: string;
  @Column({ name: 'atividades', type: 'text' }) atividades: string;
  @Column({ name: 'recursos', type: 'text' }) recursos: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => HabilidadeBNCC)
  @JoinColumn({ name: 'habilidade_id' })
  habilidade: HabilidadeBNCC;
}