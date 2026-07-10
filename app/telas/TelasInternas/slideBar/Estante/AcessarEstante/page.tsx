"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import {InputandLabel} from "@/components/inputandLabel";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function AcessarEstante() {
  const [categoria, setCategoria] = useState("");
  const [tipoBusca, setTipoBusca] = useState("");
  const [item, setItem] = useState("");

  return (
    <main className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <Link href="/" className={styleSlideBar.paginaLinkLogo}>
          <Image className={styleSlideBar.paginaLogo} src={Logo} alt="Logo" width={80} height={80} />
        </Link>

        <h1 className={styleSlideBar.paginaTitulo}>Acessar Estante</h1>

        <div className={styleSlideBar.paginaEspacoCabecalho} />
      </header>

      <div className={styleSlideBar.paginaLinkRetornoArea}>
        <Link href="/telas/TelasInternas/TelaPrincipal" className={styleSlideBar.paginaLinkRetorno}>
          Voltar
        </Link>
      </div>

      <section className={styleSlideBar.paginaSecaoComEspaco}>
        <div className={styleSlideBar.filtroGrid}>
          <div className={styleSlideBar.campoFiltro}>
            <label className={styleSlideBar.campoRotulo}>Buscar por:</label>
            <select className={styleSlideBar.campoSelect} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Selecione</option>
              <option value="nome">Nome do Item</option>
              <option value="descricao">Descricao</option>
              <option value="categoria">Categoria</option>
              <option value="prateleira">Prateleira</option>
              <option value="quantidade">Quantidade</option>
            </select>
          </div>

          <div className={styleSlideBar.campoFiltro}>
            <label className={styleSlideBar.campoRotulo}>Tipo de busca:</label>
            <select className={styleSlideBar.campoSelect} value={tipoBusca} onChange={(e) => setTipoBusca(e.target.value)}>
              <option value="">Selecione</option>
              <option value="contem">Contem</option>
              <option value="igual">Igual</option>
              <option value="diferente">Diferente</option>
            </select>
          </div>

          <div className={styleSlideBar.campoFiltro}>
            <label className={styleSlideBar.campoRotulo}>Item:</label>
            <InputandLabel label="Item" placeholder="Digite o nome do item" value={item} onChange={(e) => setItem(e.target.value)} />
          </div>
 
          <div className={styleSlideBar.campoAcao}>
            <Button>Buscar</Button>
          </div>
        </div>

        <div className={styleSlideBar.tabelaContainer}>
          <table className={styleSlideBar.tabela}>
            <thead className={styleSlideBar.tabelaCabecalho}>
              <tr>
                <th className={styleSlideBar.tabelaCelula}>Nome</th>
                <th className={styleSlideBar.tabelaCelula}>Descricao</th>
                <th className={styleSlideBar.tabelaCelula}>Categoria</th>
                <th className={styleSlideBar.tabelaCelula}>Quantidade</th>
                <th className={styleSlideBar.tabelaCelula}>Prateleira</th>
              </tr>
            </thead>

            <tbody>
              <tr className={styleSlideBar.tabelaLinha}>
                <td className={styleSlideBar.tabelaCelula}>Livro A</td>
                <td className={styleSlideBar.tabelaCelula}>Edicao de 2023</td>
                <td className={styleSlideBar.tabelaCelula}>Literatura</td>
                <td className={styleSlideBar.tabelaCelula}>12</td>
                <td className={styleSlideBar.tabelaCelula}>A1</td>
              </tr>
              <tr className={styleSlideBar.tabelaLinha}>
                <td className={styleSlideBar.tabelaCelula}>Caixa de Arquivo</td>
                <td className={styleSlideBar.tabelaCelula}>Documentos fiscais</td>
                <td className={styleSlideBar.tabelaCelula}>Arquivos</td>
                <td className={styleSlideBar.tabelaCelula}>5</td>
                <td className={styleSlideBar.tabelaCelula}>B3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
