"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MoreHorizontal, Download, Upload, Trash2, Settings } from "lucide-react";

export default function Page() {
  const router = useRouter();

  const acoes = [
    { titulo: "Exportar dados", descricao: "Baixar planilha CSV com todos os produtos", icone: Download, cor: "#0a84ff" },
    { titulo: "Importar dados", descricao: "Carregar planilha CSV para o sistema", icone: Upload, cor: "#10b981" },
    { titulo: "Configurações", descricao: "Ajustar preferências da estante", icone: Settings, cor: "#6b7280" },
    { titulo: "Limpar estante", descricao: "Remover todos os produtos (atenção!)", icone: Trash2, cor: "#ef4444" },
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
          <MoreHorizontal size={22} /> Outras Ações
        </h1>
      </header>

      <p style={{ color: "#6b7280", marginBottom: 24 }}>
        Ferramentas adicionais para gerenciar sua estante.
      </p>

      <div style={{ display: "grid", gap: 12 }}>
        {acoes.map(({ titulo, descricao, icone: Icone, cor }) => (
          <button
            key={titulo}
            onClick={() => alert(`Ação: ${titulo}`)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: 16,
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              background: "#fff",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: `${cor}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icone size={22} color={cor} />
            </div>
            <div>
              <strong style={{ display: "block" }}>{titulo}</strong>
              <span style={{ fontSize: 14, color: "#6b7280" }}>{descricao}</span>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}