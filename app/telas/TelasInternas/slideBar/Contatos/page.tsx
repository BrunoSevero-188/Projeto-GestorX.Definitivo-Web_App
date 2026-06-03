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

  if (!isOpen) {
    return null;
  }

  function acessarLista() {
    router.push("/telas/slideBar/Contatos/AcessarLista");
    onClose(); 
  }

  return (
    <div
      className="absolute left-1/2 top-[calc(100%+0.75rem)] z-50 w-72 -translate-x-1/2 rounded-md border-4 border-amber-800 bg-amber-700 text-white shadow-lg"
    >
      <div className="flex flex-col justify-between p-5">
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
