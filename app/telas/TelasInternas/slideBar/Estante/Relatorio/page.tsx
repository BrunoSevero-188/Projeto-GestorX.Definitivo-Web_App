// O codigo se encontra no (Projeto-GestorX.Definitivo-Web\gestorx-web\app\telas\TelasInternas\sliBar\Estante\Relatorio\page.tsx e faz a conexão de como ficaria os style no arquivo "SlideBar.module.css"

"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Faz uma correção aqui nessa linha de acordo com o restante do sistema
import { ArrowLeft, BarChart3, FileText, Download } from "lucide-react"; // Faz uma correção aqui nessa linha de acordo com o restante do sistema

export default function Page() {
  const router = useRouter();

  const relatorios = [
    { id: 1, titulo: "Relatório de Estoque", descricao: "Visão geral dos produtos em estoque", data: "2026-06-15" },
    { id: 2, titulo: "Relatório de Movimentações", descricao: "Entradas e saídas do período", data: "2026-06-14" },
    { id: 3, titulo: "Relatório de Produtos", descricao: "Lista detalhada de produtos cadastrados", data: "2026-06-13" },
  ];

  return (
    <div style={{ padding: "24px", minHeight: "100vh" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <button
          onClick={() => router.back()}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
          aria-label="Voltar"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: "24px", fontWeight: 600, margin: 0 }}>Relatórios</h1>
      </header>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "18px", marginBottom: "12px" }}>
          <BarChart3 size={20} /> Visão geral
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}>
          <div style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
            <p style={{ margin: 0, color: "#6b7280" }}>Total de relatórios</p>
            <strong style={{ fontSize: "28px" }}>{relatorios.length}</strong>
          </div>
          <div style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
            <p style={{ margin: 0, color: "#6b7280" }}>Atualizado em</p>
            <strong style={{ fontSize: "16px" }}>{new Date().toLocaleDateString("pt-BR")}</strong>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "18px", marginBottom: "12px" }}>
          <FileText size={20} /> Lista de relatórios
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {relatorios.map((r) => (
            <li
              key={r.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              <div>
                <strong>{r.titulo}</strong>
                <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: "14px" }}>{r.descricao}</p>
                <small style={{ color: "#9ca3af" }}>{r.data}</small>
              </div>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                <Download size={16} /> Baixar
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}