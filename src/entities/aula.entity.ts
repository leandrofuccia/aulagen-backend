import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { PlanoAula } from './planoAula.entity';
import { Atividade } from './atividade.entity';

@Entity('aula')
export class Aula {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'numero_aula', type: 'int', nullable: false })
  numero_aula: number;

  @Column({ name: 'titulo', type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ name: 'objetivo', type: 'text', nullable: true })
  objetivo: string;

  @Column({ name: 'duracao', type: 'varchar', length: 50, nullable: false })
  duracao: string;

  @ManyToOne(() => PlanoAula, (planoAula) => planoAula.aulas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plano_aula_id' })
  planoAula: PlanoAula;

  @OneToMany(() => Atividade, (atividade) => atividade.aula , { cascade: true, eager: true })
  atividades: Atividade[];
}