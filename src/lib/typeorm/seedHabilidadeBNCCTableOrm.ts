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
    { codigo: "EF01ER04", descricao: "Refletir sobre valores e princípios éticos presentes em tradições religiosas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "1º ano", versao: "2025" },
 
  // 2º Ano 
    { codigo: "EF12LP01", descricao: "Ler palavras novas com precisão na decodificação, no caso de palavras de uso frequente, ler globalmente, por memorização.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF12LP02", descricao: "Buscar, selecionar e ler, com a mediação do professor, textos que circulam em meios impressos ou digitais, de acordo com as necessidades e interesses.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF12LP03", descricao: "Copiar textos breves, mantendo suas características e voltando para o texto sempre que tiver dúvidas sobre sua distribuição gráfica, espaçamento entre as palavras, escrita das palavras e pontuação.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF12LP04", descricao: "Ler e compreender listas, agendas, calendários, avisos, convites, receitas, instruções de montagem, considerando a situação comunicativa e a finalidade do texto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF12LP05", descricao: "Planejar e produzir, com ajuda do professor, (re)contagens de histórias, poemas, tiras e HQs, considerando a situação comunicativa e a finalidade do texto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF12LP06", descricao: "Planejar e produzir recados, avisos, convites, receitas, instruções de montagem, que possam ser repassados oralmente por meio de ferramentas digitais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF12LP07", descricao: "Identificar e reproduzir rimas, aliterações, assonâncias, ritmo de fala e melodia em cantigas e trava-línguas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF12LP08", descricao: "Ler e compreender fotolegendas, manchetes e notícias curtas para público infantil, considerando a situação comunicativa.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF12LP09", descricao: "Ler e compreender slogans, anúncios publicitários e textos de campanhas de conscientização destinados ao público infantil.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02LP13", descricao: "Planejar e produzir bilhetes e cartas, em meio impresso e/ou digital, considerando a situação comunicativa e o tema/assunto/finalidade do texto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02LP20", descricao: "Reconhecer a função de textos utilizados para apresentar informações coletadas em atividades de pesquisa.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02LP21", descricao: "Explorar, com a mediação do professor, textos informativos de diferentes ambientes digitais de pesquisa, conhecendo suas possibilidades.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "2º ano", versao: "2025" },

    // Matemática
    { codigo: "EF02MA01", descricao: "Utilizar diferentes estratégias para resolver problemas de adição e subtração.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02MA02", descricao: "Compreender o sistema de numeração decimal.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02MA03", descricao: "Resolver problemas envolvendo medidas de tempo, comprimento e massa.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02MA04", descricao: "Identificar e explorar padrões numéricos e geométricos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02MA05", descricao: "Reconhecer figuras geométricas planas e espaciais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02MA06", descricao: "Utilizar gráficos e tabelas simples para organizar informações.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "2º ano", versao: "2025" },

    // Ciências
    { codigo: "EF02CI01", descricao: "Identificar de que materiais são feitos objetos do cotidiano e como eram produzidos no passado.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02CI02", descricao: "Propor o uso de diferentes materiais para construção de objetos, considerando propriedades como flexibilidade e dureza.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02CI03", descricao: "Discutir cuidados para prevenção de acidentes domésticos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02CI04", descricao: "Descrever características de plantas e animais e relacioná-las ao ambiente em que vivem.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02CI05", descricao: "Investigar a importância da água e da luz para a vida das plantas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02CI06", descricao: "Identificar partes das plantas e suas funções, analisando relações com o ambiente e outros seres vivos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02CI07", descricao: "Descrever posições do Sol ao longo do dia e associá-las ao tamanho das sombras.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02CI08", descricao: "Comparar o efeito da radiação solar em diferentes superfícies.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "2º ano", versao: "2025" },
    
    // História
    { codigo: "EF02HI01", descricao: "Reconhecer mudanças e permanências nas formas de organização da vida cotidiana.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02HI02", descricao: "Identificar diferentes formas de registro da história, como fotografias, documentos, objetos e relatos orais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02HI03", descricao: "Compreender a importância da memória e das tradições na construção da identidade pessoal e coletiva.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02HI04", descricao: "Reconhecer símbolos, datas comemorativas e eventos significativos da história local e nacional.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "2º ano", versao: "2025" },

    // Geografia
    { codigo: "EF02GE01", descricao: "Identificar características do lugar onde vive e suas transformações ao longo do tempo.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02GE02", descricao: "Reconhecer diferentes tipos de paisagens e elementos naturais e culturais que as compõem.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02GE03", descricao: "Compreender a importância da preservação ambiental e do uso consciente dos recursos naturais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02GE04", descricao: "Utilizar mapas, plantas e outras representações espaciais simples para localizar lugares e elementos da paisagem.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "2º ano", versao: "2025" },

    // Arte
    { codigo: "EF02AR01", descricao: "Experimentar diferentes técnicas e materiais na produção artística.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02AR02", descricao: "Reconhecer elementos visuais como linha, forma, cor, textura e espaço em produções artísticas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02AR03", descricao: "Produzir trabalhos artísticos com base em observações, experiências e imaginação.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02AR04", descricao: "Apreciar obras de arte de diferentes culturas, épocas e estilos, expressando opiniões e sentimentos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "2º ano", versao: "2025" },

    // Educação Física
    { codigo: "EF02EF01", descricao: "Participar de jogos e brincadeiras respeitando regras, colegas e limites pessoais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02EF02", descricao: "Compreender a importância da atividade física para a saúde e o bem-estar.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02EF03", descricao: "Reconhecer diferentes formas de expressão corporal em atividades rítmicas e lúdicas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02EF04", descricao: "Desenvolver habilidades motoras básicas por meio de atividades corporais variadas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "2º ano", versao: "2025" },

    // Ensino Religioso
    { codigo: "EF02ER01", descricao: "Identificar valores presentes em diferentes tradições religiosas e culturais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02ER02", descricao: "Respeitar a diversidade de crenças, práticas e manifestações religiosas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02ER03", descricao: "Refletir sobre atitudes de solidariedade, respeito e cooperação no convívio social.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "2º ano", versao: "2025" },
    { codigo: "EF02ER04", descricao: "Reconhecer símbolos, celebrações e espaços religiosos presentes na comunidade.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "2º ano", versao: "2025" },

    //3º Ano
    { codigo: "EF03LP01", descricao: "Ler e escrever palavras com correspondências regulares contextuais entre grafemas e fonemas – c/qu; g/gu; r/rr; s/ss; o (e não u) e e (e não i) em sílaba átona em final de palavra – e com marcas de nasalidade (til, m, n).", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03LP02", descricao: "Ler e escrever corretamente palavras com sílabas CV, V, CVC, CCV, VC, VV, CVV, identificando que existem vogais em todas as sílabas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03LP03", descricao: "Ler e escrever corretamente palavras com os dígrafos lh, nh, ch.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03LP04", descricao: "Usar acento gráfico (agudo ou circunflexo) em monossílabos tônicos terminados em a, e, o e em palavras oxítonas terminadas em a, e, o, seguidas ou não de s.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03LP05", descricao: "Identificar o número de sílabas de palavras, classificando-as em monossílabas, dissílabas, trissílabas e polissílabas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03LP06", descricao: "Identificar a sílaba tônica em palavras, classificando-as em oxítonas, paroxítonas e proparoxítonas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03LP07", descricao: "Identificar a função na leitura e usar na escrita ponto final, ponto de interrogação, ponto de exclamação e, em diálogos (discurso direto), dois-pontos e travessão.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03LP08", descricao: "Identificar e diferenciar, em textos, substantivos e verbos e suas funções na oração: agente, ação, objeto da ação.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03LP09", descricao: "Identificar, em textos, adjetivos e sua função de atribuição de propriedades aos substantivos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03LP10", descricao: "Reconhecer prefixos e sufixos produtivos na formação de palavras derivadas de substantivos, de adjetivos e de verbos, utilizando-os para compreender palavras e para formar novas palavras.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03LP11", descricao: "Ler e compreender, com autonomia, textos injuntivos instrucionais (receitas, instruções de montagem etc.), com a estrutura própria desses textos (verbos imperativos, indicação de passos a ser seguidos) e mesclando palavras, imagens e recursos gráfico-visuais, considerando a situação comunicativa e o tema/assunto do texto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03LP12", descricao: "Ler e compreender, com autonomia, cartas pessoais e diários, com expressão de sentimentos e opiniões, dentre outros gêneros do campo da vida cotidiana, de acordo com as convenções do gênero carta e considerando a situação comunicativa e o tema/assunto do texto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03LP13", descricao: "Planejar e produzir cartas pessoais e diários, com expressão de sentimentos e opiniões, dentre outros gêneros do campo da vida cotidiana, de acordo com as convenções dos gêneros carta e diário e considerando a situação comunicativa e o tema/assunto do texto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "3º ano", versao: "2025" },

    
    { codigo: "EF03MA01", descricao: "Utilizar estratégias de cálculo mental e algoritmos para resolver problemas envolvendo adição e subtração.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03MA02", descricao: "Compreender e utilizar o sistema de numeração decimal para leitura, escrita e comparação de números naturais até 1.000.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03MA03", descricao: "Resolver problemas envolvendo multiplicação e divisão com números naturais, utilizando estratégias diversas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03MA04", descricao: "Identificar e representar frações como partes de um todo e como resultado de uma divisão.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03MA05", descricao: "Utilizar instrumentos de medida para estimar e medir comprimento, massa, tempo e capacidade.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03MA06", descricao: "Ler e interpretar dados apresentados em tabelas e gráficos de colunas simples.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "3º ano", versao: "2025" },

    
    { codigo: "EF03CI01", descricao: "Investigar as propriedades dos materiais e suas aplicações no cotidiano.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03CI02", descricao: "Identificar os estados físicos da água e suas mudanças com base em observações e experimentações.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03CI03", descricao: "Compreender a importância da água para os seres vivos e os cuidados com sua preservação.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03CI04", descricao: "Investigar o ciclo de vida de diferentes seres vivos e suas relações com o ambiente.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03CI05", descricao: "Observar e registrar variações no tempo atmosférico e suas influências no cotidiano.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "3º ano", versao: "2025" },

    
    { codigo: "EF03HI01", descricao: "Identificar diferentes formas de organização da vida cotidiana em distintos tempos e espaços.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03HI02", descricao: "Reconhecer a diversidade de grupos sociais e suas contribuições para a formação da sociedade brasileira.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03HI03", descricao: "Compreender a importância dos patrimônios culturais e históricos para a preservação da memória.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "3º ano", versao: "2025" },

    
    { codigo: "EF03GE01", descricao: "Identificar diferentes tipos de paisagens e suas transformações ao longo do tempo.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03GE02", descricao: "Compreender a relação entre os elementos naturais e sociais na constituição dos lugares.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03GE03", descricao: "Utilizar mapas, plantas e outras representações espaciais para localizar lugares e elementos da paisagem.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "3º ano", versao: "2025" },

   
    { codigo: "EF03AR01", descricao: "Explorar diferentes linguagens artísticas como música, dança, teatro e artes visuais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03AR02", descricao: "Criar produções artísticas utilizando elementos visuais e sonoros.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03AR03", descricao: "Apreciar e interpretar obras de arte de diferentes culturas e épocas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "3º ano", versao: "2025" },

   
    { codigo: "EF03EF01", descricao: "Participar de jogos e brincadeiras respeitando regras e valorizando o trabalho em equipe.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03EF02", descricao: "Compreender os benefícios da prática regular de atividades físicas para a saúde.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03EF03", descricao: "Experimentar diferentes formas de expressão corporal em atividades rítmicas e lúdicas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "3º ano", versao: "2025" },

   
    { codigo: "EF03ER01", descricao: "Identificar valores éticos e morais presentes em diferentes tradições religiosas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03ER02", descricao: "Respeitar a diversidade religiosa e cultural presente na sociedade.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "3º ano", versao: "2025" },
    { codigo: "EF03ER03", descricao: "Refletir sobre atitudes de respeito, solidariedade e cooperação no convívio social.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "3º ano", versao: "2025" },

    // 4º Ano
    { codigo: "EF04LP01", descricao: "Ler e compreender, com autonomia, textos narrativos de diferentes gêneros, identificando elementos da narrativa como personagens, enredo, tempo e espaço.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04LP02", descricao: "Planejar e produzir textos narrativos, respeitando a estrutura do gênero, com coesão e coerência.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04LP03", descricao: "Ler e compreender textos informativos, identificando a ideia principal e informações relevantes.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04LP04", descricao: "Planejar e produzir textos informativos com base em pesquisas, respeitando a estrutura do gênero.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04LP05", descricao: "Identificar e utilizar recursos linguísticos e gráficos para organizar informações em textos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04LP06", descricao: "Revisar e editar textos com apoio do professor ou colegas, considerando aspectos ortográficos, gramaticais e de pontuação.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "4º ano", versao: "2025" },

   
    { codigo: "EF04MA01", descricao: "Resolver e elaborar problemas envolvendo as quatro operações com números naturais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04MA02", descricao: "Compreender e utilizar o sistema de numeração decimal para leitura, escrita, ordenação e comparação de números até 10.000.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04MA03", descricao: "Identificar e representar frações como partes de um todo, como resultado de uma divisão e como razão.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04MA04", descricao: "Utilizar medidas de tempo, comprimento, massa e capacidade em situações do cotidiano.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04MA05", descricao: "Ler, interpretar e construir tabelas e gráficos de colunas e barras.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "4º ano", versao: "2025" },

    
    { codigo: "EF04CI01", descricao: "Investigar os diferentes tipos de solo e sua importância para os seres vivos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04CI02", descricao: "Compreender o ciclo da água e sua importância para o equilíbrio ambiental.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04CI03", descricao: "Identificar fontes de energia e discutir seu uso consciente.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04CI04", descricao: "Investigar os sistemas do corpo humano e suas funções básicas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "4º ano", versao: "2025" },

   
    { codigo: "EF04HI01", descricao: "Compreender os processos de ocupação do território brasileiro e suas consequências para os povos indígenas e africanos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04HI02", descricao: "Reconhecer a diversidade cultural brasileira e suas manifestações.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04HI03", descricao: "Identificar os principais acontecimentos históricos que marcaram a formação do Brasil.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "4º ano", versao: "2025" },

   
    { codigo: "EF04GE01", descricao: "Compreender a organização do espaço urbano e rural e suas dinâmicas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04GE02", descricao: "Identificar os principais elementos naturais e culturais das paisagens brasileiras.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04GE03", descricao: "Utilizar mapas e outras representações para localizar e compreender o espaço geográfico.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "4º ano", versao: "2025" },

    
    { codigo: "EF04AR01", descricao: "Explorar diferentes técnicas e materiais na produção artística.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04AR02", descricao: "Apreciar e interpretar obras de arte de diferentes culturas e épocas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04AR03", descricao: "Criar produções artísticas com base em observações, experiências e imaginação.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "4º ano", versao: "2025" },

    
    { codigo: "EF04EF01", descricao: "Participar de atividades físicas respeitando regras e valorizando o trabalho em equipe.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04EF02", descricao: "Compreender os benefícios da prática regular de atividades físicas para a saúde.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04EF03", descricao: "Experimentar diferentes formas de expressão corporal em atividades rítmicas e lúdicas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "4º ano", versao: "2025" },

 
    { codigo: "EF04ER01", descricao: "Identificar valores éticos presentes em diferentes tradições religiosas e culturais, reconhecendo sua importância para a convivência respeitosa.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04ER02", descricao: "Respeitar a diversidade religiosa e cultural presente na sociedade, reconhecendo diferentes crenças, práticas e símbolos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "4º ano", versao: "2025" },
    { codigo: "EF04ER03", descricao: "Refletir sobre atitudes de solidariedade, cooperação e respeito no convívio social, com base em ensinamentos das tradições religiosas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "4º ano", versao: "2025" },

    //5º
    { codigo: "EF05LP01", descricao: "Ler e compreender, com autonomia, textos de diferentes gêneros, identificando tema, estrutura e elementos linguísticos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05LP02", descricao: "Planejar e produzir textos de diferentes gêneros, considerando o contexto de produção, o público e a finalidade.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05LP03", descricao: "Revisar e editar textos com autonomia, considerando aspectos ortográficos, gramaticais e de pontuação.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05LP04", descricao: "Identificar e utilizar recursos coesivos para garantir a continuidade e a progressão textual.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05LP05", descricao: "Reconhecer e utilizar diferentes tempos verbais de acordo com o gênero e o contexto do texto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "5º ano", versao: "2025" },

    
    { codigo: "EF05MA01", descricao: "Resolver e elaborar problemas envolvendo as quatro operações com números naturais e com números racionais na forma decimal.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05MA02", descricao: "Compreender e utilizar o sistema de numeração decimal para leitura, escrita, ordenação e comparação de números até 100.000.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05MA03", descricao: "Identificar e representar frações equivalentes e comparar frações com o mesmo denominador.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05MA04", descricao: "Utilizar medidas de tempo, comprimento, massa, capacidade e temperatura em situações do cotidiano.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05MA05", descricao: "Ler, interpretar e construir tabelas e gráficos de colunas, barras e linhas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "5º ano", versao: "2025" },

    
    { codigo: "EF05MA01", descricao: "Resolver e elaborar problemas envolvendo as quatro operações com números naturais e com números racionais na forma decimal.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05MA02", descricao: "Compreender e utilizar o sistema de numeração decimal para leitura, escrita, ordenação e comparação de números até 100.000.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05MA03", descricao: "Identificar e representar frações equivalentes e comparar frações com o mesmo denominador.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05MA04", descricao: "Utilizar medidas de tempo, comprimento, massa, capacidade e temperatura em situações do cotidiano.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05MA05", descricao: "Ler, interpretar e construir tabelas e gráficos de colunas, barras e linhas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "5º ano", versao: "2025" },

   
    { codigo: "EF05CI01", descricao: "Investigar os diferentes tipos de energia e suas transformações.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05CI02", descricao: "Compreender os processos de digestão, respiração, circulação e excreção no corpo humano.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05CI03", descricao: "Identificar os principais órgãos dos sentidos e suas funções.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05CI04", descricao: "Compreender os impactos das ações humanas no meio ambiente e propor atitudes sustentáveis.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "5º ano", versao: "2025" },

    
    { codigo: "EF05HI01", descricao: "Compreender os processos históricos de formação do território brasileiro e suas implicações sociais e culturais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05HI02", descricao: "Reconhecer os diferentes grupos sociais que contribuíram para a formação da sociedade brasileira.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05HI03", descricao: "Identificar os principais acontecimentos históricos que marcaram o período colonial brasileiro.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "5º ano", versao: "2025" },

    
    { codigo: "EF05GE01", descricao: "Compreender a organização do espaço geográfico brasileiro e suas regiões.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05GE02", descricao: "Identificar os principais elementos naturais e culturais das paisagens brasileiras.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05GE03", descricao: "Utilizar mapas e outras representações para localizar e compreender o espaço geográfico brasileiro.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "5º ano", versao: "2025" },

    
    { codigo: "EF05AR01", descricao: "Explorar diferentes linguagens artísticas e suas possibilidades expressivas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05AR02", descricao: "Criar produções artísticas utilizando elementos visuais, sonoros e corporais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05AR03", descricao: "Apreciar e interpretar obras de arte de diferentes culturas, épocas e estilos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "5º ano", versao: "2025" },

    
    { codigo: "EF05EF01", descricao: "Participar de atividades físicas respeitando regras, colegas e limites pessoais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05EF02", descricao: "Compreender os benefícios da prática regular de atividades físicas para a saúde e o bem-estar.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05EF03", descricao: "Experimentar diferentes formas de expressão corporal em atividades rítmicas, esportivas e lúdicas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "5º ano", versao: "2025" },

   
    { codigo: "EF05ER01", descricao: "Identificar valores éticos e morais presentes em diferentes tradições religiosas e culturais, reconhecendo sua importância para a convivência respeitosa.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05ER02", descricao: "Respeitar a diversidade religiosa e cultural presente na sociedade, reconhecendo diferentes crenças, práticas e símbolos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "5º ano", versao: "2025" },
    { codigo: "EF05ER03", descricao: "Refletir sobre atitudes de solidariedade, cooperação e respeito no convívio social, com base em ensinamentos das tradições religiosas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "5º ano", versao: "2025" },

    //6º Ano    
    { codigo: "EF67LP01", descricao: "Ler e compreender textos de diferentes gêneros, considerando a finalidade, o contexto de produção e os efeitos de sentido.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF67LP02", descricao: "Planejar e produzir textos de diferentes gêneros, considerando a situação comunicativa, o público e os objetivos do texto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF67LP03", descricao: "Revisar e editar textos com autonomia, considerando aspectos linguísticos, discursivos e normativos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF67LP04", descricao: "Reconhecer e utilizar recursos coesivos para garantir a progressão textual e a articulação entre ideias.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF67LP05", descricao: "Identificar e analisar efeitos de sentido produzidos por escolhas lexicais, sintáticas e estilísticas em textos diversos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "6º ano", versao: "2025" },

  
    { codigo: "EF06MA01", descricao: "Compreender e utilizar múltiplos e divisores, incluindo critérios de divisibilidade.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06MA02", descricao: "Resolver problemas envolvendo números inteiros e operações com esses números.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06MA03", descricao: "Compreender e utilizar frações, números decimais e porcentagens em situações do cotidiano.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06MA04", descricao: "Utilizar expressões algébricas e equações simples para representar e resolver problemas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06MA05", descricao: "Interpretar e construir gráficos e tabelas para representar dados estatísticos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "6º ano", versao: "2025" },

   
    { codigo: "EF06CI01", descricao: "Compreender os estados físicos da matéria e suas transformações.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06CI02", descricao: "Investigar as propriedades dos materiais e suas aplicações tecnológicas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06CI03", descricao: "Compreender os ciclos biogeoquímicos e sua importância para os seres vivos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06CI04", descricao: "Identificar os principais sistemas do corpo humano e suas interações.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "6º ano", versao: "2025" },

   
    { codigo: "EF06HI01", descricao: "Compreender os processos históricos das sociedades da Antiguidade, suas organizações políticas, sociais e culturais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06HI02", descricao: "Identificar as contribuições das civilizações antigas para a formação da sociedade atual.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06HI03", descricao: "Reconhecer diferentes formas de registro e preservação da memória histórica.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "6º ano", versao: "2025" },

    
    { codigo: "EF06GE01", descricao: "Compreender os conceitos de paisagem, território, lugar e região.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06GE02", descricao: "Identificar os elementos naturais e culturais das paisagens e suas transformações.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06GE03", descricao: "Utilizar diferentes representações cartográficas para localizar e compreender o espaço geográfico.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "6º ano", versao: "2025" },

    
    { codigo: "EF06AR01", descricao: "Explorar diferentes linguagens artísticas e suas relações com o contexto histórico e cultural.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06AR02", descricao: "Criar produções artísticas utilizando elementos visuais, sonoros e corporais de forma integrada.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06AR03", descricao: "Apreciar e interpretar obras de arte considerando aspectos estéticos, históricos e culturais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "6º ano", versao: "2025" },

    
    { codigo: "EF06EF01", descricao: "Participar de práticas corporais valorizando o respeito, a cooperação e a inclusão.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06EF02", descricao: "Compreender os benefícios das atividades físicas para a saúde e qualidade de vida.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06EF03", descricao: "Experimentar diferentes modalidades esportivas e expressivas, respeitando suas regras e características.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "6º ano", versao: "2025" },

   
    { codigo: "EF06ER01", descricao: "Identificar valores éticos e morais presentes nas tradições religiosas e sua contribuição para a convivência social.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06ER02", descricao: "Respeitar a diversidade religiosa e cultural, reconhecendo diferentes crenças, práticas e símbolos presentes na sociedade.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06ER03", descricao: "Refletir sobre atitudes de solidariedade, justiça, paz e respeito mútuo, com base em ensinamentos das tradições religiosas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "6º ano", versao: "2025" },

    
    { codigo: "EF06LI01", descricao: "Interagir em situações de intercâmbio oral, demonstrando iniciativa para utilizar a língua inglesa.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06LI02", descricao: "Coletar informações do grupo, perguntando e respondendo sobre a família, os amigos, a escola e a comunidade.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06LI03", descricao: "Solicitar esclarecimentos em língua inglesa sobre o que não entendeu e o significado de palavras ou expressões desconhecidas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06LI04", descricao: "Reconhecer, com o apoio de palavras cognatas e pistas do contexto discursivo, o assunto e as informações principais em textos orais sobre temas familiares.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "6º ano", versao: "2025" },
    { codigo: "EF06LI05", descricao: "Aplicar os conhecimentos da língua inglesa para falar de si e de outras pessoas, explicitando informações pessoais e características relacionadas a gostos, preferências e rotinas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "6º ano", versao: "2025" },


    //7º     
    { codigo: "EF07LP01", descricao: "Ler e compreender textos de diferentes gêneros, considerando a finalidade, o contexto de produção e os efeitos de sentido.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07LP02", descricao: "Planejar e produzir textos de diferentes gêneros, considerando a situação comunicativa, o público e os objetivos do texto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07LP03", descricao: "Revisar e editar textos com autonomia, considerando aspectos linguísticos, discursivos e normativos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07LP04", descricao: "Analisar os efeitos de sentido produzidos por diferentes recursos linguísticos e estilísticos em textos diversos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07LP05", descricao: "Reconhecer e utilizar recursos argumentativos em textos opinativos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "7º ano", versao: "2025" },

    
    { codigo: "EF07MA01", descricao: "Resolver problemas envolvendo números racionais em suas diferentes representações.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07MA02", descricao: "Compreender e aplicar propriedades das operações com números racionais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07MA03", descricao: "Resolver problemas que envolvam porcentagem, razão e proporção.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07MA04", descricao: "Utilizar expressões algébricas e equações do 1º grau para representar e resolver problemas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07MA05", descricao: "Interpretar e construir gráficos e tabelas para representar dados estatísticos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "7º ano", versao: "2025" },

    
    { codigo: "EF07CI01", descricao: "Compreender os processos de transformação da matéria e suas implicações no cotidiano.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07CI02", descricao: "Investigar os sistemas do corpo humano e suas interações com o ambiente.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07CI03", descricao: "Compreender os ciclos naturais e suas relações com os seres vivos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07CI04", descricao: "Analisar os impactos das ações humanas sobre os recursos naturais e propor atitudes sustentáveis.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "7º ano", versao: "2025" },

    
    { codigo: "EF07HI01", descricao: "Compreender os processos históricos da formação das sociedades medievais e modernas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07HI02", descricao: "Identificar as transformações políticas, econômicas e culturais ocorridas na Europa e suas repercussões no mundo.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07HI03", descricao: "Reconhecer os processos de colonização e suas implicações para os povos indígenas e africanos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "7º ano", versao: "2025" },

    
    { codigo: "EF07GE01", descricao: "Compreender os processos de formação e transformação das paisagens naturais e humanizadas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07GE02", descricao: "Analisar os impactos das atividades humanas sobre o meio ambiente.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07GE03", descricao: "Utilizar diferentes representações cartográficas para compreender o espaço geográfico.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "7º ano", versao: "2025" },

    
    { codigo: "EF07AR01", descricao: "Explorar diferentes linguagens artísticas e suas relações com o contexto histórico e cultural.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07AR02", descricao: "Criar produções artísticas utilizando elementos visuais, sonoros e corporais de forma integrada.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07AR03", descricao: "Apreciar e interpretar obras de arte considerando aspectos estéticos, históricos e culturais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "7º ano", versao: "2025" },

    
    { codigo: "EF07EF01", descricao: "Participar de práticas corporais valorizando o respeito, a cooperação e a inclusão.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07EF02", descricao: "Compreender os benefícios das atividades físicas para a saúde e qualidade de vida.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07EF03", descricao: "Experimentar diferentes modalidades esportivas e expressivas, respeitando suas regras e características.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "7º ano", versao: "2025" },

    
    { codigo: "EF07ER01", descricao: "Identificar valores éticos e morais presentes nas tradições religiosas e sua contribuição para a construção de uma sociedade justa e solidária.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07ER02", descricao: "Respeitar a diversidade religiosa e cultural, reconhecendo diferentes crenças, práticas, símbolos e espaços religiosos presentes na sociedade.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07ER03", descricao: "Refletir sobre atitudes de solidariedade, justiça, paz e respeito mútuo, com base em ensinamentos das tradições religiosas e em contextos de convivência.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "7º ano", versao: "2025" },
    
    
    { codigo: "EF07LI01", descricao: "Interagir em situações de intercâmbio oral, utilizando expressões e vocabulário relacionados a temas familiares.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07LI02", descricao: "Compreender o sentido geral de textos orais e escritos, identificando informações principais e secundárias.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07LI03", descricao: "Produzir textos simples em língua inglesa, com base em modelos e estruturas conhecidas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "7º ano", versao: "2025" },
    { codigo: "EF07LI04", descricao: "Utilizar estratégias de leitura para compreender textos em língua inglesa, como inferência, antecipação e identificação de cognatos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "7º ano", versao: "2025" },


    //8º ano   
    { codigo: "EF08LP01", descricao: "Ler e compreender textos de diferentes gêneros, considerando a finalidade, o contexto de produção e os efeitos de sentido.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08LP02", descricao: "Planejar e produzir textos de diferentes gêneros, considerando a situação comunicativa, o público e os objetivos do texto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08LP03", descricao: "Revisar e editar textos com autonomia, considerando aspectos linguísticos, discursivos e normativos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08LP04", descricao: "Analisar os efeitos de sentido produzidos por diferentes recursos linguísticos e estilísticos em textos diversos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08LP05", descricao: "Reconhecer e utilizar recursos argumentativos em textos opinativos e dissertativos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "8º ano", versao: "2025" },

   
    { codigo: "EF08MA01", descricao: "Resolver problemas envolvendo números racionais, porcentagens, razões e proporções.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08MA02", descricao: "Compreender e aplicar propriedades das operações com números racionais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08MA03", descricao: "Resolver problemas que envolvam equações do 1º grau e sistemas simples.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08MA04", descricao: "Interpretar e construir gráficos e tabelas para representar dados estatísticos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08MA05", descricao: "Compreender conceitos de geometria plana e espacial, identificando propriedades e relações entre figuras.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "8º ano", versao: "2025" },

        
    { codigo: "EF08CI01", descricao: "Compreender os processos de transformação da matéria e suas implicações no cotidiano.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08CI02", descricao: "Investigar os sistemas do corpo humano e suas interações com o ambiente.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08CI03", descricao: "Compreender os ciclos naturais e suas relações com os seres vivos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08CI04", descricao: "Analisar os impactos das ações humanas sobre os recursos naturais e propor atitudes sustentáveis.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "8º ano", versao: "2025" },

   
    { codigo: "EF08HI01", descricao: "Compreender os processos históricos da formação das sociedades modernas e contemporâneas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08HI02", descricao: "Identificar as transformações políticas, econômicas e culturais ocorridas nos séculos XVIII e XIX.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08HI03", descricao: "Reconhecer os processos de colonização e independência na América Latina e suas implicações.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "8º ano", versao: "2025" },

    
    { codigo: "EF08GE01", descricao: "Compreender os processos de formação e transformação das paisagens naturais e humanizadas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08GE02", descricao: "Analisar os impactos das atividades humanas sobre o meio ambiente.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08GE03", descricao: "Utilizar diferentes representações cartográficas para compreender o espaço geográfico.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "8º ano", versao: "2025" },

    
    { codigo: "EF08AR01", descricao: "Explorar diferentes linguagens artísticas e suas relações com o contexto histórico e cultural.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08AR02", descricao: "Criar produções artísticas utilizando elementos visuais, sonoros e corporais de forma integrada.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08AR03", descricao: "Apreciar e interpretar obras de arte considerando aspectos estéticos, históricos e culturais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "8º ano", versao: "2025" },

      
    { codigo: "EF08EF01", descricao: "Participar de práticas corporais valorizando o respeito, a cooperação e a inclusão.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08EF02", descricao: "Compreender os benefícios das atividades físicas para a saúde e qualidade de vida.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08EF03", descricao: "Experimentar diferentes modalidades esportivas e expressivas, respeitando suas regras e características.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "8º ano", versao: "2025" },

    
    { codigo: "EF08ER01", descricao: "Analisar valores éticos presentes nas tradições religiosas e sua contribuição para a construção de uma sociedade justa e solidária.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08ER02", descricao: "Reconhecer e respeitar a diversidade religiosa e cultural, identificando diferentes crenças, práticas, símbolos e espaços religiosos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08ER03", descricao: "Refletir sobre atitudes de solidariedade, justiça, paz e respeito mútuo, com base em ensinamentos das tradições religiosas e em contextos de convivência.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "8º ano", versao: "2025" },

    
    { codigo: "EF08LI01", descricao: "Interagir em situações comunicativas, utilizando vocabulário e estruturas adequadas ao contexto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08LI02", descricao: "Compreender textos orais e escritos, identificando a finalidade, o tema e informações relevantes.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08LI03", descricao: "Produzir textos em língua inglesa, considerando o gênero, o público e a finalidade comunicativa.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "8º ano", versao: "2025" },
    { codigo: "EF08LI04", descricao: "Utilizar recursos digitais e dicionários bilíngues para ampliar o repertório lexical.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "8º ano", versao: "2025" },

    
    //9º Ano    
    { codigo: "EF09LP01", descricao: "Ler e compreender textos de diferentes gêneros, considerando a finalidade, o contexto de produção e os efeitos de sentido.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09LP02", descricao: "Planejar e produzir textos de diferentes gêneros, considerando a situação comunicativa, o público e os objetivos do texto.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09LP03", descricao: "Revisar e editar textos com autonomia, considerando aspectos linguísticos, discursivos e normativos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09LP04", descricao: "Analisar os efeitos de sentido produzidos por diferentes recursos linguísticos e estilísticos em textos diversos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09LP05", descricao: "Reconhecer e utilizar recursos argumentativos em textos opinativos e dissertativos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Portuguesa", anoSerie: "9º ano", versao: "2025" },

   
    { codigo: "EF09MA01", descricao: "Resolver problemas envolvendo números racionais, porcentagens, razões e proporções.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09MA02", descricao: "Compreender e aplicar propriedades das operações com números racionais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09MA03", descricao: "Resolver problemas que envolvam equações do 1º e 2º grau e sistemas simples.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09MA04", descricao: "Interpretar e construir gráficos e tabelas para representar dados estatísticos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09MA05", descricao: "Compreender conceitos de geometria plana e espacial, identificando propriedades e relações entre figuras.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Matemática", anoSerie: "9º ano", versao: "2025" },

    
    { codigo: "EF09CI01", descricao: "Compreender os conceitos de energia, suas formas e transformações.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09CI02", descricao: "Investigar os sistemas do corpo humano e suas interações com o ambiente.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09CI03", descricao: "Compreender os ciclos naturais e suas relações com os seres vivos.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09CI04", descricao: "Analisar os impactos das ações humanas sobre os recursos naturais e propor atitudes sustentáveis.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ciências", anoSerie: "9º ano", versao: "2025" },

    
    { codigo: "EF09HI01", descricao: "Compreender os processos históricos da formação das sociedades contemporâneas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09HI02", descricao: "Identificar as transformações políticas, econômicas e culturais ocorridas nos séculos XIX e XX.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09HI03", descricao: "Reconhecer os processos de colonização, independência e formação dos Estados nacionais na América Latina.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "História", anoSerie: "9º ano", versao: "2025" },

   
    { codigo: "EF09GE01", descricao: "Compreender os processos de formação e transformação das paisagens naturais e humanizadas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09GE02", descricao: "Analisar os impactos das atividades humanas sobre o meio ambiente.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09GE03", descricao: "Utilizar diferentes representações cartográficas para compreender o espaço geográfico.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Geografia", anoSerie: "9º ano", versao: "2025" },

   
    { codigo: "EF09AR01", descricao: "Explorar diferentes linguagens artísticas e suas relações com o contexto histórico e cultural.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09AR02", descricao: "Criar produções artísticas utilizando elementos visuais, sonoros e corporais de forma integrada.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09AR03", descricao: "Apreciar e interpretar obras de arte considerando aspectos estéticos, históricos e culturais.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Arte", anoSerie: "9º ano", versao: "2025" },

   
    { codigo: "EF09EF01", descricao: "Participar de práticas corporais valorizando o respeito, a cooperação e a inclusão.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09EF02", descricao: "Compreender os benefícios das atividades físicas para a saúde e qualidade de vida.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09EF03", descricao: "Experimentar diferentes modalidades esportivas e expressivas, respeitando suas regras e características.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Educação Física", anoSerie: "9º ano", versao: "2025" },

    
    { codigo: "EF09ER01", descricao: "Analisar valores éticos e morais presentes nas tradições religiosas e sua contribuição para a construção de uma sociedade democrática, justa e solidária.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09ER02", descricao: "Reconhecer e respeitar a diversidade religiosa e cultural, identificando diferentes crenças, práticas, símbolos e espaços religiosos presentes na sociedade.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09ER03", descricao: "Refletir criticamente sobre atitudes de solidariedade, justiça, paz e respeito mútuo, com base em ensinamentos das tradições religiosas e em contextos de convivência.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Ensino Religioso", anoSerie: "9º ano", versao: "2025" },

   
    { codigo: "EF09LI01", descricao: "Interagir em situações comunicativas, utilizando vocabulário, expressões idiomáticas e estruturas gramaticais adequadas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09LI02", descricao: "Compreender textos orais e escritos de diferentes gêneros, identificando informações explícitas e implícitas.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09LI03", descricao: "Produzir textos em língua inglesa com coerência e coesão, considerando o gênero e o contexto comunicativo.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "9º ano", versao: "2025" },
    { codigo: "EF09LI04", descricao: "Refletir sobre aspectos culturais presentes em textos em língua inglesa, reconhecendo semelhanças e diferenças com a cultura local.", etapaEnsino: "Ensino Fundamental", componenteCurricular: "Língua Inglesa", anoSerie: "9º ano", versao: "2025" }

  ];
  await habilidadeRepository.save(habilidades);
  console.log("Dados inseridos na tabela 'habilidade_bncc'.");
}