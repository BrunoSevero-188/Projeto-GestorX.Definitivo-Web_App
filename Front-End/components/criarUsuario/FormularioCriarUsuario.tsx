"use client";

import { useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo/GestorXpressLogo.svg";

import { InputandLabel } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import {
  camposPorTipo,
  rotaCriarUsuario,
  tituloPorTipo,
  type NomeCampo,
  type TipoConta,
} from "@/components/criarUsuario/camposUsuario";

import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";
import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasIniciais.module.css";
import styleFormulario from "@/ConjuntosCss/TelasCss/EstruturaCriarUsuario.module.css";

interface Props {
  tipoConta: TipoConta;
}

export default function FormularioCriarUsuario({ tipoConta }: Props) {
  const router = useRouter();
  const campos = camposPorTipo[tipoConta];

  const [form, setForm] = useState<Record<NomeCampo, string>>({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    cargo: "",
    telefone: "",
    estabelecimento: "",
    dataAdmissao: "",
    nomeEmpresa: "",
    cnpj: "",
    departamento: "",
    nivelPermissao: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"erro" | "sucesso">(
    "sucesso"
  );

  function atualizar(campo: NomeCampo, valor: string) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  function criarContaDemonstracao() {
    const faltando = campos.filter(
      (campo) => campo.obrigatorio !== false && !form[campo.name].trim()
    );

    if (faltando.length > 0) {
      setTipoMensagem("erro");
      setMensagem(
        `Preencha: ${faltando.map((campo) => campo.label).join(", ")}.`
      );
      return;
    }

    setTipoMensagem("sucesso");
    setMensagem(
      tipoConta === "administrador"
        ? "Usuario Administrador pronto para acessar o sistema."
        : "Usuario Funcionario pronto para acessar o sistema."
    );
  }

  function lidarComEnter(e: KeyboardEvent<HTMLElement>) {
    if (e.key !== "Enter") return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    e.preventDefault();
    criarContaDemonstracao();
  }

  return (
    <main
      className={styleEstrutura.containerPrincipal}
      onKeyDown={lidarComEnter}
    >
      <div className={styleFormulario.containerFormularioUsuario}>
        <div className={styleEstrutura.containerCabecalhoLogo}>
          <Link href="/" className={styleEstrutura.containerLinkLogo}>
            <Image
              className={styleEstrutura.containerImagem}
              src={Logo}
              alt="Logo"
              width={200}
              height={300}
            />
          </Link>

          <h1 className={styleEstrutura.containerLinkTexto}>
            {tituloPorTipo[tipoConta]}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => router.push(rotaCriarUsuario)}
          className={styleEstrutura.botaoVoltar}
        >
          ← Trocar tipo de conta
        </button>

        <div className={styleInput.containerOrdenaçãoInputs}>
          <div className={styleInput.containerInputs}>
            {campos.map((campo) => (
              <InputandLabel
                key={campo.name}
                id={`campo-${campo.name}`}
                label={campo.label}
                type={campo.type ?? "text"}
                value={form[campo.name]}
                placeholder=" "
                onChange={(e) => atualizar(campo.name, e.target.value)}
                className={styleInput.containerElementoInput}
                containerClassName={styleInput.containerElementoContainer}
              />
            ))}
          </div>
        </div>

        <div className={styleFormulario.containerAcoes}>
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

          <Button type="button" onClick={criarContaDemonstracao}>
            Criar Usuario
          </Button>
        </div>
      </div>
    </main>
  );
}