/*import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Aula } from './aula.entity';


@Entity('atividade')
export class Atividade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  etapa: string;

  @Column()
  tempo: string;

  @Column({ type: 'text' })
  descricao: string;

  @ManyToOne(() => Aula, (aula) => aula.atividades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'aula_id' })
  aula: Aula;
}*/


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Aula } from './aula.entity';

@Entity('atividade')
export class Atividade {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'etapa', type: 'varchar', nullable: false })
  etapa: string;

  @Column({ name: 'tempo', type: 'varchar', nullable: false })
  tempo: string;

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao: string;

  @Column({ name: 'numero_aula', type: 'text', nullable: true })
  numero_aula: number;

  @ManyToOne(() => Aula, (aula) => aula.atividades, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'aula_id' })
  aula: Aula;
}