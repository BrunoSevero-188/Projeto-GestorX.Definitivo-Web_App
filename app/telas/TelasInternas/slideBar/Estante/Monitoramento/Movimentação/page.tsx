"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowLeftRight, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

export default function Page() {
  const router = useRouter();

  const movimentacoes = [
    { id: 1, tipo: "entrada", produto: "Caderno A4", quantidade: 50, data: "16/06/2026 10:42" },
    { id: 2, tipo: "saida", produto: "Caneta Azul", quantidade: 12, data: "16/06/2026 09:15" },
    { id: 3, tipo: "entrada", produto: "Borracha Branca", quantidade: 100, data: "15/06/2026 17:28" },
    { id: 4, tipo: "saida", produto: "Régua 30cm", quantidade: 5, data: "15/06/2026 14:03" },
  ];

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
          <ArrowLeftRight size={22} /> Movimentação
        </h1>
      </header>

      <p style={{ color: "#6b7280", marginBottom: 24 }}>
        Histórico de entradas e saídas de produtos.
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {movimentacoes.map((m) => {
          const ehEntrada = m.tipo === "entrada";
          return (
            <li
              key={m.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                marginBottom: 8,
                background: "#fff",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: ehEntrada ? "#dcfce7" : "#fee2e2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {ehEntrada ? (
                  <ArrowDownToLine size={20} color="#10b981" />
                ) : (
                  <ArrowUpFromLine size={20} color="#ef4444" />
                )}
              </div>

              <div style={{ flex: 1 }}>
                <strong>{m.produto}</strong>
                <p style={{ margin: "2px 0 0", fontSize: 13, color: "#6b7280" }}>{m.data}</p>
              </div>

              <span
                style={{
                  fontWeight: 700,
                  color: ehEntrada ? "#10b981" : "#ef4444",
                  fontSize: 16,
                }}
              >
                {ehEntrada ? "+" : "−"}
                {m.quantidade}
              </span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}