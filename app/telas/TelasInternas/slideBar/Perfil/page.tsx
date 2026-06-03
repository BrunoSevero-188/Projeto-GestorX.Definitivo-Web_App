"use client";

import { IconButtonSlideBar } from "@/components/iconButton";
import { UserCheck, UserCircle, UserMinus, UserRoundX, X } from "lucide-react";
import { useRouter } from "next/navigation";

import styleSlideBarPerfil from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideBarPerfil({ isOpen, onClose }: Props) {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styleSlideBarPerfil.containerPrincipal}>
      <div className={styleSlideBarPerfil.containerElementos}>
        <div>
          <div className={styleSlideBarPerfil.containerElementoBotao}>
            <h2 className={styleSlideBarPerfil.containerTextoElementoBotao}>Perfil</h2>
            <button onClick={onClose}>
              <X className={styleSlideBarPerfil.containerXElementoBotao} />
            </button>
          </div>

          <div className={styleSlideBarPerfil.containerNavegação}>
            <p className={styleSlideBarPerfil.containerTextoOrdemCategorias}>
              Nome: <span className={styleSlideBarPerfil.containerTextoOrdemCategoriasDestaque}>-NomeCompleto-</span>
            </p>
            <p className={styleSlideBarPerfil.containerTextoOrdemCategorias}>
              Função: <span className={styleSlideBarPerfil.containerTextoOrdemCategoriasDestaque}>-Cargo-</span>
            </p>
            <p className={styleSlideBarPerfil.containerTextoOrdemCategorias}>
              Estabelecimento: <span className={styleSlideBarPerfil.containerTextoOrdemCategoriasDestaque}>-MercadoLocal-</span>
            </p>
          </div>

          <nav className={styleSlideBarPerfil.containerNavegação}>
            <IconButtonSlideBar icon={UserCircle} label="Acessar Perfil" onClick={() => router.push("/telas/slideBar/Perfil/AcessarPerfil")} />

            <IconButtonSlideBar icon={UserCheck} label="Adicionar Novo Perfil" onClick={() => 
            {if (confirm("Deseja realmente criar uma nova conta?")) {router.push("/telas/CriarUsuario");} 
            else {router.push("/TelaPrincipal");}}}/>
            
            <IconButtonSlideBar icon={UserMinus} label="Desconectar Conta" onClick={() => 
            {if (confirm("Deseja realmente desconectar a conta?")) {router.push("/");} 
            else {router.push("/TelaPrincipal");}}}/>
            
            <IconButtonSlideBar icon={UserRoundX} label="Desvincular Conta" onClick={() => 
            {if (confirm("Deseja realmente desvincular conta, isso significa que essa conta não faz mais perceria com o Estabelecimento?")) {router.push("/");} 
            else {router.push("/TelaPrincipal");}}}/>
            
          </nav>
        </div>
      </div>
    </div>
  );
}
