package br.ifms.edu.GestorX.service;

import java.util.List;
import br.ifms.edu.GestorX.dto.FornecedorRequestDTO;
import br.ifms.edu.GestorX.dto.FornecedorResponseDTO;

public interface FornecedorService {

    // 🏭 Criar fornecedor
    FornecedorResponseDTO salvar(FornecedorRequestDTO dto);

    // 📋 Listar fornecedores
    List<FornecedorResponseDTO> listar();

    // 🔍 Buscar por ID
    FornecedorResponseDTO buscarPorId(Long id);

    // ❌ Inativar fornecedor
    void inativar(Long id);

    // ✏️ Atualizar fornecedor
    FornecedorResponseDTO atualizar(Long id, FornecedorRequestDTO dto);

    // 🔗 Encerrar vínculo com produto
    void encerrarVinculo(Long fornecedorId, Long produtoId);
}