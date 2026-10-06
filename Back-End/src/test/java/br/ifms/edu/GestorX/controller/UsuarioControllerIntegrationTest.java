package br.ifms.edu.GestorX.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.ifms.edu.GestorX.enums.TipoUsuario;
import br.ifms.edu.GestorX.model.Usuario;
import br.ifms.edu.GestorX.repository.UsuarioRepository;
import jakarta.persistence.EntityManager;

/**
 * Teste de integração TI02 — POST /usuarios.
 *
 * Usa PostgreSQL real (application.properties). O endpoint de cadastro é público
 * (permitAll), então a requisição é feita sem autenticação. E-mail e CPF são únicos por
 * execução e o @Transactional desfaz o INSERT ao final.
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@DisplayName("POST /usuarios — integração com PostgreSQL")
class UsuarioControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EntityManager entityManager;

    @Test
    @DisplayName("TI02 - Cadastro de usuário válido: HTTP 201 + usuário persistido (senha criptografada)")
    void ti02_cadastrarUsuario_deveRetornar201EPersistirNoBanco() throws Exception {
        String email = "ti02." + UUID.randomUUID().toString().substring(0, 8) + "@gestorx.test";
        String cpf = String.format("%011d", ThreadLocalRandom.current().nextLong(100_000_000_000L));
        String senha = "Senha@12345";

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("nome", "Usuário Teste TI02");
        payload.put("email", email);
        payload.put("senha", senha);
        payload.put("tipoUsuario", "FUNCIONARIO");
        payload.put("cpf", cpf);
        payload.put("cargo", "Estoquista");
        payload.put("estabelecimento", "Mercado Teste");

        mockMvc.perform(post("/usuarios")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.nome").value("Usuário Teste TI02"))
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.tipoUsuario").value("FUNCIONARIO"))
                .andExpect(jsonPath("$.cargo").value("Estoquista"))
                .andExpect(jsonPath("$.estabelecimento").value("Mercado Teste"))
                // a resposta nunca pode expor a senha
                .andExpect(jsonPath("$.senha").doesNotExist());

        // Força a ida ao banco (INSERT real + SELECT sem cache)
        entityManager.flush();
        entityManager.clear();

        Usuario doBanco = usuarioRepository.findByEmail(email).orElseThrow();
        assertEquals(cpf, doBanco.getCpf());
        assertEquals(TipoUsuario.FUNCIONARIO, doBanco.getTipoUsuario());
        assertEquals("Mercado Teste", doBanco.getEstabelecimento());

        // A senha deve estar criptografada (BCrypt), nunca em texto puro
        assertNotEquals(senha, doBanco.getSenha());
        assertTrue(doBanco.getSenha().startsWith("$2"));
        assertTrue(passwordEncoder.matches(senha, doBanco.getSenha()));
    }
}
