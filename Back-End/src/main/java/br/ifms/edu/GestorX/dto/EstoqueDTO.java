package br.ifms.edu.GestorX.dto;

import br.ifms.edu.GestorX.model.Estoque;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Lombok: gera automaticamente getters, setters, etc.
@NoArgsConstructor // Cria construtor vazio (necessário para frameworks e serialização)
public class EstoqueDTO {

    private Long id;
    private Integer quantidade;
    private String status;
    private String nomeProduto;

    /**
     * 🔄 Converte a entidade Estoque em DTO
     *
     * Responsável por:
     * - Extrair apenas os dados necessários
     * - Evitar expor a entidade completa
     * - Facilitar o envio de dados para o front-end
     */
    public static EstoqueDTO fromEntity(Estoque estoque) {

        // Cria instância do DTO
        EstoqueDTO dto = new EstoqueDTO();

        // Copia o ID do estoque
        dto.setId(estoque.getId());

        // Define a quantidade atual em estoque
        dto.setQuantidade(estoque.getQuantidade());

        /**
         * 📌 Conversão do ENUM Status para String
         * - .name() retorna o nome do enum (ex: "DISPONIVEL")
         */
        dto.setStatus(estoque.getStatus().name());

        /**
         * 📌 Acesso a relacionamento (Produto)
         * - Pega o nome do produto associado ao estoque
         * - Enriquecimento do DTO (evita chamadas extras no front)
         */
        dto.setNomeProduto(estoque.getProduto().getNome());

        // Retorna o DTO pronto
        return dto;
    }
}
