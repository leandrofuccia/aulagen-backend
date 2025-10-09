import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { HabilidadeBNCC } from './habilidadeBNCC.entity';
import { Usuario } from './usuario.entity';
import { Aula } from './aula.entity';

@Entity({ name: 'plano_aula' })
export class PlanoAula {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'titulo', type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ name: 'duracao_total', type: 'varchar', length: 50, nullable: false })
  duracao_total: string;

  @Column({ name: 'recursos_gerais', type: 'text', array: true, nullable: true })
  recursos_gerais: string[];

  @Column({ name: 'detalhes_plano_completo', type: 'text', nullable: true })
  detalhes_plano_completo: string;

  @Column({ name: 'avaliacao', type: 'text', nullable: true })
  avaliacao: string;

  @ManyToOne(() => HabilidadeBNCC, (habilidade) => habilidade.planos, { nullable: true })
  @JoinColumn({ name: 'habilidade_bncc_id' })
  habilidade_bncc: HabilidadeBNCC;

  @ManyToOne(() => Usuario, (usuario) => usuario.planosDeAula, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'criador_id' })
  criador: Usuario;

  @OneToMany(() => Aula, (aula) => aula.planoAula , { cascade: true, eager: true })
  aulas: Aula[];
}