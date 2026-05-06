"use client";

import { IconButtonSlideBar } from "@/components/iconButton";
import { UserCheck, UserCircle, UserMinus, UserRoundX, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideBarPerfil({ isOpen, onClose }: Props) {
  const router = useRouter();

  return (
    <div
      className={`border-4 border-amber-800 fixed right-0 top-0 h-full w-64 bg-amber-700 text-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full justify-between p-6">
        <div>
          <div className="flex items-center mb-6">
            <h2 className="flex-1 text-center text-xl font-bold">Perfil</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-white hover:text-gray-300" />
            </button>
          </div>

          <div className="bg-amber-800 p-4 text-center rounded-md mb-6">
            <p className="text-sm">
              Nome: <span className="font-semibold">-NomeCompleto-</span>
            </p>
            <p className="text-sm">
              Função: <span className="font-semibold">-Cargo-</span>
            </p>
            <p className="text-sm">
              Estabelecimento: <span className="font-semibold">-MercadoLocal-</span>
            </p>
          </div>

          <nav className="flex flex-col space-y-4">
            <IconButtonSlideBar icon={UserCircle} label="Acessar Perfil" onClick={() => router.push("/telas/slideBar/Perfil/AcessarPerfil")} />

            <IconButtonSlideBar icon={UserCheck} label="Adicionar Novo Perfil" onClick={() => 
            {if (confirm("Deseja realmente criar uma nova conta?")) {router.push("/telas/CriarUsuario");} 
            else {router.push("/TelaPrincipal");}}}/>
            
            <IconButtonSlideBar icon={UserMinus} label="Desconectar Conta" onClick={() => 
            {if (confirm("Deseja realmente desconectar a conta?")) {router.push("/");} 
            else {router.push("/TelaPrincipal");}}}/>
            
            <IconButtonSlideBar icon={UserRoundX} label="Desvincular Conta" onClick={() => console.log("Desvincular Conta")} />
            
            <IconButtonSlideBar icon={UserRoundX} label="Desvincular Conta" onClick={() => 
            {if (confirm("Deseja realmente desvincular conta?")) {router.push("/");} 
            else {router.push("/TelaPrincipal");}}}/>
            
          </nav>
        </div>
      </div>
    </div>
  );
}