"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowLeftRight } from "lucide-react";

export default function Movimentacao() {
  const router = useRouter();

  return (
    <main style={{ padding: 24, minHeight: "100vh" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button
          onClick={() => router.back()}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
          aria-label="Voltar"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <ArrowLeftRight size={22} /> Movimentacao
        </h1>
      </header>
      <p style={{ color: "#6b7280", marginBottom: 24 }}>
        Selecione uma opcao no menu para ver os detalhes.
      </p>
    </main>
  );
}
