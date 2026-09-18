package br.ifms.edu.GestorX.dto;

import br.ifms.edu.GestorX.enums.TipoPagamento;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VendaRequestDTO {

    // 🔗 ID do produto que será vendido
    @NotNull
    private Long produtoId;

    // 📦 Quantidade de itens vendidos
    @NotNull
    @Min(1)
    private Integer quantidadeItens;

    // 💳 Tipo de pagamento (PIX, CARTAO, etc.)
    @NotNull
    private TipoPagamento tipoPagamento;
}
