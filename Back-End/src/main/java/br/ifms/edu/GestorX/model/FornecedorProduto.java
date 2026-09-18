package br.ifms.edu.GestorX.model;

import java.time.LocalDate;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tb_fornecedor_produto")
public class FornecedorProduto {

    // 🔑 ID da relação
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🏭 Fornecedor (obrigatório)
    @ManyToOne
    @JoinColumn(name = "fornecedor_id", nullable = false)
    @NotNull
    private Fornecedor fornecedor;

    // 📦 Produto (obrigatório)
    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    @NotNull
    private Produto produto;

    // 📅 Data de início do vínculo
    @NotNull
    private LocalDate dataInicio;

    // 📅 Data de término (pode ser null → vínculo ativo)
    private LocalDate dataFim;

    // 🧠 Regra automática antes de salvar
    @PrePersist
    @PreUpdate
    public void validarDatas() {
        if (dataFim != null && dataFim.isBefore(dataInicio)) {
            throw new RuntimeException("Data fim não pode ser antes da data início");
        }
    }
}