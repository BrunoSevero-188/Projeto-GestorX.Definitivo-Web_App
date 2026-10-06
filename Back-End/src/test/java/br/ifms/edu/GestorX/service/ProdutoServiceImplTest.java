package br.ifms.edu.GestorX.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import br.ifms.edu.GestorX.dto.ProdutoDTO;
import br.ifms.edu.GestorX.enums.CategoriaProduto;
import br.ifms.edu.GestorX.model.Produto;
import br.ifms.edu.GestorX.repository.ProdutoRepository;
import br.ifms.edu.GestorX.service.impl.ProdutoServiceImpl;

/**
 * Testes unitários TU04–TU06.
 * SUT: ProdutoServiceImpl.buscarPorId() e ProdutoServiceImpl.atualizar().
 *
 * ProdutoRepository é simulado (mock) para isolar a lógica do service do PostgreSQL.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("ProdutoServiceImpl — testes unitários")
class ProdutoServiceImplTest {

    @Mock
    private ProdutoRepository repository;

    @InjectMocks
    private ProdutoServiceImpl service;

    private Produto produto(Long id, String codigo, String nome, String marca, double preco,
            int quantidade, int estoqueMinimo, CategoriaProduto categoria) {
        Produto p = new Produto();
        p.setId(id);
        p.setCodigo(codigo);
        p.setNome(nome);
        p.setMarca(marca);
        p.setPreco(preco);
        p.setQuantidade(quantidade);
        p.setEstoqueMinimo(estoqueMinimo);
        p.setCategoria(categoria);
        return p;
    }

    @Test
    @DisplayName("TU04 - Produto existente: buscarPorId() retorna ProdutoDTO")
    void tu04_buscarPorIdExistente_deveRetornarProdutoDTO() {
        Produto existente = produto(1L, "EST-0011", "Arroz 5kg", "Tio João", 24.9, 30, 5, CategoriaProduto.ALIMENTO);
        when(repository.findById(1L)).thenReturn(Optional.of(existente));

        ProdutoDTO dto = service.buscarPorId(1L);

        assertNotNull(dto);
        assertEquals(1L, dto.getId());
        assertEquals("EST-0011", dto.getCodigo());
        assertEquals("Arroz 5kg", dto.getNome());
        assertEquals("Tio João", dto.getMarca());
        assertEquals(24.9, dto.getPreco());
        assertEquals(30, dto.getQuantidade());
        assertEquals(5, dto.getEstoqueMinimo());
        assertEquals("ALIMENTO", dto.getCategoria());
    }

    @Test
    @DisplayName("TU05 - Produto inexistente: buscarPorId() lança exceção de produto não encontrado")
    void tu05_buscarPorIdInexistente_deveLancarExcecao() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        // O service lança RuntimeException("Produto com ID {id} não encontrado")
        RuntimeException erro = assertThrows(RuntimeException.class, () -> service.buscarPorId(99L));

        assertTrue(erro.getMessage().contains("99"));
        assertTrue(erro.getMessage().contains("não encontrado"));
    }

    @Test
    @DisplayName("TU06 - Atualização de produto existente: salva e retorna o produto atualizado")
    void tu06_atualizarProdutoExistente_deveSalvarERetornarAtualizado() {
        Produto existente = produto(1L, "EST-0011", "Arroz 5kg", "Tio João", 24.9, 30, 5, CategoriaProduto.ALIMENTO);
        Produto novosDados = produto(null, "EST-0011", "Arroz Integral 5kg", "Camil", 29.9, 18, 8, CategoriaProduto.ALIMENTO);

        when(repository.findById(1L)).thenReturn(Optional.of(existente));
        when(repository.save(any(Produto.class))).thenAnswer(invocacao -> invocacao.getArgument(0));

        ProdutoDTO atualizado = service.atualizar(1L, novosDados);

        assertEquals(1L, atualizado.getId());
        assertEquals("EST-0011", atualizado.getCodigo());
        assertEquals("Arroz Integral 5kg", atualizado.getNome());
        assertEquals("Camil", atualizado.getMarca());
        assertEquals(29.9, atualizado.getPreco());
        assertEquals(18, atualizado.getQuantidade());
        assertEquals(8, atualizado.getEstoqueMinimo());
        assertEquals("ALIMENTO", atualizado.getCategoria());

        // Confirma que o registro persistido é o existente (mesmo id), com os dados novos
        ArgumentCaptor<Produto> capturado = ArgumentCaptor.forClass(Produto.class);
        verify(repository, times(1)).save(capturado.capture());
        assertEquals(1L, capturado.getValue().getId());
        assertEquals("Arroz Integral 5kg", capturado.getValue().getNome());
    }

    @Test
    @DisplayName("Extra - Atualizar produto inexistente não chama save()")
    void extra_atualizarProdutoInexistente_naoDeveSalvar() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.atualizar(99L, new Produto()));

        verify(repository, never()).save(any(Produto.class));
    }
}
