import { prisma } from "@/lib/prisma";

export type DadosContato = {
  codigo?: string;
  nome: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  estabelecimento?: string;
};

function gerarCodigoContato() {
  const aleatorio = Math.floor(1000 + Math.random() * 9000);
  return `FNC-${aleatorio}`;
}

export async function criarContato(dados: DadosContato) {
  return prisma.fornecedor.create({
    data: {
      codigo: dados.codigo?.trim() || gerarCodigoContato(),
      nome: dados.nome,
      telefone: dados.telefone || null,
      email: dados.email || null,
      endereco: dados.endereco || null,
      estabelecimento: dados.estabelecimento || null,
    },
  });
}

export async function atualizarContato(id: string, dados: Partial<DadosContato>) {
  return prisma.fornecedor.update({
    where: { id },
    data: {
      ...(dados.nome !== undefined && { nome: dados.nome }),
      ...(dados.telefone !== undefined && { telefone: dados.telefone }),
      ...(dados.email !== undefined && { email: dados.email }),
      ...(dados.endereco !== undefined && { endereco: dados.endereco }),
      ...(dados.estabelecimento !== undefined && {
        estabelecimento: dados.estabelecimento,
      }),
    },
  });
}

export async function removerContato(id: string) {
  return prisma.fornecedor.delete({ where: { id } });
}
