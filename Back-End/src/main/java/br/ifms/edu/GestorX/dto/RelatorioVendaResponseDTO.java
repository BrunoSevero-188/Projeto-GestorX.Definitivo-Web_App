package br.ifms.edu.GestorX.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RelatorioVendaResponseDTO {
    
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private Double totalVendas; 
    private Long quantidadeVendas;
    private List<VendaResponseDTO> vendas; // 📦 lista completa
}
