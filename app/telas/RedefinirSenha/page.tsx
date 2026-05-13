"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import { Input } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import Link from "next/link";

export default function RedefinirSenha() {
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="w-full max-w-md border border-black rounded-md bg-gray-200 p-6 space-y-5">
        <div className="flex flex-col items-center gap-2 ">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image 
           className="border-2 border-amber-600 border-radius rounded-xl"
            src={Logo} 
            alt="Logo" 
            width={200} 
            height={300} 
            />
          </Link>
          <h1 className="text-xl font-semibold text-black">Redefinir Senha</h1>
        </div>

      <div className="space-y-5">
        <Input 
        label="E-mail" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        />

        <Input 
        label="Nova senha" 
        type="password" 
        value={novaSenha} 
        onChange={(e) => setNovaSenha(e.target.value)} 
        />
        </div>

        <Button onClick={() => alert(`Agora a sua senha é: ${novaSenha}`)}>Acessar</Button>
      </div>
    </main>
  );
}