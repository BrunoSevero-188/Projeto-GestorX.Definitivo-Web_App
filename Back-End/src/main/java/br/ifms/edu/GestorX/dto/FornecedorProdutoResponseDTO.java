package br.ifms.edu.GestorX.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class FornecedorProdutoResponseDTO {

    private Long id;

    private Long fornecedorId;
    private String nomeFornecedor;

    private Long produtoId;
    private String nomeProduto;

    private LocalDate dataInicio;
    private LocalDate dataFim;
}
