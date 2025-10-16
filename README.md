# MyTasks API

API REST para gerenciamento de tarefas com autenticação JWT + refresh token, sistema de notificações por email e logging assíncrono.

## 📋 Sobre o Projeto

MyTasks API é uma aplicação backend construída seguindo os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**, oferecendo uma estrutura robusta e escalável para gerenciamento de usuários e tarefas.

### Principais Funcionalidades

- 🔐 Autenticação e autorização com JWT + refresh token
- 📝 CRUD completo de tarefas
- 👥 CRUD completo de usuários
- 📧 Sistema de notificações por email (assíncrono via RabbitMQ + Nodemailer)
- 📊 Sistema de logs centralizado
- 🔒 Controle de permissões
- 📚 Documentação Swagger/OpenAPI

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

```
├── domain/          # Entidades, interfaces de repositórios e regras de negócio
├── application/     # Casos de uso e orquestração de serviços
├── infrastructure/  # Implementações concretas (banco de dados, email, mensageria)
├── presentation/    # Controllers, rotas, middlewares e DTOs
└── shared/          # Utilitários, configurações e workers
```

## 🚀 Tecnologias

- **Node.js** com **TypeScript**
- **Express** - Framework web
- **Drizzle ORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **RabbitMQ** - Message broker para processamento assíncrono
- **Nodemailer** - Envio de emails
- **JWT** - Autenticação
- **Zod** - Validação de schemas
- **Swagger UI** - Documentação da API
- **Biome** - Linter e formatador

## 📦 Pré-requisitos

- Node.js (versão 22+)
- PostgreSQL
- RabbitMQ
- npm

## ⚙️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/vinicioscst/mytasks-api.git
cd mytasks-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações (veja a seção de Configuração abaixo).

4. Execute as migrações do banco de dados:
```bash
npx drizzle-kit migrate
```

## 🔧 Configuração

Configure as seguintes variáveis de ambiente no arquivo `.env`:

```env
# Servidor
PORT=3000

# Banco de dados
DATABASE_URL=postgresql://user:password@localhost:5432/mytasks

# JWT
JWT_SECRET=seu_secret_aqui

# RabbitMQ
RABBITMQ_URL=amqp://localhost:5672

# Email
GOOGLE_EMAIL=seu_email@gmail.com
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
```

> [!IMPORTANT]
> Para conseguir o client id, client secret e refresh token, é necessário acessar o [**Console do Google Cloud**](https://console.cloud.google.com/). Siga o [tutorial](https://youtu.be/LzhftQ9DULY) em caso de dúvidas

## 🏃 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 🐳 Docker

O projeto inclui um `docker-compose.yml` para facilitar a execução do serviço do RabbitMQ em ambiente de desenvolvimento:

```bash
docker-compose up -d
```

## 📖 Documentação da API

Após iniciar o servidor, acesse a documentação Swagger em:
```
http://localhost:3000/api/docs
```

## 🗂️ Estrutura de Dados

### Usuários (Users)
- Criação, leitura, atualização e exclusão
- Sistema de notificação de boas-vindas

### Tarefas (Tasks)
- Criação, leitura, atualização e exclusão
- Associação com usuários
- Sistema de notificações

### Autenticação (Auth)
- Autenticação de usuários (login)
- Sistema de logout e invalidação de tokens

### Logs
- Registro automático de ações
- Rastreabilidade de operações

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Ao fazer login, a API armazena os tokens diretamente nos cookies do navegador e, quando necessário, os obtém automaticamente, não sendo necessário passar nenhuma informação nos headers da requisição.

## 📧 Sistema de Notificações

O sistema envia emails automaticamente para:
- ✅ Boas-vindas (novo usuário)
- ➕ Criação de tarefa
- ✏️ Atualização de tarefa
- 🗑️ Exclusão de tarefa

Os emails são processados de forma assíncrona através do RabbitMQ.

## 📝 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Vinicios Costa - [GitHub](https://github.com/vinicioscst)