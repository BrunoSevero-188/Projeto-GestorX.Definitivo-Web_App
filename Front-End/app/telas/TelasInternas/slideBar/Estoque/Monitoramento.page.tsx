"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Activity, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function Page() {
  const router = useRouter();

  const indicadores = [
    { label: "Itens em estoque", valor: "1.248", icone: CheckCircle2, cor: "#16a34a" },
    { label: "Alertas ativos", valor: "3", icone: AlertCircle, cor: "#dc2626" },
    { label: "Movimentações hoje", valor: "27", icone: TrendingUp, cor: "#4f46e5" },
  ];

  return (
    <div className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <button onClick={() => router.back()} className={styleSlideBar.containerBotaoFechar} aria-label="Voltar">
          <ArrowLeft size={24} className={styleSlideBar.containerXElementoBotao} />
        </button>

        <h1 className={styleSlideBar.paginaTitulo}>
          <Activity size={22} className={styleSlideBar.paginaTituloIconeInline} />
          Monitoramento
        </h1>

        <div className={styleSlideBar.paginaEspacoCabecalho} />
      </header>

      <main className={styleSlideBar.paginaSecao}>
        <p className={styleSlideBar.textoSimples}>
          Acompanhe em tempo real os principais indicadores do seu estoque.
        </p>

        <section className={styleSlideBar.gradeIndicadores}>
          {indicadores.map(({ label, valor, icone: Icone, cor }) => (
            <div key={label} className={styleSlideBar.cartaoIndicador}>
              <Icone className={styleSlideBar.indicadorIcone} color={cor} />
              <span className={styleSlideBar.indicadorLabel}>{label}</span>
              <strong className={styleSlideBar.indicadorValor}>{valor}</strong>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}