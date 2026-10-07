package br.ifms.edu.GestorX.system;

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
 * TSF02 — Controle de acesso por perfil, ponta a ponta.
 *
 * Cenários:
 *
 * ADMIN
 *   Login → área administrativa → HTTP 200
 *
 * FUNCIONARIO
 *   Login → área administrativa → HTTP 403
 *
 * Sem autenticação
 *   Área administrativa → HTTP 401
 *
 * O teste utiliza o fluxo real:
 *
 * cadastro → login → autenticação → SecurityConfig → Controller
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@DisplayName("TSF02 — Controle de acesso por perfil")
class TSF02ControleAcessoTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("TSF02 - ADMIN pode acessar área administrativa e FUNCIONARIO recebe 403")
    void tsf02_controleDeAcessoPorPerfil() throws Exception {

        /*
         * =========================================================
         * 1. CRIA ADMINISTRADOR
         * =========================================================
         */

        String emailAdmin = "tsf02.admin."
                + UUID.randomUUID().toString().substring(0, 8)
                + "@gestorx.test";

        String senhaAdmin = "Senha@12345";

        String cpfAdmin = gerarCpf();

        cadastrarUsuario(
                "Administrador TSF02",
                emailAdmin,
                senhaAdmin,
                "ADMIN",
                cpfAdmin,
                "Administrador"
        );

        /*
         * =========================================================
         * 2. CRIA FUNCIONÁRIO
         * =========================================================
         */

        String emailFuncionario = "tsf02.funcionario."
                + UUID.randomUUID().toString().substring(0, 8)
                + "@gestorx.test";

        String senhaFuncionario = "Senha@12345";

        String cpfFuncionario = gerarCpf();

        cadastrarUsuario(
                "Funcionário TSF02",
                emailFuncionario,
                senhaFuncionario,
                "FUNCIONARIO",
                cpfFuncionario,
                "Estoquista"
        );

        /*
         * =========================================================
         * 3. LOGIN DO ADMINISTRADOR
         * =========================================================
         */

        mockMvc.perform(
                post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "email": "%s",
                                    "senha": "%s"
                                }
                                """.formatted(emailAdmin, senhaAdmin))
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.email").value(emailAdmin))
        .andExpect(jsonPath("$.tipoUsuario").value("ADMIN"))
        .andExpect(jsonPath("$.senha").doesNotExist());

        /*
         * =========================================================
         * 4. LOGIN DO FUNCIONÁRIO
         * =========================================================
         */

        mockMvc.perform(
                post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "email": "%s",
                                    "senha": "%s"
                                }
                                """.formatted(
                                emailFuncionario,
                                senhaFuncionario
                        ))
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.email").value(emailFuncionario))
        .andExpect(jsonPath("$.tipoUsuario").value("FUNCIONARIO"))
        .andExpect(jsonPath("$.senha").doesNotExist());

        /*
         * =========================================================
         * 5. OBTÉM O ID DO FUNCIONÁRIO
         * =========================================================
         *
         * A rota /usuarios/{id}/detalhes exige ADMIN.
         *
         * Como o objetivo é testar o controle de acesso ponta a
         * ponta, buscamos primeiro a listagem de usuários usando
         * ADMIN e identificamos o funcionário criado neste teste.
         */

        MvcResult usuarios = mockMvc.perform(
                get("/usuarios")
                        .with(httpBasic(emailAdmin, senhaAdmin))
        )
        .andExpect(status().isOk())
        .andReturn();

        JsonNode listaUsuarios = objectMapper.readTree(
                usuarios.getResponse().getContentAsString()
        );

        Long idFuncionario = null;

        for (JsonNode usuario : listaUsuarios) {

            if (emailFuncionario.equals(
                    usuario.path("email").asText()
            )) {
                idFuncionario = usuario.path("id").asLong();
                break;
            }
        }

        if (idFuncionario == null) {
            throw new AssertionError(
                    "O funcionário criado no TSF02 não foi encontrado na listagem de usuários"
            );
        }

        /*
         * =========================================================
         * 6. ADMIN ACESSA ÁREA ADMINISTRATIVA
         * =========================================================
         */

        mockMvc.perform(
                get("/usuarios/{id}/detalhes", idFuncionario)
                        .with(httpBasic(emailAdmin, senhaAdmin))
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(idFuncionario))
        .andExpect(jsonPath("$.email").value(emailFuncionario))
        .andExpect(jsonPath("$.tipoUsuario").value("FUNCIONARIO"));

        /*
         * =========================================================
         * 7. FUNCIONÁRIO TENTA ACESSAR ÁREA ADMINISTRATIVA
         * =========================================================
         */

        mockMvc.perform(
                get("/usuarios/{id}/detalhes", idFuncionario)
                        .with(httpBasic(emailFuncionario, senhaFuncionario))
        )
        .andExpect(status().isForbidden());

        /*
         * =========================================================
         * 8. SEM AUTENTICAÇÃO
         * =========================================================
         */

        mockMvc.perform(
                get("/usuarios/{id}/detalhes", idFuncionario)
        )
        .andExpect(status().isUnauthorized());
    }

    /**
     * Cria usuário utilizando o endpoint real da aplicação.
     *
     * Dessa forma o TSF02 também passa pelo:
     *
     * Controller → Service → BCrypt → Repository → PostgreSQL
     */
    private void cadastrarUsuario(
            String nome,
            String email,
            String senha,
            String tipoUsuario,
            String cpf,
            String cargo
    ) throws Exception {

        Map<String, Object> payload = new LinkedHashMap<>();

        payload.put("nome", nome);
        payload.put("email", email);
        payload.put("senha", senha);
        payload.put("tipoUsuario", tipoUsuario);
        payload.put("cpf", cpf);
        payload.put("cargo", cargo);
        payload.put("estabelecimento", "GestorX Teste");

        mockMvc.perform(
                post("/usuarios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload))
        )
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.email").value(email))
        .andExpect(jsonPath("$.tipoUsuario").value(tipoUsuario))
        .andExpect(jsonPath("$.senha").doesNotExist());
    }

    /**
     * Gera CPF de teste com 11 dígitos.
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