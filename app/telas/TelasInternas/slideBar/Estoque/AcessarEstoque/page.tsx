"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function AcessarEstoque() {
  const [categoria, setCategoria] = useState("");
  const [tipoBusca, setTipoBusca] = useState("");
  const [produto, setProduto] = useState("");

  return (
    <main className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <Link href="/" className={styleSlideBar.paginaLinkLogo}>
          <Image className={styleSlideBar.paginaLogo} src={Logo} alt="Logo" width={80} height={80} />
        </Link>

        <h1 className={styleSlideBar.paginaTitulo}>Acessar Estoque</h1>

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
            <select
              className={styleSlideBar.campoSelect}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="nome">Nome do Produto</option>
              <option value="descricao">Descricao</option>
              <option value="categoria">Categoria</option>
              <option value="estoque_baixo">Estoque Baixo</option>
              <option value="estoque_critico">Estoque Critico</option>
              <option value="validade">Data de Validade</option>
              <option value="localizacao">Localizacao no Estoque</option>
              <option value="tipo_medicao">Tipo de Medicao (kg, un, L)</option>
            </select>
          </div>

          <div className={styleSlideBar.campoFiltro}>
            <label className={styleSlideBar.campoRotulo}>Tipo de busca:</label>
            <select
              className={styleSlideBar.campoSelect}
              value={tipoBusca}
              onChange={(e) => setTipoBusca(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="contem">Contem</option>
              <option value="igual">Igual</option>
              <option value="diferente">Diferente</option>
              <option value="maior">Maior que</option>
              <option value="menor">Menor que</option>
              <option value="entre">Entre valores</option>
            </select>
          </div>

          <div className={styleSlideBar.campoFiltro}>
            <label className={styleSlideBar.campoRotulo}>Produto:</label>
            <Input
              placeholder="Digite o nome do produto"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
            />
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
                <th className={styleSlideBar.tabelaCelula}>Data de Validade</th>
                <th className={styleSlideBar.tabelaCelula}>Localizacao</th>
                <th className={styleSlideBar.tabelaCelula}>Tipo de Medicao</th>
              </tr>
            </thead>

            <tbody>
              <tr className={styleSlideBar.tabelaLinha}>
                <td className={styleSlideBar.tabelaCelula}>Arroz Premium</td>
                <td className={styleSlideBar.tabelaCelula}>Pacote 5kg</td>
                <td className={styleSlideBar.tabelaCelula}>Alimentos</td>
                <td className={styleSlideBar.tabelaCelula}>32</td>
                <td className={styleSlideBar.tabelaCelula}>12/05/2025</td>
                <td className={styleSlideBar.tabelaCelula}>Prateleira A2</td>
                <td className={styleSlideBar.tabelaCelula}>Kg</td>
              </tr>

              <tr className={styleSlideBar.tabelaLinha}>
                <td className={styleSlideBar.tabelaCelula}>Detergente Azul</td>
                <td className={styleSlideBar.tabelaCelula}>500ml</td>
                <td className={styleSlideBar.tabelaCelula}>Limpeza</td>
                <td className={styleSlideBar.tabelaCelula}>87</td>
                <td className={styleSlideBar.tabelaCelula}>-</td>
                <td className={styleSlideBar.tabelaCelula}>Setor 3 - B</td>
                <td className={styleSlideBar.tabelaCelula}>Unidade</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
