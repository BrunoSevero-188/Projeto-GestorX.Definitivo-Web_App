import { prisma } from "@/lib/prisma";

export type DadosProduto = {
  codigo?: string;
  nome: string;
  categoria: string;
  preco: string;
  quantidadePorUnidade?: string;
  dataValidade?: string; // "AAAA-MM-DD", vindo do <input type="date">
  local: "Estoque" | "Estante";
  fornecedorId?: string;
};

function gerarCodigo(local: "Estoque" | "Estante") {
  const prefixo = local === "Estoque" ? "PRD" : "EST";
  const aleatorio = Math.floor(1000 + Math.random() * 9000);
  return `${prefixo}-${aleatorio}`;
}

export async function listarProdutosPorLocal(local: "Estoque" | "Estante") {
  return prisma.produto.findMany({
    where: { local },
    include: { fornecedor: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function criarProduto(dados: DadosProduto) {
  return prisma.produto.create({
    data: {
      codigo: dados.codigo?.trim() || gerarCodigo(dados.local),
      nome: dados.nome,
      categoria: dados.categoria,
      preco: dados.preco,
      quantidadePorUnidade: dados.quantidadePorUnidade || null,
      dataValidade: dados.dataValidade ? new Date(dados.dataValidade) : null,
      local: dados.local,
      fornecedorId: dados.fornecedorId || null,
    },
  });
}

export async function atualizarProduto(id: string, dados: Partial<DadosProduto>) {
  return prisma.produto.update({
    where: { id },
    data: {
      ...(dados.nome !== undefined && { nome: dados.nome }),
      ...(dados.categoria !== undefined && { categoria: dados.categoria }),
      ...(dados.preco !== undefined && { preco: dados.preco }),
      ...(dados.quantidadePorUnidade !== undefined && {
        quantidadePorUnidade: dados.quantidadePorUnidade,
      }),
      ...(dados.dataValidade !== undefined && {
        dataValidade: dados.dataValidade ? new Date(dados.dataValidade) : null,
      }),
      ...(dados.fornecedorId !== undefined && { fornecedorId: dados.fornecedorId }),
    },
  });
}

export async function removerProduto(id: string) {
  return prisma.produto.delete({ where: { id } });
}
