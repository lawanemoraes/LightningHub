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
* organização e versionamento do projeto;
* testes e melhorias.

A proposta é transformar o LightningHub em um projeto cada vez mais completo ao longo do seu desenvolvimento.

---

## 🚧 Status do projeto

**Em desenvolvimento**

O projeto já possui a estrutura inicial do sistema, banco de dados PostgreSQL, back-end com Node.js e Express e integração entre o front-end e a API.

Atualmente, o módulo de **veículos** já possui integração funcional com o banco de dados, permitindo consultar e cadastrar veículos através da API.

### Atualmente trabalhando em:

* Evolução do módulo de veículos
* Desenvolvimento dos próximos módulos do sistema
* Integração entre front-end, API e banco de dados
* Implementação de novas funcionalidades
* Melhorias na estrutura e organização do projeto

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

### Ferramentas

* Git
* GitHub
* VS Code
* Live Server

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
* [x] Status dos veículos
* [ ] Botões de acesso aos módulos
* [ ] Próximas manutenções com dados reais
* [ ] Atividades recentes com dados reais
* [x] Layout responsivo

### Veículos

* [x] Cadastro de veículos
* [ ] Edição de veículos
* [x] Visualização de veículos
* [x] Busca de veículos
* [x] Filtro por status
* [x] Visualização de detalhes
* [x] Fechamento dos detalhes
* [x] Controle de status
* [x] Consulta de veículos através da API
* [x] Cadastro de veículos através da API
* [x] Persistência dos dados no PostgreSQL

### Motoristas

* [ ] Cadastro de motoristas
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

O back-end utiliza **Node.js + Express** para disponibilizar uma API REST.

### Veículos

#### Buscar veículos

    GET /api/veiculos

Retorna os veículos cadastrados no banco de dados.

#### Cadastrar veículo

    POST /api/veiculos

Recebe os dados do veículo em formato JSON e realiza o cadastro no PostgreSQL.

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

1. Implementar edição de veículos;
2. Finalizar as funcionalidades do módulo de veículos;
3. Desenvolver o módulo de motoristas;
4. Desenvolver o módulo de manutenções;
5. Desenvolver o módulo de documentos;
6. Implementar validações e melhorias na API;
7. Implementar autenticação e controle de acesso;
8. Desenvolver relatórios e indicadores;
9. Realizar testes e melhorias gerais;
10. Continuar evoluindo a arquitetura e as funcionalidades do sistema.

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
* organização de projetos.

O desenvolvimento também serve como forma de documentar minha evolução técnica e construir um projeto que possa fazer parte do meu portfólio.

---

**LightningHub ⚡**  
*Gestão de Frotas, do planejamento ao controle.*