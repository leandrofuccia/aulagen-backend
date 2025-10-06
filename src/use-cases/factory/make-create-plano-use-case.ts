import { PlanoAulaRepository } from "@/lib/typeorm/planoAula.repository";
import { CreatePlanoAulaUseCase } from "../create-planoAula";

export function makeCreatePlanoAulalUseCase() {
  const planoAulaRepository = new PlanoAulaRepository();
  const createPlanoAulaUseCase = new CreatePlanoAulaUseCase(planoAulaRepository);

  return createPlanoAulaUseCase;
}