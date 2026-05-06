"use client";

import IconButton from "@/components/iconButton";
import { Phone, User, FileText, Activity, X } from "lucide-react";
import { useRouter } from "next/navigation";

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

  function acessarLista() {
    router.push("/telas/slideBar/Contatos/AcessarLista");
    onClose(); 
  }

  return (
    <div
      className={`border-4 border-amber-800 fixed right-0 top-0 h-full w-64 
        bg-amber-700 text-white z-50 shadow-lg transform transition-transform 
        duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="flex flex-col h-full justify-between p-6">
        <div>
          <div className="flex items-center mb-6">
            <h2 className="flex-1 text-center text-xl font-bold">
              Contatos
            </h2>

            <button onClick={onClose}>
              <X className="w-6 h-6 text-white hover:text-gray-300" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">

            <IconButton
              icon={Phone}
              label="Acessar Lista"
              onClick={acessarLista}
            />

            <IconButton
              icon={User}
              label="Adicionar Contato"
              onClick={onAddContact}
            />

            <IconButton
              icon={FileText}
              label="Relatório"
              onClick={onReport}
            />

            <IconButton
              icon={Activity}
              label="Monitoramento"
              onClick={onMonitor}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}
