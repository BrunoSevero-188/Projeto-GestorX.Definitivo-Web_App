"use client";

import { IconButton } from "@/components/iconButton";
import { Activity, ArrowLeftRight, Boxes, FileText, Package, Layers, X } from "lucide-react";
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

export default function SlideBarEstante({
  isOpen,
  onClose,
  onMovement = () => {},
  onReport = () => {},
  onMonitor = () => {},
  onExtraAction = () => {},
}: Props) {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  function acessarEstante() {
    router.push("/telas/slideBar/Estante/AcessarEstante");
    onClose();
  }

  function acessarProduto() {
    router.push("/telas/slideBar/Estante/AcessarProduto");
    onClose();
  }

  return (
    <div className={styleSlideBar.containerPrincipal}>
      <div className={styleSlideBar.containerElementos}>
        <div>
          <div className={styleSlideBar.containerElementoBotao}>
            <h2 className={styleSlideBar.containerTextoElementoBotao}>Estante</h2>
            <button onClick={onClose} className={styleSlideBar.containerBotaoFechar}>
              <X className={styleSlideBar.containerXElementoBotao} />
            </button>
          </div>

          <nav className={styleSlideBar.containerNavegacao}>
            <IconButton icon={Layers} label="Acessar Estante" onClick={acessarEstante} />
            <IconButton icon={Package} label="Acessar Produto" onClick={acessarProduto} />
            <IconButton icon={ArrowLeftRight} label="Movimentação" onClick={onMovement} />
            <IconButton icon={FileText} label="Relatório" onClick={onReport} />
            <IconButton icon={Activity} label="Monitoramento" onClick={onMonitor} />
            <IconButton icon={Boxes} label="Outras Ações" onClick={onExtraAction} />
          </nav>
        </div>
      </div>
    </div>
  );
}