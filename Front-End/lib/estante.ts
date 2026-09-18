import { criarProduto, listarProdutosPorLocal, type DadosProduto } from "@/lib/produto";

export async function listarProdutosEstante() {
  return listarProdutosPorLocal("Estante");
}

export async function criarProdutoEstante(dados: Omit<DadosProduto, "local">) {
  return criarProduto({ ...dados, local: "Estante" });
}
