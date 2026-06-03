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
    <div
      className="absolute left-1/2 top-[calc(100%+0.75rem)] z-50 w-72 -translate-x-1/2 rounded-md border-4 border-amber-800 bg-amber-700 text-white shadow-lg"
    >
      <div className="flex flex-col justify-between p-5">
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
