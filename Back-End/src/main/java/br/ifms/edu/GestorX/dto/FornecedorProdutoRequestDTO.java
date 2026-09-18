package br.ifms.edu.GestorX.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FornecedorProdutoRequestDTO {
    
    // 🔗 ID do fornecedor
    @NotNull
    private Long fornecedorId;

    // 🔗 ID do produto
    @NotNull
    private Long produtoId;

    // 📅 Data de início (obrigatória)
    @NotNull
    private LocalDate dataInicio;

    // 📅 Data fim (opcional)
    private LocalDate dataFim;

}
