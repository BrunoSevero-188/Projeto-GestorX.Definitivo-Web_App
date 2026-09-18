package br.ifms.edu.GestorX.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import br.ifms.edu.GestorX.dto.FornecedorRequestDTO;
import br.ifms.edu.GestorX.dto.FornecedorResponseDTO;
import br.ifms.edu.GestorX.service.FornecedorService;

@RestController
@RequestMapping("/fornecedores")
public class FornecedorController {

    private final FornecedorService service;

    public FornecedorController(FornecedorService service) {
        this.service = service;
    }

    // 🏭 Criar fornecedor
    @PostMapping
    public FornecedorResponseDTO salvar(@RequestBody FornecedorRequestDTO dto) {
        return service.salvar(dto);
    }

    // 📋 Listar
    @GetMapping
    public List<FornecedorResponseDTO> listar() {
        return service.listar();
    }

    // 🔍 Buscar por ID
    @GetMapping("/{id}")
    public FornecedorResponseDTO buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    // ✏️ Atualizar
    @PutMapping("/{id}")
    public FornecedorResponseDTO atualizar(
            @PathVariable Long id,
            @RequestBody FornecedorRequestDTO dto) {

        return service.atualizar(id, dto);
    }

    // ❌ Inativar
    @DeleteMapping("/{id}")
    public void inativar(@PathVariable Long id) {
        service.inativar(id);
    }

    // 🔗 Encerrar vínculo
    @PutMapping("/{fornecedorId}/produtos/{produtoId}/encerrar")
    public void encerrarVinculo(
            @PathVariable Long fornecedorId,
            @PathVariable Long produtoId) {

        service.encerrarVinculo(fornecedorId, produtoId);
    }
}