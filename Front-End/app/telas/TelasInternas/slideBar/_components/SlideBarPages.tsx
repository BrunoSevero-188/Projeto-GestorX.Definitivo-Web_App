"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpFromLine,
  BarChart3,
  Boxes,
  Download,
  FileText,
  Layers,
  Package,
  PlusCircle,
  Settings,
  Trash2,
  Upload,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";

import Logo from "@/public/Logo.png";
import PerfilIcon from "@/public/Perfil-Icon.png";
import { produtosEstoque as produtosEstoqueBase } from "@/components/produtosEstoque";
import { produtosEstante as produtosEstanteBase } from "@/components/produtosEstante";
import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

type Product = {
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

const contatos = [
  {
    nome: "Fornecedora Silva",
    codigo: "FNC-1021",
    estabelecimento: "Mercado Uniao",
    imagem: PerfilIcon,
  },
  {
    nome: "Distribuidora Maxx",
    codigo: "FNC-2044",
    estabelecimento: "Atacadao Sul",
    imagem: PerfilIcon,
  },
  {
    nome: "Alimentos Bom Preco",
    codigo: "FNC-5532",
    estabelecimento: "Armazem Central",
    imagem: PerfilIcon,
  },
];

function PageShell({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: typeof Package;
  children: React.ReactNode;
}) {
  return (
    <main className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <Link href="/" className={styleSlideBar.paginaLinkLogo}>
          <Image
            className={styleSlideBar.paginaLogo}
            src={Logo}
            alt="Logo"
            width={80}
            height={80}
          />
        </Link>

        <h1 className={styleSlideBar.paginaTitulo}>
          {Icon ? <Icon className={styleSlideBar.paginaTituloIcone} /> : null}
          {title}
        </h1>

        <div className={styleSlideBar.paginaEspacoCabecalho} />
      </header>

      <div className={styleSlideBar.paginaLinkRetornoArea}>
        <Link href="/telas/TelasInternas/TelaPrincipal" className={styleSlideBar.paginaLinkRetorno}>
          Voltar
        </Link>
      </div>

      <section className={styleSlideBar.paginaSecaoComEspaco}>{children}</section>
    </main>
  );
}

function formatarValidade(data?: string): string {
  if (!data) return "—";
  const [ano, mes, dia] = data.split("-");
  if (!ano || !mes || !dia) return data;
  return `${dia}/${mes}/${ano}`;
}

function ProductTable({ produtos, showLocation = false }: { produtos: Product[]; showLocation?: boolean }) {
  return (
    <div className={styleSlideBar.tabelaContainer}>
      <table className={styleSlideBar.tabela}>
        <thead className={styleSlideBar.tabelaCabecalho}>
          <tr>
            <th className={styleSlideBar.tabelaCelula}>Codigo</th>
            <th className={styleSlideBar.tabelaCelula}>Produto</th>
            <th className={styleSlideBar.tabelaCelula}>Categoria</th>
            <th className={styleSlideBar.tabelaCelula}>Fornecedor</th>
            {showLocation ? <th className={styleSlideBar.tabelaCelula}>Local</th> : null}
            {showLocation ? <th className={styleSlideBar.tabelaCelula}>Qtd.</th> : null}
            <th className={styleSlideBar.tabelaCelula}>Qtd./Unidade</th>
            <th className={styleSlideBar.tabelaCelula}>Validade</th>
            <th className={styleSlideBar.tabelaCelula}>Preco</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.codigo} className={styleSlideBar.tabelaLinha}>
              <td className={styleSlideBar.tabelaCelula}>{produto.codigo}</td>
              <td className={styleSlideBar.tabelaCelula}>{produto.nome}</td>
              <td className={styleSlideBar.tabelaCelula}>{produto.categoria}</td>
              <td className={styleSlideBar.tabelaCelula}>{produto.fornecedor}</td>
              {showLocation ? <td className={styleSlideBar.tabelaCelula}>{produto.local}</td> : null}
              {showLocation ? <td className={styleSlideBar.tabelaCelula}>{produto.quantidade}</td> : null}
              <td className={styleSlideBar.tabelaCelula}>{produto.quantidadePorUnidade ?? "—"}</td>
              <td className={styleSlideBar.tabelaCelula}>{formatarValidade(produto.dataValidade)}</td>
              <td className={styleSlideBar.tabelaCelula}>{produto.preco}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const CAMPOS_VAZIOS = {
  codigo: "",
  nome: "",
  categoria: "",
  fornecedor: "",
  preco: "",
  quantidadePorUnidade: "",
  dataValidade: "",
};

/**
 * Formulário de cadastro de produto — reaproveitado tanto pela tela de
 * Estoque quanto pela de Estante (contexto muda só o rótulo e o prefixo
 * sugerido do código). Os produtos cadastrados ficam só na sessão atual
 * (não existe API/banco de produtos ainda — quando existir, o `onCadastrar`
 * é o ponto certo para persistir de verdade).
 */
function CadastroProdutoForm({
  contexto,
  prefixoCodigo,
  onCadastrar,
}: {
  contexto: "Estoque" | "Estante";
  prefixoCodigo: string;
  onCadastrar: (produto: Product) => void;
}) {
  const [campos, setCampos] = useState(CAMPOS_VAZIOS);
  const [mensagem, setMensagem] = useState("");

  function atualizar(campo: keyof typeof CAMPOS_VAZIOS, valor: string) {
    setCampos((atual) => ({ ...atual, [campo]: valor }));
  }

  function cadastrar(e: React.FormEvent) {
    e.preventDefault();

    if (!campos.nome || !campos.categoria || !campos.fornecedor || !campos.preco) {
      setMensagem("Preencha ao menos nome, categoria, fornecedor e preço.");
      return;
    }

    const codigo = campos.codigo.trim() || `${prefixoCodigo}-${Math.floor(1000 + Math.random() * 9000)}`;

    onCadastrar({
      codigo,
      nome: campos.nome,
      categoria: campos.categoria,
      fornecedor: campos.fornecedor,
      preco: campos.preco,
      quantidadePorUnidade: campos.quantidadePorUnidade,
      dataValidade: campos.dataValidade,
    });

    setCampos(CAMPOS_VAZIOS);
    setMensagem(`Produto cadastrado ${contexto === "Estoque" ? "no estoque" : "na estante"} com sucesso.`);
  }

  return (
    <form onSubmit={cadastrar} className={styleSlideBar.paginaCartaoFormulario}>
      <div className={styleSlideBar.paginaCabecalhoFormulario}>
        <h2 className={styleSlideBar.paginaTituloEscuro}>
          <PlusCircle size={20} className={styleSlideBar.paginaTituloIconeInline} />
          Cadastrar Produto
        </h2>
      </div>

      <div className={styleSlideBar.formularioGrid}>
        <div className={styleSlideBar.campoFiltro}>
          <label className={styleSlideBar.campoRotulo}>Código (opcional)</label>
          <input
            className={styleSlideBar.campoSelect}
            placeholder={`Ex: ${prefixoCodigo}-0099`}
            value={campos.codigo}
            onChange={(e) => atualizar("codigo", e.target.value)}
          />
        </div>

        <div className={styleSlideBar.campoFiltro}>
          <label className={styleSlideBar.campoRotulo}>Nome do produto</label>
          <input
            className={styleSlideBar.campoSelect}
            value={campos.nome}
            onChange={(e) => atualizar("nome", e.target.value)}
          />
        </div>

        <div className={styleSlideBar.campoFiltro}>
          <label className={styleSlideBar.campoRotulo}>Categoria</label>
          <input
            className={styleSlideBar.campoSelect}
            value={campos.categoria}
            onChange={(e) => atualizar("categoria", e.target.value)}
          />
        </div>

        <div className={styleSlideBar.campoFiltro}>
          <label className={styleSlideBar.campoRotulo}>Fornecedor</label>
          <input
            className={styleSlideBar.campoSelect}
            value={campos.fornecedor}
            onChange={(e) => atualizar("fornecedor", e.target.value)}
          />
        </div>

        <div className={styleSlideBar.campoFiltro}>
          <label className={styleSlideBar.campoRotulo}>Preço</label>
          <input
            className={styleSlideBar.campoSelect}
            placeholder="Ex: R$ 9,90"
            value={campos.preco}
            onChange={(e) => atualizar("preco", e.target.value)}
          />
        </div>

        <div className={styleSlideBar.campoFiltro}>
          <label className={styleSlideBar.campoRotulo}>Quantidade por Unidade</label>
          <input
            className={styleSlideBar.campoSelect}
            placeholder="Ex: 500 ml, 1 kg, 12 un."
            value={campos.quantidadePorUnidade}
            onChange={(e) => atualizar("quantidadePorUnidade", e.target.value)}
          />
        </div>

        <div className={styleSlideBar.campoFiltro}>
          <label className={styleSlideBar.campoRotulo}>Data de Validade</label>
          <input
            type="date"
            className={styleSlideBar.campoSelect}
            value={campos.dataValidade}
            onChange={(e) => atualizar("dataValidade", e.target.value)}
          />
        </div>
      </div>

      {mensagem && <p className={styleSlideBar.mensagemSucesso}>{mensagem}</p>}

      <button type="submit" className={styleSlideBar.botaoConfirmar}>
        Cadastrar Produto
      </button>
    </form>
  );
}

export function EstoquePage() {
  return (
    <PageShell title="Acessar Estoque" icon={Boxes}>
      <ProductTable produtos={produtosEstoqueBase} />
    </PageShell>
  );
}

export function ProdutoEstoquePage() {
  const [produtos, setProdutos] = useState<Product[]>(produtosEstoqueBase);

  return (
    <PageShell title="Produtos do Estoque" icon={Package}>
      <CadastroProdutoForm
        contexto="Estoque"
        prefixoCodigo="PRD"
        onCadastrar={(produto) => setProdutos((atuais) => [produto, ...atuais])}
      />
      <ProductTable produtos={produtos} />
    </PageShell>
  );
}

export function EstantePage() {
  return (
    <PageShell title="Acessar Estante" icon={Layers}>
      <ProductTable produtos={produtosEstanteBase} showLocation />
    </PageShell>
  );
}

export function ProdutoEstantePage() {
  const [produtos, setProdutos] = useState<Product[]>(produtosEstanteBase);

  return (
    <PageShell title="Produtos da Estante" icon={Package}>
      <CadastroProdutoForm
        contexto="Estante"
        prefixoCodigo="EST"
        onCadastrar={(produto) => setProdutos((atuais) => [produto, ...atuais])}
      />
      <ProductTable produtos={produtos} />
    </PageShell>
  );
}

export function MovimentacaoPage({ contexto }: { contexto: "Estoque" | "Estante" }) {
  const movimentos = [
    { produto: "Arroz Branco 5kg", data: "Hoje, 09:10", valor: "+24 un.", entrada: true },
    { produto: "Cafe Torrado 500g", data: "Hoje, 11:45", valor: "-8 un.", entrada: false },
    { produto: "Detergente Liquido", data: "Ontem, 16:20", valor: "+36 un.", entrada: true },
  ];

  return (
    <PageShell title={`Movimentacao - ${contexto}`} icon={Activity}>
      <ul className={styleSlideBar.listaMovimentacoes}>
        {movimentos.map((movimento) => (
          <li key={`${movimento.produto}-${movimento.data}`} className={styleSlideBar.itemMovimentacao}>
            <span
              className={`${styleSlideBar.iconeMovimentacao} ${
                movimento.entrada
                  ? styleSlideBar.iconeMovimentacaoEntrada
                  : styleSlideBar.iconeMovimentacaoSaida
              }`}
            >
              {movimento.entrada ? <ArrowDownToLine /> : <ArrowUpFromLine />}
            </span>
            <span className={styleSlideBar.movimentacaoInfo}>
              <strong className={styleSlideBar.movimentacaoProduto}>{movimento.produto}</strong>
              <p className={styleSlideBar.movimentacaoData}>{movimento.data}</p>
            </span>
            <strong
              className={`${styleSlideBar.movimentacaoValor} ${
                movimento.entrada
                  ? styleSlideBar.movimentacaoValorEntrada
                  : styleSlideBar.movimentacaoValorSaida
              }`}
            >
              {movimento.valor}
            </strong>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}

export function RelatorioPage({ contexto }: { contexto: "Estoque" | "Estante" | "Contatos" }) {
  return (
    <PageShell title={`Relatorio - ${contexto}`} icon={FileText}>
      <div className={styleSlideBar.gradeIndicadores}>
        <article className={styleSlideBar.cartaoIndicador}>
          <FileText className={styleSlideBar.indicadorIcone} />
          <span className={styleSlideBar.indicadorLabel}>Registros</span>
          <strong className={styleSlideBar.indicadorValor}>{contexto === "Contatos" ? 3 : 9}</strong>
        </article>
        <article className={styleSlideBar.cartaoIndicador}>
          <BarChart3 className={styleSlideBar.indicadorIcone} />
          <span className={styleSlideBar.indicadorLabel}>Atualizacoes</span>
          <strong className={styleSlideBar.indicadorValor}>12</strong>
        </article>
      </div>
    </PageShell>
  );
}

export function MonitoramentoPage({ contexto }: { contexto: "Estoque" | "Estante" | "Contatos" }) {
  return (
    <PageShell title={`Monitoramento - ${contexto}`} icon={Activity}>
      <div className={styleSlideBar.gradeIndicadores}>
        <article className={styleSlideBar.cartaoIndicador}>
          <Activity className={styleSlideBar.indicadorIcone} />
          <span className={styleSlideBar.indicadorLabel}>Status</span>
          <strong className={styleSlideBar.indicadorValor}>Ativo</strong>
        </article>
        <article className={styleSlideBar.cartaoIndicador}>
          <Boxes className={styleSlideBar.indicadorIcone} />
          <span className={styleSlideBar.indicadorLabel}>Alertas</span>
          <strong className={styleSlideBar.indicadorValor}>2</strong>
        </article>
      </div>
    </PageShell>
  );
}

export function OutrasAcoesPage() {
  const acoes = [
    { titulo: "Exportar dados", descricao: "Baixar planilha CSV com todos os produtos", Icon: Download },
    { titulo: "Importar dados", descricao: "Carregar planilha CSV para o sistema", Icon: Upload },
    { titulo: "Configuracoes", descricao: "Ajustar preferencias da estante", Icon: Settings },
    { titulo: "Limpar estante", descricao: "Remover todos os produtos da estante", Icon: Trash2 },
  ];

  return (
    <PageShell title="Outras Acoes" icon={Settings}>
      <div className={styleSlideBar.listaAcoes}>
        {acoes.map(({ titulo, descricao, Icon }) => (
          <button key={titulo} type="button" className={styleSlideBar.botaoAcao}>
            <span className={styleSlideBar.iconeAcao}>
              <Icon />
            </span>
            <span>
              <strong className={styleSlideBar.acaoTitulo}>{titulo}</strong>
              <span className={styleSlideBar.acaoDescricao}>{descricao}</span>
            </span>
          </button>
        ))}
      </div>
    </PageShell>
  );
}

export function ContatosPage({ title = "Lista de Contatos / Fornecedores" }: { title?: string }) {
  return (
    <PageShell title={title} icon={UserRoundCheck}>
      <div className={styleSlideBar.contatosGrid}>
        {contatos.map((contato) => (
          <article key={contato.codigo} className={styleSlideBar.contatoCard}>
            <div className={styleSlideBar.contatoCardConteudo}>
              <div className={styleSlideBar.contatoImagemContainer}>
                <Image
                  src={contato.imagem}
                  alt={contato.nome}
                  width={200}
                  height={200}
                  className={styleSlideBar.contatoImagem}
                />
              </div>
              <h2 className={styleSlideBar.contatoNome}>{contato.nome}</h2>
              <p className={styleSlideBar.contatoTexto}>
                <b>Codigo:</b> {contato.codigo}
              </p>
              <p className={styleSlideBar.contatoTextoCentralizado}>
                <b>Estabelecimento:</b> {contato.estabelecimento}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

export function ContaDesconectadaPage() {
  return (
    <PageShell title="Conta desconectada" icon={UserRoundX}>
      <p className={styleSlideBar.textoSimples}>A conta foi desconectada da sessao atual.</p>
      <Link href="/" className={styleSlideBar.paginaLinkRetorno}>
        Voltar ao login
      </Link>
    </PageShell>
  );
}
