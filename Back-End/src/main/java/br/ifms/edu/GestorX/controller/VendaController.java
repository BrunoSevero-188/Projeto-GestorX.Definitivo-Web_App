package br.ifms.edu.GestorX.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import br.ifms.edu.GestorX.dto.VendaRequestDTO;
import br.ifms.edu.GestorX.dto.VendaResponseDTO;
import br.ifms.edu.GestorX.service.VendaService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/vendas")
public class VendaController {

    private final VendaService service;

    public VendaController(VendaService service) {
        this.service = service;
    }

    // 🛒 Realizar venda
    @PostMapping
    public VendaResponseDTO realizarVenda(@Valid @RequestBody VendaRequestDTO dto) {
        return service.realizarVenda(dto);
    }

    // 📋 Listar vendas
    @GetMapping
    public List<VendaResponseDTO> listar() {
        return service.listar();
    }
}