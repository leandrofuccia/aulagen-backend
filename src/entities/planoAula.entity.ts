/*import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
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
}*/


/*import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { HabilidadeBNCC } from './habilidadeBNCC.entity';
import { Usuario } from './usuario.entity';
import { Aula } from './aula.entity';

@Entity('plano_aula')
export class PlanoAula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  duracao_total: string;

  @Column({ type: 'text', array: true, nullable: true })
  recursos_gerais: string[];

  @Column({ type: 'text', nullable: true })
  detalhes_plano_completo: string;

  @Column({ type: 'text', nullable: true })
  avaliacao: string;

  // Relacionamento com HabilidadeBNCC
  @ManyToOne(() => HabilidadeBNCC, (habilidade) => habilidade.planos)
  @JoinColumn({ name: 'habilidade_bncc_id' })
  habilidade_bncc: HabilidadeBNCC;

  // Novo relacionamento: um plano de aula pertence a um criador (usuário)
  @ManyToOne(() => Usuario, (usuario) => usuario.planosDeAula)
  @JoinColumn({ name: 'criador_id' }) // Coluna que armazenará o ID do usuário
  criador: Usuario;

  @OneToMany(() => Aula, (aula) => aula.planoAula)
  aulas: Aula[];
}

*/


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

  @OneToMany(() => Aula, (aula) => aula.planoAula)
  aulas: Aula[];
}