"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import { produtosEstoque } from "@/components/produtosEstoque";
import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function AcessarProduto() {
  const [categoria, setCategoria] = useState("");
  const [tipoBusca, setTipoBusca] = useState("");
  const [produto, setProduto] = useState("");
  const [produtosAleatorios, setProdutosAleatorios] = useState<any[]>([]);

  useEffect(() => {
    const sorteados = produtosEstoque
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setProdutosAleatorios(sorteados);
  }, []);

  return (
    <main className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <Link href="/" className={styleSlideBar.paginaLinkLogo}>
          <Image className={styleSlideBar.paginaLogo} src={Logo} alt="Logo" width={80} height={80} />
        </Link>

        <h1 className={styleSlideBar.paginaTitulo}>Acessar Produto</h1>

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
              <option value="fornecedor">Fornecedor</option>
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
            <label className={styleSlideBar.campoRotulo}>Produto:</label>
            <Input placeholder="Digite o nome ou codigo" value={produto} onChange={(e) => setProduto(e.target.value)} />
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
                <th className={styleSlideBar.tabelaCelula}>Fornecedor</th>
                <th className={styleSlideBar.tabelaCelula}>Preco</th>
              </tr>
            </thead>
            <tbody>
              {produtosAleatorios.map((p, index) => (
                <tr key={index} className={styleSlideBar.tabelaLinha}>
                  <td className={styleSlideBar.tabelaCelula}>{p.codigo}</td>
                  <td className={styleSlideBar.tabelaCelula}>{p.nome}</td>
                  <td className={styleSlideBar.tabelaCelula}>{p.categoria}</td>
                  <td className={styleSlideBar.tabelaCelula}>{p.fornecedor}</td>
                  <td className={styleSlideBar.tabelaCelula}>{p.preco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
