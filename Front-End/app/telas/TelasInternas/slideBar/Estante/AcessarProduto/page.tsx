"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowLeftRight, PlusCircle, TrendingUp } from "lucide-react";

import { produtosEstante as produtosEstanteBase } from "@/components/produtosEstante";
import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

type Produto = {
  codigo: string;
  nome: string;
  categoria: string;
  fornecedor: string;
  preco: string;
  local?: string;
  quantidade?: string;
  quantidadePorUnidade?: string;
  dataValidade?: string;
};

const CAMPOS_VAZIOS = {
  codigo: "",
  nome: "",
  categoria: "",
  fornecedor: "",
  preco: "",
  local: "",
  quantidade: "",
};

const DESTINOS_MOVIMENTACAO = ["Estoque Geral", "Outra Estante", "Devolucao ao Fornecedor"];

export default function Page() {
  const router = useRouter();

  const [produtos, setProdutos] = useState<Produto[]>(produtosEstanteBase);
  
  const [movimentacoesPorCodigo] = useState<Record<string, number>>(() =>
    Object.fromEntries(produtosEstanteBase.map((p) => [p.codigo, Math.floor(Math.random() * 40)]))
  );

  const [campos, setCampos] = useState(CAMPOS_VAZIOS);
  const [mensagemCadastro, setMensagemCadastro] = useState("");

  const [produtoMovimentar, setProdutoMovimentar] = useState("");
  const [destinoMovimentar, setDestinoMovimentar] = useState(DESTINOS_MOVIMENTACAO[0]);
  const [quantidadeMovimentar, setQuantidadeMovimentar] = useState("");
  const [mensagemMovimentacao, setMensagemMovimentacao] = useState("");

  const maisMovimentados = useMemo(
    () =>
      [...produtos]
        .sort((a, b) => (movimentacoesPorCodigo[b.codigo] ?? 0) - (movimentacoesPorCodigo[a.codigo] ?? 0))
        .slice(0, 5),
    [produtos, movimentacoesPorCodigo]
  );

  function atualizarCampo(campo: keyof typeof CAMPOS_VAZIOS, valor: string) {
    setCampos((atual) => ({ ...atual, [campo]: valor }));
  }

  function cadastrarProduto(e: React.FormEvent) {
    e.preventDefault();

    if (!campos.nome || !campos.categoria || !campos.fornecedor || !campos.preco) {
      setMensagemCadastro("Preencha ao menos nome, categoria, fornecedor e preço.");
      return;
    }

    const codigo = campos.codigo.trim() || `EST-${Math.floor(1000 + Math.random() * 9000)}`;

    setProdutos((atuais) => [
      {
        codigo,
        nome: campos.nome,
        categoria: campos.categoria,
        fornecedor: campos.fornecedor,
        preco: campos.preco,
        local: campos.local,
        quantidade: campos.quantidade,
      },
      ...atuais,
    ]);

    setCampos(CAMPOS_VAZIOS);
    setMensagemCadastro("Produto adicionado à Estante com sucesso.");
  }

  function movimentarProduto(e: React.FormEvent) {
    e.preventDefault();

    if (!produtoMovimentar || !quantidadeMovimentar) {
      setMensagemMovimentacao("Selecione um produto e informe a quantidade.");
      return;
    }

    const produto = produtos.find((p) => p.codigo === produtoMovimentar);
    
    setMensagemMovimentacao(
      `${quantidadeMovimentar} unidade(s) de "${produto?.nome}" movimentadas para "${destinoMovimentar}".`
    );
    setProdutoMovimentar("");
    setQuantidadeMovimentar("");
  }

  return (
    <div className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <button onClick={() => router.back()} className={styleSlideBar.containerBotaoFechar} aria-label="Voltar">
          <ArrowLeft size={24} className={styleSlideBar.containerXElementoBotao} />
        </button>

        <h1 className={styleSlideBar.paginaTitulo}>Acessar Produto</h1>

        <div className={styleSlideBar.paginaEspacoCabecalho} />
      </header>

      <main className={styleSlideBar.paginaSecao}>
        
        <form onSubmit={cadastrarProduto} className={styleSlideBar.paginaCartaoFormulario}>
          <div className={styleSlideBar.paginaCabecalhoFormulario}>
            <h2 className={styleSlideBar.paginaTituloEscuro}>
              <PlusCircle size={20} className={styleSlideBar.paginaTituloIconeInline} />
              Adicionar Produto à Estante
            </h2>
          </div>

          <div className={styleSlideBar.formularioGrid}>
            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Código (opcional)</label>
              <input
                className={styleSlideBar.campoSelect}
                placeholder="Ex: EST-0099"
                value={campos.codigo}
                onChange={(e) => atualizarCampo("codigo", e.target.value)}
              />
            </div>

            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Nome do produto</label>
              <input
                className={styleSlideBar.campoSelect}
                value={campos.nome}
                onChange={(e) => atualizarCampo("nome", e.target.value)}
              />
            </div>

            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Categoria</label>
              <input
                className={styleSlideBar.campoSelect}
                value={campos.categoria}
                onChange={(e) => atualizarCampo("categoria", e.target.value)}
              />
            </div>

            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Fornecedor</label>
              <input
                className={styleSlideBar.campoSelect}
                value={campos.fornecedor}
                onChange={(e) => atualizarCampo("fornecedor", e.target.value)}
              />
            </div>

            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Preço</label>
              <input
                className={styleSlideBar.campoSelect}
                placeholder="Ex: R$ 9,90"
                value={campos.preco}
                onChange={(e) => atualizarCampo("preco", e.target.value)}
              />
            </div>

            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Local na Estante</label>
              <input
                className={styleSlideBar.campoSelect}
                placeholder="Ex: Corredor 3, Prateleira B"
                value={campos.local}
                onChange={(e) => atualizarCampo("local", e.target.value)}
              />
            </div>

            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Quantidade</label>
              <input
                className={styleSlideBar.campoSelect}
                placeholder="Ex: 24"
                value={campos.quantidade}
                onChange={(e) => atualizarCampo("quantidade", e.target.value)}
              />
            </div>
          </div>

          {mensagemCadastro && <p className={styleSlideBar.mensagemSucesso}>{mensagemCadastro}</p>}

          <button type="submit" className={styleSlideBar.botaoConfirmar}>
            Adicionar Produto
          </button>
        </form>

        <div className={styleSlideBar.paginaCartaoFormulario}>
          <div className={styleSlideBar.paginaCabecalhoFormulario}>
            <h2 className={styleSlideBar.paginaTituloEscuro}>
              <TrendingUp size={20} className={styleSlideBar.paginaTituloIconeInline} />
              Produtos Mais Movimentados
            </h2>
          </div>

          <div className={styleSlideBar.tabelaContainer}>
            <table className={styleSlideBar.tabela}>
              <thead className={styleSlideBar.tabelaCabecalho}>
                <tr>
                  <th className={styleSlideBar.tabelaCelula}>Código</th>
                  <th className={styleSlideBar.tabelaCelula}>Produto</th>
                  <th className={styleSlideBar.tabelaCelula}>Local</th>
                  <th className={styleSlideBar.tabelaCelula}>Quantidade</th>
                  <th className={styleSlideBar.tabelaCelula}>Movimentações</th>
                </tr>
              </thead>
              <tbody>
                {maisMovimentados.map((produto) => (
                  <tr key={produto.codigo} className={styleSlideBar.tabelaLinha}>
                    <td className={styleSlideBar.tabelaCelula}>{produto.codigo}</td>
                    <td className={styleSlideBar.tabelaCelula}>{produto.nome}</td>
                    <td className={styleSlideBar.tabelaCelula}>{produto.local ?? "—"}</td>
                    <td className={styleSlideBar.tabelaCelula}>{produto.quantidade ?? "—"}</td>
                    <td className={styleSlideBar.tabelaCelula}>{movimentacoesPorCodigo[produto.codigo] ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Movimentação de produtos para outras partes */}
        <form onSubmit={movimentarProduto} className={styleSlideBar.paginaCartaoFormulario}>
          <div className={styleSlideBar.paginaCabecalhoFormulario}>
            <h2 className={styleSlideBar.paginaTituloEscuro}>
              <ArrowLeftRight size={20} className={styleSlideBar.paginaTituloIconeInline} />
              Movimentar Produto
            </h2>
          </div>

          <div className={styleSlideBar.formularioGrid}>
            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Produto</label>
              <select
                className={styleSlideBar.campoSelect}
                value={produtoMovimentar}
                onChange={(e) => setProdutoMovimentar(e.target.value)}
              >
                <option value="">Selecione um produto</option>
                {produtos.map((produto) => (
                  <option key={produto.codigo} value={produto.codigo}>
                    {produto.nome} ({produto.codigo})
                  </option>
                ))}
              </select>
            </div>

            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Destino</label>
              <select
                className={styleSlideBar.campoSelect}
                value={destinoMovimentar}
                onChange={(e) => setDestinoMovimentar(e.target.value)}
              >
                {DESTINOS_MOVIMENTACAO.map((destino) => (
                  <option key={destino} value={destino}>
                    {destino}
                  </option>
                ))}
              </select>
            </div>

            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Quantidade</label>
              <input
                className={styleSlideBar.campoSelect}
                placeholder="Ex: 10"
                value={quantidadeMovimentar}
                onChange={(e) => setQuantidadeMovimentar(e.target.value)}
              />
            </div>
          </div>

          {mensagemMovimentacao && <p className={styleSlideBar.mensagemSucesso}>{mensagemMovimentacao}</p>}

          <button type="submit" className={styleSlideBar.botaoConfirmar}>
            Movimentar Produto
          </button>
        </form>
      </main>
    </div>
  );
}