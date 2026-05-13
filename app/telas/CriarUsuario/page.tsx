"use client";

import { useState } from "react";
import { Input } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import styleCriarUsuario from "@/ConjuntosCss/TelasCss/CriarUsuario.module.css";
import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";

export default function CriarUsuario() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    cargo: "",
    estabelecimento: "",
  });

  function atualizar(campo: string, valor: string) {
    setForm({ ...form, [campo]: valor });
  }

  async function criarConta() {
    const response = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error ?? "Nao foi possivel criar o usuario.");
      return;
    }

    alert("Novo usuario criado com sucesso!");
  }

  return (
    <main className={styleCriarUsuario.containerPrincipal}>
      <div className={styleCriarUsuario.containerCriarUsuario}>
        <div className={styleCriarUsuario.containerCabecalhoLogo}>
          <Link href="/" className={styleCriarUsuario.containerLinkLogo}>
            <Image
              className={styleCriarUsuario.containerImageLogo}
              src={Logo}
              alt="Logo"
              width={200}
              height={300}
            />
          </Link>
          <h1 className={styleCriarUsuario.containerLinkTexto}>Criar Novo Usuario</h1>
        </div>

        <div className={styleInput.containerOrdenaçãoInputs}>
          <div className={styleInput.containerInputs}>
            <Input
              label="Nome Completo"
              value={form.nome}
              placeholder=" "
              onChange={(e) => atualizar("nome", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />

            <Input
              label="CPF"
              value={form.cpf}
              placeholder=" "
              onChange={(e) => atualizar("cpf", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />

            <Input
              label="E-mail"
              type="email"
              value={form.email}
              placeholder=" "
              onChange={(e) => atualizar("email", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
          </div>

          <div className={styleInput.containerInputs}>
            <Input
              label="Senha"
              type="password"
              value={form.senha}
              placeholder=" "
              onChange={(e) => atualizar("senha", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />

            <Input
              label="Cargo"
              value={form.cargo}
              placeholder=" "
              onChange={(e) => atualizar("cargo", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />

            <Input
              label="Estabelecimento"
              value={form.estabelecimento}
              placeholder=" "
              onChange={(e) => atualizar("estabelecimento", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
          </div>
        </div>

        <Button onClick={criarConta}>Criar Conta</Button>
      </div>
    </main>
  );
}