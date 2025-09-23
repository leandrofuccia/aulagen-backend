import { PlanoAulaRepository } from "@/lib/typeorm/planoAula.repository";
import { FindPlanoAulaByIdUseCase } from "../find-planoAula-by-id";

export function makeFindPlanoAulaByIdUseCase() {
  const planoAulaRepository = new PlanoAulaRepository();
  const findPlanoAulaById = new FindPlanoAulaByIdUseCase(planoAulaRepository);
  return findPlanoAulaById;
}