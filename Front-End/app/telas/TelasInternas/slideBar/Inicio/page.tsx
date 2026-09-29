"use client";

import Link from "next/link";

import {
  Boxes,
  Layers,
  Users,
  ShoppingCart,
} from "lucide-react";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function Inicio() {
  const opcoes = [
    {
      titulo: "Estoque",
      descricao: "Consultar produtos e movimentações do estoque.",
      icone: Boxes,
      caminho:
        "/telas/TelasInternas/slideBar/Estoque",
    },
    {
      titulo: "Estante",
      descricao: "Consultar os produtos disponíveis na estante.",
      icone: Layers,
      caminho:
        "/telas/TelasInternas/slideBar/Estante",
    },
    {
      titulo: "Contatos",
      descricao: "Consultar fornecedores e contatos.",
      icone: Users,
      caminho:
        "/telas/TelasInternas/slideBar/Contatos",
    },
    {
      titulo: "Realizar Venda",
      descricao: "Acessar a tela de realização de vendas.",
      icone: ShoppingCart,
      caminho:
        "/telas/TelasInternas/slideBar/RealizarVenda",
    },
  ];

  return (
    <main className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <h1 className={styleSlideBar.paginaTitulo}>
          Inicio
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
        <div className={styleSlideBar.listaAcoes}>
          {opcoes.map(
            ({
              titulo,
              descricao,
              icone: Icon,
              caminho,
            }) => (
              <Link
                key={titulo}
                href={caminho}
                className={styleSlideBar.botaoAcao}
              >
                <span
                  className={styleSlideBar.iconeAcao}
                >
                  <Icon />
                </span>

                <span>
                  <strong
                    className={
                      styleSlideBar.acaoTitulo
                    }
                  >
                    {titulo}
                  </strong>

                  <span
                    className={
                      styleSlideBar.acaoDescricao
                    }
                  >
                    {descricao}
                  </span>
                </span>
              </Link>
            )
          )}
        </div>
      </section>
    </main>
  );
}