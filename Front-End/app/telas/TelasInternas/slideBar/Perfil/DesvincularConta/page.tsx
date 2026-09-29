"use client";

import { useRouter } from "next/navigation";
import { UserRoundX } from "lucide-react";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function DesvincularConta() {
  const router = useRouter();

  return (
    <main className={styleSlideBar.paginaPrincipalCentralizada}>
      <div className={styleSlideBar.paginaCartaoFormulario}>
        <div className={styleSlideBar.confirmacaoIcone}>
          <UserRoundX size={26} />
        </div>

        <h1 className={styleSlideBar.paginaTituloEscuro}>Desvincular Conta</h1>

        <p className={styleSlideBar.confirmacaoTexto}>
          Tem certeza que deseja desvincular essa conta? Isso significa que ela deixa
          de fazer parceria com o estabelecimento, e você perde o acesso aos dados
          ligados a ele.
        </p>

        <div className={styleSlideBar.confirmacaoBotoes}>
          <button
            type="button"
            className={styleSlideBar.botaoCancelar}
            onClick={() => router.push("/telas/TelasInternas/TelaPrincipal")}
          >
            Cancelar
          </button>

          <button
            type="button"
            className={styleSlideBar.botaoPerigo}
            onClick={() => router.push("/")}
          >
            Desvincular
          </button>
        </div>
      </div>
    </main>
  );
}
