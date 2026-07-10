"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import { InputandLabel } from "@/components/inputandLabel";
import LinkInfo from "@/components/linkInfo";
import { Button } from "@/components/button";
import Link from "next/link";

import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasIniciais.module.css";
import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";
import styleLinkInfo from "@/ConjuntosCss/ComponentesCss/LinksInfo.module.css";

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

          <div className={styleLinkInfo.containerConjuntoInfo}>
            <LinkInfo
              modo="icone"
              icon="📧"
              text="Um e-mail de confirmação será enviado com as instruções para redefinição da sua senha."
            />
            <LinkInfo
              modo="icone"
              icon="🔒"
              text="Dica: mínimo 8 caracteres, com maiúsculas, minúsculas, números e um caractere especial (ex: @, #, !)."
            />
          </div>

          <Button onClick={() => alert(`Agora a sua senha é: ${novaSenha}`)}>Acessar</Button>
        </div>
      </div>
    </main>
  );
}
