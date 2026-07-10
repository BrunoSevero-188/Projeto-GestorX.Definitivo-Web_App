"use client";

import { useState } from "react";
import { ArrowLeft, User, Box, ShoppingCart, Phone } from "lucide-react";
import Link from "next/link";

import SlideBarPerfil from "@/app/telas/TelasInternas/slideBar/slideBarPrincipais/Perfi.page";
import SlideBarEstoque from "@/app/telas/TelasInternas/slideBar/slideBarPrincipais/Estoque.page";
import SlideBarEstante from "@/app/telas/TelasInternas/slideBar/slideBarPrincipais/Estante.page";
import SlideBarContatos from "@/app/telas/TelasInternas/slideBar/slideBarPrincipais/Contatos.page";

import ItemIconButtonTelaPrincipal from "@/components/iconButton/ItemIconButtonTelaPrincipal";
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

          <div className={styleEstrutura.containerEspacoCabecalho} aria-hidden="true" />
        </header>

        <div className={styleEstrutura.container}>
          <nav className={styleEstrutura.containerNavIconButton}>
            <ItemIconButtonTelaPrincipal icon={User} label="Perfil" onClick={() => openSidebar("perfil")}>
              <SlideBarPerfil isOpen={activeSidebar === "perfil"} onClose={closeSidebar} />
            </ItemIconButtonTelaPrincipal>

            <ItemIconButtonTelaPrincipal icon={Box} label="Estoque" onClick={() => openSidebar("estoque")}>
              <SlideBarEstoque isOpen={activeSidebar === "estoque"} onClose={closeSidebar} />
            </ItemIconButtonTelaPrincipal>

            <ItemIconButtonTelaPrincipal icon={ShoppingCart} label="Estante" onClick={() => openSidebar("estante")}>
              <SlideBarEstante isOpen={activeSidebar === "estante"} onClose={closeSidebar} />
            </ItemIconButtonTelaPrincipal>

            <ItemIconButtonTelaPrincipal icon={Phone} label="Contatos" onClick={() => openSidebar("contatos")}>
              <SlideBarContatos isOpen={activeSidebar === "contatos"} onClose={closeSidebar} />
             </ItemIconButtonTelaPrincipal>
          </nav>
        </div>
      </section>
      
    </main>
  );
}
