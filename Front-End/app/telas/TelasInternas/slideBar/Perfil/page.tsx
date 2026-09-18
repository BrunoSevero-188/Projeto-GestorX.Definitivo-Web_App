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
            <UserCircle className={styleSlideBar.containerIconeElementoBotao} />
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
            <IconButtonSlideBar
              icon={UserCircle}
              label="Acessar Perfil"
              onClick={() => router.push("/telas/TelasInternas/slideBar/Perfil/AcessarPerfil")}
            />

            <IconButtonSlideBar
              icon={UserCheck}
              label="Adicionar Novo Perfil"
              onClick={() => router.push("/telas/TelasCadastro/CriarUsuario")}
            />

            <IconButtonSlideBar
              icon={UserMinus}
              label="Desconectar Conta"
              onClick={() => router.push("/telas/TelasInternas/slideBar/Perfil/DesconectarConta")}
            />

            <IconButtonSlideBar
              icon={UserRoundX}
              label="Desvincular Conta"
              onClick={() => router.push("/telas/TelasInternas/slideBar/Perfil/DesvincularConta")}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}
