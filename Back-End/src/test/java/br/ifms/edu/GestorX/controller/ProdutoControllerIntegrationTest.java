package br.ifms.edu.GestorX.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.ifms.edu.GestorX.enums.CategoriaProduto;
import br.ifms.edu.GestorX.model.Produto;
import br.ifms.edu.GestorX.repository.ProdutoRepository;
import jakarta.persistence.EntityManager;

/**
 * Teste de integração TI01 — POST /produtos.
 *
 * Sobe o contexto completo (controller -> service -> repository -> Spring Security -> PostgreSQL),
 * usando a conexão configurada em application.properties. Os INSERTs são reais, mas o
 * @Transactional faz rollback ao final, então o banco não acumula registros de teste.
 * O código do produto é único por execução para não colidir com dados já existentes.
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@DisplayName("POST /produtos — integração com PostgreSQL")
class ProdutoControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private EntityManager entityManager;

    @Test
    @DisplayName("TI01 - Cadastro de produto: HTTP 200 + produto persistido no banco")
    void ti01_cadastrarProduto_deveRetornar200EPersistirNoBanco() throws Exception {
        String codigo = "TI01-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("codigo", codigo);
        payload.put("nome", "Arroz Integral 5kg");
        payload.put("marca", "Camil");
        payload.put("preco", 29.9);
        payload.put("quantidade", 40);
        payload.put("estoqueMinimo", 10);
        payload.put("categoria", "ALIMENTO");

        MvcResult resultado = mockMvc.perform(post("/produtos")
                .with(user("admin@gestorx.test").roles("ADMIN"))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.codigo").value(codigo))
                .andExpect(jsonPath("$.nome").value("Arroz Integral 5kg"))
                .andExpect(jsonPath("$.marca").value("Camil"))
                .andExpect(jsonPath("$.preco").value(29.9))
                .andExpect(jsonPath("$.quantidade").value(40))
                .andExpect(jsonPath("$.estoqueMinimo").value(10))
                .andExpect(jsonPath("$.categoria").value("ALIMENTO"))
                .andReturn();

        Long id = objectMapper.readTree(resultado.getResponse().getContentAsString()).get("id").asLong();

        // Força a ida ao banco: descarrega o INSERT e limpa o cache para o findById fazer SELECT real
        entityManager.flush();
        entityManager.clear();

        Produto doBanco = produtoRepository.findById(id).orElseThrow();
        assertEquals(codigo, doBanco.getCodigo());
        assertEquals("Arroz Integral 5kg", doBanco.getNome());
        assertEquals("Camil", doBanco.getMarca());
        assertEquals(29.9, doBanco.getPreco());
        assertEquals(40, doBanco.getQuantidade());
        assertEquals(10, doBanco.getEstoqueMinimo());
        assertEquals(CategoriaProduto.ALIMENTO, doBanco.getCategoria());
    }
}
