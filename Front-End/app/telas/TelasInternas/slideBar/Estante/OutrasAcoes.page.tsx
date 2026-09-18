"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MoreHorizontal, Download, Upload, Trash2, Settings } from "lucide-react";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function Page() {
  const router = useRouter();

  const acoes = [
    { titulo: "Exportar dados", descricao: "Baixar planilha CSV com todos os produtos", icone: Download, cor: "#4f46e5" },
    { titulo: "Importar dados", descricao: "Carregar planilha CSV para o sistema", icone: Upload, cor: "#16a34a" },
    { titulo: "Configurações", descricao: "Ajustar preferências da estante", icone: Settings, cor: "#64748b" },
    { titulo: "Limpar estante", descricao: "Remover todos os produtos (atenção!)", icone: Trash2, cor: "#dc2626" },
  ];

  return (
    <div className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <button onClick={() => router.back()} className={styleSlideBar.containerBotaoFechar} aria-label="Voltar">
          <ArrowLeft size={24} className={styleSlideBar.containerXElementoBotao} />
        </button>

        <h1 className={styleSlideBar.paginaTitulo}>
          <MoreHorizontal size={22} className={styleSlideBar.paginaTituloIconeInline} />
          Outras Ações
        </h1>

        <div className={styleSlideBar.paginaEspacoCabecalho} />
      </header>

      <main className={styleSlideBar.paginaSecao}>
        <p className={styleSlideBar.textoSimples}>Ferramentas adicionais para gerenciar sua estante.</p>

        <div className={styleSlideBar.listaAcoes}>
          {acoes.map(({ titulo, descricao, icone: Icone, cor }) => (
            <button
              key={titulo}
              onClick={() => alert(`Ação: ${titulo}`)}
              className={styleSlideBar.botaoAcao}
            >
              <div className={styleSlideBar.iconeAcao} style={{ backgroundColor: `${cor}1a` }}>
                <Icone size={22} color={cor} />
              </div>
              <div>
                <strong className={styleSlideBar.acaoTitulo}>{titulo}</strong>
                <span className={styleSlideBar.acaoDescricao}>{descricao}</span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
