"use client";

import { useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/ConjuntosCss/TelasCss/CadastrarUsuario.module.css";

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
    <main className={styles.mainCadastrar}>
      <div className={styles.painelCadastrar}>
        <div className={styles.containerCabecalho}>
          <Image
            className={styles.containerImagem}
            src={Logo}
            alt="Logo"
            width={200}
            height={300}
          />
          <h1 className={styles.tituloCabecalho}>Cadastrar Usuario</h1>
        </div>

        <div className={styles.containerInputs}>
          <Input
            id="user-email"
            label="E-mail"
            type="email"
            placeholder=" "
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={styles.containerElementoInput}
            containerClassName={styles.containerElementoContainer}
          />

          <Input
            id="user-password"
            label="Senha"
            type="password"
            placeholder=" "
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            className={styles.containerElementoInput}
            containerClassName={styles.containerElementoContainer}
          />

        </div>

        <div className={styles.containerConjuntoLinks}>
          <Link href="/telas/CriarUsuario" className={styles.containerLinks}>
            Criar Novo Usuario
          </Link>
          <Link href="/telas/RedefinirSenha" className={styles.containerLinks}>
            Redefinir Senha
          </Link>
        </div>

        <Button onClick={entrar}>Cadastrar</Button>
      </div>
    </main>
  );
}
