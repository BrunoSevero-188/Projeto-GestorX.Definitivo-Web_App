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

        <div className={styleEstrutura.container}>
          <div className={styleInput.containerInputs}>
            <InputandLabel
              id="user-email"
              label="E-mail"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
            <InputandLabel
              id="user-password"
              label="Nova senha"
              type="password"
              placeholder=" "
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
          </div>

          <div className={styleEstrutura.containerConjuntoLinks}>
          {/*  <p className={styleEstrutura.containerLinks}>
              📧 Um e-mail de confirmação será enviado para o endereço informado com as instruções para redefinição da sua senha.
            </p>
            <p className={styleEstrutura.containerLinks}>
              🔒 Dica: sua nova senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e um caractere especial (ex: @, #, !).
            </p> */}
          </div>

          <Button onClick={() => alert(`Agora a sua senha é: ${novaSenha}`)}>Acessar</Button>
        </div>
      </div>
    </main>
  );
}