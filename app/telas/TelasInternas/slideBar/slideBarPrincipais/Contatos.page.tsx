"use client";

import IconButton from "@/components/iconButton/IconButton";
import { Phone, User, FileText, Activity, X } from "lucide-react";
import { useRouter } from "next/navigation";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddContact?: () => void;
  onReport?: () => void;
  onMonitor?: () => void;
}

export default function SlideBarContatos({
  isOpen,
  onClose,
  onAddContact = () => {},
  onReport = () => {},
  onMonitor = () => {},
}: Props) {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  function acessarLista() {
    router.push("/telas/TelasInternas/slideBar/Contatos/AcessarLista");
    onClose();
  }

  return (
    <div className={styleSlideBar.containerPrincipal}>
      <div className={styleSlideBar.containerElementos}>
        <div>
          <div className={styleSlideBar.containerElementoBotao}>
            <h2 className={styleSlideBar.containerTextoElementoBotao}>Contatos</h2>
            <button onClick={onClose} className={styleSlideBar.containerBotaoFechar}>
              <X className={styleSlideBar.containerXElementoBotao} />
            </button>
          </div>

          <nav className={styleSlideBar.containerNavegacao}>
            <IconButton icon={Phone} label="Acessar Lista" onClick={acessarLista} />
            <IconButton icon={User} label="Adicionar Contato" onClick={onAddContact} />
            <IconButton icon={FileText} label="Relatorio" onClick={onReport} />
            <IconButton icon={Activity} label="Monitoramento" onClick={onMonitor} />
          </nav>
        </div>
      </div>
    </div>
  );
}