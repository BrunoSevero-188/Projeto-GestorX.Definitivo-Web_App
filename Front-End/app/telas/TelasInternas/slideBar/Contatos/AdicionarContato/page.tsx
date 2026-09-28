"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserPlus } from "lucide-react";

import Logo from "@/public/Logo.png";
import PerfilIcon from "@/public/Perfil-Icon.png";
import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

type NovoContato = {
  nome: string;
  codigo: string;
  estabelecimento: string;
  telefone: string;
  email: string;
};

const CAMPOS_VAZIOS: NovoContato = {
  nome: "",
  codigo: "",
  estabelecimento: "",
  telefone: "",
  email: "",
};

export default function Page() {
  const [campos, setCampos] = useState<NovoContato>(CAMPOS_VAZIOS);
  const [contatosAdicionados, setContatosAdicionados] = useState<NovoContato[]>([]);
  const [mensagem, setMensagem] = useState("");

  function atualizar(campo: keyof NovoContato, valor: string) {
    setCampos((atual) => ({ ...atual, [campo]: valor }));
  }

  function adicionarContato(e: React.FormEvent) {
    e.preventDefault();

    if (!campos.nome || !campos.estabelecimento) {
      setMensagem("Preencha ao menos nome e estabelecimento.");
      return;
    }

    const codigo = campos.codigo.trim() || `FNC-${Math.floor(1000 + Math.random() * 9000)}`;

    setContatosAdicionados((atuais) => [{ ...campos, codigo }, ...atuais]);
    setCampos(CAMPOS_VAZIOS);
    setMensagem("Contato adicionado com sucesso.");
  }

  return (
    <main className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <Link href="/" className={styleSlideBar.paginaLinkLogo}>
          <Image className={styleSlideBar.paginaLogo} src={Logo} alt="Logo" width={80} height={80} />
        </Link>

        <h1 className={styleSlideBar.paginaTitulo}>
          <UserPlus className={styleSlideBar.paginaTituloIcone} />
          Adicionar Contato
        </h1>

        <div className={styleSlideBar.paginaEspacoCabecalho} />
      </header>

      <div className={styleSlideBar.paginaLinkRetornoArea}>
        <Link href="/telas/TelasInternas/TelaPrincipal" className={styleSlideBar.paginaLinkRetorno}>
          Voltar
        </Link>
      </div>

      <section className={styleSlideBar.paginaSecaoComEspaco}>
        <form onSubmit={adicionarContato} className={styleSlideBar.paginaCartaoFormulario}>
          <div className={styleSlideBar.paginaCabecalhoFormulario}>
            <h2 className={styleSlideBar.paginaTituloEscuro}>
              <UserPlus size={20} className={styleSlideBar.paginaTituloIconeInline} />
              Cadastrar Contato / Fornecedor
            </h2>
          </div>

          <div className={styleSlideBar.formularioGrid}>
            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Código (opcional)</label>
              <input
                className={styleSlideBar.campoSelect}
                placeholder="Ex: FNC-0099"
                value={campos.codigo}
                onChange={(e) => atualizar("codigo", e.target.value)}
              />
            </div>

            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Nome</label>
              <input
                className={styleSlideBar.campoSelect}
                value={campos.nome}
                onChange={(e) => atualizar("nome", e.target.value)}
              />
            </div>

            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Estabelecimento</label>
              <input
                className={styleSlideBar.campoSelect}
                value={campos.estabelecimento}
                onChange={(e) => atualizar("estabelecimento", e.target.value)}
              />
            </div>

            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>Telefone</label>
              <input
                className={styleSlideBar.campoSelect}
                placeholder="Ex: (63) 99999-0000"
                value={campos.telefone}
                onChange={(e) => atualizar("telefone", e.target.value)}
              />
            </div>

            <div className={styleSlideBar.campoFiltro}>
              <label className={styleSlideBar.campoRotulo}>E-mail</label>
              <input
                type="email"
                className={styleSlideBar.campoSelect}
                value={campos.email}
                onChange={(e) => atualizar("email", e.target.value)}
              />
            </div>
          </div>

          {mensagem && <p className={styleSlideBar.mensagemSucesso}>{mensagem}</p>}

          <button type="submit" className={styleSlideBar.botaoConfirmar}>
            Adicionar Contato
          </button>
        </form>

        {contatosAdicionados.length > 0 && (
          <div className={styleSlideBar.contatosGrid}>
            {contatosAdicionados.map((contato) => (
              <article key={contato.codigo} className={styleSlideBar.contatoCard}>
                <div className={styleSlideBar.contatoCardConteudo}>
                  <div className={styleSlideBar.contatoImagemContainer}>
                    <Image
                      src={PerfilIcon}
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
        )}
      </section>
    </main>
  );
}
