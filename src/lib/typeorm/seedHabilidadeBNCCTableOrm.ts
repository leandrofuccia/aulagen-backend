import { appDataSource } from "./typeorm";
import { HabilidadeBNCC } from "@/entities/habilidadeBNCC.entity";

export async function seedHabilidadeBNCCTableOrm() {
  const habilidadeRepository = appDataSource.getRepository(HabilidadeBNCC);
  const existingEntries = await habilidadeRepository.find();
  if (existingEntries.length > 0) {
    return;
  }
  const habilidades = [
    { codigo: "EF01LP01", descricao: "Reconhecer que textos são lidos e escritos da esquerda para a direita e de cima para baixo da página.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP02", descricao: "Escrever espontaneamente ou por ditado palavras e frases de forma alfabética usando letras que representem fonemas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP03", descricao: "Observar escritas convencionais comparando-as às suas produções escritas percebendo semelhanças e diferenças.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP04", descricao: "Identificar o propósito de textos de diferentes gêneros.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP05", descricao: "Localizar informações explícitas em textos de diversos gêneros.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP06", descricao: "Identificar elementos da narrativa, como personagens, espaço e tempo.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP07", descricao: "Ler e compreender palavras e frases em textos variados.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP08", descricao: "Reconhecer rimas e aliterações em textos poéticos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP09", descricao: "Identificar o uso de pontuação em diferentes textos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP10", descricao: "Produzir textos com coerência e coesão respeitando as convenções da escrita.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP11", descricao: "Revisar textos com apoio de professor ou colegas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP12", descricao: "Utilizar recursos gráficos para organizar informações em textos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP13", descricao: "Identificar diferentes gêneros textuais e suas características.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP14", descricao: "Utilizar a linguagem oral para expressar ideias e sentimentos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP15", descricao: "Participar de situações de comunicação oral respeitando regras de interação.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP16", descricao: "Reconhecer a função social da leitura e da escrita.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP17", descricao: "Utilizar diferentes estratégias de leitura para compreender textos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01LP18", descricao: "Relacionar texto com ilustrações e outros recursos gráficos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA01", descricao: "Utilizar diferentes estratégias para contar objetos de uma coleção, como pareamento e agrupamento.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA02", descricao: "Contar de maneira exata e estimar quantidades usando diferentes estratégias.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA03", descricao: "Comparar quantidades de objetos em diferentes coleções.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA04", descricao: "Contar até 100 utilizando diferentes representações.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA05", descricao: "Comparar números naturais utilizando a reta numérica.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA06", descricao: "Utilizar fatos básicos da adição e estratégias de cálculo mental.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA07", descricao: "Compor e decompor números naturais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA08", descricao: "Resolver problemas de adição e subtração com apoio de material concreto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA09", descricao: "Organizar e ordenar objetos por atributos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA10", descricao: "Identificar padrões em sequências numéricas e figurais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA11", descricao: "Localizar objetos no espaço utilizando termos como dentro, fora, em cima e embaixo.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA12", descricao: "Utilizar pontos de referência para localizar objetos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01MA13", descricao: "Reconhecer figuras geométricas espaciais em objetos do cotidiano.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01CI01", descricao: "Identificar características de seres vivos e não vivos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01CI02", descricao: "Reconhecer partes do corpo humano e suas funções básicas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01CI03", descricao: "Observar e relatar mudanças na natureza e no tempo atmosférico.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01CI04", descricao: "Identificar recursos naturais do lugar em que vive.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01CI05", descricao: "Reconhecer a importância da higiene e cuidados com a saúde.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01CI06", descricao: "Diferenciar materiais segundo propriedades simples, como rigidez e flexibilidade.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01HI01", descricao: "Reconhecer que as pessoas têm histórias de vida diferentes.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01HI02", descricao: "Identificar membros da família e suas relações.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01HI03", descricao: "Registrar e compartilhar memórias de experiências pessoais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01HI04", descricao: "Reconhecer sequência temporal em eventos do cotidiano.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01HI05", descricao: "Ouvir relatos de pessoas mais velhas sobre eventos passados.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01HI06", descricao: "Perceber mudanças e permanências na rotina e no contexto familiar.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01GE01", descricao: "Identificar elementos da paisagem do lugar onde vive.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01GE02", descricao: "Localizar objetos no espaço usando orientação simples.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01GE03", descricao: "Reconhecer plantas e animais característicos de sua região.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01GE04", descricao: "Utilizar maquetes, mapas e plantas para representar o espaço.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01GE05", descricao: "Observar fenômenos meteorológicos e relacioná-los ao lugar onde vive.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01GE06", descricao: "Compreender a relação entre as pessoas e o ambiente em diferentes lugares.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01AR01", descricao: "Experimentar diferentes formas de expressão artística com diversos materiais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01AR02", descricao: "Explorar cores, formas e texturas em produções artísticas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01AR03", descricao: "Expressar sentimentos e ideias por meio de desenho, pintura e modelagem.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01AR04", descricao: "Apreciar manifestações artísticas de diferentes culturas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01EF01", descricao: "Experimentar diferentes movimentos corporais em atividades lúdicas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01EF02", descricao: "Desenvolver habilidades motoras básicas como correr, saltar e arremessar.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01EF03", descricao: "Participar de jogos e brincadeiras respeitando regras e turnos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01EF04", descricao: "Reconhecer a importância da atividade física para a saúde.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01EF05", descricao: "Respeitar diferenças individuais de desempenho nas práticas corporais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01EF06", descricao: "Expressar-se corporalmente em danças e dramatizações simples.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01ER01", descricao: "Reconhecer diferentes manifestações religiosas presentes na comunidade.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01ER02", descricao: "Respeitar crenças e práticas religiosas de diferentes grupos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01ER03", descricao: "Identificar símbolos e celebrações religiosas comuns.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "1º ano", versao: "2025" },
    { codigo: "EF01ER04", descricao: "Refletir sobre valores e princípios éticos presentes em tradições religiosas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "1º ano", versao: "2025" }
  ];
  await habilidadeRepository.save(habilidades);
  console.log("Dados inseridos na tabela 'habilidade_bncc'.");
}