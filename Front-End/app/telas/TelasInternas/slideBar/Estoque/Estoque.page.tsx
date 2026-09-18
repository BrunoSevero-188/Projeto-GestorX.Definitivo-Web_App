"use client";

import { IconButton } from "@/components/iconButton";
import { Activity, ArrowLeftRight, Boxes, FileText, Package, X } from "lucide-react";
import { useRouter } from "next/navigation";
import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAccessProduct?: () => void;
  onMovement?: () => void;
  onReport?: () => void;
  onMonitor?: () => void;
}

export default function SlideBarEstoque({ isOpen, onClose }: Props) {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  function navegar(path: string) {
    router.push(path);
    onClose();
  }

  return (
    <div className={styleSlideBar.containerPrincipal}>
      <div className={styleSlideBar.containerElementos}>
        <div>
          <div className={styleSlideBar.containerElementoBotao}>
            <h2 className={styleSlideBar.containerTextoElementoBotao}>Estoque</h2>
            <button onClick={onClose} className={styleSlideBar.containerBotaoFechar}>
              <X className={styleSlideBar.containerXElementoBotao} />
            </button>
          </div>

          <nav className={styleSlideBar.containerNavegacao}>
            <IconButton
              icon={Boxes}
              label="Acessar Estoque"
              onClick={() => navegar("/telas/TelasInternas/slideBar/Estoque/AcessarEstoque")}
            />
            <IconButton
              icon={Package}
              label="Acessar Produto"
              onClick={() => navegar("/telas/TelasInternas/slideBar/Estoque/AcessarProduto")}
            />
            <IconButton
              icon={ArrowLeftRight}
              label="Movimentacao"
              onClick={() => navegar("/telas/TelasInternas/slideBar/Estoque/Movimentacao")}
            />
            <IconButton
              icon={FileText}
              label="Relatorio"
              onClick={() => navegar("/telas/TelasInternas/slideBar/Estoque/Relatorio")}
            />
            <IconButton
              icon={Activity}
              label="Monitoramento"
              onClick={() => navegar("/telas/TelasInternas/slideBar/Estoque/Monitoramento")}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}
