"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function Page() {
  const router = useRouter();

  return (
    <div className={styleSlideBar.containerPrincipal}>
      <div className={styleSlideBar.containerElementos}>
        <div>
          <div className={styleSlideBar.containerElementoBotao}>
            <h2 className={styleSlideBar.containerTextoElementoBotao}>Acessar Produto</h2>
            <button
              onClick={() => router.back()}
              className={styleSlideBar.containerBotaoFechar}
              aria-label="Voltar"
            >
              <X className={styleSlideBar.containerXElementoBotao} />
            </button>
          </div>

          <nav className={styleSlideBar.containerNavegacao}>
            {/* Conteúdo específico da tela de Acessar Produto entra aqui */}
          </nav>
        </div>
      </div>
    </div>
  );
}