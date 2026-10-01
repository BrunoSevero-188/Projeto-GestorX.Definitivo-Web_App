"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  User,
  Package,
  Layers,
  Users,
} from "lucide-react";

import { dadosUsuario } from "@/components/dadosUsuario";
import ItemIconButtonTelaPrincipal from "@/components/iconButton/ItemIconButtonTelaPrincipal";
import AbaPesquisar from "@/components/abaPesquisar";

import SlideBarEstoque from "@/app/telas/TelasInternas/slideBar/Estoque/page";
import SlideBarEstante from "@/app/telas/TelasInternas/slideBar/Estante/page";
import SlideBarContatos from "@/app/telas/TelasInternas/slideBar/Contatos/page";
import SlideBarPerfil from "@/app/telas/TelasInternas/slideBar/Perfil/page";

import styles from "@/ConjuntosCss/TelasCss/TelaPrincipal.module.css";

export default function TelaPrincipal() {
  const [activeSidebar, setActiveSidebar] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const nomeConta = dadosUsuario[0].nomeCompleto;

  function openSidebar(nome: string) {
    setActiveSidebar(nome);
  }

  function closeSidebar() {
    setActiveSidebar(null);
  }

  return (
    <main className={styles.pagina}>
      <section className={styles.tela}>
        <header className={styles.cabecalho}>

          <Link
            href="/"
            className={styles.linkVoltar}
            aria-label={`Sair da conta (${nomeConta})`}
          >
            <ArrowLeft className={styles.iconeVoltar} />
            <span className={styles.textoSairConta}>
              Sair da conta ({nomeConta})
            </span>
          </Link>

          <div className={styles.pesquisa}>
            <AbaPesquisar query={query} setQuery={setQuery} />
          </div>

          <button
            type="button"
            className={styles.avatarPerfil}
            onClick={() => openSidebar("perfil")}
            aria-label="Abrir perfil"
          >
            <User className={styles.iconePerfil} />
          </button>
        </header>

        <nav className={styles.acoesPrincipais} aria-label="Áreas principais">
          <ItemIconButtonTelaPrincipal
            icon={User}
            label="Perfil"
            onClick={() => openSidebar("perfil")}
          />

          <ItemIconButtonTelaPrincipal
            icon={Package}
            label="Estoque"
            onClick={() => openSidebar("estoque")}
          />

          <ItemIconButtonTelaPrincipal
            icon={Layers}
            label="Estante"
            onClick={() => openSidebar("estante")}
          />

          <ItemIconButtonTelaPrincipal
            icon={Users}
            label="Contatos"
            onClick={() => openSidebar("contatos")}
          />
        </nav>

        {activeSidebar === "perfil" && (
          <SlideBarPerfil isOpen onClose={closeSidebar} />
        )}

        {activeSidebar === "estoque" && (
          <SlideBarEstoque isOpen onClose={closeSidebar} />
        )}

        {activeSidebar === "estante" && (
          <SlideBarEstante isOpen onClose={closeSidebar} />
        )}

        {activeSidebar === "contatos" && (
          <SlideBarContatos isOpen onClose={closeSidebar} />
        )}
      </section>
    </main>
  );
}
