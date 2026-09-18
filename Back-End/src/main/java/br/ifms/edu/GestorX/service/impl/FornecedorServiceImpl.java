package br.ifms.edu.GestorX.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import br.ifms.edu.GestorX.dto.FornecedorRequestDTO;
import br.ifms.edu.GestorX.dto.FornecedorResponseDTO;
import br.ifms.edu.GestorX.enums.StatusFornecedor;
import br.ifms.edu.GestorX.model.Fornecedor;
import br.ifms.edu.GestorX.model.FornecedorProduto;
import br.ifms.edu.GestorX.repository.FornecedorRepository;
import br.ifms.edu.GestorX.service.FornecedorService;

@Service
public class FornecedorServiceImpl implements FornecedorService {

    private final FornecedorRepository repository;

    public FornecedorServiceImpl(FornecedorRepository repository) {
        this.repository = repository;
    }

    // 🏭 Criar fornecedor
    @Override
    public FornecedorResponseDTO salvar(FornecedorRequestDTO dto) {

        Fornecedor fornecedor = new Fornecedor();

        fornecedor.setNome(dto.getNome());
        fornecedor.setTelefone(dto.getTelefone());
        fornecedor.setEmail(dto.getEmail());
        fornecedor.setEndereco(dto.getEndereco());

        fornecedor.setStatus(
            dto.getStatus() != null
                ? dto.getStatus()
                : StatusFornecedor.ATIVO
        );

        return toDTO(repository.save(fornecedor));
    }

    // 📋 Listar
    @Override
    public List<FornecedorResponseDTO> listar() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // 🔍 Buscar por ID
    @Override
    public FornecedorResponseDTO buscarPorId(Long id) {

        Fornecedor fornecedor = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        return toDTO(fornecedor);
    }

    // ❌ Inativar
    @Override
    public void inativar(Long id) {

        Fornecedor fornecedor = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        fornecedor.setStatus(StatusFornecedor.INATIVO);

        repository.save(fornecedor);
    }

    // ✏️ Atualizar
    @Override
    public FornecedorResponseDTO atualizar(Long id, FornecedorRequestDTO dto) {

        Fornecedor fornecedor = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        fornecedor.setNome(dto.getNome());
        fornecedor.setTelefone(dto.getTelefone());
        fornecedor.setEmail(dto.getEmail());
        fornecedor.setEndereco(dto.getEndereco());

        if (dto.getStatus() != null) {
            fornecedor.setStatus(dto.getStatus());
        }

        return toDTO(repository.save(fornecedor));
    }

    // 🔗 Encerrar vínculo
    @Override
    public void encerrarVinculo(Long fornecedorId, Long produtoId) {

        Fornecedor fornecedor = repository.findById(fornecedorId)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        for (FornecedorProduto fp : fornecedor.getFornecedorProdutos()) {
            if (fp.getProduto().getId().equals(produtoId) && fp.getDataFim() == null) {
                fp.setDataFim(LocalDate.now());
                break;
            }
        }

        repository.save(fornecedor);
    }

    // 🔄 Conversão Entity → ResponseDTO
    private FornecedorResponseDTO toDTO(Fornecedor fornecedor) {

        FornecedorResponseDTO dto = new FornecedorResponseDTO();

        dto.setId(fornecedor.getId());
        dto.setNome(fornecedor.getNome());
        dto.setTelefone(fornecedor.getTelefone());
        dto.setEmail(fornecedor.getEmail());
        dto.setEndereco(fornecedor.getEndereco());
        dto.setStatus(fornecedor.getStatus());

        return dto;
    }
}
