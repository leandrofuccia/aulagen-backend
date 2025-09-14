import { appDataSource } from "./typeorm";
import { ocupacao } from "@/entities/ocupacao.entity";

export async function seedOcupacaoTableOrm() {
  const ocupacaoRepository = appDataSource.getRepository(ocupacao);

  const existingEntries = await ocupacaoRepository.find();
  if (existingEntries.length > 0) {
    return;
  }

  const perfis = [
    { id: 1, ocupacao: "Aluno" },
    { id: 2, ocupacao: "Professor" },
  ];
  await ocupacaoRepository.save(perfis);
  console.log("Dados inseridos na tabela 'ocupacao'.");
}
