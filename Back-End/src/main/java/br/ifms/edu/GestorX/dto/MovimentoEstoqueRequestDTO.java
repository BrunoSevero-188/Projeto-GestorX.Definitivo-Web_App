package br.ifms.edu.GestorX.dto;

import br.ifms.edu.GestorX.enums.TipoMovimento;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// Lombok: gera getters, setters, toString, etc.
@Data
public class MovimentoEstoqueRequestDTO {

    // ID do produto (não mandamos o objeto inteiro)
    @NotNull
    private Long produtoId;

    // Quantidade deve ser obrigatória e maior que zero
    @NotNull
    @Min(1)
    private Integer quantidade;

    // Tipo (pode ser definido no controller)
    private TipoMovimento tipo;
}
