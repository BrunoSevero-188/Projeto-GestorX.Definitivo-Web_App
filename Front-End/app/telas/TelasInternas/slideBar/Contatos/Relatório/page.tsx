"use client";

import Link from "next/link";
import {
  BarChart3,
  FileText,
  Users,
} from "lucide-react";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function RelatorioContatos() {
  return (
    <main className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <h1 className={styleSlideBar.paginaTitulo}>
          <FileText
            className={styleSlideBar.paginaTituloIcone}
          />
          Relatorio - Contatos
        </h1>

        <div className={styleSlideBar.paginaEspacoCabecalho} />
      </header>

      <div className={styleSlideBar.paginaLinkRetornoArea}>
        <Link
          href="/telas/TelasInternas/TelaPrincipal"
          className={styleSlideBar.paginaLinkRetorno}
        >
          Voltar
        </Link>
      </div>

      <section className={styleSlideBar.paginaSecaoComEspaco}>
        <div className={styleSlideBar.gradeIndicadores}>
          <article
            className={styleSlideBar.cartaoIndicador}
          >
            <Users
              className={styleSlideBar.indicadorIcone}
            />

            <span
              className={styleSlideBar.indicadorLabel}
            >
              Registros
            </span>

            <strong
              className={styleSlideBar.indicadorValor}
            >
              3
            </strong>
          </article>

          <article
            className={styleSlideBar.cartaoIndicador}
          >
            <BarChart3
              className={styleSlideBar.indicadorIcone}
            />

            <span
              className={styleSlideBar.indicadorLabel}
            >
              Atualizacoes
            </span>

            <strong
              className={styleSlideBar.indicadorValor}
            >
              12
            </strong>
          </article>
        </div>
      </section>
    </main>
  );
}