"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Activity, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

export default function Page() {
  const router = useRouter();

  const indicadores = [
    { label: "Itens em estoque", valor: "1.248", icone: CheckCircle2, cor: "#10b981" },
    { label: "Alertas ativos", valor: "3", icone: AlertCircle, cor: "#ef4444" },
    { label: "Movimentações hoje", valor: "27", icone: TrendingUp, cor: "#0a84ff" },
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
          <Activity size={22} /> Monitoramento
        </h1>
      </header>

      <p style={{ color: "#6b7280", marginBottom: 24 }}>
        Acompanhe em tempo real os principais indicadores da sua estante.
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {indicadores.map(({ label, valor, icone: Icone, cor }) => (
          <div
            key={label}
            style={{
              padding: 20,
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Icone size={24} color={cor} />
            <span style={{ color: "#6b7280", fontSize: 14 }}>{label}</span>
            <strong style={{ fontSize: 28 }}>{valor}</strong>
          </div>
        ))}
      </section>
    </main>
  );
}