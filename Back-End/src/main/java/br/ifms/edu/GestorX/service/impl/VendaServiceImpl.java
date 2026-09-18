package br.ifms.edu.GestorX.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import br.ifms.edu.GestorX.dto.MovimentoEstoqueRequestDTO;
import br.ifms.edu.GestorX.dto.VendaRequestDTO;
import br.ifms.edu.GestorX.dto.VendaResponseDTO;
import br.ifms.edu.GestorX.enums.TipoMovimento;
import br.ifms.edu.GestorX.model.Produto;
import br.ifms.edu.GestorX.model.Venda;
import br.ifms.edu.GestorX.repository.ProdutoRepository;
import br.ifms.edu.GestorX.repository.VendaRepository;
import br.ifms.edu.GestorX.service.MovimentoEstoqueService;
import br.ifms.edu.GestorX.service.VendaService;
import jakarta.transaction.Transactional;

@Service
public class VendaServiceImpl implements VendaService {

    private final VendaRepository vendaRepository;
    private final ProdutoRepository produtoRepository;
    private final MovimentoEstoqueService movimentoService;

    public VendaServiceImpl(
            VendaRepository vendaRepository,
            ProdutoRepository produtoRepository,
            MovimentoEstoqueService movimentoService) {

        this.vendaRepository = vendaRepository;
        this.produtoRepository = produtoRepository;
        this.movimentoService = movimentoService;
    }

    @Override
    @Transactional
    public VendaResponseDTO realizarVenda(VendaRequestDTO dto) {

        // 🔍 Busca produto
        Produto produto = produtoRepository.findById(dto.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // ❌ Valida estoque
        if (produto.getQuantidade() < dto.getQuantidadeItens()) {
            throw new RuntimeException("Estoque insuficiente");
        }

        // 💰 Calcula valor total
        Double total = produto.getPreco() * dto.getQuantidadeItens();

        // 🏗️ Cria venda
        Venda venda = new Venda();
        venda.setProduto(produto); // (se tiver relação)
        venda.setQuantidadeItens(dto.getQuantidadeItens());
        venda.setValorTotal(total);
        venda.setTipoPagamento(dto.getTipoPagamento());
        venda.setDataVenda(LocalDate.now());

        venda = vendaRepository.save(venda);

        // 🔥 Gera movimento de saída automaticamente
        MovimentoEstoqueRequestDTO mov = new MovimentoEstoqueRequestDTO();
        mov.setProdutoId(produto.getId());
        mov.setQuantidade(dto.getQuantidadeItens());
        mov.setTipo(TipoMovimento.SAIDA);

        movimentoService.realizarMovimento(mov);

        return toDTO(venda);
    }

    private VendaResponseDTO toDTO(Venda v) {
        VendaResponseDTO dto = new VendaResponseDTO();
        dto.setId(v.getId());
        dto.setProdutoId(v.getProduto().getId());
        dto.setNomeProduto(v.getProduto().getNome());
        dto.setQuantidadeItens(v.getQuantidadeItens());
        dto.setValorTotal(v.getValorTotal());
        dto.setDataVenda(v.getDataVenda());
        dto.setTipoPagamento(v.getTipoPagamento());
        return dto;
    }

    @Override
    public List<VendaResponseDTO> listar() {
        return vendaRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}