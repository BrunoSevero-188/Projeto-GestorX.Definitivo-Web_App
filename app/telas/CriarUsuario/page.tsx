"use client";

import { useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import style from "@/ConjuntoCss/ComponentesCss/CriarUsuario.module.css";

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
    <main className={style.containerMain}>
      <div className={style.containerCriarUsuario}>
        <div className={style.containerCabecalhoLogo}>
          <Link href="/" className={style.containerLinkLogo}>
            <Image
              className={style.containerImageLogo}
              src={Logo}
              alt="Logo"
              width={200}
              height={300}
            />
          </Link>
          <h1 className={style.containerLinkTexto}>Criar Novo Usuario</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-5">
            <Input
              label="Nome Completo"
              value={form.nome}
              onChange={(e) => atualizar("nome", e.target.value)}
            />

            <Input
              label="CPF"
              value={form.cpf}
              onChange={(e) => atualizar("cpf", e.target.value)}
            />

            <Input
              label="E-mail"
              type="email"
              value={form.email}
              onChange={(e) => atualizar("email", e.target.value)}
            />
          </div>

          <div className="space-y-5">
            <Input
              label="Senha"
              type="password"
              value={form.senha}
              onChange={(e) => atualizar("senha", e.target.value)}
            />

            <Input
              label="Cargo"
              value={form.cargo}
              onChange={(e) => atualizar("cargo", e.target.value)}
            />

            <Input
              label="Estabelecimento"
              value={form.estabelecimento}
              onChange={(e) => atualizar("estabelecimento", e.target.value)}
            />
          </div>
        </div>

        <Button onClick={criarConta}>Criar Conta</Button>
      </div>
    </main>
  );
}
