package br.ifms.edu.GestorX.system;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;

/**
 * TSF01 — Fluxo de sistema:
 *
 * Login → cadastrar produto → visualizar produto na listagem.
 *
 * O teste percorre o fluxo real da aplicação:
 *
 * Front/cliente
 *      ↓
 * /usuarios
 *      ↓
 * /auth/login
 *      ↓
 * HTTP Basic
 *      ↓
 * POST /produtos
 *      ↓
 * GET /produtos
 *      ↓
 * PostgreSQL
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@DisplayName("TSF01 — Login → cadastrar produto → visualizar na listagem")
class TSF01FluxoProdutoTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("TSF01 - Usuário faz login, cadastra produto e encontra produto na listagem")
    void tsf01_loginCadastrarProdutoEVisualizarNaListagem() throws Exception {

        String email = "tsf01." 
                + UUID.randomUUID().toString().substring(0, 8)
                + "@gestorx.test";

        String senha = "Senha@12345";

        String cpf = gerarCpf();

        String codigoProduto = "TSF01-"
                + UUID.randomUUID().toString().substring(0, 8)
                .toUpperCase();

        /*
         * =========================================================
         * 1. CADASTRA USUÁRIO ADMINISTRADOR
         * =========================================================
         */

        Map<String, Object> usuarioPayload = new LinkedHashMap<>();

        usuarioPayload.put("nome", "Administrador TSF01");
        usuarioPayload.put("email", email);
        usuarioPayload.put("senha", senha);
        usuarioPayload.put("tipoUsuario", "ADMIN");
        usuarioPayload.put("cpf", cpf);
        usuarioPayload.put("cargo", "Administrador");
        usuarioPayload.put("estabelecimento", "GestorX Teste");

        mockMvc.perform(
                post("/usuarios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(usuarioPayload))
        )
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.email").value(email))
        .andExpect(jsonPath("$.tipoUsuario").value("ADMIN"))
        .andExpect(jsonPath("$.senha").doesNotExist());

        /*
         * =========================================================
         * 2. LOGIN
         * =========================================================
         *
         * O /auth/login atual valida email e senha, mas não gera
         * JWT ou sessão. Por isso, depois do login, o acesso às
         * rotas protegidas utiliza HTTP Basic, que é a autenticação
         * configurada atualmente no SecurityConfig.
         */

        mockMvc.perform(
                post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "email": "%s",
                                    "senha": "%s"
                                }
                                """.formatted(email, senha))
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.email").value(email))
        .andExpect(jsonPath("$.tipoUsuario").value("ADMIN"))
        .andExpect(jsonPath("$.senha").doesNotExist());

        /*
         * =========================================================
         * 3. CADASTRA PRODUTO
         * =========================================================
         */

        Map<String, Object> produtoPayload = new LinkedHashMap<>();

        produtoPayload.put("codigo", codigoProduto);
        produtoPayload.put("nome", "Produto Teste TSF01");
        produtoPayload.put("marca", "GestorX");
        produtoPayload.put("preco", 49.90);
        produtoPayload.put("quantidade", 25);
        produtoPayload.put("estoqueMinimo", 5);
        produtoPayload.put("categoria", "ALIMENTO");

        MvcResult cadastroProduto = mockMvc.perform(
                post("/produtos")
                        .with(httpBasic(email, senha))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(produtoPayload))
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").isNumber())
        .andExpect(jsonPath("$.codigo").value(codigoProduto))
        .andExpect(jsonPath("$.nome").value("Produto Teste TSF01"))
        .andExpect(jsonPath("$.marca").value("GestorX"))
        .andExpect(jsonPath("$.preco").value(49.90))
        .andExpect(jsonPath("$.quantidade").value(25))
        .andExpect(jsonPath("$.estoqueMinimo").value(5))
        .andExpect(jsonPath("$.categoria").value("ALIMENTO"))
        .andReturn();

        JsonNode produtoCriado = objectMapper.readTree(
                cadastroProduto.getResponse().getContentAsString()
        );

        assertTrue(
                produtoCriado.has("id"),
                "O produto cadastrado deve possuir ID"
        );

        /*
         * =========================================================
         * 4. CONSULTA A LISTAGEM DE PRODUTOS
         * =========================================================
         */

        MvcResult listagem = mockMvc.perform(
                get("/produtos")
                        .with(httpBasic(email, senha))
        )
        .andExpect(status().isOk())
        .andReturn();

        /*
         * =========================================================
         * 5. CONFIRMA QUE O PRODUTO ESTÁ NA LISTAGEM
         * =========================================================
         */

        JsonNode produtos = objectMapper.readTree(
                listagem.getResponse().getContentAsString()
        );

        boolean produtoEncontrado = false;

        for (JsonNode produto : produtos) {

            if (codigoProduto.equals(
                    produto.path("codigo").asText()
            )) {
                produtoEncontrado = true;

                assertTrue(
                        "Produto Teste TSF01".equals(
                                produto.path("nome").asText()
                        ),
                        "O nome do produto deve ser o esperado"
                );

                assertTrue(
                        "GestorX".equals(
                                produto.path("marca").asText()
                        ),
                        "A marca do produto deve ser a esperada"
                );

                break;
            }
        }

        assertTrue(
                produtoEncontrado,
                "O produto cadastrado no TSF01 deve aparecer na listagem /produtos"
        );
    }

    /**
     * Gera um CPF numérico com 11 dígitos para evitar colisões
     * com dados existentes no banco.
     */
    private String gerarCpf() {

        String numero = UUID.randomUUID()
                .toString()
                .replaceAll("\\D", "");

        if (numero.length() < 11) {
            numero = numero + "12345678901";
        }
        return numero.substring(0, 11);
    }
}