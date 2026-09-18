package br.ifms.edu.GestorX.dto;

import java.time.LocalDateTime;
import br.ifms.edu.GestorX.enums.TipoMovimento;
import lombok.Data;

// DTO usado para retornar dados ao cliente
@Data
public class MovimentoEstoqueResponseDTO {

    private Long id;
    private Long produtoId;
    private String nomeProduto;
    private Integer quantidade;
    private TipoMovimento tipo;
    private LocalDateTime dataMovimentacao;
}