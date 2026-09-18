package br.ifms.edu.GestorX.dto;

import br.ifms.edu.GestorX.model.Produto;
import lombok.Data;


@Data // Lombok: gera getters, setters, toString, equals e hashCode automaticamente
public class ProdutoDTO {

    private Long id;
    private String nome;
    private String categoria;
    private Integer quantidade;
    private Double preco;
    private String marca;
    private String codigo;
    private Integer estoqueMinimo;

    /**
     * 🔄 Método estático responsável por converter a entidade Produto
     * em um DTO (Data Transfer Object).
     *
     * Vantagens:
     * - Centraliza a conversão em um único lugar
     * - Evita repetição de código no Service
     * - Mantém o código mais limpo e organizado
     */
    public static ProdutoDTO fromEntity(Produto produto) {

        // Cria uma nova instância do DTO
        ProdutoDTO dto = new ProdutoDTO();

        // Copia os dados básicos da entidade para o DTO
        dto.setId(produto.getId());
        dto.setCodigo(produto.getCodigo());
        dto.setNome(produto.getNome());
        dto.setMarca(produto.getMarca());
        dto.setPreco(produto.getPreco());
        dto.setEstoqueMinimo(produto.getEstoqueMinimo());

        /**
         * 📌 Conversão de ENUM para String
         * - Verifica se a categoria não é nula para evitar NullPointerException
         * - Caso exista, converte para texto usando .name()
         */
        dto.setCategoria(produto.getCategoria() != null 
                ? produto.getCategoria().name() 
                : null);

        // Define a quantidade disponível do produto
        dto.setQuantidade(produto.getQuantidade());

        // Retorna o DTO pronto para uso (geralmente enviado para o front-end)
        return dto;
    }
}
