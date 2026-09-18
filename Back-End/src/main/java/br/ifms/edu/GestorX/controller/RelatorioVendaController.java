package br.ifms.edu.GestorX.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.ifms.edu.GestorX.dto.RelatorioVendaRequestDTO;
import br.ifms.edu.GestorX.dto.RelatorioVendaResponseDTO;
import br.ifms.edu.GestorX.service.RelatorioVendaService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/relatorios/vendas")
@RequiredArgsConstructor
public class RelatorioVendaController {

    private final RelatorioVendaService service;

    @PostMapping
    public ResponseEntity<RelatorioVendaResponseDTO> gerarRelatorio(
            @RequestBody RelatorioVendaRequestDTO request) {

        RelatorioVendaResponseDTO response = service.gerarRelatorio(request);

        return ResponseEntity.ok(response);
    }
}
