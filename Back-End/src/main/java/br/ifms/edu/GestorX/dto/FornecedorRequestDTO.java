package br.ifms.edu.GestorX.dto;

import br.ifms.edu.GestorX.enums.StatusFornecedor;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FornecedorRequestDTO {

    @NotBlank
    private String nome;

    private String telefone;

    @Email
    private String email;

    private String endereco;

    private StatusFornecedor status;
}
