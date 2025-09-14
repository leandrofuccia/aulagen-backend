import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";

import { Usuario } from "./usuario.entity";
import { IOcupacao } from "./models/ocupacao.interface";

@Entity({ name: 'ocupacao' })
export class ocupacao implements IOcupacao {
    @PrimaryColumn({ type: "integer" })
    id?: number;

    @Column({ name: 'ocupacao', type: 'varchar', unique: true })
    ocupacao: string;

    @OneToMany(() => Usuario, usuario => usuario.ocupacao)
    usuarios?: Usuario[];

    constructor(ocupacao: string) {
        this.ocupacao = ocupacao;
    }
}
