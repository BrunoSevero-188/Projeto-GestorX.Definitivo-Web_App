"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { InputandLabel } from "@/components/inputandLabel";  
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function AcessarProduto() {
  const [categoria, setCategoria] = useState("");
  const [tipoBusca, setTipoBusca] = useState("");
  const [produto, setProduto] = useState("");

  return (
    <main className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <Link href="/" className={styleSlideBar.paginaLinkLogo}>
          <Image className={styleSlideBar.paginaLogo} src={Logo} alt="Logo" width={80} height={80} />
        </Link>

        <h1 className={styleSlideBar.paginaTitulo}>Acessar Produto da Estante</h1>

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
            <label className={styleSlideBar.campoRotulo}>Filtrar por:</label>
            <select className={styleSlideBar.campoSelect} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Selecione</option>
              <option value="nome">Nome do Produto</option>
              <option value="codigo">Codigo do Produto</option>
              <option value="categoria">Categoria</option>
              <option value="marca">Marca</option>
              <option value="fornecedor">Fornecedor</option>
              <option value="preco">Faixa de Preco</option>
            </select>
          </div>

          <div className={styleSlideBar.campoFiltro}>
            <label className={styleSlideBar.campoRotulo}>Tipo de busca:</label>
            <select className={styleSlideBar.campoSelect} value={tipoBusca} onChange={(e) => setTipoBusca(e.target.value)}>
              <option value="">Selecione</option>
              <option value="contem">Contem</option>
              <option value="igual">Igual</option>
              <option value="inicia">Inicia com</option>
              <option value="termina">Termina com</option>
            </select>
          </div>

          <div className={styleSlideBar.campoFiltro}>
            <label className={styleSlideBar.campoRotulo}>Produto:</label>
            <InputandLabel label="Produto" placeholder="Digite nome, codigo ou categoria" value={produto} onChange={(e) => setProduto(e.target.value)} />
          </div>

          <div className={styleSlideBar.campoAcao}>
            <Button>Buscar</Button>
          </div>
        </div>

        <div className={styleSlideBar.tabelaContainer}>
          <table className={styleSlideBar.tabela}>
            <thead className={styleSlideBar.tabelaCabecalho}>
              <tr>
                <th className={styleSlideBar.tabelaCelula}>Codigo</th>
                <th className={styleSlideBar.tabelaCelula}>Nome</th>
                <th className={styleSlideBar.tabelaCelula}>Categoria</th>
                <th className={styleSlideBar.tabelaCelula}>Marca</th>
                <th className={styleSlideBar.tabelaCelula}>Preco</th>
              </tr>
            </thead>

            <tbody>
              <tr className={styleSlideBar.tabelaLinha}>
                <td className={styleSlideBar.tabelaCelula}>EST-1023</td>
                <td className={styleSlideBar.tabelaCelula}>Caixa de Cha</td>
                <td className={styleSlideBar.tabelaCelula}>Bebidas Quentes</td>
                <td className={styleSlideBar.tabelaCelula}>Cha Real</td>
                <td className={styleSlideBar.tabelaCelula}>R$ 9,90</td>
              </tr>

              <tr className={styleSlideBar.tabelaLinha}>
                <td className={styleSlideBar.tabelaCelula}>EST-3055</td>
                <td className={styleSlideBar.tabelaCelula}>Sabonete Premium</td>
                <td className={styleSlideBar.tabelaCelula}>Higiene</td>
                <td className={styleSlideBar.tabelaCelula}>Pure Skin</td>
                <td className={styleSlideBar.tabelaCelula}>R$ 5,75</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
