import { IUsuario } from "./models/usuario.interface"
import {Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credencial } from "./credencial.entity"
import { Ocupacao } from "./ocupacao.entity"

@Entity({
  name: 'usuario',
})
export class Usuario implements IUsuario {

    @PrimaryGeneratedColumn('increment',{
      name: 'id',
    })
    id?: number | undefined

    @Column({
      name: 'nome',
      type: 'varchar'
    })
    nome: string
    
    @Column({
      name: 'ocupacaoid',
      type: 'int'
    })
    ocupacaoid: number

    @Column({
      name: 'datacriacao',
      type: process.env.NODE_ENV === "test" ? "text" : "timestamp without time zone",
      default: () => process.env.NODE_ENV === "test" ? "CURRENT_TIMESTAMP" : "'now()'"
    })
    datacriacao?: Date

    @Column({
      name: 'ultimologin',
      type: process.env.NODE_ENV === "test" ? "text" : "timestamp without time zone",
      default: () => process.env.NODE_ENV === "test" ? "CURRENT_TIMESTAMP" : "'now()'"
    })
    ultimologin?: Date

    @Column({
      name: 'credencialid',
      type: 'int'
    })
    credencialId?: number

    
    @OneToOne(() => Credencial, credencial => credencial.usuario)
    @JoinColumn({ name: 'credencialid' })
    credencial?: Credencial;

    @ManyToOne(() => Ocupacao, ocupacao => ocupacao.usuarios)
    @JoinColumn({ name: 'ocupacaoid' })
    ocupacao?: Ocupacao;

    constructor(nome: string, ocupacaoid: number) {
      this.nome = nome
      this.ocupacaoid = ocupacaoid
    }
  }
  