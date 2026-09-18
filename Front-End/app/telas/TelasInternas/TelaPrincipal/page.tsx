"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  Menu,
  X,
  User,
  Package,
  Layers,
  Users,
  ShoppingCart,
} from "lucide-react";

import { dadosUsuario } from "@/components/dadosUsuario";
import ItemIconButtonTelaPrincipal from "@/components/iconButton/ItemIconButtonTelaPrincipal";
import AbaPesquisar from "@/components/abaPesquisar";

import SlideBarEstoque from "@/app/telas/TelasInternas/slideBar/slideBarPrincipais/Estoque.page";
import SlideBarEstante from "@/app/telas/TelasInternas/slideBar/slideBarPrincipais/Estante.page";
import SlideBarContatos from "@/app/telas/TelasInternas/slideBar/slideBarPrincipais/Contatos.page";

import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasInternas.module.css";

export default function TelaPrincipal() {
  const router = useRouter();

  const [activeSidebar, setActiveSidebar] = useState<string | null>(null);

  const [query, setQuery] = useState("");

  const [menuAberto, setMenuAberto] = useState(false);

  const nomeConta = dadosUsuario[0].nomeCompleto;

  function openSidebar(nome: string) {
    setActiveSidebar(nome);
  }

  function closeSidebar() {
    setActiveSidebar(null);
  }

  function toggleMenu() {
    setMenuAberto((aberto) => !aberto);
  }

  function abrirEFechar(nome: string) {
    openSidebar(nome);
    setMenuAberto(false);
  }

  return (
    <main className={styleEstrutura.containerPrincipal}>
      <section className={styleEstrutura.containerTelaPrincipal}>

        <header className={styleEstrutura.cabecalhoTelaPrincipal}>

          <Link
            href="/"
            className={styleEstrutura.containerLinkTelaPrincipal}
          >
            <ArrowLeft
              className={styleEstrutura.containerFlechaRetorno}
            />

            <span className={styleEstrutura.textoSairConta}>
              Sair da conta ({nomeConta})
            </span>
          </Link>

          <AbaPesquisar
            query={query}
            setQuery={setQuery}
          />

          <button
            type="button"
            className={styleEstrutura.botaoMenuMobile}
            onClick={toggleMenu}
            aria-label={
              menuAberto
                ? "Fechar menu"
                : "Abrir menu"
            }
          >
            {menuAberto ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>

          <button
            type="button"
            className={styleEstrutura.avatarPerfil}
            onClick={() => abrirEFechar("perfil")}
          >
            <User />
          </button>

        </header>


        <nav className={styleEstrutura.containerBotoesPrincipais}>

          <ItemIconButtonTelaPrincipal
            icon={Package}
            label="Estoque"
            onClick={() => abrirEFechar("estoque")}
          />

          <ItemIconButtonTelaPrincipal
            icon={Layers}
            label="Estante"
            onClick={() => abrirEFechar("estante")}
          />

          <ItemIconButtonTelaPrincipal
            icon={Users}
            label="Contatos"
            onClick={() => abrirEFechar("contatos")}
          />

          <ItemIconButtonTelaPrincipal
            icon={ShoppingCart}
            label="Realizar Venda"
            onClick={() => abrirEFechar("realizarVenda")}
          />

        </nav>


        {/* OPÇÕES DOS BOTÕES */}

        {activeSidebar === "estoque" && (
          <SlideBarEstoque
          isOpen={true}
            onClose={closeSidebar}
          />
        )}

        {activeSidebar === "estante" && (
          <SlideBarEstante
          isOpen={true}
            onClose={closeSidebar}
          />
        )}

        {activeSidebar === "contatos" && (
          <SlideBarContatos
          isOpen={true}
            onClose={closeSidebar}
          />
        )}

      </section>
    </main>
  );
}