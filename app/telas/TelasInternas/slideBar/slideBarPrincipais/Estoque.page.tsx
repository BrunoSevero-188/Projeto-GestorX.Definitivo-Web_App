"use client";

import IconButton from "@/components/iconButton/IconButton";
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

export default function SlideBarEstoque({
  isOpen,
  onClose,
  onMovement = () => {},
  onReport = () => {},
  onMonitor = () => {},
}: Props) {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  function acessarEstoque() {
    router.push("/telas/slideBar/Estoque/AcessarEstoque");
    onClose();
  }

  function acessarProduto() {
    router.push("/telas/slideBar/Estoque/AcessarProduto");
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
            <IconButton icon={Boxes} label="Acessar Estoque" onClick={acessarEstoque} />
            <IconButton icon={Package} label="Acessar Produto" onClick={acessarProduto} />
            <IconButton icon={ArrowLeftRight} label="Movimentacao" onClick={onMovement} />
            <IconButton icon={FileText} label="Relatorio" onClick={onReport} />
            <IconButton icon={Activity} label="Monitoramento" onClick={onMonitor} />
          </nav>
        </div>
      </div>
    </div>
  );
}