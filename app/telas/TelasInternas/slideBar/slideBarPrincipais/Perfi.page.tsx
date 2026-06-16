"use client";

import { IconButtonSlideBar } from "@/components/iconButton";
import { UserCheck, UserCircle, UserMinus, UserRoundX, X } from "lucide-react";
import { useRouter } from "next/navigation";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideBarPerfil({ isOpen, onClose }: Props) {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styleSlideBar.containerPrincipal}>
      <div className={styleSlideBar.containerElementos}>
        <div>
          <div className={styleSlideBar.containerElementoBotao}>
            <h2 className={styleSlideBar.containerTextoElementoBotao}>Perfil</h2>
            <button onClick={onClose} className={styleSlideBar.containerBotaoFechar}>
              <X className={styleSlideBar.containerXElementoBotao} />
            </button>
          </div>

          <div className={styleSlideBar.containerOrdemCategorias}>
            <p className={styleSlideBar.containerTextoOrdemCategorias}>
              Nome: <span className={styleSlideBar.containerTextoOrdemCategoriasDestaque}>-NomeCompleto-</span>
            </p>
            <p className={styleSlideBar.containerTextoOrdemCategorias}>
              Funcao: <span className={styleSlideBar.containerTextoOrdemCategoriasDestaque}>-Cargo-</span>
            </p>
            <p className={styleSlideBar.containerTextoOrdemCategorias}>
              Estabelecimento: <span className={styleSlideBar.containerTextoOrdemCategoriasDestaque}>-MercadoLocal-</span>
            </p>
          </div>

          <nav className={styleSlideBar.containerNavegacao}>
            <IconButtonSlideBar icon={UserCircle} label="Acessar Perfil" onClick={() => router.push("/telas/slideBar/Perfil/AcessarPerfil")} />

            <IconButtonSlideBar
              icon={UserCheck}
              label="Adicionar Novo Perfil"
              onClick={() => {
                if (confirm("Deseja realmente criar uma nova conta?")) {
                  router.push("/telas/CriarUsuario");
                } else {
                  router.push("/TelaPrincipal");
                }
              }}
            />

            <IconButtonSlideBar
              icon={UserMinus}
              label="Desconectar Conta"
              onClick={() => {
                if (confirm("Deseja realmente desconectar a conta?")) {
                  router.push("/");
                } else {
                  router.push("/TelaPrincipal");
                }
              }}
            />

            <IconButtonSlideBar
              icon={UserRoundX}
              label="Desvincular Conta"
              onClick={() => {
                if (confirm("Deseja realmente desvincular conta, isso significa que essa conta nao faz mais parceria com o Estabelecimento?")) {
                  router.push("/");
                } else {
                  router.push("/TelaPrincipal");
                }
              }}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}
