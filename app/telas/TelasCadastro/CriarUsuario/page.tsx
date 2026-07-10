"use client";

import { useState } from "react";
import { InputandLabel } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";

import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";
import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasIniciais.module.css";

export default function CriarUsuario() { 
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cargo: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"erro" | "sucesso">("sucesso");

  function atualizar(campo: string, valor: string) {
    setForm({ ...form, [campo]: valor });
  }

  function criarContaDemonstracao() {
    if (!form.nome || !form.email || !form.cargo) {
      setTipoMensagem("erro");
      setMensagem("Preencha os campos da demonstracao.");
      return;
    }

    setTipoMensagem("sucesso");
    setMensagem("Usuario de demonstracao pronto para acessar o sistema.");
  }

  return (
    <main className={styleEstrutura.containerPrincipal}>
      <div className={styleEstrutura.containerCriarUsuario}>
        <div className={styleEstrutura.containerCabecalhoLogo}>
          <Link href="/" className={styleEstrutura.containerLinkLogo}>
            <Image
              className={styleEstrutura.containerImageLogo}
              src={Logo}
              alt="Logo"
              width={200}
              height={300}
            />
          </Link>
          <h1 className={styleEstrutura.containerLinkTexto}>Demonstracao do Sistema</h1>
        </div>

        <div className={styleInput.containerOrdenaçãoInputs}>
          <div className={styleInput.containerInputs}>
            <InputandLabel
              label="Nome Completo"
              value={form.nome}
              placeholder=" "
              onChange={(e) => atualizar("nome", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
            <InputandLabel
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
            <InputandLabel
              label="Cargo"
              value={form.cargo}
              placeholder=" "
              onChange={(e) => atualizar("cargo", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
          </div>
        </div>

        {mensagem && (
          <p
            className={
              tipoMensagem === "sucesso"
                ? styleEstrutura.mensagemSucesso
                : styleEstrutura.mensagemErro
            }
          >
            {mensagem}
          </p>
        )}

        <Button type="button" onClick={criarContaDemonstracao}>Criar Demonstracao</Button>
      </div>
    </main>
  );
}
