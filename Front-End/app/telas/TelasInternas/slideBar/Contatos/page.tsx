"use client";

import IconButton from "@/components/iconButton/IconButton";
import { Activity, FileText, Phone, User, X } from "lucide-react";
import { useRouter } from "next/navigation";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideBarContatos({
  isOpen,
  onClose,
}: Props) {
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
            <h2 className={styleSlideBar.containerTextoElementoBotao}>
              Contatos
            </h2>

            <button
              type="button"
              onClick={onClose}
              className={styleSlideBar.containerBotaoFechar}
              aria-label="Fechar Contatos"
            >
              <X
                className={styleSlideBar.containerXElementoBotao}
              />
            </button>
          </div>

          <nav className={styleSlideBar.containerNavegacao}>
            <IconButton
              icon={Phone}
              label="Acessar Lista"
              onClick={() =>
                navegar(
                  "/telas/TelasInternas/slideBar/Contatos/AcessarLista"
                )}/>

            <IconButton
              icon={User}
              label="Adicionar Contato"
              onClick={() =>
                navegar(
                  "/telas/TelasInternas/slideBar/Contatos/AdicionarContato"
                )}/>

            <IconButton
              icon={FileText}
              label="Relatorio"
              onClick={() =>
                navegar(
                  "/telas/TelasInternas/slideBar/Contatos/Relatorio"
                )}/>

            <IconButton
              icon={Activity}
              label="Monitoramento"
              onClick={() =>
                navegar(
                  "./telas/TelasInternas/slideBar/Contatos/Monitoramento"
                )}/>
          </nav>
        </div>
      </div>
    </div>
  );
}