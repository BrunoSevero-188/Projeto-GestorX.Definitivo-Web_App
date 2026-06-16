"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";

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
          <ArrowLeft size={24} className={styleSlideBar.containerXElementoBotao} />
        </button>
        
        <h1 className={styleSlideBar.paginaTitulo}>
          <FileText size={22} style={{ verticalAlign: "middle", marginRight: 8 }} />
          Relatório
        </h1>
        
        <div className={styleSlideBar.paginaEspacoCabecalho}></div>
      </header>

      <main className={styleSlideBar.paginaSecao}>
        <div className={styleSlideBar.paginaCartaoFormulario}>
          <p className={styleSlideBar.contatoTexto}>Tela de relatórios em construção.</p>
        </div>
      </main>
    </div>
  );
}
