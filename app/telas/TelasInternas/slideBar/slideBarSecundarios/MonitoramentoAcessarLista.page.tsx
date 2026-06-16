"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo.png";
import PerfilIcon from "@/public/Perfil-Icon.png";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function AcessarLista() {
  const [sidebarAberta, setSidebarAberta] = useState(false);

  const fornecedores = [
    {
      nome: "Fornecedora Silva",
      codigo: "FNC-1021",
      estabelecimento: "Mercado União",
      imagem: PerfilIcon,
    },
    {
      nome: "Distribuidora Maxx",
      codigo: "FNC-2044",
      estabelecimento: "Atacadão Sul",
      imagem: PerfilIcon,
    },
    {
      nome: "Alimentos Bom Preço",
      codigo: "FNC-5532",
      estabelecimento: "Armazém Central",
      imagem: PerfilIcon,
    },
  ];

  const navLinks = [
    { href: "/telas/TelaPrincipal", label: "🏠 Início" },
    { href: "/telas/Produtos", label: "📦 Produtos" },
    { href: "/telas/Categorias", label: "🗂️ Categorias" },
    { href: "/telas/Movimentacoes", label: "🔄 Movimentações" },
    { href: "/telas/AcessarLista", label: "📋 Fornecedores" },
    { href: "/telas/Dashboard", label: "📊 Dashboard" },
  ];

  return (
    <div className={styleSlideBar.layoutWrapper}>
      {/* Overlay escuro quando sidebar está aberta (mobile) */}
      {sidebarAberta && (
        <div
          className={styleSlideBar.overlay}
          onClick={() => setSidebarAberta(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`${styleSlideBar.sidebar} ${
          sidebarAberta ? styleSlideBar.sidebarAberta : ""
        }`}
      >
        <div className={styleSlideBar.sidebarCabecalho}>
          <Link href="/" className={styleSlideBar.sidebarLinkLogo}>
            <Image
              className={styleSlideBar.sidebarLogo}
              src={Logo}
              alt="Logo"
              width={60}
              height={60}
            />
          </Link>
          <span className={styleSlideBar.sidebarTituloApp}>GestorX</span>

          {/* Botão fechar (mobile) */}
          <button
            className={styleSlideBar.sidebarBotaoFechar}
            onClick={() => setSidebarAberta(false)}
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>

        <nav className={styleSlideBar.sidebarNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styleSlideBar.sidebarLink} ${
                link.href === "/telas/AcessarLista"
                  ? styleSlideBar.sidebarLinkAtivo
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styleSlideBar.sidebarRodape}>
          <Link href="/telas/Perfil" className={styleSlideBar.sidebarLinkPerfil}>
            <Image
              src={PerfilIcon}
              alt="Perfil"
              width={32}
              height={32}
              className={styleSlideBar.sidebarIconePerfil}
            />
            <span>Meu Perfil</span>
          </Link>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <div className={styleSlideBar.conteudoPrincipal}>
        {/* Header */}
        <header className={styleSlideBar.paginaCabecalho}>
          {/* Botão hambúrguer (mobile) */}
          <button
            className={styleSlideBar.botaoMenu}
            onClick={() => setSidebarAberta(true)}
            aria-label="Abrir menu"
          >
            ☰
          </button>

          <h1 className={styleSlideBar.paginaTitulo}>
            Lista de Contatos / Fornecedores
          </h1>

          <div className={styleSlideBar.paginaEspacoCabecalho} />
        </header>

        {/* Botão voltar */}
        <div className={styleSlideBar.paginaLinkRetornoArea}>
          <Link
            href="/telas/TelaPrincipal"
            className={styleSlideBar.paginaLinkRetorno}
          >
            ← Voltar
          </Link>
        </div>

        {/* Cards de fornecedores */}
        <section className={styleSlideBar.paginaSecao}>
          <div className={styleSlideBar.contatosGrid}>
            {fornecedores.map((f, index) => (
              <div key={index} className={styleSlideBar.contatoCard}>
                <div className={styleSlideBar.contatoCardConteudo}>
                  <div className={styleSlideBar.contatoImagemContainer}>
                    <Image
                      src={f.imagem || PerfilIcon}
                      alt={f.nome}
                      width={200}
                      height={200}
                      className={styleSlideBar.contatoImagem}
                    />
                  </div>

                  <h2 className={styleSlideBar.contatoNome}>{f.nome}</h2>

                  <p className={styleSlideBar.contatoTexto}>
                    <b>Código:</b> {f.codigo}
                  </p>

                  <p className={styleSlideBar.contatoTextoCentralizado}>
                    <b>Estabelecimento:</b> {f.estabelecimento}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}