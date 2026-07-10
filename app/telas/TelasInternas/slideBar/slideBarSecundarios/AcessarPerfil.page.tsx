"use client";

import Image from "next/image";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import PerfilIcon from "@/public/Perfil-Icon.png";
import Logo from "@/public/Logo.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { dadosUsuario } from "@/components/dadosUsuario";
import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function AcessarPerfil() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(dadosUsuario[0]);

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * dadosUsuario.length);
    setUsuario(dadosUsuario[aleatorio]);
  }, []);

  return (
    <main className={styleSlideBar.paginaPrincipalCentralizada}>
      <div className={styleSlideBar.paginaCartaoFormulario}>
        <div className={styleSlideBar.paginaCabecalhoFormulario}>
          <Link href="/" className={styleSlideBar.paginaLinkLogo}>
            <Image
              className={styleSlideBar.paginaLogo}
              src={Logo}
              alt="Logo"
              width={120}
              height={220}
            />
          </Link>

          <h1 className={styleSlideBar.paginaTituloEscuro}>Acessar Perfil</h1>

          <Image
            className={styleSlideBar.perfilImagem}
            src={PerfilIcon}
            alt="Icone de Perfil"
            width={115}
            height={115}
          />
        </div>

        <div className={styleSlideBar.formularioGrid}>
          <Input label="Nome Completo" value={usuario.nomeCompleto} readOnly />
          <Input label="Nome do Perfil" value={usuario.nomePerfil} readOnly />
          <Input label="CPF" value={usuario.cpf} readOnly />
          <Input label="E-mail" value={usuario.email} readOnly />
          <Input label="Cargo" value={usuario.cargo} readOnly />
          <Input label="Estabelecimento" value={usuario.estabelecimento} readOnly />
        </div>

        <div className={styleSlideBar.perfilAcoes}>
          <Button onClick={() => router.push("/telas/TelasCadastro/CriarUsuario")}>
            Adicionar Nova Conta
          </Button>

          <Button onClick={() => router.push("/telas/slideBar/Perfil/EditarPerfil")}>
            Editar Conta
          </Button>
        </div>
      </div>
    </main>
  );
}