package br.ifms.edu.GestorX.dto;

import br.ifms.edu.GestorX.enums.StatusFornecedor;
import lombok.Data;

@Data
public class FornecedorResponseDTO {

    private Long id;
    private String nome;
    private String telefone;
    private String email;
    private String endereco;
    private StatusFornecedor status;
}