"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowLeftRight, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function Page() {
  const router = useRouter();

  const movimentacoes = [
    { id: 1, tipo: "entrada", produto: "Caderno A4", quantidade: 50, data: "16/06/2026 10:42" },
    { id: 2, tipo: "saida", produto: "Caneta Azul", quantidade: 12, data: "16/06/2026 09:15" },
    { id: 3, tipo: "entrada", produto: "Borracha Branca", quantidade: 100, data: "15/06/2026 17:28" },
    { id: 4, tipo: "saida", produto: "Régua 30cm", quantidade: 5, data: "15/06/2026 14:03" },
  ];

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
        <p className={styleSlideBar.textoSimples}>Histórico de entradas e saídas de produtos.</p>

        <ul className={styleSlideBar.listaMovimentacoes}>
          {movimentacoes.map((m) => {
            const ehEntrada = m.tipo === "entrada";
            return (
              <li key={m.id} className={styleSlideBar.itemMovimentacao}>
                <div
                  className={`${styleSlideBar.iconeMovimentacao} ${
                    ehEntrada ? styleSlideBar.iconeMovimentacaoEntrada : styleSlideBar.iconeMovimentacaoSaida
                  }`}
                >
                  {ehEntrada ? <ArrowDownToLine size={20} /> : <ArrowUpFromLine size={20} />}
                </div>

                <div className={styleSlideBar.movimentacaoInfo}>
                  <strong className={styleSlideBar.movimentacaoProduto}>{m.produto}</strong>
                  <p className={styleSlideBar.movimentacaoData}>{m.data}</p>
                </div>

                <span
                  className={`${styleSlideBar.movimentacaoValor} ${
                    ehEntrada ? styleSlideBar.movimentacaoValorEntrada : styleSlideBar.movimentacaoValorSaida
                  }`}
                >
                  {ehEntrada ? "+" : "−"}
                  {m.quantidade}
                </span>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
