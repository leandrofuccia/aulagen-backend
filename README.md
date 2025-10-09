# Documentação do Hackton - Fase 5

Atualmente, a maioria dos professores e professoras da rede pública enfrenta grandes desafios para planejar e compartilhar suas aulas de forma prática, centralizada e tecnológica. Para enfrentar essa realidade, desenvolvemos a AulaGen, uma plataforma inteligente que facilita a criação, edição e gestão de planos de aula alinhados à BNCC, integrando recursos modernos e o poder da inteligência artificial.

Nesta etapa do projeto, disponibilizamos uma API robusta com endpoints para cadastro e consulta dos planos de aula. O consumo da API pode ser realizado por meio de ferramentas como Postman ou Swagger.

---

## Arquitetura do Sistema

#### 1. **Camada de Serviço (Backend):**

- **Tecnologias e Frameworks Utilizados:** 
  - TypeScript — Tipagem estática para maior segurança
  - TSX / ts-node — Execução de arquivos TypeScript
  - ESLint — Padronização e qualidade de código
  - Node.js — Ambiente de execução JavaScript
  - Fastify — Framework leve e rápido para APIs REST
  - TypeORM — ORM para integração com banco de dados relacional
  - PostgreSQL — Banco de dados relacional robusto
  - Zod — Validação de dados com tipagem segura
  - JWT (JSON Web Token) — Autenticação e autorização
  - Swagger — Documentação interativa da API
  - Axios — Cliente HTTP para integração com serviços externos
  - BcryptJS — Criptografia de senhas
  - Jest — Testes unitários
  - SQLite — Banco em memória para testes automatizados
  - Docker — Empacotamento e execução da aplicação
  - Docker Compose — Orquestração de serviços (app + banco)
  - GitHub Actions — Pipeline de CI/CD para build e deploy

- **Endpoints REST:**
  - **POST /credencial -** Cria uma nova credencial
  - **POST /credencial/signin -** Permite a autenticação do usuário
  - **POST /usuario -** Cria um novo usuário
  - **GET /usuario/:usuarioId -** Retorna os dados de um usuário específico.
  - **GET /usuario/credencial/:credencialId -** Retorna os dados de um usuário através de uma credencial específica.
  - **POST /planoAula/gerar-** Gera um plano de aula com base em um prompt textual.
  - **GET /planoAula/usuario/:usuarioId-** Retorna os planos de aula gerados por um determinado professor.
  - **GET /planoAula/:planoAulaId-** Retorna o plano de aula através de um id específico.
  - **DELETE /planoAula/:planoAulaId-** Exclui um plano de aula através de um id específico.
  - **PUT /planoAula/:planoAulaId-** Atualiza um plano de aula através de um id específico.
  - **GET //habilidade-** Lista todas as habiliadades do BNCC registradas na base de dados.

- **Segurança:** Middleware para autenticação (JSON Web Token - JWT).

#### 2. **Camada de Persistência (Banco de Dados):**

- **Banco de Dados Relacional:** **PostgreSQL**

**Tabela ocupacao**: armazena os diferentes tipos de ocupações de usuários (ex.: professor).

Estrutura:

```sql
CREATE TABLE public.ocupacao (
	id int4 NOT NULL,
	ocupacao varchar NOT NULL,
	CONSTRAINT "PK_b1c7e62c6a42dc0fd41c516c892" PRIMARY KEY (id),
	CONSTRAINT "UQ_552a806f13dd0f1908ef760c5fa" UNIQUE (ocupacao)
);
```

**Tabela Credencial**: gerencia as credenciais de acesso (nome de usuário e senha) para autenticação.

Estrutura:

```sql
CREATE TABLE credencial (
    id serial4 PRIMARY KEY,
    username varchar NOT NULL UNIQUE,
    password varchar NOT NULL
);
```

**Tabela Usuario**: representa os usuários do sistema e se relaciona tanto com a ocupação quanto com credenciais.

Estrutura:

```sql
CREATE TABLE usuario (
    id serial4 PRIMARY KEY,
    nome varchar NOT NULL,
    ocupacaoid int4 NOT NULL,
    datacriacao timestamp DEFAULT CURRENT_TIMESTAMP,
    ultimologin timestamp,
    credencialid int4 NOT NULL UNIQUE,
    FOREIGN KEY (ocupacaoid) REFERENCES ocupacao(id),
    FOREIGN KEY (credencialid) REFERENCES credencial(id)
);
```

**Tabela plano_aula**: armazena os planos de aula criadas pelos usuários.

Estrutura:

```sql
CREATE TABLE plano_aula (
	id serial4 NOT NULL,
	titulo varchar(255) NOT NULL,
	duracao_total varchar(50) NOT NULL,
	recursos_gerais _text NULL,
	detalhes_plano_completo text NULL,
	avaliacao text NULL,
	habilidade_bncc_id int4 NULL,
	criador_id int4 NOT NULL,
	CONSTRAINT "PK_58f01163beba416a0df0c93d923" PRIMARY KEY (id)
);
```

**Tabela aula**: armazena todas as aulas relacionadas ao plano de aula 

Estrutura:

```sql
CREATE TABLE aula (
	id serial4 NOT NULL,
	numero_aula int4 NOT NULL,
	titulo varchar(255) NOT NULL,
	objetivo text NULL,
	duracao varchar(50) NOT NULL,
	plano_aula_id int4 NULL,
	CONSTRAINT "PK_f4b5d2e277c6146e2572c6ee76a" PRIMARY KEY (id)
);
```

**Tabela atividade**: armazena todas as atividas relacionadas de cada aula do plano de aula

Estrutura:
```sql
CREATE TABLE atividade (
	id serial4 NOT NULL,
	etapa varchar NOT NULL,
	tempo varchar NOT NULL,
	descricao text NULL,
	numero_aula text NULL,
	aula_id int4 NULL,
	CONSTRAINT "PK_b06f518d68d61a858de079cb1be" PRIMARY KEY (id)
);
```

**Tabela habilidade_bncc**: armazena os códigos da BNCC

Estrutura:
```sql
CREATE TABLE habilidade_bncc (
	id serial4 NOT NULL,
	codigo varchar NOT NULL,
	descricao text NOT NULL,
	etapa_ensino varchar NOT NULL,
	componente_curricular varchar NOT NULL,
	ano_serie varchar NOT NULL,
	versao varchar NOT NULL,
	status varchar DEFAULT 'ativa'::character varying NOT NULL,
	CONSTRAINT "PK_15146113753c75bee8c74e3be7e" PRIMARY KEY (id),
	CONSTRAINT "UQ_c3866945a88d70aeb34c173e288" UNIQUE (codigo)
);
```

- **ORM Utilizado: TypeORM**
  Cada tabela é representada por uma entidade no TypeORM, o que facilita a interação entre o código e o banco de dados. O TypeORM permite abstrair queries SQL por meio de métodos e também suporta migrações, garantindo evolução do banco sem perda de dados.

#### 3. **Containerização:**

- Uso de **Docker** para garantir consistência entre os ambientes de desenvolvimento e produção.
  - **Dockerfile:**
    - Define como o servidor Node.js e o banco de dados PostgreSQL serão configurados e executados.
  - **Docker Compose:**
    - Configura os serviços, conectando o backend e o banco de dados.

#### 4. **Automação (CI/CD):**

- **GitHub Actions:** Pipeline configurado realizar builds da aplicação.

#### 5. **Testes:**

- **Jest** foi utilizado para garantir a qualidade do código realizando testes unitários.
- Para rodar os testes unitários foi utilizado o banco de dados em memória **SQLite**.

---

## Setup Inicial

Este guia orienta o usuário a baixar e executar a aplicação utilizando a imagem Docker disponível no Docker Hub.

#### **1. Requisitos**

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas no seu sistema:

- **Docker**:
  - Versão recomendada: 20.10.7 ou superior
  - [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**:
  - Versão recomendada: 2.0.0 ou superior
  - Incluído no Docker Desktop ou pode ser instalado separadamente:
    [Instalar Docker Compose](https://docs.docker.com/compose/install/)

Verifique se as ferramentas estão instaladas com os comandos:

```bash
docker --version
docker compose version
```

#### **2. Baixando a Imagem do Docker Hub**

A imagem da aplicação está disponível no repositório do Docker Hub [leandrofuccia/aulagen_app](https://hub.docker.com/r/leandrofuccia/aulagen_app).

1. Execute o seguinte comando para baixar a última versão da imagem:
   ```bash
   docker pull leandrofuccia/aulagen_app:latest
   ```

#### **3. Gerando a API Key do Gemini**

[Gerar API Key] (https://ai.google.dev/gemini-api/docs/api-key)
- Passo a Passo Simplificado:
 - Acesse a Página: Clique no link fornecido acima.
 - Faça Login: Certifique-se de estar logado na sua Conta Google.
 - Crie a Chave: Na página, procure pelo botão que diz "Criar Chave API" (ou um botão similar, como "Obter uma chave de API" ou "Create API Key").
 - Salve: O sistema irá gerar uma chave longa e única. Copie e guarde esta chave.

 #### **4. Baixando o Arquivo Docker Compose**

O arquivo [docker-compose.yml](https://raw.githubusercontent.com/leandrofuccia/aulagen-backend/refs/heads/main/docker-compose.yml) está disponível no repositório do GitHub [leandrofuccia/aulagen_app](https://github.com/leandrofuccia/aulagen-backend). Faça o download em uma pasta local.

 #### **5. Inserindo a chave API Key gerada no passo 3 no arquivo docker-compose.yml**
 - Abra o arquivo docker-compose.yml em modo de edição.
 - Procure a linha GEMINI_API_KEY
 - Copie o a chave gerada
 - Salve o arquivo

#### **6. Criando a rede compartilhada**

Antes de subir os serviços com docker-compose, crie a rede compartilhada:

   ```bash
   docker network create app-network
   ```

#### **7. Iniciando os Contêineres**

1. Na mesma pasta onde se encontra o arquivo `docker-compose.yml`, execute o comando abaixo para iniciar os contêineres:

   ```bash
   docker compose up -d
   ```
2. Após a execução, verifique se os contêineres estão funcionando:

   ```bash
   docker ps
   ```

> Os serviços devem incluir:
>
> - `aulagen_app`: Aplicação
> - `postgres_aulagen_db`: Banco de dados PostgreSQL

#### **8. Testando a Aplicação**

1. Acesse a aplicação no navegador:

   ```
   http://localhost:3001/docs
   ```
2. Use o Swagger UI para testar os endpoints disponíveis, como:

   - Criar credenciais
   - Criar usuários
   - Criar e gerenciar planos de aula

#### **9. Encerrando os Contêineres**

Para parar e remover os contêineres, execute:

```bash
docker compose down
```

---

## Guia de Uso das APIs

Este guia tem como objetivo orientar o uso das APIs disponibilizadas pelo sistema de AulaGen. As APIs estarão disponíveis após Setup Inicial no endereço: [http://localhost:3001/docs](http://localhost:3001/docs), onde será possível visualizar a documentação e testar as rotas.

### Passos para Utilizar o Sistema:

1. **Criar uma Credencial (e-mail e senha).**
2. **Criar um Usuário (nome e ocupacao).**
   - Escolha entre o perfil:
     - **Professor:** Pode criar, editar, excluir e visualizar plano de aula.
3. **Acessar as funcionalidades conforme o ocupacao.**

### Passo a Passo: Utilizando as APIs

#### 1. **Criar uma Credencial**

Para utilizar o sistema, é necessário criar uma credencial (e-mail e senha).

- **Endpoint:** `POST /credencial`
- **Descrição:** Cria uma credencial com e-mail e senha.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "username": "seuemail@dominio.com",
    "password": "suaSenha123"
  }
  ```
- **Resposta de Sucesso (201):**
  ```json
  {
    "id": 1,
    "username": "seuemail@dominio.com"
  }
  ```

#### 2. Login (Autenticação)

Para utilizar os demais endpoints, é necessário se autenticar utilizando a credencial criada.

**Endpoint:**

```
POST /credencial/signin
```

**Corpo da requisição:**

```json
{
  "username": "seuemail@dominio.com",
  "password": "suaSenha123"
}
```

**Resposta esperada (200):**

```json
{
  "token": "<seu_token_aqui>"
}
```

Se está utilizando o Swagger UI, pode-se clicar em "Authorize", inserir o token no campo value e clicar em "Authorize". De agora em diante, o Swagger UI irá alimentar o cabeçalho de todas as requisições com o Bearer token.

#### 3. **Criar um Usuário**

Para utilizar os demais endpoints, é necessário criar um Usuário.

- **Endpoint:** `POST /usuario`
- **Descrição:** Cria um usuário associado à credencial criada anteriormente.
- **Corpo da Requisição (JSON):**

  ```json
  {
    "nome": "Seu Nome",
    "ocupacaoid": 2, 
    "credencialId": 1
  }
  ```

  - **ocupacaoid:**
    - `2`: Professor
  - **credencialId:** ID retornado da criação de credencial.
- **Resposta de Sucesso (201):**

  ```json
  {
    "id": 1,
    "nome": "Seu Nome",
    "ocupacaoid": 2,
    "credencialId": 1
  }
  ```

#### 4. **Gerar um plano de aula**

- **Endpoint:** `POST /posts`
- **Descrição:** Cria um plano de aula.
- **Corpo da Requisição (JSON):**

  ```json
  {
    "codigo_BNCC": "EF01LP01",
    "componente_Curricular": "Língua Portuguesa",
    "serie": "1º ano",
    "duracao_aula": "50",
    "credencialId": "1"
  }
  ```

  - **credencialId:** ID do usuário.
- **Resposta de Sucesso (200):**

  ```json
  {
    "planoAula": {
      "id": 6,
      "titulo": "Movimento da Leitura e Escrita: Da Esquerda para a Direita, de Cima para Baixo",
      "duracao_total": "2 aulas de 50 minutos (100 minutos)",
      "recursos_gerais": [
        "Quadro branco ou lousa",
        "Giz ou marcadores coloridos",
        "Livros infantis com textos variados (prosa, poesia)",
        "Textos curtos impressos (parlendas, quadras, receitas simples)",
        "Jornais, revistas ou folhetos",
        "Cartazes com letras e frases simples",
        "Fichas de atividades com setas direcionais e linhas tracejadas",
        "Lápis de cor",
        "Lápis grafite",
        "Borracha",
        "Folhas pautadas ou cadernos"
      ],
      "detalhes_plano_completo": "### Introdução\nEste plano de aula visa consolidar um dos pilares da alfabetização inicial: a compreensão da direcionalidade da leitura e da escrita...",
      "avaliacao": "A avaliação será contínua e formativa, baseada na observação do professor sobre a participação e o engajamento dos alunos nas atividades propostas...",
      "habilidade_bncc": {
        "codigo": "EF01LP01",
        "descricao": "Reconhecer que textos são lidos e escritos da esquerda para a direita e de cima para baixo na página."
      }
    },
    "aulas": [
      {
        "numero_aula": 1,
        "titulo": "Explorando o Caminho das Palavras",
        "objetivo": "Identificar e compreender a direcionalidade da leitura (esquerda para direita, cima para baixo) em diferentes materiais impressos, através da observação guiada e manipulação de textos."
      },
      {
        "numero_aula": 2,
        "titulo": "Marcando o Caminho da Escrita e Leitura",
        "objetivo": "Aplicar o conhecimento da direcionalidade na leitura e escrita de palavras e frases curtas, consolidando a compreensão do movimento e da organização textual."
      }
    ],
    "atividades": [
      {
        "etapa": "Aquecimento: Onde começa a história?",
        "tempo": "5",
        "descricao": "O professor inicia uma roda de conversa perguntando aos alunos 'Como sabemos onde começar a ler um livro?' ou 'Por onde o meu dedo vai quando eu leio?'. Escuta as respostas e estimula a curiosidade sobre o assunto."
      },
      {
        "etapa": "Exploração Guiada: O Movimento do Leitor",
        "tempo": "15",
        "descricao": "O professor lê um livro infantil, enfatizando e exagerando o movimento do dedo da esquerda para a direita e de cima para baixo. Em seguida, mostra um jornal ou revista, apontando como as notícias seguem o mesmo padrão. Questiona: 'Para onde meu dedo está indo? E depois que a linha acaba?'."
      },
      {
        "etapa": "Mão na Massa: Desvendando o Texto",
        "tempo": "15",
        "descricao": "Dividir os alunos em duplas ou pequenos grupos (ou individualmente, se houver material suficiente). Distribuir livros infantis, cópias de parlendas, receitas simples, ou trechos de jornais. Pedir que, com o dedo, tentem 'ler' (mesmo que não saibam ler convencionalmente) uma linha, seguindo a direção que o professor mostrou. O professor circula auxiliando e observando."
      },
      {
        "etapa": "Conceituação Visual: O Caminho no Quadro",
        "tempo": "10",
        "descricao": "No quadro, o professor desenha setas grandes indicando o movimento da esquerda para a direita e de cima para baixo. Escreve uma frase curta (ex: 'O sapo pula.') e aponta, com o lápis, a direção da leitura de cada palavra e linha. Reforça verbalmente: 'Sempre começamos aqui (esquerda) e vamos para cá (direita). Quando a linha acaba, voltamos aqui embaixo (próxima linha à esquerda).'."
      },
      {
        "etapa": "Fechamento: O Compromisso do Leitor",
        "tempo": "5",
        "descricao": "Retomar a importância de seguir o 'caminho' da leitura para entender o que está escrito. Os alunos são encorajados a observar essa direcionalidade em casa, em outros livros e textos."
      },
      {
        "etapa": "Revisão Rápida: Lembrar o Caminho",
        "tempo": "5",
        "descricao": "O professor exibe um cartaz com as setas direcionais da leitura e escrita (esquerda para direita, cima para baixo). Pergunta aos alunos o que significam e pede para que, com o dedo no ar, 'sigam' o caminho da leitura, relembrando a aula anterior."
      },
      {
        "etapa": "Copiando o Caminho Certo",
        "tempo": "15",
        "descricao": "O professor escreve no quadro frases curtas ou palavras separadas em linhas diferentes (ex: 'A bola.', 'O gato.', 'Eu gosto de ler.'). Ao escrever, enfatiza o movimento da esquerda para a direita. Os alunos copiam as frases em seus cadernos ou folhas pautadas, sendo orientados a começar sempre na margem esquerda e a seguir a linha."
      },
      {
        "etapa": "Atividade Guiada: Traçando Direções",
        "tempo": "15",
        "descricao": "Distribuir uma ficha de atividades com:\n1.  Linhas tracejadas que os alunos devem cobrir, começando da esquerda e indo para a direita.\n2.  Pequenos trechos de texto onde os alunos devem desenhar setas para indicar a direção da leitura em cada linha e, em seguida, ligar a primeira linha à segunda para indicar a sequência de cima para baixo."
      },
      {
        "etapa": "Minha Escrita no Caminho",
        "tempo": "10",
        "descricao": "Em uma folha pautada, os alunos escrevem seus nomes completos, prestando atenção em começar na esquerda e seguir em frente. Em seguida, escrevem o nome de um colega ou de um animal favorito, sempre observando o ponto de partida na margem e a sequência horizontal e vertical."
      },
      {
        "etapa": "Fechamento: Somos Leitores e Escritores!",
        "tempo": "5",
        "descricao": "Os alunos compartilham suas fichas de atividades ou cadernos. O professor reforça a importância do 'caminho certo' para que todos entendam o que lemos e escrevemos. Parabeniza os alunos pela atenção e esforço em 'seguir o caminho'."
      }
    ]
  }
  ```

#### 5. **Visualizar Todos os planos de aula de um determinado professor**

- **Endpoint:** `GET /planoAula/usuario/:usuarioId`
- **Descrição:** Lista todos os planos de aula de um deterninado professor disponíveis.
- **Parâmetros:**
  - **usuarioId:** usuarioId do professor
- **Resposta de Sucesso (200):**
  ```json
  {
    "planos": [
      {
        "id": 6,
        "titulo": "Movimento da Leitura e Escrita: Da Esquerda para a Direita, de Cima para Baixo",
        "duracao_total": "2 aulas de 50 minutos (100 minutos)",
        "recursos_gerais": [
          "Quadro branco ou lousa",
          "Giz ou marcadores coloridos",
          "Livros infantis com textos variados (prosa, poesia)"
        ],
        "detalhes_plano_completo": "### Introdução\nEste plano de aula visa consolidar um dos pilares da alfabetização inicial: a compreensão da direcionalidade da leitura e da escrita...",
        "habilidade_bncc": {
          "id": 1,
          "codigo": "EF01LP01",
          "descricao": "Reconhecer que textos são lidos e escritos da esquerda para a direita e de cima para baixo da página.",
          "etapaEnsino": "Ensino Fundamental",
          "componenteCurricular": "Língua Portuguesa",
          "anoSerie": "1º ano",
          "versao": "2025",
          "status": "ativa"
        },
        "aulas": [
          {
            "id": 23,
            "numero_aula": 1,
            "titulo": "Explorando o Caminho das Palavras",
            "objetivo": "Identificar e compreender a direcionalidade da leitura (esquerda para direita, cima para baixo) em diferentes materiais impressos, através da observação guiada e manipulação de textos.",
            "duracao": "2 aulas de 50 minutos (100 minutos)",
            "atividades": [
              {
                "id": 67,
                "etapa": "Aquecimento: Onde começa a história?",
                "tempo": "5",
                "descricao": "O professor inicia uma roda de conversa perguntando aos alunos 'Como sabemos onde começar a ler um livro?' ou 'Por onde o meu dedo vai quando eu leio?'. Escuta as respostas e estimula a curiosidade sobre o assunto.",
                "numero_aula": null
              },
              {
                "id": 71,
                "etapa": "Fechamento: O Compromisso do Leitor",
                "tempo": "5",
                "descricao": "Retomar a importância de seguir o 'caminho' da leitura para entender o que está escrito. Os alunos são encorajados a observar essa direcionalidade em casa, em outros livros e textos.",
                "numero_aula": null
              },
              {
                "id": 70,
                "etapa": "Conceituação Visual: O Caminho no Quadro",
                "tempo": "10",
                "descricao": "No quadro, o professor desenha setas grandes indicando o movimento da esquerda para a direita e de cima para baixo. Escreve uma frase curta (ex: 'O sapo pula.') e aponta, com o lápis, a direção da leitura de cada palavra e linha. Reforça verbalmente: 'Sempre começamos aqui (esquerda) e vamos para cá (direita). Quando a linha acaba, voltamos aqui embaixo (próxima linha à esquerda).'.",
                "numero_aula": null
              },
              {
                "id": 69,
                "etapa": "Mão na Massa: Desvendando o Texto",
                "tempo": "15",
                "descricao": "Dividir os alunos em duplas ou pequenos grupos (ou individualmente, se houver material suficiente). Distribuir livros infantis, cópias de parlendas, receitas simples, ou trechos de jornais. Pedir que, com o dedo, tentem 'ler' (mesmo que não saibam ler convencionalmente) uma linha, seguindo a direção que o professor mostrou. O professor circula auxiliando e observando.",
                "numero_aula": null
              },
              {
                "id": 68,
                "etapa": "Exploração Guiada: O Movimento do Leitor",
                "tempo": "15",
                "descricao": "O professor lê um livro infantil, enfatizando e exagerando o movimento do dedo da esquerda para a direita e de cima para baixo. Em seguida, mostra um jornal ou revista, apontando como as notícias seguem o mesmo padrão. Questiona: 'Para onde meu dedo está indo? E depois que a linha acaba?'.",
                "numero_aula": null
              }
            ]
          },
          {
            "id": 24,
            "numero_aula": 2,
            "titulo": "Marcando o Caminho da Escrita e Leitura",
            "objetivo": "Aplicar o conhecimento da direcionalidade na leitura e escrita de palavras e frases curtas, consolidando a compreensão do movimento e da organização textual.",
            "duracao": "2 aulas de 50 minutos (100 minutos)",
            "atividades": [
              {
                "id": 76,
                "etapa": "Fechamento: Somos Leitores e Escritores!",
                "tempo": "5",
                "descricao": "Os alunos compartilham suas fichas de atividades ou cadernos. O professor reforça a importância do 'caminho certo' para que todos entendam o que lemos e escrevemos. Parabeniza os alunos pela atenção e esforço em 'seguir o caminho'.",
                "numero_aula": null
              },
              {
                "id": 75,
                "etapa": "Minha Escrita no Caminho",
                "tempo": "10",
                "descricao": "Em uma folha pautada, os alunos escrevem seus nomes completos, prestando atenção em começar na esquerda e seguir em frente. Em seguida, escrevem o nome de um colega ou de um animal favorito, sempre observando o ponto de partida na margem e a sequência horizontal e vertical.",
                "numero_aula": null
              },
              {
                "id": 74,
                "etapa": "Atividade Guiada: Traçando Direções",
                "tempo": "15",
                "descricao": "Distribuir uma ficha de atividades com:\n1.  Linhas tracejadas que os alunos devem cobrir, começando da esquerda e indo para a direita.\n2.  Pequenos trechos de texto onde os alunos devem desenhar setas para indicar a direção da leitura em cada linha e, em seguida, ligar a primeira linha à segunda para indicar a sequência de cima para baixo.",
                "numero_aula": null
              },
              {
                "id": 73,
                "etapa": "Copiando o Caminho Certo",
                "tempo": "15",
                "descricao": "O professor escreve no quadro frases curtas ou palavras separadas em linhas diferentes (ex: 'A bola.', 'O gato.', 'Eu gosto de ler.'). Ao escrever, enfatiza o movimento da esquerda para a direita. Os alunos copiam as frases em seus cadernos ou folhas pautadas, sendo orientados a começar sempre na margem esquerda e a seguir a linha.",
                "numero_aula": null
              },
              {
                "id": 72,
                "etapa": "Revisão Rápida: Lembrar o Caminho",
                "tempo": "5",
                "descricao": "O professor exibe um cartaz com as setas direcionais da leitura e escrita (esquerda para direita, cima para baixo). Pergunta aos alunos o que significam e pede para que, com o dedo no ar, 'sigam' o caminho da leitura, relembrando a aula anterior.",
                "numero_aula": null
              }
            ]
          }
        ]
      },
      {
        "id": 5,
        "titulo": "Vivendo em Comunidade: Nossos Espaços e Suas Regras",
        "duracao_total": "3 aulas de 50 minutos (150 minutos)",
        "recursos_gerais": [
          "Quadro e giz/marcadores",
          "Cadernos e materiais de desenho (lápis de cor, canetinhas)"
        ],
        "detalhes_plano_completo": "## Plano de Aula: Vivendo em Comunidade: Nossos Espaços e Suas Regras\n\n### Contextualização\nEste plano de aula, voltado para o 2º ano do Ensino Fundamental...",
        "habilidade_bncc": {
          "id": 90,
          "codigo": "EF02HI01",
          "descricao": "Reconhecer mudanças e permanências nas formas de organização da vida cotidiana.",
          "etapaEnsino": "Ensino Fundamental",
          "componenteCurricular": "História",
          "anoSerie": "2º ano",
          "versao": "2025",
          "status": "ativa"
        },
        "aulas": [
          {
            "id": 20,
            "numero_aula": 1,
            "titulo": "Minha Casa, Meu Primeiro Espaço de Convivência",
            "objetivo": "Identificar a casa como o primeiro espaço de sociabilidade e reconhecer as regras básicas de convivência que a regulam.",
            "duracao": "3 aulas de 50 minutos (150 minutos)",
            "atividades": [
              {
                "id": 59,
                "etapa": "Desenvolvimento: 'As Regras da Minha Casa'",
                "tempo": "25 minutos",
                "descricao": "Pedir aos alunos que pensem nas regras que existem em suas casas (ex: hora de dormir, arrumar os brinquedos, ajudar nas tarefas, respeitar os mais velhos). Discutir por que essas regras são importantes. Em seguida, propor que desenhem ou escrevam (para quem já alfabetizado) sobre uma ou duas regras que consideram mais importantes em suas casas.",
                "numero_aula": null
              },
              {
                "id": 60,
                "etapa": "Fechamento: Compartilhando as Regras",
                "tempo": "10 minutos",
                "descricao": "Os alunos que desejarem compartilham seus desenhos/escritas com a turma, explicando as regras de suas casas e a importância delas. Reforçar que as regras ajudam a organizar a convivência e a manter a harmonia.",
                "numero_aula": null
              },
              {
                "id": 58,
                "etapa": "Início: Roda de Conversa",
                "tempo": "15 minutos",
                "descricao": "Iniciar com uma roda de conversa perguntando aos alunos: 'Onde vocês mais gostam de brincar e passar tempo?'. Introduzir o conceito de 'espaço de convivência' como lugares onde nos encontramos com outras pessoas. Focar na casa como o primeiro e mais importante espaço.",
                "numero_aula": null
              }
            ]
          },
          {
            "id": 22,
            "numero_aula": 3,
            "titulo": "Outros Espaços e Suas Regras: A Comunidade ao Redor",
            "objetivo": "Identificar outros espaços de sociabilidade na comunidade (públicos e privados) e reconhecer as diversas regras que os governam, compreendendo sua função social.",
            "duracao": "3 aulas de 50 minutos (150 minutos)",
            "atividades": [
              {
                "id": 66,
                "etapa": "Fechamento: Compartilhando e Concluindo",
                "tempo": "10 minutos",
                "descricao": "Cada grupo apresenta o espaço que analisou e as regras identificadas. Concluir a aula reforçando que, em todos os lugares onde convivemos com outras pessoas, existem regras para garantir a segurança, o respeito e a ordem, e que segui-las é um ato de cidadania. Incentivar a reflexão sobre a importância de respeitar as diferenças entre os códigos de convivência de cada espaço.",
                "numero_aula": null
              },
              {
                "id": 65,
                "etapa": "Desenvolvimento: 'E Nesses Lugares, Quais São as Regras?'",
                "tempo": "25 minutos",
                "descricao": "Dividir a turma em pequenos grupos. Cada grupo escolhe um dos espaços levantados (ou o professor direciona). A tarefa é discutir e identificar: 'Quem frequenta esse lugar?', 'Quais são as regras (implícitas ou explícitas) que existem nesse lugar?', 'Por que essas regras são importantes?'. Podem desenhar o local e as regras. Exemplos: No parque, não jogar lixo no chão; na rua, atravessar na faixa; no supermercado, não correr.",
                "numero_aula": null
              },
              {
                "id": 64,
                "etapa": "Início: Ampliando os Horizontes",
                "tempo": "15 minutos",
                "descricao": "Revisitar o conceito de espaços de convivência (casa, escola) e as regras já discutidas. Perguntar: 'Além da casa e da escola, que outros lugares vocês frequentam?'. Registrar as respostas no quadro (ex: parque, praça, igreja, rua, mercado, casa de amigos/parentes, shopping).",
                "numero_aula": null
              }
            ]
          },
          {
            "id": 21,
            "numero_aula": 2,
            "titulo": "A Escola: Nosso Espaço de Aprendizagem e Convivência",
            "objetivo": "Reconhecer a escola como um importante espaço de sociabilidade, identificar suas regras e compreender sua importância para o bem-estar coletivo.",
            "duracao": "3 aulas de 50 minutos (150 minutos)",
            "atividades": [
              {
                "id": 63,
                "etapa": "Fechamento: Nosso Pacto",
                "tempo": "10 minutos",
                "descricao": "Apresentar o 'Pacto de Convivência' da turma em um cartaz. Os alunos podem assinar (com nome ou um desenho/símbolo) como forma de compromisso. Explicar que esse pacto é para ser seguido por todos para uma boa convivência na sala.",
                "numero_aula": null
              },
              {
                "id": 62,
                "etapa": "Desenvolvimento: Explorando as Regras da Escola",
                "tempo": "30 minutos",
                "descricao": "Realizar um pequeno 'tour' pela escola (se possível) ou discutir sobre diferentes ambientes escolares (sala de aula, pátio, biblioteca, refeitório, banheiro). Em cada ambiente, perguntar: 'Que regras devemos seguir aqui? Por que essas regras são importantes?'. Registrar as principais regras levantadas. Em grupo, discutir e criar um 'Pacto de Convivência' para a sala de aula, listando 3 a 5 regras essenciais para o dia a dia na turma. Incentivar a participação de todos na elaboração.",
                "numero_aula": null
              },
              {
                "id": 61,
                "etapa": "Início: Lembrar e Conectar",
                "tempo": "10 minutos",
                "descricao": "Retomar a conversa sobre 'espaços de convivência' e as regras da casa. Perguntar: 'Se em casa temos regras, será que na escola também temos? Por quê?'. Conectar a ideia de regras ao ambiente escolar.",
                "numero_aula": null
              }
            ]
          }
        ]
      },
    "meta": {
      "total": 2,
      "pageNumber": 1,
      "limitNumber": 10,
      "totalPages": 1
    }
  }
  ```

#### 6. **Buscar plano de aula por ID**

- **Endpoint:** `GET /planoAula/:planoAulaId`
- **Descrição:** Retorna um plano de aula pelo ID.
- **Parâmetros:**
  - **id:** id do plano de aula a ser retornado
- **Resposta de Sucesso (200):**
  ```json
  {
    "planos": {
      "id": 3,
      "titulo": "Ciclos da Matéria e Energia: Sustentabilidade em Sistemas Naturais e Tecnológicos",
      "duracao_total": "4 aulas de 50 minutos (200 minutos)",
      "recursos_gerais": [
        "Projetor e computador com acesso à internet",
        "Quadro branco e marcadores"
        
      ],
      "detalhes_plano_completo": "Este plano de aula detalhado é projetado para o Ensino Médio (1º ao 3º ano, conforme o código BNCC EM13CNT101) e aborda ...",
      "avaliacao": "A avaliação será contínua e formativa, observando a participação, o engajamento nas discussões, a realização das atividades propostas e as anotações no diário de bordo...",
      "habilidade_bncc": {
        "id": 438,
        "codigo": "EM13CNT101",
        "descricao": "Compreender e aplicar conceitos das ciências naturais para explicar fenômenos e processos em diferentes escalas, reconhecendo a importância da investigação científica.",
        "etapaEnsino": "Ensino Médio",
        "componenteCurricular": "Ciências da Natureza",
        "anoSerie": "1º ao 3º ano",
        "versao": "2025",
        "status": "ativa"
      },
      "aulas": [
        {
          "id": 12,
          "numero_aula": 1,
          "titulo": "Sistemas e Ciclos Naturais: A Vida em Movimento",
          "objetivo": "Compreender o conceito de sistema (aberto, fechado), identificar componentes e interações em sistemas naturais, e introduzir os principais ciclos biogeoquímicos (água, carbono).",
          "duracao": "4 aulas de 50 minutos (200 minutos)",
          "atividades": [
            {
              "id": 34,
              "etapa": "Abertura (10 min)",
              "tempo": "10",
              "descricao": "Roda de conversa: O que é um 'sistema'? Solicitar exemplos de sistemas (corpo humano, ecossistema, sistema solar) e suas interações. Instigar a curiosidade sobre como tudo está conectado.",
              "numero_aula": null
            },
            {
              "id": 35,
              "etapa": "Desenvolvimento (30 min)",
              "tempo": "30",
              "descricao": "Apresentação dialogada sobre 'Sistemas Naturais e seus Ciclos'. Uso de imagens e vídeos curtos (ex: ciclo da água, ciclo do carbono) para ilustrar. Debate sobre a importância desses ciclos para a vida na Terra. Criação de um esquema simplificado no quadro ou com auxílio de ferramenta digital (ex: Jamboard) com a participação dos alunos.",
              "numero_aula": null
            },
            {
              "id": 36,
              "etapa": "Fechamento (10 min)",
              "tempo": "10",
              "descricao": "Atividade 'Onde mais vemos ciclos?': Em duplas, os alunos anotam outros ciclos que observam na natureza ou no cotidiano. Compartilham algumas ideias com a turma, reforçando a omnipresença dos ciclos.",
              "numero_aula": null
            }
          ]
        },
        {
          "id": 13,
          "numero_aula": 2,
          "titulo": "Transformações e Conservações: A Dança da Matéria e da Energia",
          "objetivo": "Analisar as transformações e conservações da matéria e energia em sistemas naturais (fotossíntese, cadeias alimentares) e relacionar com o princípio da conservação da massa.",
          "duracao": "4 aulas de 50 minutos (200 minutos)",
          "atividades": [
            {
              "id": 37,
              "etapa": "Abertura (10 min)",
              "tempo": "10",
              "descricao": "Revisão rápida dos conceitos de 'sistema' e 'ciclo'. Desafio: 'Para onde vai a matéria quando uma folha seca e 'desaparece'?' Levantar hipóteses sobre transformações e conservações.",
              "numero_aula": null
            },
            {
              "id": 38,
              "etapa": "Desenvolvimento (30 min)",
              "tempo": "30",
              "descricao": "Experimento/Demonstração: Observação de um terrário ou plantio simples de sementes (se já não houver um em andamento). Discussão sobre fotossíntese (transformação de energia solar em química) e respiração. Introdução ao conceito de cadeias alimentares e fluxo de energia. Apresentação simplificada do princípio da conservação da massa de Lavoisier, aplicando-o aos ciclos naturais ('Na natureza, nada se cria, nada se perde, tudo se transforma').",
              "numero_aula": null
            },
            {
              "id": 39,
              "etapa": "Fechamento (10 min)",
              "tempo": "10",
              "descricao": "Diário de bordo: Os alunos registram em seus cadernos 'O que aprendi hoje sobre como a matéria e a energia mudam, mas não somem nos sistemas naturais?'. Compartilham uma anotação com o colega ao lado.",
              "numero_aula": null
            }
          ]
        },
        {
          "id": 14,
          "numero_aula": 3,
          "titulo": "Impacto Humano nos Sistemas: Tecnologia e Sustentabilidade",
          "objetivo": "Identificar sistemas tecnológicos no cotidiano, analisar o impacto das ações humanas nos ciclos naturais e discutir o conceito de sustentabilidade.",
          "duracao": "4 aulas de 50 minutos (200 minutos)",
          "atividades": [
            {
              "id": 40,
              "etapa": "Abertura (10 min)",
              "tempo": "10",
              "descricao": "Brainstorming: 'Quais sistemas tecnológicos usamos todos os dias?' (celular, carro, geladeira, computador). Questionar: 'Eles usam e transformam matéria e energia? Como?'",
              "numero_aula": null
            },
            {
              "id": 41,
              "etapa": "Desenvolvimento (30 min)",
              "tempo": "30",
              "descricao": "Estudo de Caso: Analisar o 'ciclo de vida' de um produto tecnológico comum (ex: smartphone ou garrafa PET). Discutir as etapas (extração de matéria-prima, produção, uso, descarte) e os impactos nos ciclos naturais (poluição da água/ar, descarte de lixo). Introdução do conceito de sustentabilidade e a necessidade de repensar o consumo.",
              "numero_aula": null
            },
            {
              "id": 42,
              "etapa": "Fechamento (10 min)",
              "tempo": "10",
              "descricao": "Debate rápido: 'É possível ter avanço tecnológico e, ao mesmo tempo, promover a sustentabilidade? Como?' Estimular os alunos a pensar em exemplos e desafios.",
              "numero_aula": null
            }
          ]
        },
        {
          "id": 15,
          "numero_aula": 4,
          "titulo": "Propondo Soluções: Pensamento Científico para um Futuro Sustentável",
          "objetivo": "Propor soluções criativas e embasadas para problemas do cotidiano relacionados à sustentabilidade, aplicando o pensamento científico, crítico e criativo.",
          "duracao": "4 aulas de 50 minutos (200 minutos)",
          "atividades": [
            {
              "id": 43,
              "etapa": "Abertura (10 min)",
              "tempo": "10",
              "descricao": "Apresentação de um problema de sustentabilidade local ou global relevante (ex: descarte incorreto de resíduos sólidos, poluição de rios, consumo excessivo de energia). Contextualizar a importância de propor soluções.",
              "numero_aula": null
            },
            {
              "id": 44,
              "etapa": "Desenvolvimento (30 min)",
              "tempo": "30",
              "descricao": "Trabalho em Grupo (formar grupos de 3-4 alunos): Os grupos recebem a tarefa de desenvolver uma proposta de solução criativa e sustentável para o problema apresentado na abertura, ou um problema similar de interesse do grupo. Devem considerar os conhecimentos sobre sistemas, ciclos e impactos. Utilizar cartolinas, canetas, ou ferramentas digitais para esboçar a ideia (protótipo, desenho, mapa conceitual da solução). O professor circula para orientar e tirar dúvidas.",
              "numero_aula": null
            },
            {
              "id": 45,
              "etapa": "Fechamento (10 min)",
              "tempo": "10",
              "descricao": "Os grupos fazem uma apresentação oral rápida (2-3 minutos) das suas ideias iniciais. Feedback coletivo. Definição do prazo e critérios para a entrega do projeto final mais elaborado, que servirá como avaliação somativa.",
              "numero_aula": null
            }
          ]
        }
      ]
    }
  }
  ```

#### 7. **Editar um plano de aula**

- **Endpoint:** `PUT /planoAula/:planoAulaId:`
- **Descrição:** Atualiza um plano de aula existente.
- **Parâmetros:**
  - **id:** id do plano de aula a ser editado
- **Corpo da Requisição (JSON):**
  ```json
  {
    "titulo": "Ciclos Naturais, Fenômenos e Sustentabilidade Ambiental",
    "duracao_total": "50",
    "recursos_gerais": [
      {"Projetor e computador com acesso à internet","Quadro branco/lousa e marcadores/giz","Caderno e materiais de escrita"}
    ],
    "detalhes_plano_completo": "### Visão Geral\nEste plano de aula, alinhado à Habilidade BNCC EM13CNT102...",
    "avaliacao": "A avaliação será contínua e formativa, observando a participação..",
    "aulas": [
      {
        "id": 1,
        "numero_aula": 1,
        "titulo": "O Ciclo da Água: Fundamento da Vida e Fenômenos Climáticos",
        "objetivo": "Compreender os processos do ciclo da água e sua importância para os fenômenos naturais e a manutenção da vida.",
        "duracao": "50",
        "atividades": [
          {
            "id": 1,
            "etapa": "Introdução e Sensibilização",
            "tempo": "10",
            "descricao": "O professor inicia com uma 'chuva de ideias' sobre a importância da água. Em seguida, projeta um breve vídeo (2-3 min) sobre a água na Terra e faz perguntas como: 'De onde vem a água que bebemos?' ou 'Para onde vai a água da chuva?'."
          }
        ]
      }
    ]
  }
  ```
- **Resposta de Sucesso (200):**
  ```json
  {
    "message": "Plano de aula atualizado com sucesso",
    "planoAula": {
      "id": 1,
      "titulo": "Ciclos Naturais, Fenômenos e Sustentabilidade Ambiental",
      "duracao_total": "50",
      "recursos_gerais": [
        "Projetor e computador com acesso à internet"
      ],
      "detalhes_plano_completo": "### Visão Geral\nEste plano de aula, alinhado à Habilidade BNCC EM13CNT102..",
      "avaliacao": "A avaliação será contínua e formativa, observando a participação...",
      "aulas": [
        {
          "id": 1,
          "numero_aula": 1,
          "titulo": "O Ciclo da Água: Fundamento da Vida e Fenômenos Climáticos",
          "objetivo": "Compreender os processos do ciclo da água e sua importância para os fenômenos naturais e a manutenção da vida.",
          "duracao": "50",
          "atividades": [
            {
              "id": 1,
              "etapa": "Introdução e Sensibilização",
              "tempo": "10",
              "descricao": "O professor inicia com uma 'chuva de ideias' sobre a importância da água. Em seguida, projeta um breve vídeo (2-3 min) sobre a água na Terra e faz perguntas como: 'De onde vem a água que bebemos?' ou 'Para onde vai a água da chuva?'.",
              "numero_aula": null
            },
            {
              "id": 2,
              "etapa": "Exploração e Modelagem",
              "tempo": "25 min",
              "descricao": "Apresentação e discussão do ciclo da água (evaporação, condensação, precipitação, escoamento, infiltração). Construção de um modelo simples do ciclo da água em grupo (usando garrafa PET cortada, terra, água, planta pequena e gelo sobre a tampa para simular a condensação e precipitação). Observação dos processos.",
              "numero_aula": null
            },
            {
              "id": 3,
              "etapa": "Fixação e Conexão",
              "tempo": "15 min",
              "descricao": "Cada grupo cria um mapa mental simplificado do ciclo da água, incluindo os fenômenos naturais impactados (chuva, rios, lagos, clima). Compartilhamento breve dos mapas mentais e discussão sobre a importância da água para os seres vivos.",
              "numero_aula": null
            }
          ]
        },
        {
          "id": 2,
          "numero_aula": 2,
          "titulo": "Ciclos da Energia e do Carbono: Fluxos Essenciais e Desequilíbrios",
          "objetivo": "Analisar o fluxo de energia e o ciclo do carbono, identificando seus componentes e as principais fontes de desequilíbrio causadas pela ação humana.",
          "duracao": "4 aulas de 50 minutos (200 minutos)",
          "atividades": [
            {
              "id": 4,
              "etapa": "Retomada e Contextualização",
              "tempo": "10 min",
              "descricao": "Revisão rápida do ciclo da água. Introdução ao conceito de energia nos ecossistemas (fluxo unidirecional) e matéria (ciclos). Questionamento: 'Onde está o carbono que respiramos?'",
              "numero_aula": null
            },
            {
              "id": 5,
              "etapa": "Análise do Ciclo do Carbono",
              "tempo": "25 min",
              "descricao": "Explicação do ciclo do carbono (fotossíntese, respiração, decomposição, combustão de combustíveis fósseis). Uso de infográficos interativos ou um vídeo explicativo. Discussão sobre as formas de carbono e seu papel (CO2 na atmosfera, carbono orgânico em seres vivos e solos, carbonato em oceanos).",
              "numero_aula": null
            },
            {
              "id": 6,
              "etapa": "Impactos Humanos e Debate",
              "tempo": "15 min",
              "descricao": "Dividir a turma em pequenos grupos para discutir como atividades humanas (desmatamento, queima de combustíveis fósseis) afetam o ciclo do carbono e o fluxo de energia. Breve relato das conclusões de cada grupo.",
              "numero_aula": null
            }
          ]
        },
        {
          "id": 3,
          "numero_aula": 3,
          "titulo": "A Interconexão dos Ciclos e os Fenômenos Naturais",
          "objetivo": "Relacionar a interação entre os ciclos da água, energia, matéria e carbono com a ocorrência de fenômenos naturais e suas consequências.",
          "duracao": "4 aulas de 50 minutos (200 minutos)",
          "atividades": [
            {
              "id": 7,
              "etapa": "Revisão e Conexão Interciclos",
              "tempo": "10 min",
              "descricao": "Breve revisão dos ciclos da água e carbono. Introdução ao conceito de ciclo da matéria de forma mais ampla, destacando a reciclagem de nutrientes. Perguntas como: 'Como a chuva afeta as plantas que fazem fotossíntese?'",
              "numero_aula": null
            },
            {
              "id": 8,
              "etapa": "Estudo de Caso e Análise de Fenômenos",
              "tempo": "25 min",
              "descricao": "Apresentação de um estudo de caso (ex: seca prolongada, enchentes, mudanças climáticas, acidificação dos oceanos). Os grupos analisam como a interrupção ou alteração de um ciclo (água ou carbono) pode influenciar outros ciclos e gerar fenômenos naturais extremos. Uso de notícias ou pequenos trechos de artigos para embasar a discussão.",
              "numero_aula": null
            },
            {
              "id": 9,
              "etapa": "Compartilhamento e Síntese",
              "tempo": "15 min",
              "descricao": "Cada grupo apresenta suas análises sobre o estudo de caso, focando na interconexão dos ciclos e nos fenômenos resultantes. O professor conduz uma síntese em aula, construindo um diagrama coletivo na lousa que mostre as relações entre os ciclos.",
              "numero_aula": null
            }
          ]
        },
        {
          "id": 4,
          "numero_aula": 4,
          "titulo": "Sustentabilidade Ambiental: Impactos, Desafios e Soluções",
          "objetivo": "Analisar os impactos humanos nos ciclos naturais e discutir estratégias para promover a sustentabilidade ambiental, propondo soluções locais e globais.",
          "duracao": "4 aulas de 50 minutos (200 minutos)",
          "atividades": [
            {
              "id": 10,
              "etapa": "Retomada e Reflexão Crítica",
              "tempo": "10 min",
              "descricao": "O professor inicia a aula com uma provocação: 'Diante de tudo o que vimos sobre os ciclos e fenômenos, como nossas ações estão impactando o planeta?'. Abre-se para uma breve discussão coletiva.",
              "numero_aula": null
            },
            {
              "id": 11,
              "etapa": "Debate Guiado: Sustentabilidade e Soluções",
              "tempo": "25 min",
              "descricao": "Divide-se a turma em dois ou três grandes grupos. Cada grupo recebe um tema para debater e propor soluções: 1) Desmatamento e seus impactos nos ciclos; 2) Consumo de energia e emissões de carbono; 3) Poluição da água e seus efeitos na vida. Os grupos devem focar em ações de mitigação e adaptação, pensando em nível local e global. O professor atua como mediador.",
              "numero_aula": null
            },
            {
              "id": 12,
              "etapa": "Projeto Final e Apresentação",
              "tempo": "15 min",
              "descricao": "Cada grupo apresenta suas propostas de soluções para o tema debatido, de forma criativa (pode ser um cartaz, um esquema, uma pequena encenação ou um pitch de uma ideia). O professor encoraja a autoavaliação e a avaliação pelos pares, focando na coerência das propostas com a compreensão dos ciclos naturais e seus desafios.",
              "numero_aula": null
            }
          ]
        }
      ]
    }
  }
  ```

#### 8. **Excluir um plano de aula**

  - **Endpoint:** `DELETE /planoAula/:planoAulaId`
  - **Descrição:** Remove um plano de aula específico.
  - **Parâmetros:**
    - **id:** id do plano de aula a ser excluído
  - **Resposta de Sucesso (200):**
    ```json
    {
      "message": "OK"
    }
    ```

  #### 9. Habilidade 
  **Endpoint:**

  ```
  GET /habilidade
  ```

  **No parameters**

  **Resposta esperada (200):**

  ```json
  [
    {
      "id": 1,
      "codigo": "EF01LP01",
      "descricao": "Reconhecer que textos são lidos e escritos da esquerda para a direita e de cima para baixo da página.",
      "etapa_ensino": "Ensino Fundamental",
      "componente_curricular": "Língua Portuguesa",
      "ano_serie": "1º ano",
      "versao": "2025",
      "status": "ativa"
    },
    {
      "id": 2,
      "codigo": "EF01LP02",
      "descricao": "Escrever espontaneamente ou por ditado palavras e frases de forma alfabética usando letras que representem fonemas.",
      "etapa_ensino": "Ensino Fundamental",
      "componente_curricular": "Língua Portuguesa",
      "ano_serie": "1º ano",
      "versao": "2025",
      "status": "ativa"
    }   
  ]
```