"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowLeftRight, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function Page() {
  const router = useRouter();

  const movimentacoes = [
    { id: 1, tipo: "entrada", produto: "Arroz Tipo 1 5kg", quantidade: 80, data: "16/06/2026 11:20" },
    { id: 2, tipo: "saida", produto: "Óleo de Soja 900ml", quantidade: 24, data: "16/06/2026 08:47" },
    { id: 3, tipo: "entrada", produto: "Feijão Carioca 1kg", quantidade: 60, data: "15/06/2026 16:10" },
    { id: 4, tipo: "saida", produto: "Açúcar Cristal 1kg", quantidade: 15, data: "15/06/2026 13:55" },
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
        <p className={styleSlideBar.textoSimples}>Histórico de entradas e saídas do estoque.</p>

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
