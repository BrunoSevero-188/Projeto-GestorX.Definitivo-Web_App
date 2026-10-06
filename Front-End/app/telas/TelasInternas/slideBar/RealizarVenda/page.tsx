"use client";

import { useMemo, useState, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ReceiptText, Plus, CheckCircle2 } from "lucide-react";

import { produtosEstante } from "@/components/produtosEstante";
import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";
import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";

type ProdutoEstante = (typeof produtosEstante)[number];

type ItemVenda = {
  codigo: string;
  nome: string;
  precoUnitario: number;
  quantidade: number;
  pesoKg?: number;
  unidade: "unidade" | "kg";
};

type PagamentoVenda = {
  forma: string;
  valor: number;
};

const FORMAS_PAGAMENTO = [
  "Dinheiro",
  "Cartão Débito",
  "Cartão Crédito",
  "Vale Alimentação",
  "Pix",
];

const CATEGORIAS_POR_PESO = [
  "frutas",
  "fruta",
  "legumes",
  "legume",
  "hortifruti",
  "hortaliças",
  "hortalicas",
  "verduras",
  "verdura",
];

function parsePreco(preco: string): number {
  const limpo = preco
    .replace("R$", "")
    .trim()
    .replace(".", "")
    .replace(",", ".");

  return parseFloat(limpo) || 0;
}

function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function identificarUnidade(
  produto: ProdutoEstante
): "unidade" | "kg" {
  const texto =
    `${produto.categoria} ${produto.nome} ${produto.quantidadePorUnidade}`.toLowerCase();

  const porPeso =
    CATEGORIAS_POR_PESO.some((categoria) =>
      texto.includes(categoria)
    ) ||
    /(?:^|\s)kg(?:\s|$)/i.test(
      produto.quantidadePorUnidade
    );

  return porPeso ? "kg" : "unidade";
}

function separarPesquisaQuantidade(valor: string) {
  const match = valor.match(
    /^(.*?)(?:\*(\d+(?:[.,]\d+)?))?$/
  );

  if (!match) {
    return {
      pesquisa: valor.trim(),
      quantidade: 1,
    };
  }

  const pesquisa = match[1].trim();

  const quantidade = match[2]
    ? Number(match[2].replace(",", "."))
    : 1;

  return {
    pesquisa,
    quantidade: quantidade > 0 ? quantidade : 1,
  };
}

export default function RealizarVenda() {
  const router = useRouter();

  const [itens, setItens] = useState<ItemVenda[]>([]);
  const [vendaFinalizada, setVendaFinalizada] = useState(false);

  const [codigoDigitado, setCodigoDigitado] = useState("");
  const [erroCodigo, setErroCodigo] = useState("");
  const [mostrarSugestoes, setMostrarSugestoes] =
    useState(false);

  const [produtoPendentePeso, setProdutoPendentePeso] =
    useState<ProdutoEstante | null>(null);

  const [pesoDigitado, setPesoDigitado] = useState("");
  const [erroPeso, setErroPeso] = useState("");

  const [pagamentos, setPagamentos] = useState<
    PagamentoVenda[]
  >([]);

  const [enviandoComprovante, setEnviandoComprovante] =
    useState(false);

  const [comprovanteEnviado, setComprovanteEnviado] =
    useState(false);

  const [erroComprovante, setErroComprovante] =
    useState("");

  const { pesquisa, quantidade } = useMemo(
    () => separarPesquisaQuantidade(codigoDigitado),
    [codigoDigitado]
  );

  const sugestoesProdutos = useMemo(() => {
    const termo = pesquisa.toLowerCase();

    if (!termo) {
      return produtosEstante.slice(0, 6);
    }

    return produtosEstante
      .filter(
        (produto) =>
          produto.nome.toLowerCase().includes(termo) ||
          produto.codigo.toLowerCase().includes(termo) ||
          produto.categoria.toLowerCase().includes(termo)
      )
      .slice(0, 6);
  }, [pesquisa]);

  function adicionarProduto(
    produto: ProdutoEstante,
    quantidadeInformada = 1,
    pesoKg?: number
  ) {
    const unidade = identificarUnidade(produto);

    setItens((atuais) => {
      const existente = atuais.find(
        (item) => item.codigo === produto.codigo
      );

      if (existente) {
        return atuais.map((item) => {
          if (item.codigo !== produto.codigo) {
            return item;
          }

          return {
            ...item,

            quantidade:
              unidade === "kg"
                ? item.quantidade +
                  (pesoKg ?? quantidadeInformada)
                : item.quantidade + quantidadeInformada,

            pesoKg:
              unidade === "kg"
                ? (item.pesoKg ?? 0) +
                  (pesoKg ?? quantidadeInformada)
                : undefined,
          };
        });
      }

      const quantidadeFinal =
        unidade === "kg"
          ? pesoKg ?? quantidadeInformada
          : quantidadeInformada;

      return [
        ...atuais,
        {
          codigo: produto.codigo,
          nome: produto.nome,
          precoUnitario: parsePreco(produto.preco),
          quantidade: quantidadeFinal,
          pesoKg:
            unidade === "kg"
              ? quantidadeFinal
              : undefined,
          unidade,
        },
      ];
    });
  }

  function prepararProduto(
    produto: ProdutoEstante,
    quantidadeInformada = 1
  ) {
    setErroCodigo("");

    if (identificarUnidade(produto) === "kg") {
      setProdutoPendentePeso(produto);
      setPesoDigitado("");
      setErroPeso("");
      setMostrarSugestoes(false);
      return;
    }

    adicionarProduto(produto, quantidadeInformada);

    setCodigoDigitado("");
    setMostrarSugestoes(false);
  }

  function adicionarPorCodigo(e?: FormEvent) {
    e?.preventDefault();

    const codigoOuNome = pesquisa.trim();

    if (!codigoOuNome) {
      return;
    }

    const produto =
      produtosEstante.find(
        (item) =>
          item.codigo.toLowerCase() ===
          codigoOuNome.toLowerCase()
      ) ??
      produtosEstante.find(
        (item) =>
          item.nome.toLowerCase() ===
          codigoOuNome.toLowerCase()
      );

    if (!produto) {
      setErroCodigo(
        `Nenhum produto encontrado para "${codigoOuNome}". Digite o nome ou código e escolha uma sugestão.`
      );

      return;
    }

    prepararProduto(produto, quantidade);
  }

  function confirmarPeso() {
    if (!produtoPendentePeso) {
      return;
    }

    const peso = Number(
      pesoDigitado.replace(",", ".")
    );

    if (!peso || peso <= 0) {
      setErroPeso("Informe um peso válido em kg.");
      return;
    }

    adicionarProduto(
      produtoPendentePeso,
      1,
      peso
    );

    setProdutoPendentePeso(null);
    setPesoDigitado("");
    setCodigoDigitado("");
    setErroPeso("");
  }

  function lidarComTeclaPesquisa(
    e: KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Escape") {
      setMostrarSugestoes(false);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (produtoPendentePeso) {
        confirmarPeso();
        return;
      }

      adicionarPorCodigo();
    }
  }

  function alterarQuantidade(
    codigo: string,
    delta: number
  ) {
    setItens((atuais) =>
      atuais
        .map((item) => {
          if (item.codigo !== codigo) {
            return item;
          }

          const novaQuantidade =
            item.quantidade + delta;

          return {
            ...item,
            quantidade: novaQuantidade,
            pesoKg:
              item.unidade === "kg"
                ? novaQuantidade
                : undefined,
          };
        })
        .filter(
          (item) => item.quantidade > 0
        )
    );
  }

  const total = useMemo(
    () =>
      itens.reduce(
        (soma, item) =>
          soma +
          item.precoUnitario *
            item.quantidade,
        0
      ),
    [itens]
  );

  const totalPago = useMemo(
    () =>
      pagamentos.reduce(
        (soma, pagamento) =>
          soma + pagamento.valor,
        0
      ),
    [pagamentos]
  );

  const restantePagamento = Math.max(
    total - totalPago,
    0
  );

  const troco = Math.max(
    totalPago - total,
    0
  );

  const pagamentoCompleto =
    total > 0 &&
    Math.abs(totalPago - total) < 0.01;

  function selecionarFormaPagamento(
    forma: string
  ) {
    setPagamentos((atuais) => {
      const existente = atuais.find(
        (pagamento) =>
          pagamento.forma === forma
      );

      if (existente) {
        return atuais.filter(
          (pagamento) =>
            pagamento.forma !== forma
        );
      }

      return [
        ...atuais,
        {
          forma,
          valor: restantePagamento,
        },
      ];
    });
  }

  function alterarValorPagamento(
    forma: string,
    valorDigitado: string
  ) {
    const valor = Number(
      valorDigitado.replace(",", ".")
    );

    setPagamentos((atuais) =>
      atuais.map((pagamento) =>
        pagamento.forma === forma
          ? {
              ...pagamento,
              valor:
                Number.isFinite(valor) &&
                valor >= 0
                  ? valor
                  : 0,
            }
          : pagamento
      )
    );
  }

  function preencherValorTotal(
    forma: string
  ) {
    setPagamentos((atuais) =>
      atuais.map((pagamento) =>
        pagamento.forma === forma
          ? {
              ...pagamento,
              valor: Math.max(
                total -
                  atuais
                    .filter(
                      (item) =>
                        item.forma !== forma
                    )
                    .reduce(
                      (soma, item) =>
                        soma + item.valor,
                      0
                    ),
                0
              ),
            }
          : pagamento
      )
    );
  }

  async function finalizarVenda() {
    if (!pagamentoCompleto) {
      return;
    }

    setVendaFinalizada(true);
    setEnviandoComprovante(true);
    setErroComprovante("");

    try {
      const resposta = await fetch(
        "/api/enviar-comprovante",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itens,
            pagamentos,
            total,
          }),
        }
      );

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
      <main
        className={
          styleSlideBar.paginaPrincipalCentralizada
        }
      >
        <div
          className={
            styleSlideBar.paginaCartaoFormulario
          }
        >
          <div
            className={`${styleSlideBar.confirmacaoIcone} ${styleSlideBar.confirmacaoIconeNeutro}`}
          >
            <CheckCircle2 size={26} />
          </div>

          <h1
            className={
              styleSlideBar.paginaTituloEscuro
            }
          >
            Venda Finalizada
          </h1>

          <p
            className={
              styleSlideBar.confirmacaoTexto
            }
          >
            Venda de {formatarPreco(total)}{" "}
            registrada.
          </p>

          <div
            className={
              styleSlideBar.pagamentosConfirmacao
            }
          >
            {pagamentos.map((pagamento) => (
              <p
                key={pagamento.forma}
                className={
                  styleSlideBar.confirmacaoTexto
                }
              >
                {pagamento.forma}:{" "}
                {formatarPreco(
                  pagamento.valor
                )}
              </p>
            ))}
          </div>

          {troco > 0 && (
            <p
              className={
                styleSlideBar.mensagemSucesso
              }
            >
              Troco: {formatarPreco(troco)}
            </p>
          )}

          {enviandoComprovante && (
            <p
              className={
                styleSlideBar.confirmacaoTexto
              }
            >
              Enviando comprovante por
              e-mail...
            </p>
          )}

          {!enviandoComprovante &&
            comprovanteEnviado && (
              <p
                className={
                  styleSlideBar.mensagemSucesso
                }
              >
                ✓ Comprovante de compra enviado
                para o e-mail do ADM.
              </p>
            )}

          {!enviandoComprovante &&
            erroComprovante && (
              <p
                className={
                  styleSlideBar.mensagemErro
                }
              >
                {erroComprovante}
              </p>
            )}

          <div
            className={
              styleSlideBar.confirmacaoBotoes
            }
          >
            <button
              type="button"
              className={
                styleSlideBar.botaoConfirmar
              }
              onClick={() =>
                router.push(
                  "/telas/TelasInternas/TelaPrincipal"
                )
              }
            >
              Voltar para a Tela Principal
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div
      className={
        styleSlideBar.paginaPrincipal
      }
    >
      <header
        className={
          styleSlideBar.paginaCabecalho
        }
      >
        <button
          type="button"
          onClick={() =>
            router.push(
              "/telas/TelasInternas/TelaPrincipal"
            )
          }
          className={styleSlideBar.containerBotaoFechar}
          aria-label="Voltar"
        >
          <ArrowLeft
            size={24}
            className={styleSlideBar.containerXElementoBotao}
          />
        </button>

        <h1
          className={
            styleSlideBar.paginaTitulo
          }
        >
          <ReceiptText
            size={22}
            className={
              styleSlideBar.paginaTituloIconeInline
            }
          />
          Realizar Venda
        </h1>

        <div
          className={
            styleSlideBar.paginaEspacoCabecalho
          }
        />
      </header>

      <main
        className={
          styleSlideBar.paginaSecao
        }
      >
        <div
          className={
            styleSlideBar.vendaLayout
          }
        >
          <section
            className={
              styleSlideBar.vendaProdutos
            }
          >
            <form
              onSubmit={adicionarPorCodigo}
              className={
                styleInput.containerElementoContainer
              }
            >
              <div
                className={
                  styleSlideBar.vendaCodigoInputWrapper
                }
              >
                <input
                  id="codigoProduto"
                  type="text"
                  placeholder=" "
                  value={codigoDigitado}
                  onChange={(e) => {
                    setCodigoDigitado(
                      e.target.value
                    );
                    setErroCodigo("");
                    setMostrarSugestoes(
                      true
                    );
                  }}
                  onFocus={() =>
                    setMostrarSugestoes(true)
                  }
                  onKeyDown={
                    lidarComTeclaPesquisa
                  }
                  autoComplete="off"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-controls="listaSugestoesProdutos"
                  aria-expanded={
                    mostrarSugestoes &&
                    sugestoesProdutos.length >
                      0
                  }
                  className={`${styleInput.containerElementoInput} ${styleSlideBar.vendaCodigoInput}`}
                />

                <label
                  htmlFor="codigoProduto"
                  className={
                    styleSlideBar.vendaCodigoLabel
                  }
                >
                  Pesquisar produto ou código
                </label>

                {mostrarSugestoes &&
                  sugestoesProdutos.length >
                    0 && (
                    <div
                      id="listaSugestoesProdutos"
                      role="listbox"
                      className={
                        styleSlideBar.autocompleteProdutos
                      }
                    >
                      {sugestoesProdutos.map(
                        (produto) => (
                          <button
                            key={
                              produto.codigo
                            }
                            type="button"
                            role="option"
                            className={
                              styleSlideBar.autocompleteProduto
                            }
                            onMouseDown={(e) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              prepararProduto(
                                produto,
                                quantidade
                              )
                            }
                          >
                            <span>
                              <strong>
                                {produto.nome}
                              </strong>

                              <small>
                                {produto.codigo}{" "}
                                ·{" "}
                                {produto.categoria}
                              </small>
                            </span>

                            <span>
                              {produto.preco}

                              {identificarUnidade(
                                produto
                              ) === "kg" && (
                                <small>
                                  {" "}
                                  / kg
                                </small>
                              )}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  )}
              </div>

              <div
                className={
                  styleSlideBar.vendaCodigoLinha
                }
              >
                <button
                  type="submit"
                  className={
                    styleSlideBar.botaoAdicionarCodigo
                  }
                >
                  Adicionar
                </button>
              </div>

              {erroCodigo && (
                <p
                  className={
                    styleSlideBar.vendaCodigoErro
                  }
                >
                  {erroCodigo}
                </p>
              )}

              {produtoPendentePeso && (
                <div
                  className={
                    styleSlideBar.vendaPesoBox
                  }
                >
                  <div>
                    <strong>
                      {
                        produtoPendentePeso.nome
                      }
                    </strong>

                    <span>
                      {formatarPreco(
                        parsePreco(
                          produtoPendentePeso.preco
                        )
                      )}{" "}
                      / kg
                    </span>
                  </div>

                  <label
                    htmlFor="pesoProduto"
                    className={
                      styleSlideBar.campoRotulo
                    }
                  >
                    Informe o peso em kg
                  </label>

                  <input
                    id="pesoProduto"
                    type="number"
                    min="0.001"
                    step="0.001"
                    inputMode="decimal"
                    value={pesoDigitado}
                    onChange={(e) => {
                      setPesoDigitado(
                        e.target.value
                      );
                      setErroPeso("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        confirmarPeso();
                      }
                    }}
                    className={
                      styleInput.containerElementoInput
                    }
                    placeholder="Ex: 1,250"
                  />

                  {erroPeso && (
                    <p
                      className={
                        styleSlideBar.vendaCodigoErro
                      }
                    >
                      {erroPeso}
                    </p>
                  )}

                  <button
                    type="button"
                    className={
                      styleSlideBar.botaoAdicionarCodigo
                    }
                    onClick={confirmarPeso}
                  >
                    Adicionar pelo peso
                  </button>
                </div>
              )}
            </form>

            <div
              className={
                styleSlideBar.listaProdutosEstante
              }
            >
              {produtosEstante.map(
                (produto) => (
                  <div
                    key={produto.codigo}
                    className={
                      styleSlideBar.vendaItemProduto
                    }
                  >
                    <div
                      className={
                        styleSlideBar.vendaProdutoInfo
                      }
                    >
                      <strong
                        className={
                          styleSlideBar.vendaProdutoNome
                        }
                      >
                        {produto.nome}
                      </strong>

                      <span
                        className={
                          styleSlideBar.vendaProdutoDetalhe
                        }
                      >
                        {produto.codigo} ·{" "}
                        {produto.categoria}
                      </span>
                    </div>

                    <span
                      className={
                        styleSlideBar.vendaProdutoPreco
                      }
                    >
                      {produto.preco}

                      {identificarUnidade(
                        produto
                      ) === "kg" && " / kg"}
                    </span>

                    <button
                      type="button"
                      className={
                        styleSlideBar.botaoAdicionarProduto
                      }
                      onClick={() =>
                        prepararProduto(
                          produto
                        )
                      }
                      aria-label={`Adicionar ${produto.nome} à venda`}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                )
              )}
            </div>
          </section>

          <aside
            className={
              styleSlideBar.notaFiscal
            }
          >
            <h2
              className={
                styleSlideBar.notaFiscalTitulo
              }
            >
              Nota Fiscal
            </h2>

            {itens.length === 0 ? (
              <p
                className={
                  styleSlideBar.notaFiscalVazia
                }
              >
                Nenhum produto adicionado
                ainda.
              </p>
            ) : (
              <div
                className={
                  styleSlideBar.notaFiscalLista
                }
              >
                {itens.map((item) => (
                  <div
                    key={item.codigo}
                    className={
                      styleSlideBar.notaFiscalItem
                    }
                  >
                    <span
                      className={
                        styleSlideBar.notaFiscalItemNome
                      }
                    >
                      {item.nome}
                    </span>

                    <span
                      className={
                        styleSlideBar.notaFiscalItemQtd
                      }
                    >
                      <button
                        type="button"
                        className={
                          styleSlideBar.botaoQtd
                        }
                        onClick={() =>
                          alterarQuantidade(
                            item.codigo,
                            -1
                          )
                        }
                        aria-label={`Diminuir quantidade de ${item.nome}`}
                      >
                        −
                      </button>

                      {item.unidade === "kg"
                        ? `${item.quantidade.toFixed(
                            3
                          )} kg`
                        : item.quantidade}

                      <button
                        type="button"
                        className={
                          styleSlideBar.botaoQtd
                        }
                        onClick={() =>
                          alterarQuantidade(
                            item.codigo,
                            1
                          )
                        }
                        aria-label={`Aumentar quantidade de ${item.nome}`}
                      >
                        +
                      </button>
                    </span>

                    <span
                      className={
                        styleSlideBar.notaFiscalItemSubtotal
                      }
                    >
                      {item.unidade ===
                        "kg" && (
                        <span>
                          {formatarPreco(
                            item.precoUnitario
                          )}{" "}
                          / kg ·{" "}
                        </span>
                      )}

                      {formatarPreco(
                        item.precoUnitario *
                          item.quantidade
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div
              className={
                styleSlideBar.notaFiscalTotal
              }
            >
              <span>Total</span>
              <span>
                {formatarPreco(total)}
              </span>
            </div>

            <div>
              <p
                className={
                  styleSlideBar.formasPagamentoTitulo
                }
              >
                Forma de pagamento
              </p>

              <div
                className={
                  styleSlideBar.formasPagamentoGrid
                }
              >
                {FORMAS_PAGAMENTO.map(
                  (forma) => {
                    const pagamento =
                      pagamentos.find(
                        (item) =>
                          item.forma ===
                          forma
                      );

                    return (
                      <div
                        key={forma}
                        className={
                          styleSlideBar.formaPagamentoItem
                        }
                      >
                        <button
                          type="button"
                          onClick={() =>
                            selecionarFormaPagamento(
                              forma
                            )
                          }
                          className={`${styleSlideBar.botaoFormaPagamento} ${
                            pagamento
                              ? styleSlideBar.botaoFormaPagamentoAtiva
                              : ""
                          }`}
                        >
                          {forma}
                        </button>

                        {pagamento && (
                          <div
                            className={
                              styleSlideBar.pagamentoValorArea
                            }
                          >
                            <label
                              htmlFor={`valor-${forma}`}
                              className={
                                styleSlideBar.pagamentoValorLabel
                              }
                            >
                              Digitar valor
                            </label>

                            <div
                              className={
                                styleSlideBar.pagamentoValorLinha
                              }
                            >
                              <input
                                id={`valor-${forma}`}
                                type="number"
                                min="0"
                                step="0.01"
                                inputMode="decimal"
                                value={
                                  pagamento.valor
                                }
                                onChange={(e) =>
                                  alterarValorPagamento(
                                    forma,
                                    e.target.value
                                  )
                                }
                                className={
                                  styleInput.containerElementoInput
                                }
                              />

                              <button
                                type="button"
                                className={
                                  styleSlideBar.botaoValorTotal
                                }
                                onClick={() =>
                                  preencherValorTotal(
                                    forma
                                  )
                                }
                              >
                                Valor restante
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>

              {pagamentos.length > 0 && (
                <div
                  className={
                    styleSlideBar.resumoPagamentos
                  }
                >
                  <div>
                    <span>
                      Total pago
                    </span>

                    <strong>
                      {formatarPreco(
                        totalPago
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {restantePagamento >
                      0
                        ? "Falta pagar"
                        : "Troco"}
                    </span>

                    <strong>
                      {formatarPreco(
                        restantePagamento >
                          0
                          ? restantePagamento
                          : troco
                      )}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className={
                styleSlideBar.botaoFinalizarVenda
              }
              disabled={
                itens.length === 0 ||
                !pagamentoCompleto
              }
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