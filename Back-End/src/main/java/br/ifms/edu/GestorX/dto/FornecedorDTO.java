package br.ifms.edu.GestorX.dto;

import br.ifms.edu.GestorX.model.Fornecedor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FornecedorDTO {

    private Long id;
    private String nome;
    private String email;
    private String status;

    // Construtor para converter Entity → DTO
    public FornecedorDTO(Fornecedor fornecedor) {
        this.id = fornecedor.getId();
        this.nome = fornecedor.getNome();
        this.email = fornecedor.getEmail();
        this.status = fornecedor.getStatus() 
            != null ? fornecedor.getStatus()
            .name() 
            : null;
    }
}
