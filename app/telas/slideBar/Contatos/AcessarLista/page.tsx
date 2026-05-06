"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo.png";
import PerfilIcon from "@/public/Perfil-Icon.png";

export default function AcessarLista() {
  const fornecedores = [
    {
      nome: "Fornecedora Silva",
      codigo: "FNC-1021",
      estabelecimento: "Mercado União",
      imagem: PerfilIcon,
    },
    {
      nome: "Distribuidora Maxx",
      codigo: "FNC-2044",
      estabelecimento: "Atacadão Sul",
      imagem: PerfilIcon,
    },
    {
      nome: "Alimentos Bom Preço",
      codigo: "FNC-5532",
      estabelecimento: "Armazém Central",
      imagem: PerfilIcon,
    },
  ];

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
          Lista de Contatos / Fornecedores
        </h1>

        <div className="w-[80px]" />
      </header>

      <div className="w-full px-6 mt-4">
        <Link
          href="/telas/TelaPrincipal"
          className="text-amber-700 font-semibold underline hover:text-amber-900 transition"
        >
          ⟵ Voltar
        </Link>
      </div>

      <section className="w-full max-w-5xl mt-10 p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {fornecedores.map((f, index) => (
            <div
              key={index}
              className="border border-gray-400 bg-gray-100 rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <div className="flex flex-col items-center space-y-3">

                <div className="w-28 h-28 rounded-full bg-gray-300 overflow-hidden border-4 border-amber-600 flex items-center justify-center">

                  <Image
                    src={f.imagem || PerfilIcon}
                    alt={f.nome}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />

                </div>

                <h2 className="text-lg font-bold text-black text-center">
                  {f.nome}
                </h2>

                <p className="text-sm text-gray-600">
                  <b>Código:</b> {f.codigo}
                </p>

                <p className="text-sm text-gray-600 text-center">
                  <b>Estabelecimento:</b> {f.estabelecimento}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>
    </main>
  );
}