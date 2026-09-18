package br.ifms.edu.GestorX.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.ifms.edu.GestorX.dto.MovimentoEstoqueRequestDTO;
import br.ifms.edu.GestorX.dto.MovimentoEstoqueResponseDTO;
import br.ifms.edu.GestorX.enums.TipoMovimento;
import br.ifms.edu.GestorX.model.MovimentoEstoque;
import br.ifms.edu.GestorX.model.Produto;
import br.ifms.edu.GestorX.repository.MovimentoEstoqueRepository;
import br.ifms.edu.GestorX.repository.ProdutoRepository;
import br.ifms.edu.GestorX.service.MovimentoEstoqueService;
import jakarta.transaction.Transactional;

@Service
public class MovimentoEstoqueServiceImpl implements MovimentoEstoqueService {

    @Autowired
    private MovimentoEstoqueRepository movimentoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    // Método principal (entrada, saída, ajuste)
    @Override
    @Transactional
    public MovimentoEstoqueResponseDTO realizarMovimento(MovimentoEstoqueRequestDTO dto) {

        // 🔍 Busca o produto pelo ID
        Produto produto = produtoRepository.findById(dto.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // 📊 Calcula nova quantidade com base no tipo
        Integer novaQuantidade = calcularNovaQuantidade(
                produto.getQuantidade(),
                dto.getQuantidade(),
                dto.getTipo()
        );

        // 📦 Atualiza o estoque do produto
        produto.setQuantidade(novaQuantidade);
        produtoRepository.save(produto);

        // 🏗️ Cria o movimento
        MovimentoEstoque movimento = new MovimentoEstoque();
        movimento.setProduto(produto);
        movimento.setQuantidade(dto.getQuantidade());
        movimento.setTipo(dto.getTipo());
        movimento.setDataMovimentacao(LocalDateTime.now());

        // 💾 Salva no banco
        movimento = movimentoRepository.save(movimento);

        // 🔄 Converte para DTO de resposta
        return toResponseDTO(movimento);
    }

    // 🧠 Regra de negócio isolada (muito importante)
    private Integer calcularNovaQuantidade(Integer atual, Integer movimentada, TipoMovimento tipo) {

        switch (tipo) {

            case ENTRADA:
                return atual + movimentada;

            case SAIDA:
                // ❌ impede estoque negativo
                if (atual < movimentada) {
                    throw new RuntimeException("Estoque insuficiente");
                }
                return atual - movimentada;

            case AJUSTE:
                return movimentada;

            default:
                throw new RuntimeException("Tipo inválido");
        }
    }

    // 🔄 Converte Entity → ResponseDTO
    private MovimentoEstoqueResponseDTO toResponseDTO(MovimentoEstoque m) {

        MovimentoEstoqueResponseDTO dto = new MovimentoEstoqueResponseDTO();

        dto.setId(m.getId());
        dto.setProdutoId(m.getProduto().getId());
        dto.setNomeProduto(m.getProduto().getNome());
        dto.setQuantidade(m.getQuantidade());
        dto.setTipo(m.getTipo());
        dto.setDataMovimentacao(m.getDataMovimentacao());

        return dto;
    }

    // 📋 Lista todos os movimentos
    @Override
    public List<MovimentoEstoqueResponseDTO> listar() {
        return movimentoRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }
}