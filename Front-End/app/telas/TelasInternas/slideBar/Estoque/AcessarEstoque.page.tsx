"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function Page() {
  const router = useRouter();

  return (
    <div className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <button
          onClick={() => router.back()}
          className={styleSlideBar.containerBotaoFechar}
          aria-label="Voltar"
        >
          <ArrowLeft
            size={24}
            className={styleSlideBar.containerXElementoBotao}
          />
        </button>

        <div className={styleSlideBar.paginaTitulo} />

        <div className={styleSlideBar.paginaEspacoCabecalho} />
      </header>

      <main className={styleSlideBar.paginaSecao}>
        {/* Conteúdo específico da página será colocado aqui */}
      </main>
    </div>
  );
}