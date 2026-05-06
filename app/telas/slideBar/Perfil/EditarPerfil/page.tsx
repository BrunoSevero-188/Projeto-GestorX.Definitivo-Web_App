"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { dadosUsuario } from "@/components/dadosUsuario";

export default function EditarPerfil() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(dadosUsuario[0]);

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * dadosUsuario.length);
    setUsuario(dadosUsuario[aleatorio]);
  }, []);

  function atualizar(campo: string, valor: string) {
    setUsuario({ ...usuario, [campo]: valor });
  }

  function salvar() {
    alert("Dados atualizados com sucesso!");
    router.push("/telas/slideBar/Perfil/AcessarPerfil");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="w-full max-w-2xl border border-black rounded-md bg-gray-100 p-6 space-y-6">

        <h1 className="text-2xl font-bold text-black text-center">
          Editar Perfil
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nome Completo" value={usuario.nomeCompleto}
            onChange={(e) => atualizar("nomeCompleto", e.target.value)} />

          <Input label="Nome do Perfil" value={usuario.nomePerfil}
            onChange={(e) => atualizar("nomePerfil", e.target.value)} />

          <Input label="CPF" value={usuario.cpf}
            onChange={(e) => atualizar("cpf", e.target.value)} />

          <Input label="E-mail" value={usuario.email}
            onChange={(e) => atualizar("email", e.target.value)} />

          <Input label="Cargo" value={usuario.cargo}
            onChange={(e) => atualizar("cargo", e.target.value)} />

          <Input label="Estabelecimento" value={usuario.estabelecimento}
            onChange={(e) => atualizar("estabelecimento", e.target.value)} />
        </div>

        <Button onClick={salvar}>Salvar Alterações</Button>
      </div>
    </main>
  );
}