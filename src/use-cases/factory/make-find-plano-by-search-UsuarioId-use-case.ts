import { PlanoAulaRepository } from "@/lib/typeorm/planoAula.repository";
import { FindPlanoAulaSearchByUsuarioidUseCase } from "../find-plano-aula-search-by-usuarioid";

export function makeFindPlanoAulaSearchByUsuarioIdUseCase() {
  const planoAulaRepository = new PlanoAulaRepository();
  const findPlanoAulaSearchByUsuarioId = new FindPlanoAulaSearchByUsuarioidUseCase(planoAulaRepository);
  return findPlanoAulaSearchByUsuarioId;
}