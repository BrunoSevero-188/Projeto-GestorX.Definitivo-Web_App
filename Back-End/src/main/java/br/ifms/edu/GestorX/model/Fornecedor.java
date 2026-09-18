package br.ifms.edu.GestorX.model;

import java.util.List;
import br.ifms.edu.GestorX.enums.StatusFornecedor;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tb_supplier")
public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🏭 Nome obrigatório
    @NotBlank
    private String nome;

    // 📞 Telefone como String (correto)
    private String telefone;

    // 📧 Email com validação
    @Email
    private String email;

    private String endereco;

    // 🔗 Relacionamento com entidade intermediária
    @OneToMany(mappedBy = "fornecedor")
    private List<FornecedorProduto> fornecedorProdutos;

    // 📊 Status
    @Enumerated(EnumType.STRING)
    @NotNull
    private StatusFornecedor status;

    // 🔥 Define valor padrão
    @PrePersist
    public void prePersist() {
        if (this.status == null) {
            this.status = StatusFornecedor.ATIVO;
        }
    }
}