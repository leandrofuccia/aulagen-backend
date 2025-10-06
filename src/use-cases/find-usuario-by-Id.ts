import { IUsuarioRepository } from "@/repositories/usuario.repository.interface"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

export class FindUsuarioByIdUseCase{
    constructor(private usuarioRepository: IUsuarioRepository){}

    async handler (id: number){
        const usuario = await this.usuarioRepository.findByUserId(id)

        if (!usuario) throw new ResourceNotFoundError()

        return usuario    
    }
}