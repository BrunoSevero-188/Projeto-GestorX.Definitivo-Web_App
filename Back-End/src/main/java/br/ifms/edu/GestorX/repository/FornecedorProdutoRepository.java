package br.ifms.edu.GestorX.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.ifms.edu.GestorX.model.FornecedorProduto;

public interface FornecedorProdutoRepository extends JpaRepository<FornecedorProduto, Long> {

    // 🔍 Verifica se já existe vínculo ativo (dataFim = null)
    boolean existsByFornecedorIdAndProdutoIdAndDataFimIsNull(Long fornecedorId, Long produtoId);
}
