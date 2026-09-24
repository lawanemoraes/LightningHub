# ⚡ LightningHub

**Sistema de Gestão de Frotas**

> Projeto pessoal desenvolvido com o objetivo de aplicar, na prática, conhecimentos de desenvolvimento web, banco de dados e organização de sistemas.

---

## 📌 Sobre o projeto

O **LightningHub** é um sistema de gestão de frotas que estou desenvolvendo para centralizar informações de veículos, motoristas, manutenções e documentos em um único ambiente.

A ideia é construir uma aplicação organizada, funcional e com uma interface simples de utilizar, permitindo acompanhar diferentes informações da frota de forma mais prática.

Além de ser um projeto pessoal, o LightningHub também faz parte do meu processo de aprendizado e evolução como desenvolvedora.

---

## 🎯 Objetivo

Desenvolver, do zero, um sistema completo de gestão de frotas, passando por todas as principais etapas de desenvolvimento:

* construção da interface;
* desenvolvimento das funcionalidades;
* modelagem e integração do banco de dados;
* desenvolvimento do back-end;
* criação e integração de uma API REST; 
* organização e versionamento do projeto;
* testes, validações e melhorias.

A proposta é transformar o LightningHub em um projeto cada vez mais completo ao longo do seu desenvolvimento.

---

## 🚧 Status do projeto

**Em desenvolvimento**

O projeto já possui uma estrutura funcional com **front-end em HTML, CSS e JavaScript**, **API REST desenvolvida com Node.js e Express** e **banco de dados PostgreSQL**.

Atualmente, os módulos de **Veículos** e **Motoristas** já possuem integração com a API e persistência dos dados no PostgreSQL.

### Atualmente trabalhando em:

* Melhorias e refinamentos nos módulos existentes;
* Desenvolvimento dos próximos módulos do sistema;
* Integração entre front-end, API e banco de dados;
* Implementação de validações e tratamento de erros;
* Melhorias na estrutura e organização do projeto.

---

## 🛠️ Tecnologias

### Front-end

* HTML5
* CSS3
* JavaScript

### Back-end

* Node.js
* Express
* REST API
* CORS
* dotenv

### Banco de dados

* PostgreSQL
* SQL

### Ferramentas

* Git
* GitHub
* VS Code
* Live Server
* pgAdmin

---

## 🏗️ Arquitetura

O projeto utiliza a seguinte estrutura de comunicação:

    Front-end
        ↓
    JavaScript
        ↓
    Node.js + Express
        ↓
    REST API
        ↓
    PostgreSQL

O front-end realiza requisições para a API, que é responsável por processar as operações e realizar a comunicação com o banco de dados.

---

## 📋 Funcionalidades

### Dashboard

* [x] Dashboard inicial
* [x] Cards de informações
* [x] Quantidade de veículos
* [x] Quantidade de motoristas
* [x] Status dos veículos
* [x] Layout responsivo
* [ ] Botões de acesso aos módulos
* [ ] Próximas manutenções com dados reais
* [ ] Atividades recentes com dados reais

### Veículos

* [x] Cadastro de veículos
* [x] Edição de veículos
* [x] Visualização de veículos
* [x] Busca de veículos
* [x] Filtro por status
* [x] Ordenação de veículos por nome
* [x] Mensagem para busca sem resultados
* [x] Visualização de detalhes
* [x] Fechamento dos detalhes
* [x] Controle de status
* [x] Consulta de veículos através da API
* [x] Cadastro de veículos através da API
* [x] Atualização de veículos através da API
* [x] Persistência dos dados no PostgreSQL

### Motoristas

* [x] Consulta de motoristas através da API
* [x] Cadastro de motoristas
* [x] Busca por nome, CPF e CNH
* [x] Ordenação por nome
* [x] Mensagem para busca sem resultados
* [x] Visualização de detalhes
* [x] Persistência dos dados no PostgreSQL
* [ ] Edição de motoristas
* [ ] Associação entre motoristas e veículos

### Manutenções

* [ ] Cadastro de manutenções
* [ ] Histórico de manutenções
* [ ] Controle de próximas manutenções

### Documentos

* [ ] Controle de documentação dos veículos
* [ ] Controle de vencimentos
* [ ] Alertas de documentos próximos do vencimento

### Relatórios

* [ ] Relatórios da frota
* [ ] Indicadores
* [ ] Dashboard com dados reais

### Sistema

* [x] Integração com PostgreSQL
* [x] Desenvolvimento da API REST inicial
* [x] Integração entre front-end e API
* [x] Persistência de dados
* [ ] Autenticação de usuários
* [ ] Controle de acesso

---

## 🗄️ Banco de dados

O banco de dados do LightningHub utiliza **PostgreSQL**.

Atualmente, o sistema possui as seguintes entidades:

* `veiculos`
* `motoristas`
* `manutencoes`
* `documentos`

### Relacionamentos

    VEICULOS
       │
       ├──────< MANUTENCOES
       │
       └──────< DOCUMENTOS

    MOTORISTAS
       └── cadastro independente

O arquivo `database/schema.sql` contém a estrutura SQL utilizada para criação das tabelas e configuração inicial do banco.

---

## 🔌 API

O back-end utiliza **Node.js + Express** para disponibilizar uma API REST responsável pela comunicação entre a aplicação e o banco de dados PostgreSQL.

### Veículos

#### Buscar veículos

    GET /api/veiculos

Retorna os veículos cadastrados no banco de dados.

#### Cadastrar veículo

    POST /api/veiculos

Recebe os dados do veículo em formato JSON e realiza o cadastro no PostgreSQL.

#### Atualizar veículo

    PUT /api/veiculos/:id

Atualiza os dados de um veículo existente a partir do seu identificador.

### Motoristas

#### Buscar motoristas

    GET /api/motoristas

Retorna os motoristas cadastrados no banco de dados.

#### Cadastrar motoristas

    POST /api/motoristas

Recebe os dados do motorista em formato JSON e realiza o cadastro no PostgreSQL.

---

## 📁 Estrutura do projeto

LightningHub/

    ├── index.html
    ├── README.md
    │
    ├── css/
    │   └── style.css
    │
    ├── js/
    │   └── script.js
    │
    ├── database/
    │   └── schema.sql
    │
    └── backend/
        ├── .env
        ├── .gitignore
        ├── database.js
        ├── package.json
        ├── package-lock.json
        └── server.js

O arquivo `.env` contém as configurações locais de acesso ao banco de dados e não é versionado no GitHub.

---

## 🗺️ Próximos passos

1. Desenvolver o módulo de manutenções;
2. Desenvolver o módulo de documentos;
3. Implementar edição e associação de motoristas;
4. Implementar validações e melhorias na API;
5. Integrar dados reais de manutenções e documentos ao dasboard;
6. Implementar autenticação e controle de acesso;
7. Desenvolver relatórios e indicadores;
8. Realizar testes e melhorias gerais;
9. Continuar evoluindo a arquitetura e as funcionalidades do sistema.

---

## ⚡ Sobre o desenvolvimento

O LightningHub está sendo desenvolvido **passo a passo**, acompanhando minha evolução como estudante de **Análise e Desenvolvimento de Sistemas**.

O projeto busca aplicar na prática conceitos de:

* desenvolvimento web;
* JavaScript;
* Node.js;
* APIs REST;
* bancos de dados relacionais;
* SQL;
* integração entre sistemas;
* Git e GitHub;
* organização e desenvolvimento de software.

Além de servir como projeto de aprendizado, o LightningHub funciona como um laboratório prático para experimentação e aplicação de conceitos que poderão ser aproveitados futuramente no desenvolvimento do meu Trabalho de Graduação (TG).

O desenvolvimento também permite documentar minha evolução técnica e construir, gradualmente, um projeto funcional para meu portfólio.

---

**LightningHub ⚡**  
*Gestão de Frotas, do planejamento ao controle.*