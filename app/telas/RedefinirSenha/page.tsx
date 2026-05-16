"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import { InputandLabel } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import Link from "next/link";

import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";
import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasIniciais.module.css";

export default function RedefinirSenha() {
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  return (
    <main className={styleEstrutura.containerPrincipal}>
      <div className={styleEstrutura.containerRedefinirSenha}>
        <div className={styleEstrutura.containerCabecalho}>
          <Link href="/" className={styleEstrutura.containerLinkLogo}>
            <Image
              className={styleEstrutura.containerImageLogo}
              src={Logo}
              alt="Logo"
              width={200}
              height={300}
            />
          </Link>
          <h1 className={styleEstrutura.tituloCabecalho}>Redefinir Senha</h1>
        </div>

        <div className={styleInput.containerLinks}>
          <InputandLabel
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputandLabel
            label="Nova senha"
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
        </div>

        <Button onClick={() => alert(`Agora a sua senha é: ${novaSenha}`)}>Acessar</Button>
      </div>
    </main>
  );
}