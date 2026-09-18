package br.ifms.edu.GestorX.model;

import java.time.LocalDate;

import br.ifms.edu.GestorX.enums.TipoPagamento;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tb_sale")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 📅 Data da venda obrigatória
    @NotNull
    private LocalDate dataVenda;

    // 💰 Valor total da venda (não pode ser negativo)
    @NotNull
    @Min(0)
    private Double valorTotal;

    // 📦 Quantidade de itens vendidos
    @NotNull
    @Min(1)
    private Integer quantidadeItens;

    // 👤 Usuário que realizou a venda
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // 💳 Tipo de pagamento (ENUM)
    @Enumerated(EnumType.STRING)
    @NotNull
    private TipoPagamento tipoPagamento;

    @PrePersist
    public void prePersist() {
        this.dataVenda = LocalDate.now();
    }

    // Relacionamentento com Produto
    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;
}