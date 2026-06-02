"use client";

import { useState } from "react";
import { ArrowLeft, Menu, User, Box, ShoppingCart, Phone } from "lucide-react";
import Link from "next/link";
import SlideBarMenu from "../slideBar/Menu/page";
import SlideBarPerfil from "../slideBar/Perfil/page";
import SlideBarEstoque from "../slideBar/Estoque/page";
import SlideBarEstante from "../slideBar/Estante/page";
import SlideBarContatos from "../slideBar/Contatos/page";
import { IconButtonTelaPrincipal } from "@/components/iconButton";
import AbaPesquisar from "@/components/abaPesquisar";

import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasInternas.module.css";

export default function TelaPrincipal() {
  const [activeSidebar, setActiveSidebar] = useState<null | string>(null);
  const [query, setQuery] = useState("");

  const openSidebar = (name: string) => setActiveSidebar(name);
  const closeSidebar = () => setActiveSidebar(null);

  return (
    <main className={styleEstrutura.containerPrincipal}>
      <section className={styleEstrutura.containerTelaPrincipal}>

        <header className={styleEstrutura.cabecalhoTelaPrincipal}>
          
          <Link href="/" className={styleEstrutura.containerLinkTelaPrincipal}>
            <ArrowLeft className={styleEstrutura.containerFlechaRetorno} />
          </Link>

          <AbaPesquisar query={query} setQuery={setQuery} />

          <button onClick={() => openSidebar("menu")} className={styleEstrutura.containerBotaoMenu}>
            <Menu className="w-6 h-6 cursor-pointer hover:text-gray-300" />
          </button>
        </header>

        <div className={styleEstrutura.container}>
          <nav className={styleEstrutura.containerNavIconButton}>
            <IconButtonTelaPrincipal icon={User} label="Perfil" onClick={() => openSidebar("perfil")} />
            <IconButtonTelaPrincipal icon={Box} label="Estoque" onClick={() => openSidebar("estoque")} />
            <IconButtonTelaPrincipal icon={ShoppingCart} label="Estante" onClick={() => openSidebar("estante")} />
            <IconButtonTelaPrincipal icon={Phone} label="Contatos" onClick={() => openSidebar("contatos")} />
          </nav>
        </div>
      </section>

      <SlideBarMenu isOpen={activeSidebar === "menu"} onClose={closeSidebar} />
      <SlideBarPerfil isOpen={activeSidebar === "perfil"} onClose={closeSidebar} />
      <SlideBarEstoque isOpen={activeSidebar === "estoque"} onClose={closeSidebar} />
      <SlideBarEstante isOpen={activeSidebar === "estante"} onClose={closeSidebar} />
      <SlideBarContatos isOpen={activeSidebar === "contatos"} onClose={closeSidebar}  />

    </main>
  );
}
