# GestorX Web

Sistema web para gerenciar operações de estoque/estantes, usuários e movimentações.

## Tecnologias
- **Next.js (App Router)**
- **TypeScript**
- **Prisma 7** (banco de dados)
- **Tailwind CSS**
- **PostgreSQL** (hospedado no [Neon](https://neon.tech))

## Requisitos
- Node.js
- Um projeto no [Neon](https://console.neon.tech) (ou outro Postgres) com as connection strings pooled e direct
- Variáveis de ambiente `DATABASE_URL` e `DIRECT_URL` (usadas pelo `prisma.config.ts`, não mais pelo `prisma/schema.prisma` — a partir do Prisma 7 a conexão saiu do schema)

## Como rodar localmente
1) Entre na pasta do front-end e instale as dependências:
```bash
cd Front-End
npm install
```

2) Copie `.env.example` para `.env` e preencha com as connection strings do Neon:

DATABASE_URL="<connection string pooled>"
DIRECT_URL="<connection string direct>"


3) Rode a migration e gere o Prisma Client:
```bash
npx prisma migrate dev --name init
npm run prisma:generate
```

4) Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra no navegador:
- http://localhost:3000

## Funcionalidades (visão geral)
- Autenticação/login de usuários
- Cadastro de usuários e redefinição de senha
- Telas internas com navegação via sidebar
- Consultas e ações ligadas a **Estante** e **Estoque**
- Monitoramento e relatórios

## Estrutura (resumo)
- `app/` → rotas e páginas (Next.js)
- `components/` → componentes reutilizáveis
- `lib/` → utilitários (ex: Prisma)
- `prisma/` → schema e migrations
- `prisma.config.ts` → configuração de conexão do Prisma (schema path, datasource)

## Deploy

### Front-End (Vercel)
- **Root Directory** do projeto precisa estar configurado como `Front-End`.
- Cadastre `DATABASE_URL` e `DIRECT_URL` (do Neon) em Project Settings > Environment Variables.
- Build command padrão (`prisma generate && next build`) já cuida do resto.

### Back-End (Railway)
- Aplicação Java/Spring Boot, separada do Front-End.
- **Root Directory** do serviço no Railway configurado como `Back-End` (onde fica o `pom.xml`).
- Conecta no mesmo banco Neon via JDBC, configurado em `application.properties`.

## Contribuição
Pull requests são bem-vindos. Sugestões de melhorias: abra uma issue antes.