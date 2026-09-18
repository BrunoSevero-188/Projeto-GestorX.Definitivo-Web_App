import { prisma } from "@/lib/prisma";

export async function listarContatos() {
  return prisma.fornecedor.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function buscarContatoPorCodigo(codigo: string) {
  return prisma.fornecedor.findUnique({
    where: { codigo },
    include: { produtos: true },
  });
}
