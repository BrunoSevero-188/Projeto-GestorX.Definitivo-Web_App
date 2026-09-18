package br.ifms.edu.GestorX.model;

import java.time.LocalDate;
import br.ifms.edu.GestorX.enums.StatusEstoque;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_stock")
public class Estoque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quantidade;
    private Double valor;
    private LocalDate dataReposicao;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;

    @Enumerated(EnumType.STRING)
    private StatusEstoque status;

    public void atualizarStatus() {
        if (quantidade == 0) {
            status = StatusEstoque.ESGOTADO;
        } else if (quantidade < 5) {
            status = StatusEstoque.BAIXO;
        } else {
            status = StatusEstoque.DISPONIVEL;
        }
    }
}
