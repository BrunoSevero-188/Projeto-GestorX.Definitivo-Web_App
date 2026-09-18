package br.ifms.edu.GestorX.service;

import java.util.List;
import br.ifms.edu.GestorX.dto.FornecedorProdutoRequestDTO;
import br.ifms.edu.GestorX.dto.FornecedorProdutoResponseDTO;

public interface FornecedorProdutoService {

    // 🔗 Criar vínculo fornecedor-produto
    FornecedorProdutoResponseDTO salvar(FornecedorProdutoRequestDTO dto);

    // 📋 Listar vínculos
    List<FornecedorProdutoResponseDTO> listar();
}