"use client";

import { useState } from "react";
import { Input } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styleCadastrar from "@/ConjuntosCss/TelasCss/CadastrarUsuario.module.css";
import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";

export default function CadastrarUsuario() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  async function entrar() {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error ?? "Nao foi possivel acessar sua conta.");
      return;
    }

    router.push("/telas/TelaPrincipal");
  }

  return (
    <main className={styleCadastrar.containerPrincipal}>
      <div className={styleCadastrar.painelCadastrar}>
        <div className={styleCadastrar.containerCabecalho}>
          <Image
            className={styleCadastrar.containerImagem}
            src={Logo}
            alt="Logo"
            width={200}
            height={300}
          />
          <h1 className={styleCadastrar.tituloCabecalho}>Cadastrar Usuario</h1>
        </div>

        <div className={styleInput.containerInputs}>
          <Input
            id="user-email"
            label="E-mail"
            type="email"
            placeholder=" "
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={styleInput.containerElementoInput}
            containerClassName={styleInput.containerElementoContainer}
          />

          <Input
            id="user-password"
            label="Senha"
            type="password"
            placeholder=" "
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            className={styleInput.containerElementoInput}
            containerClassName={styleInput.containerElementoContainer}
          />

        </div>

        <div className={styleCadastrar.containerConjuntoLinks}>
          <Link href="/telas/CriarUsuario" className={styleCadastrar.containerLinks}>
            Criar Novo Usuario
          </Link>
          <Link href="/telas/RedefinirSenha" className={styleCadastrar.containerLinks}>
            Redefinir Senha
          </Link>
        </div>

        <Button onClick={entrar}>Cadastrar</Button>
      </div>
    </main>
  );
}