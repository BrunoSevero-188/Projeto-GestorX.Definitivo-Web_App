package br.ifms.edu.GestorX.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import br.ifms.edu.GestorX.dto.FornecedorProdutoRequestDTO;
import br.ifms.edu.GestorX.dto.FornecedorProdutoResponseDTO;
import br.ifms.edu.GestorX.service.FornecedorProdutoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/fornecedor-produto")
public class FornecedorProdutoController {

    private final FornecedorProdutoService service;

    public FornecedorProdutoController(FornecedorProdutoService service) {
        this.service = service;
    }

    // 🔗 Criar vínculo
    @PostMapping
    public FornecedorProdutoResponseDTO salvar(@Valid @RequestBody FornecedorProdutoRequestDTO dto) {
        return service.salvar(dto);
    }

    // 📋 Listar vínculos
    @GetMapping
    public List<FornecedorProdutoResponseDTO> listar() {
        return service.listar();
    }
}