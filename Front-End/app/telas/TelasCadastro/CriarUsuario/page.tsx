"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/Logo/GestorXpressLogo.svg";
import Link from "next/link";

import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasIniciais.module.css";

export default function CriarUsuario() {
  const router = useRouter();

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

          <h1 className={styleEstrutura.containerLinkTexto}>Criar Usuario</h1>
        </div>

        <div className={styleEstrutura.containerSelecaoTipoConta}>
          <h2 className={styleEstrutura.subtituloSelecao}>
            Qual tipo de Conta você quer criar
          </h2>

          <div className={styleEstrutura.containerBotoesSelecao}>
            <button
              type="button"
              onClick={() => router.push("/telas/TelasCadastro/CriarUsuario/Administrador")}
              className={styleEstrutura.botaoTipoConta}
            >
              Administrador
            </button>

            <button
              type="button"
              onClick={() => router.push("/telas/TelasCadastro/CriarUsuario/Funcionario")}
              className={styleEstrutura.botaoTipoConta}
            >
              Funcionario
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}