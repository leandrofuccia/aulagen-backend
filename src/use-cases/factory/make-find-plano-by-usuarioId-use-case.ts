import { PlanoAulaRepository } from "@/lib/typeorm/planoAula.repository";
import { FindPlanoAulaByUsuarioIdUseCase } from "../find-planoAula-by-usuarioid";

export function makeFindPlanoAulaByUsuarioIdUseCase() {
  const planoAulaRepository = new PlanoAulaRepository();
  const findPlanoAulaByUsuarioId = new FindPlanoAulaByUsuarioIdUseCase(planoAulaRepository);
  return findPlanoAulaByUsuarioId;
}