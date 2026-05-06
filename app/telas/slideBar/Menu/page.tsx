"use client";

import { useState } from "react";
import { X, User, Box, ShoppingCart} from "lucide-react";
import SlideBarPerfil from "../Perfil/page";
import SlideBarEstoque from "../Estoque/page";
import SlideBarEstante from "../Estante/page";
import SlideBarContatos from "../Contatos/page";
import IconButtonSlideBar from "@/components/iconButton/IconButtonSlideBar";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideBarMenu({ isOpen, onClose }: Props) {
  const [isPerfilOpen, setIsPerfilOpen] = useState(false);
  const [isEstoqueOpen, setIsEstoqueOpen] = useState(false);
  const [isEstanteOpen, setIsEstanteOpen] = useState(false);
  const [isContatosOpen, setIsContatosOpen] = useState(false);

  return (
    <>
      <div
        className={`border-4 border-amber-800 fixed right-0 top-0 h-full w-64 bg-amber-700 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center mb-6">
            <h2 className="flex-1 text-center text-xl font-semibold text-white">Menu</h2>
            <button onClick={onClose} className="text-white hover:text-gray-300">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            <IconButtonSlideBar icon={User} label="Perfil" onClick={() => setIsPerfilOpen(true)} />
            <IconButtonSlideBar icon={Box} label="Estoque" onClick={() => setIsEstoqueOpen(true)} />
            <IconButtonSlideBar icon={ShoppingCart} label="Estante" onClick={() => setIsEstanteOpen(true)} />
            <IconButtonSlideBar icon={User} label="Contatos" onClick={() => setIsContatosOpen(true)} />
          </nav>
        </div>
      </div>

      <SlideBarPerfil isOpen={isPerfilOpen} onClose={() => setIsPerfilOpen(false)} />
      <SlideBarEstoque isOpen={isEstoqueOpen} onClose={() => setIsEstoqueOpen(false)} />
      <SlideBarEstante isOpen={isEstanteOpen} onClose={() => setIsEstanteOpen(false)} />
      <SlideBarContatos isOpen={isContatosOpen} onClose={() => setIsContatosOpen(false)} />
    </>
  );
}