"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";

export default function AcessarEstante() {
  const [categoria, setCategoria] = useState("");
  const [tipoBusca, setTipoBusca] = useState("");
  const [item, setItem] = useState("");

  return (
    <main className="flex flex-col items-center min-h-screen w-full bg-white">

      <header className="flex w-full items-center justify-between bg-amber-700 text-white px-6 py-5">

        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
          <Image
            className="border-2 border-amber-600"
            src={Logo}
            alt="Logo"
            width={80}
            height={80}
          />
        </Link>

        <h1 className="text-2xl font-bold text-center flex-1">
          Acessar Estante
        </h1>

        <div className="w-auto" />
      </header>

      <div className="w-full px-6 mt-4">
        <Link 
          href="/telas/TelaPrincipal"
          className="text-amber-700 font-semibold underline hover:text-amber-900 transition"
        >
          ⟵ Voltar
        </Link>
      </div>

      <section className="w-full max-w-5xl mt-10 p-6 space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Buscar por:</label>
            <select
              className="border border-gray-400 rounded-md p-2"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="nome">Nome do Item</option>
              <option value="descricao">Descrição</option>
              <option value="categoria">Categoria</option>
              <option value="prateleira">Prateleira</option>
              <option value="quantidade">Quantidade</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Tipo de busca:</label>
            <select
              className="border border-gray-400 rounded-md p-2"
              value={tipoBusca}
              onChange={(e) => setTipoBusca(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="contem">Contém</option>
              <option value="igual">Igual</option>
              <option value="diferente">Diferente</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Item:</label>
            <Input
              placeholder="Digite o nome do item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>

          <div className="flex justify-center md:justify-end">
            <Button className="w-full md:w-auto">
              Buscar
            </Button>
          </div>

        </div>

        <div className="overflow-x-auto border border-gray-400 rounded-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-amber-700 text-white">
              <tr>
                <th className="p-3 border">Nome</th>
                <th className="p-3 border">Descrição</th>
                <th className="p-3 border">Categoria</th>
                <th className="p-3 border">Quantidade</th>
                <th className="p-3 border">Prateleira</th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="p-3 border">Livro A</td>
                <td className="p-3 border">Edição de 2023</td>
                <td className="p-3 border">Literatura</td>
                <td className="p-3 border">12</td>
                <td className="p-3 border">A1</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="p-3 border">Caixa de Arquivo</td>
                <td className="p-3 border">Documentos fiscais</td>
                <td className="p-3 border">Arquivos</td>
                <td className="p-3 border">5</td>
                <td className="p-3 border">B3</td>
              </tr>
            </tbody>

          </table>
        </div>

      </section>
    </main>
  );
}