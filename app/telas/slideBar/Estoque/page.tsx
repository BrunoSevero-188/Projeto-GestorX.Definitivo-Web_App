"use client";

import IconButton from "@/components/iconButton";
import { Activity, ArrowLeftRight, Boxes, FileText, Package, X } from "lucide-react";
import { useRouter } from "next/navigation";

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
  onAccessProduct,
  onMovement = () => {},
  onReport = () => {},
  onMonitor = () => {},
}: Props) {

  const router = useRouter();

  function acessarEstoque() {
    router.push("/telas/slideBar/Estoque/AcessarEstoque");
    onClose();
  }

  function acessarProduto() {
    router.push("/telas/slideBar/Estoque/AcessarProduto");
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
            <h2 className="flex-1 text-center text-xl font-bold">Estoque</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-white hover:text-gray-300" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            <IconButton icon={Boxes} label="Acessar Estoque" onClick={acessarEstoque} />
            <IconButton icon={Package} label="Acessar Produto" onClick={acessarProduto} />
            <IconButton icon={ArrowLeftRight} label="Movimentação" onClick={onMovement} />
            <IconButton icon={FileText} label="Relatório" onClick={onReport} />
            <IconButton icon={Activity} label="Monitoramento" onClick={onMonitor} />
          </nav>

        </div>

      </div>
    </div>
  );
}
