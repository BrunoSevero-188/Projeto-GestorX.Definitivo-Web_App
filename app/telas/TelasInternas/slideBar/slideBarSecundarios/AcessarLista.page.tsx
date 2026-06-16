"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo.png";
import PerfilIcon from "@/public/Perfil-Icon.png";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function AcessarLista() {
  const fornecedores = [
    {
      nome: "Fornecedora Silva",
      codigo: "FNC-1021",
      estabelecimento: "Mercado Uniao",
      imagem: PerfilIcon,
    },
    {
      nome: "Distribuidora Maxx",
      codigo: "FNC-2044",
      estabelecimento: "Atacadao Sul",
      imagem: PerfilIcon,
    },
    {
      nome: "Alimentos Bom Preco",
      codigo: "FNC-5532",
      estabelecimento: "Armazem Central",
      imagem: PerfilIcon,
    },
  ];

  return (
    <main className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <Link href="/" className={styleSlideBar.paginaLinkLogo}>
          <Image
            className={styleSlideBar.paginaLogo}
            src={Logo}
            alt="Logo"
            width={80}
            height={80}
          />
        </Link>

        <h1 className={styleSlideBar.paginaTitulo}>
          Lista de Contatos / Fornecedores
        </h1>

        <div className={styleSlideBar.paginaEspacoCabecalho} />
      </header>

      <div className={styleSlideBar.paginaLinkRetornoArea}>
        <Link href="/telas/TelaPrincipal" className={styleSlideBar.paginaLinkRetorno}>
          Voltar
        </Link>
      </div>

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
                  <b>Codigo:</b> {f.codigo}
                </p>

                <p className={styleSlideBar.contatoTextoCentralizado}>
                  <b>Estabelecimento:</b> {f.estabelecimento}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}