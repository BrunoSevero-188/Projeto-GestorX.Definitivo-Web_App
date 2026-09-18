"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowLeftRight } from "lucide-react";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function Movimentacao() {
  const router = useRouter();

  return (
    <div className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <button onClick={() => router.back()} className={styleSlideBar.containerBotaoFechar} aria-label="Voltar">
          <ArrowLeft size={24} className={styleSlideBar.containerXElementoBotao} />
        </button>

        <h1 className={styleSlideBar.paginaTitulo}>
          <ArrowLeftRight size={22} className={styleSlideBar.paginaTituloIconeInline} />
          Movimentação
        </h1>

        <div className={styleSlideBar.paginaEspacoCabecalho} />
      </header>

      <main className={styleSlideBar.paginaSecao}>
        <div className={styleSlideBar.paginaCartaoFormulario}>
          <p className={styleSlideBar.textoSimples}>Selecione uma opção no menu para ver os detalhes.</p>
        </div>
      </main>
    </div>
  );
}
