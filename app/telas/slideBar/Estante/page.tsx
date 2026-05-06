"use client";

import IconButton from "@/components/iconButton";
import { Activity, ArrowLeftRight, Boxes, FileText, Package, Layers, X } from "lucide-react";
import { useRouter } from "next/navigation";

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

  function acessarEstante() {
    router.push("/telas/slideBar/Estante/AcessarEstante");
    onClose();
  }

  function acessarProduto() {
    router.push("/telas/slideBar/Estante/AcessarProduto");
    onClose();
  }

  return (
    <div
      className={`border-4 border-amber-800 fixed right-0 top-0 h-full w-64 bg-amber-700 text-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full justify-between p-6">
        <div>

          <div className="flex items-center mb-6">
            <h2 className="flex-1 text-center text-xl font-bold">Estante</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-white hover:text-gray-300" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
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
