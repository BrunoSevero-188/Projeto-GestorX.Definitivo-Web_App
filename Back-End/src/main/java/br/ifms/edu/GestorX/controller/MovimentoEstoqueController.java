package br.ifms.edu.GestorX.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import br.ifms.edu.GestorX.dto.MovimentoEstoqueRequestDTO;
import br.ifms.edu.GestorX.dto.MovimentoEstoqueResponseDTO;
import br.ifms.edu.GestorX.enums.TipoMovimento;
import br.ifms.edu.GestorX.service.MovimentoEstoqueService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/movimentos")
public class MovimentoEstoqueController {

    @Autowired
    private MovimentoEstoqueService service;

    // 📥 Entrada de estoque
    @PostMapping("/entrada")
    public MovimentoEstoqueResponseDTO entrada(@Valid @RequestBody MovimentoEstoqueRequestDTO dto) {
        dto.setTipo(TipoMovimento.ENTRADA);
        return service.realizarMovimento(dto);
    }

    // 📤 Saída de estoque
    @PostMapping("/saida")
    public MovimentoEstoqueResponseDTO saida(@Valid @RequestBody MovimentoEstoqueRequestDTO dto) {
        dto.setTipo(TipoMovimento.SAIDA);
        return service.realizarMovimento(dto);
    }

    // 🔧 Ajuste de estoque
    @PostMapping("/ajuste")
    public MovimentoEstoqueResponseDTO ajuste(@Valid @RequestBody MovimentoEstoqueRequestDTO dto) {
        dto.setTipo(TipoMovimento.AJUSTE);
        return service.realizarMovimento(dto);
    }

    // 📋 Listar movimentações
    @GetMapping
    public List<MovimentoEstoqueResponseDTO> listar() {
        return service.listar();
    }
}