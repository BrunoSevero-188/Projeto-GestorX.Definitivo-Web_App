"use client";

import { useState } from "react";
import { InputandLabel } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import LinkInfo from "@/components/linkInfo";
import Image from "next/image";

import Logo from "@/public/Logo/GestorXpressLogo.svg";

import { useRouter } from "next/navigation";

import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasIniciais.module.css";
import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";
import styleLinkInfo from "@/ConjuntosCss/ComponentesCss/LinksInfo.module.css";

export default function CadastrarUsuario() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"erro" | "sucesso">("erro");
  const [carregando, setCarregando] = useState(false);

  function entrar() {
    setMensagem("");
    setCarregando(true);

    if (form.email !== "admin123@gmail" || form.senha !== "admin4gora") {
      setTipoMensagem("erro");
      setMensagem("E-mail ou senha incorretos.");
      setCarregando(false);
      return;
    }

    setTipoMensagem("sucesso");
    setMensagem("Login realizado com sucesso!");

    setTimeout(() => {
      router.push("/telas/TelasInternas/TelaPrincipal");
    }, 900);
  }

  return (
    <main className={styleEstrutura.containerPrincipal}>
      <div className={styleEstrutura.containerCadastrar}>
        <div className={styleEstrutura.containerCabecalho}>
          <Image
            className={styleEstrutura.containerImagem}
            src={Logo}
            alt="Logo"
            width={200}
            height={300}
          />
          <h1 className={styleEstrutura.tituloCabecalho}>Cadastrar Usuario</h1>
        </div>

        <div className={styleInput.containerInputs}>
          <InputandLabel
            id="user-email"
            label="E-mail"
            type="email"
            placeholder=" "
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={styleInput.containerElementoInput}
            containerClassName={styleInput.containerElementoContainer}
          />
          <InputandLabel
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

        <div className={styleLinkInfo.containerConjuntoLinks}>
          <LinkInfo modo="link" href="/telas/TelasCadastro/CriarUsuario" text="Criar Novo Usuario" />
          <LinkInfo modo="link" href="/telas/TelasCadastro/RedefinirSenha" text="Redefinir Senha" />
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

        <Button type="button" onClick={entrar} disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </Button>
      </div>
    </main>
  );
}