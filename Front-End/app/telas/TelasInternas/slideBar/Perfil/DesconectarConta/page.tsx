"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function DesconectarConta() {
  const router = useRouter();

  return (
    <main className={styleSlideBar.paginaPrincipalCentralizada}>
      <div className={styleSlideBar.paginaCartaoFormulario}>
        <div className={styleSlideBar.confirmacaoIcone}>
          <LogOut size={26} />
        </div>

        <h1 className={styleSlideBar.paginaTituloEscuro}>Desconectar Conta</h1>

        <p className={styleSlideBar.confirmacaoTexto}>
          Tem certeza que deseja desconectar essa conta? Você vai precisar fazer login
          novamente para acessar o sistema.
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
            Desconectar
          </button>
        </div>
      </div>
    </main>
  );
}
