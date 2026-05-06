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

export default function TelaPrincipal() {
  const [activeSidebar, setActiveSidebar] = useState<null | string>(null);
  const [query, setQuery] = useState("");

  const openSidebar = (name: string) => setActiveSidebar(name);
  const closeSidebar = () => setActiveSidebar(null);

  return (
    <main className="flex w-screen min-h-screen bg-white">
      <section className="flex flex-1 flex-col">

        <header className="flex items-center justify-between bg-amber-700 text-white px-6 py-5">
          
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6 cursor-pointer hover:text-gray-400" />
          </Link>

          <AbaPesquisar query={query} setQuery={setQuery} />

          <button onClick={() => openSidebar("menu")} className="hover:opacity-80 transition-opacity">
            <Menu className="w-6 h-6 cursor-pointer hover:text-gray-300" />
          </button>
        </header>

        <div className="flex flex-1 items-center justify-center">
          <nav className="grid grid-cols-2 gap-1 space-x-5 py-3 text-center md:grid-cols-3 lg:grid-cols-4">
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
