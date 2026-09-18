"use client";

import { useState, useMemo, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ReceiptText, Plus, CheckCircle2 } from "lucide-react";

import { produtosEstante } from "@/components/produtosEstante";
import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";
import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";

type ItemVenda = {
  codigo: string;
  nome: string;
  precoUnitario: number;
  quantidade: number;
};

const FORMAS_PAGAMENTO = ["Dinheiro", "Cartão Débito", "Cartão Crédito", "Vale Alimentação", "Pix"];

function parsePreco(preco: string): number {
  // "R$ 8,90" -> 8.90
  const limpo = preco.replace("R$", "").trim().replace(".", "").replace(",", ".");
  return parseFloat(limpo) || 0;
}

function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

export default function RealizarVenda() {
  const router = useRouter();
  const [itens, setItens] = useState<ItemVenda[]>([]);
  const [formaPagamento, setFormaPagamento] = useState<string | null>(null);
  const [vendaFinalizada, setVendaFinalizada] = useState(false);
  const [codigoDigitado, setCodigoDigitado] = useState("");
  const [erroCodigo, setErroCodigo] = useState("");

  function adicionarProduto(produto: (typeof produtosEstante)[number]) {
    setItens((atuais) => {
      const existente = atuais.find((i) => i.codigo === produto.codigo);
      if (existente) {
        return atuais.map((i) =>
          i.codigo === produto.codigo ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [
        ...atuais,
        {
          codigo: produto.codigo,
          nome: produto.nome,
          precoUnitario: parsePreco(produto.preco),
          quantidade: 1,
        },
      ];
    });
  }

  function adicionarPorCodigo(e: FormEvent) {
    e.preventDefault();

    const codigo = codigoDigitado.trim().toUpperCase();
    if (!codigo) return;

    const produto = produtosEstante.find((p) => p.codigo.toUpperCase() === codigo);

    if (!produto) {
      setErroCodigo(`Nenhum produto encontrado com o código "${codigoDigitado}".`);
      return;
    }

    adicionarProduto(produto);
    setCodigoDigitado("");
    setErroCodigo("");
  }

  function alterarQuantidade(codigo: string, delta: number) {
    setItens((atuais) =>
      atuais
        .map((i) => (i.codigo === codigo ? { ...i, quantidade: i.quantidade + delta } : i))
        .filter((i) => i.quantidade > 0)
    );
  }

  const total = useMemo(
    () => itens.reduce((soma, i) => soma + i.precoUnitario * i.quantidade, 0),
    [itens]
  );

  const [enviandoComprovante, setEnviandoComprovante] = useState(false);
  const [comprovanteEnviado, setComprovanteEnviado] = useState(false);
  const [erroComprovante, setErroComprovante] = useState("");

  async function finalizarVenda() {
    // TODO: quando existir a API de vendas, registrar aqui (itens, forma de
    // pagamento, total) e dar baixa no estoque automaticamente (RF009).
    setVendaFinalizada(true);
    setEnviandoComprovante(true);
    setErroComprovante("");

    try {
      const resposta = await fetch("/api/enviar-comprovante", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itens, formaPagamento, total }),
      });

      if (!resposta.ok) {
        throw new Error("Falha ao enviar");
      }

      setComprovanteEnviado(true);
    } catch {
      setErroComprovante(
        "Não foi possível enviar o comprovante por e-mail para o ADM. A venda foi registrada normalmente."
      );
    } finally {
      setEnviandoComprovante(false);
    }
  }

  if (vendaFinalizada) {
    return (
      <main className={styleSlideBar.paginaPrincipalCentralizada}>
        <div className={styleSlideBar.paginaCartaoFormulario}>
          <div className={`${styleSlideBar.confirmacaoIcone} ${styleSlideBar.confirmacaoIconeNeutro}`}>
            <CheckCircle2 size={26} />
          </div>
          <h1 className={styleSlideBar.paginaTituloEscuro}>Venda Finalizada</h1>
          <p className={styleSlideBar.confirmacaoTexto}>
            Venda de {formatarPreco(total)} registrada via {formaPagamento}.
          </p>

          {enviandoComprovante && (
            <p className={styleSlideBar.confirmacaoTexto}>Enviando comprovante por e-mail...</p>
          )}

          {!enviandoComprovante && comprovanteEnviado && (
            <p className={styleSlideBar.mensagemSucesso}>
              ✓ Comprovante de compra enviado para o e-mail do ADM.
            </p>
          )}

          {!enviandoComprovante && erroComprovante && (
            <p className={styleSlideBar.mensagemErro}>{erroComprovante}</p>
          )}

          <div className={styleSlideBar.confirmacaoBotoes}>
            <button
              type="button"
              className={styleSlideBar.botaoConfirmar}
              onClick={() => router.push("/telas/TelasInternas/TelaPrincipal")}
            >
              Voltar para a Tela Principal
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <button
          onClick={() => router.push("/telas/TelasInternas/TelaPrincipal")}
          className={styleSlideBar.containerBotaoFechar}
          aria-label="Voltar"
        >
          <ArrowLeft size={24} className={styleSlideBar.containerXElementoBotao} />
        </button>

        <h1 className={styleSlideBar.paginaTitulo}>
          <ReceiptText size={22} className={styleSlideBar.paginaTituloIconeInline} />
          Realizar Venda
        </h1>

        <div className={styleSlideBar.paginaEspacoCabecalho} />
      </header>

      <main className={styleSlideBar.paginaSecao}>
        <div className={styleSlideBar.vendaLayout}>
          {/* Lista de produtos disponíveis para adicionar à venda */}
          <section className={styleSlideBar.vendaProdutos}>
            <form onSubmit={adicionarPorCodigo} className={styleInput.containerElementoContainer}>
              <label htmlFor="codigoProduto" className={styleSlideBar.campoRotulo}>
                Código do produto
              </label>
              <div className={styleSlideBar.vendaCodigoLinha}>
                <div className={styleSlideBar.vendaCodigoInputWrapper}>
                  <input
                    id="codigoProduto"
                    type="text"
                    placeholder="Ex: EST-0011"
                    value={codigoDigitado}
                    onChange={(e) => {
                      setCodigoDigitado(e.target.value);
                      setErroCodigo("");
                    }}
                    className={styleInput.containerElementoInput}
                  />
                </div>
                <button type="submit" className={styleSlideBar.botaoAdicionarCodigo}>
                  Adicionar
                </button>
              </div>
              {erroCodigo && <p className={styleSlideBar.vendaCodigoErro}>{erroCodigo}</p>}
            </form>

            {produtosEstante.map((produto) => (
              <div key={produto.codigo} className={styleSlideBar.vendaItemProduto}>
                <div className={styleSlideBar.vendaProdutoInfo}>
                  <strong className={styleSlideBar.vendaProdutoNome}>{produto.nome}</strong>
                  <span className={styleSlideBar.vendaProdutoDetalhe}>
                    {produto.codigo} · {produto.categoria}
                  </span>
                </div>

                <span className={styleSlideBar.vendaProdutoPreco}>{produto.preco}</span>

                <button
                  type="button"
                  className={styleSlideBar.botaoAdicionarProduto}
                  onClick={() => adicionarProduto(produto)}
                  aria-label={`Adicionar ${produto.nome} à venda`}
                >
                  <Plus size={18} />
                </button>
              </div>
            ))}
          </section>

          {/* Nota fiscal — itens registrados para o cliente */}
          <aside className={styleSlideBar.notaFiscal}>
            <h2 className={styleSlideBar.notaFiscalTitulo}>Nota Fiscal</h2>

            {itens.length === 0 ? (
              <p className={styleSlideBar.notaFiscalVazia}>
                Nenhum produto adicionado ainda. Clique no + ao lado de um produto.
              </p>
            ) : (
              <div className={styleSlideBar.notaFiscalLista}>
                {itens.map((item) => (
                  <div key={item.codigo} className={styleSlideBar.notaFiscalItem}>
                    <span className={styleSlideBar.notaFiscalItemNome}>{item.nome}</span>

                    <span className={styleSlideBar.notaFiscalItemQtd}>
                      <button
                        type="button"
                        className={styleSlideBar.botaoQtd}
                        onClick={() => alterarQuantidade(item.codigo, -1)}
                        aria-label={`Diminuir quantidade de ${item.nome}`}
                      >
                        −
                      </button>
                      {item.quantidade}
                      <button
                        type="button"
                        className={styleSlideBar.botaoQtd}
                        onClick={() => alterarQuantidade(item.codigo, 1)}
                        aria-label={`Aumentar quantidade de ${item.nome}`}
                      >
                        +
                      </button>
                    </span>

                    <span className={styleSlideBar.notaFiscalItemSubtotal}>
                      {formatarPreco(item.precoUnitario * item.quantidade)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className={styleSlideBar.notaFiscalTotal}>
              <span>Total</span>
              <span>{formatarPreco(total)}</span>
            </div>

            <div>
              <p className={styleSlideBar.formasPagamentoTitulo}>Forma de pagamento</p>
              <div className={styleSlideBar.formasPagamentoGrid}>
                {FORMAS_PAGAMENTO.map((forma) => (
                  <button
                    key={forma}
                    type="button"
                    onClick={() => setFormaPagamento(forma)}
                    className={`${styleSlideBar.botaoFormaPagamento} ${
                      formaPagamento === forma ? styleSlideBar.botaoFormaPagamentoAtiva : ""
                    }`}
                  >
                    {forma}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={styleSlideBar.botaoFinalizarVenda}
              disabled={itens.length === 0 || !formaPagamento}
              onClick={finalizarVenda}
            >
              Finalizar Venda
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}
