# GestorX Web

Sistema web para gerenciar operações de estoque/estantes, usuários e movimentações.

## Tecnologias
- **Next.js (App Router)**
- **TypeScript**
- **Prisma** (banco de dados)
- **Tailwind CSS**

## Requisitos
- Node.js
- Banco de dados configurado no **Prisma**
- Variáveis de ambiente (conforme `prisma/schema.prisma`)

## Como rodar localmente
1) Instale as dependências:
```bash
npm install
```

2) Gere o Prisma (e/ou faça as migrations, se necessário):
```bash
npm run prisma:generate
# (opcional)
npm run prisma:migrate
```

3) Inicie o servidor de desenvolvimento:
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

## Deploy
Você pode deployar em qualquer plataforma compatível com Next.js.

## Contribuição
Pull requests são bem-vindos. Sugestões de melhorias: abra uma issue antes.