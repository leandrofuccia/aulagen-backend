import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PlanoAula } from "./planoAula.entity";



@Entity({ name: 'habilidade_bncc' })
export class HabilidadeBNCC {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column({ name: 'codigo', type: 'varchar', unique: true }) codigo: string;
  @Column({ name: 'descricao', type: 'text' }) descricao: string;
  @Column({ name: 'etapa_ensino', type: 'varchar' }) etapaEnsino: string;
  @Column({ name: 'componente_curricular', type: 'varchar' }) componenteCurricular: string;
  @Column({ name: 'ano_serie', type: 'varchar' }) anoSerie: string;
  @Column({ name: 'versao', type: 'varchar' }) versao: string;
  @Column({ name: 'status', type: 'varchar', default: 'ativa' }) status: string;

  @OneToMany(() => PlanoAula, planoAula => planoAula.habilidade)
  planos?: PlanoAula[];
}