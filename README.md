# GestorX

Sistema web de gerenciamento de estoque para empresas de pequeno e médio porte, desenvolvido no curso de Análise e Desenvolvimento de Sistemas do IFMS Campus Naviraí.

## Estrutura do repositório

| Pasta | O que é |
|---|---|
| `Front-End/` | Aplicação web em Next.js (App Router) + TypeScript + Tailwind + Prisma |
| `Back-End/` | API REST em Java 21 + Spring Boot (Spring Security, JPA/Hibernate) |

## Tecnologias

**Front-End:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Prisma 7, bcryptjs, Nodemailer
**Back-End:** Java 21, Spring Boot, Spring Security, Spring Data JPA, Bean Validation, Lombok, Maven
**Banco de dados:** PostgreSQL (Neon)
**Deploy:** Vercel (Front-End) e Railway (Back-End)

## Variáveis de ambiente

Nunca versione valores reais. Use `.env` / `.env.local` (Front-End) e `Back-End/config/application.properties` (ambos já no `.gitignore`).

| Onde | Variável | Uso |
|---|---|---|
| Front-End | `DATABASE_URL`, `DIRECT_URL` | Conexão Prisma com o Neon (pooled e direct) |
| Front-End | `ADM_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Envio do comprovante de venda por e-mail |
| Back-End | `DB_URL`, `DB_USER`, `DB_PASSWORD` | Conexão JDBC (padrão: Postgres local em `localhost:5432/gestorx`) |

Formato da `DB_URL` no Neon (usuário e senha vão separados em `DB_USER` e `DB_PASSWORD`):

```
jdbc:postgresql://<host-do-neon>/<banco>?sslmode=require
```

## Como rodar o Front-End

```bash
cd Front-End
npm install
npx prisma migrate dev --name init
npm run prisma:generate
npm run dev
```

Acesse http://localhost:3000. A partir do Prisma 7, a conexão fica em `prisma.config.ts` e não mais no `schema.prisma`.

## Como rodar o Back-End

Requisitos: JDK 21 e um PostgreSQL acessível (local ou Neon). O Maven Wrapper dispensa instalar o Maven.

```bash
cd Back-End
./mvnw spring-boot:run        # Windows: .\mvnw.cmd spring-boot:run
```

Para não digitar variáveis a cada terminal, crie `Back-End/config/application.properties` (ignorado pelo Git):

```properties
spring.datasource.url=jdbc:postgresql://<host>/<banco>?sslmode=require
spring.datasource.username=<usuario>
spring.datasource.password=<senha>
```

## Testes (Back-End)

Plano de Teste da disciplina **Teste de Software**, seguindo a Test Pyramid.

```bash
cd Back-End

./mvnw clean test                                   # todos (exige banco)
./mvnw test -Dtest="UsuarioServiceImplTest,ProdutoServiceImplTest,ControleAcessoUsuarioTest"   # sem banco
./mvnw test -Dtest="ProdutoControllerIntegrationTest,UsuarioControllerIntegrationTest"         # integração
./mvnw test -Dtest="TSF01FluxoProdutoTest,TSF02ControleAcessoTest"                             # sistema (API)
```

Relatórios em `Back-End/target/surefire-reports/`.

| ID | Nível | Cenário | Classe (`src/test/java/br/ifms/edu/GestorX/`) | Banco |
|---|---|---|---|---|
| TU01–TU03 | Unitário | Cadastro de usuário (válido, CPF duplicado, e-mail duplicado) | `service/UsuarioServiceImplTest` | Não |
| TU04–TU06 | Unitário | Produto (buscar existente, inexistente, atualizar) | `service/ProdutoServiceImplTest` | Não |
| TI01 | Integração | `POST /produtos` → 200 + persistência | `controller/ProdutoControllerIntegrationTest` | Sim |
| TI02 | Integração | `POST /usuarios` → 201 + persistência | `controller/UsuarioControllerIntegrationTest` | Sim |
| TSF01 | Sistema | Cadastro, login e listagem de produto (via API) | `system/TSF01FluxoProdutoTest` | Sim |
| TSF02 | Sistema | Controle de acesso por perfil (FUNCIONARIO x ADMIN) | `system/TSF02ControleAcessoTest` | Sim |
| TSNF01 | Não funcional | `GET /usuarios/{id}/detalhes`: FUNCIONARIO 403, ADMIN 200 | `security/ControleAcessoUsuarioTest` | Não |
| — | Inicialização | Contexto da aplicação sobe | `GetorXApplicationTests` | Sim |

Total: 15 testes. Os testes de sistema (TSF01 e TSF02) rodam no nível da API com MockMvc, e ainda não passam pela interface do Front-End.

## Funcionalidades

- Login, cadastro de usuários e redefinição de senha
- Controle de acesso por perfil (ADMIN e FUNCIONARIO)
- Estoque e Estante: produtos, movimentações, monitoramento e relatórios
- Fornecedores e contatos
- Realizar venda com envio de comprovante por e-mail

## Deploy

- **Front-End (Vercel):** Root Directory = `Front-End`; cadastre as variáveis do Front-End em Project Settings > Environment Variables.
- **Back-End (Railway):** Root Directory = `Back-End`; cadastre `DB_URL`, `DB_USER` e `DB_PASSWORD`.

## Pontos de melhoria conhecidos

Prioridades em andamento:

- [ ] Remover credenciais do `application.properties` e rotacionar a senha do banco
- [ ] Impedir que o cadastro público defina o perfil ADMIN (`POST /usuarios`)
- [ ] Substituir o login com contas fixas do Front-End por autenticação real, com sessão e rotas protegidas
- [ ] Corrigir o payload do comprovante de venda (`pagamentos` x `formaPagamento`)
- [ ] Integrar Front-End e Back-End (hoje o Front usa Prisma direto e o Back usa JPA)
- [ ] Trocar `Double` por `BigDecimal` em valores monetários
- [ ] Parametrizar CORS por variável de ambiente
- [ ] Adicionar testes de interface (Playwright) para TSF01 e TSF02

## Autores

Bruno Severo de Oliveira, Edigleis Pereira dos Santos e Maria Eduarda Bronzatti Mesquita.

## Contribuição

Pull requests são bem-vindos. Para sugestões maiores, abra uma issue antes.