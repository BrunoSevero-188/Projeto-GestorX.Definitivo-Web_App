"use client";
import { useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CadastrarUsuario() {
  const router = useRouter();

  const [form, setForm] = useState({
    codigo: "",
    senha: "",
  });

  function entrar() {
    alert("Usuário cadastrado com sucesso!");
    router.push("/telas/TelaPrincipal"); 
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="w-full max-w-md border border-gray-500 rounded-xl bg-gray-200 p-6 space-y-4">
        
        <div className="flex flex-col items-center gap-2">
          <Image
            className="border-2 border-amber-600 border-radius rounded-xl"
            src={Logo}
            alt="Logo"
            width={200}
            height={300}
          />
          <h1 className="text-xl text-[22.5px] font-semibold text-black">Cadastrar Usuário</h1>
        </div>

        <div className="grid grid-cols-1 gap-4">
        <Input
          id="user-code"
          label="Código de Usuário"
          value={form.codigo}
          onChange={(e) => setForm({ ...form, codigo: e.target.value })}
          className="focus:border-blue-500 border-gray-300"
          containerClassName="mt-4"
        />

        <Input
          id="user-password"
          label="Senha"
          type="password"
          value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })}
          className="focus:border-blue-500 border-gray-300"
          containerClassName="mt-4"
        />
        </div>
        <div className="items-center flex flex-col gap-2 text-sm text-blue-600 underline">
          <Link href="/telas/CriarUsuario"
          className="text-blue-600 underline transition duration-200 ease-in-out hover:text-blue-800 hover:scale-110">
            Criar Novo Usuário</Link>
          <Link href="/telas/RedefinirSenha" 
          className="text-blue-600 underline transition duration-200 ease-in-out hover:text-blue-800 hover:scale-110">
            Redefinir Senha</Link>
        </div>

        <Button onClick={entrar}>Cadastrar</Button>

      </div>
    </main>
  );
}
