package br.ifms.edu.GestorX.model;

import java.time.LocalDateTime;
import br.ifms.edu.GestorX.enums.TipoMovimento;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Lombok: gera getters e setters automaticamente
@Getter
@Setter

// Lombok: construtor vazio (obrigatório para JPA)
@NoArgsConstructor

// Marca como entidade do banco
@Entity

// Nome da tabela no banco
@Table(name = "tb_stock_movements")
public class MovimentoEstoque {

    // ID da tabela (chave primária)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Quantidade movimentada
    private Integer quantidade;

    // Data e hora da movimentação
    private LocalDateTime dataMovimentacao;

    // Relacionamento com Produto (muitos movimentos para 1 produto)
    @ManyToOne
    @JoinColumn(name = "produto_id") // nome da FK no banco
    private Produto produto;

    // Tipo do movimento (ENTRADA, SAIDA, AJUSTE)
    @Enumerated(EnumType.STRING) // salva como texto no banco
    private TipoMovimento tipo;
}