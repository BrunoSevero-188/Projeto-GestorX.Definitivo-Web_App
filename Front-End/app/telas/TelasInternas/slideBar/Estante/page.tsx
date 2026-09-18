"use client";

import { IconButton } from "@/components/iconButton";
import {
  Activity,
  ArrowLeftRight,
  Boxes,
  FileText,
  Layers,
  Package,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onMovement?: () => void;
  onReport?: () => void;
  onMonitor?: () => void;
  onExtraAction?: () => void;
}

export default function SlideBarEstante({ isOpen, onClose }: Props) {
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
            <h2 className={styleSlideBar.containerTextoElementoBotao}>Estante</h2>
            <button
              type="button"
              onClick={onClose}
              className={styleSlideBar.containerBotaoFechar}
              aria-label="Fechar Estante"
            >
              <X className={styleSlideBar.containerXElementoBotao} />
            </button>
          </div>

          <nav className={styleSlideBar.containerNavegacao}>
            <IconButton
              icon={Layers}
              label="Acessar Estante"
              onClick={() => navegar("/telas/TelasInternas/slideBar/Estante/AcessarEstante")}
            />
            <IconButton
              icon={Package}
              label="Acessar Produto"
              onClick={() => navegar("/telas/TelasInternas/slideBar/Estante/AcessarProduto")}
            />
            <IconButton
              icon={ArrowLeftRight}
              label="Movimentacao"
              onClick={() => navegar("/telas/TelasInternas/slideBar/Estante/Movimentacao")}
            />
            <IconButton
              icon={FileText}
              label="Relatorio"
              onClick={() => navegar("/telas/TelasInternas/slideBar/Estante/Relatorio")}
            />
            <IconButton
              icon={Activity}
              label="Monitoramento"
              onClick={() => navegar("/telas/TelasInternas/slideBar/Estante/Monitoramento")}
            />
            <IconButton
              icon={Boxes}
              label="Outras Acoes"
              onClick={() => navegar("/telas/TelasInternas/slideBar/Estante/OutrasAcoes")}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}
