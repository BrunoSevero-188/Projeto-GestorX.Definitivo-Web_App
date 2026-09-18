"use client";

import { useState } from "react";
import { InputandLabel } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo/GestorXpressLogo.svg";
import Link from "next/link";

import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";
import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasIniciais.module.css";

type TipoConta = "administrador" | "funcionario" | null;
type Etapa = "selecao" | "formulario";

export default function CriarUsuario() {
  const [etapa, setEtapa] = useState<Etapa>("selecao");
  const [tipoConta, setTipoConta] = useState<TipoConta>(null);

  const [form, setForm] = useState({
    // Campos base - iguais para os dois tipos de conta
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    cargo: "",
    telefone: "",

    // Campos exclusivos - Funcionario
    estabelecimento: "",
    dataAdmissao: "",

    // Campos exclusivos - Administrador
    nomeEmpresa: "",
    cnpj: "",
    nivelPermissao: "",
    departamento: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"erro" | "sucesso">("sucesso");

  function atualizar(campo: string, valor: string) {
    setForm({ ...form, [campo]: valor });
  }

  function escolherTipoConta(tipo: TipoConta) {
    setTipoConta(tipo);
    setEtapa("formulario");
    setMensagem("");
  }

  function voltarParaSelecao() {
    setEtapa("selecao");
    setTipoConta(null);
    setMensagem("");
  }

  function criarContaDemonstracao() {
    // Validação dos campos base
    if (!form.nome || !form.cpf || !form.email || !form.senha || !form.cargo || !form.telefone) {
      setTipoMensagem("erro");
      setMensagem("Preencha todos os campos basicos.");
      return;
    }

    // Validação exclusiva por tipo de conta
    if (tipoConta === "funcionario") {
      if (!form.estabelecimento) {
        setTipoMensagem("erro");
        setMensagem("Preencha o estabelecimento.");
        return;
      }
    }

    if (tipoConta === "administrador") {
      if (!form.nomeEmpresa || !form.cnpj || !form.nivelPermissao) {
        setTipoMensagem("erro");
        setMensagem("Preencha nome da empresa, CNPJ e nivel de permissao.");
        return;
      }
    }

    setTipoMensagem("sucesso");
    setMensagem(
      tipoConta === "administrador"
        ? "Usuario Administrador pronto para acessar o sistema."
        : "Usuario Funcionario pronto para acessar o sistema."
    );
  }

  return (
    <main className={styleEstrutura.containerPrincipal}>
      <div className={styleEstrutura.containerCriarUsuario}>
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
            {tipoConta
              ? `Criar Usuario (${tipoConta === "administrador" ? "Administrador" : "Funcionario"})`
              : "Criar Usuario"}
          </h1>
        </div>

        {/* ETAPA 1 - Selecao do tipo de conta */}
        {etapa === "selecao" && (
          <div className={styleEstrutura.containerSelecaoTipoConta}>
            <h2 className={styleEstrutura.subtituloSelecao}>
              Qual tipo de Conta você quer criar
            </h2>

            <div className={styleEstrutura.containerBotoesSelecao}>
              <button
                type="button"
                onClick={() => escolherTipoConta("administrador")}
                className={styleEstrutura.botaoTipoConta}
              >
                Administrador
              </button>
              <button
                type="button"
                onClick={() => escolherTipoConta("funcionario")}
                className={styleEstrutura.botaoTipoConta}
              >
                Funcionario
              </button>
            </div>
          </div>
        )}

        {/* ETAPA 2 - Formulario, so aparece apos escolher o tipo */}
        {etapa === "formulario" && (
          <>
            <button
              type="button"
              onClick={voltarParaSelecao}
              className={styleEstrutura.botaoVoltar}
            >
              ← Trocar tipo de conta
            </button>

            <div className={styleInput.containerOrdenaçãoInputs}>
              {/* Mesma estrutura de alinhamento do CadastrarUsuario */}
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
                  label="CPF"
                  value={form.cpf}
                  placeholder=" "
                  onChange={(e) => atualizar("cpf", e.target.value)}
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
                <InputandLabel
                  label="Senha"
                  value={form.senha}
                  placeholder=" "
                  onChange={(e) => atualizar("senha", e.target.value)}
                  className={styleInput.containerElementoInput}
                  containerClassName={styleInput.containerElementoContainer}
                />
                <InputandLabel
                  label="Cargo"
                  type="text"
                  value={form.cargo}
                  placeholder=" "
                  onChange={(e) => atualizar("cargo", e.target.value)}
                  className={styleInput.containerElementoInput}
                  containerClassName={styleInput.containerElementoContainer}
                />
                <InputandLabel
                  label="Telefone"
                  value={form.telefone}
                  placeholder=" "
                  onChange={(e) => atualizar("telefone", e.target.value)}
                  className={styleInput.containerElementoInput}
                  containerClassName={styleInput.containerElementoContainer}
                />

                {/* Campos exclusivos - Funcionario (Salario removido) */}
                {tipoConta === "funcionario" && (
                  <>
                    <InputandLabel
                      label="Estabelecimento"
                      value={form.estabelecimento}
                      placeholder=" "
                      onChange={(e) => atualizar("estabelecimento", e.target.value)}
                      className={styleInput.containerElementoInput}
                      containerClassName={styleInput.containerElementoContainer}
                    />
                    <InputandLabel
                      label="Data de Admissao"
                      type="date"
                      value={form.dataAdmissao}
                      placeholder=" "
                      onChange={(e) => atualizar("dataAdmissao", e.target.value)}
                      className={styleInput.containerElementoInput}
                      containerClassName={styleInput.containerElementoContainer}
                    />
                  </>
                )}

                {/* Campos exclusivos - Administrador */}
                {tipoConta === "administrador" && (
                  <>
                    <InputandLabel
                      label="Nome da Empresa"
                      value={form.nomeEmpresa}
                      placeholder=" "
                      onChange={(e) => atualizar("nomeEmpresa", e.target.value)}
                      className={styleInput.containerElementoInput}
                      containerClassName={styleInput.containerElementoContainer}
                    />
                    <InputandLabel
                      label="CNPJ"
                      value={form.cnpj}
                      placeholder=" "
                      onChange={(e) => atualizar("cnpj", e.target.value)}
                      className={styleInput.containerElementoInput}
                      containerClassName={styleInput.containerElementoContainer}
                    />
                    <InputandLabel
                      label="Departamento"
                      value={form.departamento}
                      placeholder=" "
                      onChange={(e) => atualizar("departamento", e.target.value)}
                      className={styleInput.containerElementoInput}
                      containerClassName={styleInput.containerElementoContainer}
                    />
                    <InputandLabel
                      label="Nivel de Permissao"
                      value={form.nivelPermissao}
                      placeholder=" "
                      onChange={(e) => atualizar("nivelPermissao", e.target.value)}
                      className={styleInput.containerElementoInput}
                      containerClassName={styleInput.containerElementoContainer}
                    />
                  </>
                )}
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

            <Button type="button" onClick={criarContaDemonstracao}>Criar Usuario</Button>
          </>
        )}
      </div>
    </main>
  );
}
