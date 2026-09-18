package br.ifms.edu.GestorX.dto;

import java.time.LocalDate;
import br.ifms.edu.GestorX.enums.TipoPagamento;
import br.ifms.edu.GestorX.model.Venda;
import lombok.Data;

@Data
public class VendaResponseDTO {

    private Long id;

    // 📦 Quantidade vendida
    private Integer quantidadeItens;

    // 💰 Valor total calculado
    private Double valorTotal;

    // 📅 Data da venda
    private LocalDate dataVenda;

    // 💳 Tipo de pagamento
    private TipoPagamento tipoPagamento;

    // 🔗 Produto (dados resumidos)
    private Long produtoId;
    private String nomeProduto;

    // 👤 Usuário (melhoria extra)
    private Long usuarioId;
    private String nomeUsuario;

    // 🔄 Conversão centralizada
    public static VendaResponseDTO fromEntity(Venda venda) {

        VendaResponseDTO dto = new VendaResponseDTO();

        dto.setId(venda.getId());
        dto.setDataVenda(venda.getDataVenda());
        dto.setValorTotal(venda.getValorTotal());
        dto.setQuantidadeItens(venda.getQuantidadeItens());

        // 💳 Tipo de pagamento
        dto.setTipoPagamento(venda.getTipoPagamento());

        // 📦 Produto (com proteção contra null)
        if (venda.getProduto() != null) {
            dto.setProdutoId(venda.getProduto().getId());
            dto.setNomeProduto(venda.getProduto().getNome());
        }

        // 👤 Usuário (com proteção contra null)
        if (venda.getUsuario() != null) {
            dto.setUsuarioId(venda.getUsuario().getId());
            dto.setNomeUsuario(venda.getUsuario().getNome());
        }

        return dto;
    }
}