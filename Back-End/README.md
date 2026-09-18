# 🚧 GestorXpress

Sistema web para gerenciamento de estoque desenvolvido como projeto acadêmico, aplicando conceitos de desenvolvimento Full Stack com Spring Boot, PostgreSQL e Next.js.

---

# 🚀 Sobre o Projeto

O GestorXpress foi criado com o objetivo de auxiliar pequenas e médias empresas no controle de estoque, produtos, fornecedores e usuários, aplicando conceitos de arquitetura em camadas, segurança, integração frontend/backend e persistência de dados.

O projeto está sendo desenvolvido como parte do Trabalho de Conclusão de Curso (TCC), evoluindo continuamente com novas funcionalidades.

---

# 📚 Conceitos Aplicados

* Arquitetura em Camadas
* APIs REST
* Spring Security
* DTO (Data Transfer Object)
* Tratamento Global de Exceções
* Persistência com JPA/Hibernate
* Relacionamentos entre Entidades
* Integração Frontend ↔ Backend
* React / Next.js
* PostgreSQL
* Controle de Acesso por Perfil
* Boas Práticas de Desenvolvimento

---

# 🏗️ Arquitetura Geral

```text
Frontend (Next.js)
        │
        ▼
Backend (Spring Boot)
        │
        ▼
 PostgreSQL
```

---

# 📂 Estrutura Backend

```text
GestorX
│
├── config
│
├── controller
│   ├── UsuarioController
│   ├── ProdutoController
│   └── FornecedorController
│
├── dto
│
├── enums
│
├── exception
│
├── model
│   ├── Usuario
│   ├── Produto
│   ├── Fornecedor
│   └── FornecedorProduto
│
├── repository
│
├── securityConfig
│
├── service
│
└── GestorXApplication
```

---

# 📂 Estrutura Frontend

```text
app
│
├── telas
│
├── componentes
│
├── conjuntosCss
│
├── hooks
│
└── public
```

---

# 🔐 Segurança Implementada

Atualmente o sistema utiliza:

* Spring Security
* Basic Authentication
* Controle de acesso por perfil
* Usuários ADMIN
* Usuários FUNCIONARIO
* Proteção de endpoints

---

# 👥 Perfis de Usuário

```java
ADMIN
FUNCIONARIO
```

### ADMIN

Possui acesso total ao sistema.

### FUNCIONARIO

Possui acesso limitado conforme as regras de negócio.

---

# 📦 Módulo Produto

Entidade Produto:

```java
Produto
├── id
├── codigo
├── nome
├── marca
├── preco
├── quantidade
├── estoqueMinimo
└── categoria
```

Categorias disponíveis:

```java
ELETRONICA
ALIMENTO
ROUPA
LIMPEZA
OUTROS
```

---

# 🔌 Funcionalidades Implementadas

## Backend

✅ Cadastro de Usuários

✅ Consulta de Usuários

✅ Cadastro de Produtos

✅ Consulta de Produtos

✅ Atualização de Produtos

✅ Exclusão de Produtos

✅ Cadastro de Fornecedores

✅ Relacionamento Fornecedor-Produto

✅ DTOs

✅ Tratamento Global de Exceções

✅ Spring Security

✅ Controle de Perfis

---

## Frontend

✅ Tela de Login

✅ Tela de Demonstração

✅ Cadastro de Usuários

✅ Navegação por Sidebar

✅ Tela Acessar Estoque

✅ Tela Acessar Produto

✅ Cadastro de Produto integrado ao Backend

✅ Consumo de API REST

✅ Exibição dinâmica de produtos cadastrados

✅ Integração com autenticação

---

# 🛠️ Tecnologias Utilizadas

## Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* Maven
* PostgreSQL
* Lombok

## Frontend

* Next.js
* React
* TypeScript
* CSS Modules
* Lucide React

---

# ▶️ Executando o Projeto

## Backend

```bash
git clone https://github.com/Edigleis2022/gestorx.git

cd gestorx

mvn spring-boot:run
```

Backend disponível em:

```text
http://localhost:8080
```

---

## Frontend

```bash
cd gestorx-web

npm install

npm run dev
```

Frontend disponível em:

```text
http://localhost:3000
```

---

# 🚧 Funcionalidades em Desenvolvimento

* Cadastro completo de Estoque
* Movimentação de Estoque
* Relatórios
* Monitoramento
* Dashboard Principal
* Controle avançado de permissões
* Melhorias na experiência do usuário

---

# 📌 Status do Projeto

🚧 Em desenvolvimento

Projeto acadêmico Full Stack desenvolvido para consolidação de conhecimentos em:

* Java
* Spring Boot
* Segurança
* Banco de Dados
* React
* Next.js
* Arquitetura de Software

---

# 👨‍🎓 Autores

* Edigleis Pereira dos Santos
* Bruno Severo de Oliveira
* Maria Eduarda Bronzatti Mesquita
