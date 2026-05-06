"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import { produtosEstoque } from "@/components/produtosEstoque";

export default function AcessarProduto() {
  const [categoria, setCategoria] = useState("");
  const [tipoBusca, setTipoBusca] = useState("");
  const [produto, setProduto] = useState("");
  const [produtosAleatorios, setProdutosAleatorios] = useState<any[]>([]);

  useEffect(() => {
    const sorteados = produtosEstoque
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setProdutosAleatorios(sorteados);
  }, []);

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
          Acessar Produto
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
            <label className="font-semibold mb-1">Filtrar por:</label>
            <select
              className="border border-gray-400 rounded-md p-2"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="nome">Nome do Produto</option>
              <option value="codigo">Código do Produto</option>
              <option value="categoria">Categoria</option>
              <option value="fornecedor">Fornecedor</option>
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
            <label className="font-semibold mb-1">Produto:</label>
            <Input
              placeholder="Digite o nome ou código"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
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
                <th className="p-3 border">Código</th>
                <th className="p-3 border">Nome</th>
                <th className="p-3 border">Categoria</th>
                <th className="p-3 border">Fornecedor</th>
                <th className="p-3 border">Preço</th>
              </tr>
            </thead>
            <tbody>
              {produtosAleatorios.map((p, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-3 border">{p.codigo}</td>
                  <td className="p-3 border">{p.nome}</td>
                  <td className="p-3 border">{p.categoria}</td>
                  <td className="p-3 border">{p.fornecedor}</td>
                  <td className="p-3 border">{p.preco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}