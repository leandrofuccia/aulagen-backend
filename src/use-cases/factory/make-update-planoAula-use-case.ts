import { PlanoAulaRepository } from "@/lib/typeorm/planoAula.repository";
import { UpdatePlanoAulaUseCase } from "../update-planoAula";


export function makeUpdatePlanoAulaUseCase() {
  const planoAulaRepository = new PlanoAulaRepository();
  const useCase = new UpdatePlanoAulaUseCase(planoAulaRepository);

  return useCase;
}
