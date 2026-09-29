"use client";

import Link from "next/link";

import { Layers } from "lucide-react";

import { produtosEstante } from "@/components/produtosEstante";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

function formatarValidade(data?: string) {
  if (!data) {
    return "—";
  }

  const [ano, mes, dia] = data.split("-");

  if (!ano || !mes || !dia) {
    return data;
  }

  return `${dia}/${mes}/${ano}`;
}

export default function AcessarEstante() {
  return (
    <main className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <h1 className={styleSlideBar.paginaTitulo}>
          <Layers
            className={styleSlideBar.paginaTituloIcone}
          />
          Acessar Estante
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
        <div className={styleSlideBar.tabelaContainer}>
          <table className={styleSlideBar.tabela}>
            <thead
              className={styleSlideBar.tabelaCabecalho}
            >
              <tr>
                <th className={styleSlideBar.tabelaCelula}>
                  Codigo
                </th>

                <th className={styleSlideBar.tabelaCelula}>
                  Produto
                </th>

                <th className={styleSlideBar.tabelaCelula}>
                  Categoria
                </th>

                <th className={styleSlideBar.tabelaCelula}>
                  Fornecedor
                </th>

                <th className={styleSlideBar.tabelaCelula}>
                  Qtd./Unidade
                </th>

                <th className={styleSlideBar.tabelaCelula}>
                  Validade
                </th>

                <th className={styleSlideBar.tabelaCelula}>
                  Preco
                </th>
              </tr>
            </thead>

            <tbody>
              {produtosEstante.map((produto) => (
                <tr
                  key={produto.codigo}
                  className={
                    styleSlideBar.tabelaLinha
                  }
                >
                  <td
                    className={
                      styleSlideBar.tabelaCelula
                    }
                  >
                    {produto.codigo}
                  </td>

                  <td
                    className={
                      styleSlideBar.tabelaCelula
                    }
                  >
                    {produto.nome}
                  </td>

                  <td
                    className={
                      styleSlideBar.tabelaCelula
                    }
                  >
                    {produto.categoria}
                  </td>

                  <td
                    className={
                      styleSlideBar.tabelaCelula
                    }
                  >
                    {produto.fornecedor}
                  </td>

                  <td
                    className={
                      styleSlideBar.tabelaCelula
                    }
                  >
                    {produto.quantidadePorUnidade || "—"}
                  </td>

                  <td
                    className={
                      styleSlideBar.tabelaCelula
                    }
                  >
                    {formatarValidade(
                      produto.dataValidade
                    )}
                  </td>

                  <td
                    className={
                      styleSlideBar.tabelaCelula
                    }
                  >
                    {produto.preco}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}