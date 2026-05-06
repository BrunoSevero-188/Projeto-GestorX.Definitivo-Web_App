"use client";

import Image from "next/image";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import PerfilIcon from "@/public/Perfil-Icon.png";
import Logo from "@/public/Logo.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { dadosUsuario } from "@/components/dadosUsuario";

export default function AcessarPerfil() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(dadosUsuario[0]);

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * dadosUsuario.length);
    setUsuario(dadosUsuario[aleatorio]);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="w-full max-w-2xl border border-black rounded-md bg-gray-100 p-6 space-y-6">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              className="border-2 border-amber-600"
              src={Logo} alt="Logo" width={120} height={220}
            />
          </Link>

          <h1 className="text-2xl font-bold text-black text-center flex-1">
            Acessar Perfil
          </h1>

          <Image className="rounded-full border-8 object-cover" 
            src={PerfilIcon} alt="Ícone de Perfil" width={115} height={115} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nome Completo" value={usuario.nomeCompleto} readOnly />
          <Input label="Nome do Perfil" value={usuario.nomePerfil} readOnly />
          <Input label="CPF" value={usuario.cpf} readOnly />
          <Input label="E-mail" value={usuario.email} readOnly />
          <Input label="Cargo" value={usuario.cargo} readOnly />
          <Input label="Estabelecimento" value={usuario.estabelecimento} readOnly />
        </div>

        <div className="flex justify-between mt-6">
          <Button onClick={() => router.push("/telas/CriarUsuario")}>
            Adicionar Nova Conta
          </Button>

          <Button onClick={() => router.push("/telas/slideBar/Perfil/EditarPerfil")}>
            Editar Conta
          </Button>
        </div>
      </div>
    </main>
  );
}