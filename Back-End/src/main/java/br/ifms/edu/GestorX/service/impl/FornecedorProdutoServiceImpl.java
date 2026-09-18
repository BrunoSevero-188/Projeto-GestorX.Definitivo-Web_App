package br.ifms.edu.GestorX.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import br.ifms.edu.GestorX.dto.FornecedorProdutoRequestDTO;
import br.ifms.edu.GestorX.dto.FornecedorProdutoResponseDTO;
import br.ifms.edu.GestorX.model.Fornecedor;
import br.ifms.edu.GestorX.model.FornecedorProduto;
import br.ifms.edu.GestorX.model.Produto;
import br.ifms.edu.GestorX.repository.FornecedorProdutoRepository;
import br.ifms.edu.GestorX.repository.FornecedorRepository;
import br.ifms.edu.GestorX.repository.ProdutoRepository;
import br.ifms.edu.GestorX.service.FornecedorProdutoService;
import jakarta.transaction.Transactional;

@Service
public class FornecedorProdutoServiceImpl implements FornecedorProdutoService {

    private final FornecedorProdutoRepository repository;
    private final FornecedorRepository fornecedorRepository;
    private final ProdutoRepository produtoRepository;

    public FornecedorProdutoServiceImpl(
            FornecedorProdutoRepository repository,
            FornecedorRepository fornecedorRepository,
            ProdutoRepository produtoRepository) {

        this.repository = repository;
        this.fornecedorRepository = fornecedorRepository;
        this.produtoRepository = produtoRepository;
    }

    @Override
    @Transactional
    public FornecedorProdutoResponseDTO salvar(FornecedorProdutoRequestDTO dto) {

        // 🔍 Buscar fornecedor
        Fornecedor fornecedor = fornecedorRepository.findById(dto.getFornecedorId())
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        // 🔍 Buscar produto
        Produto produto = produtoRepository.findById(dto.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // 🧠 REGRA (evitar duplicidade ativa)
        boolean existeAtivo = repository.existsByFornecedorIdAndProdutoIdAndDataFimIsNull(
                fornecedor.getId(),
                produto.getId()
        );

        if (existeAtivo) {
            throw new RuntimeException("Já existe vínculo ativo para esse fornecedor e produto");
        }

        // 🏗️ Criar entidade
        FornecedorProduto entidade = new FornecedorProduto();
        entidade.setFornecedor(fornecedor);
        entidade.setProduto(produto);
        entidade.setDataInicio(dto.getDataInicio());
        entidade.setDataFim(dto.getDataFim());

        entidade = repository.save(entidade);

        return toDTO(entidade);
    }

    @Override
    public List<FornecedorProdutoResponseDTO> listar() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // 🔄 Conversão Entity → DTO
    private FornecedorProdutoResponseDTO toDTO(FornecedorProduto fp) {

        FornecedorProdutoResponseDTO dto = new FornecedorProdutoResponseDTO();

        dto.setId(fp.getId());

        dto.setFornecedorId(fp.getFornecedor().getId());
        dto.setNomeFornecedor(fp.getFornecedor().getNome());

        dto.setProdutoId(fp.getProduto().getId());
        dto.setNomeProduto(fp.getProduto().getNome());

        dto.setDataInicio(fp.getDataInicio());
        dto.setDataFim(fp.getDataFim());

        return dto;
    }
}