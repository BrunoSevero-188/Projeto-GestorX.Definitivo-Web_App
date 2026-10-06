package br.ifms.edu.GestorX.security;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import br.ifms.edu.GestorX.controller.UsuarioController;
import br.ifms.edu.GestorX.enums.TipoUsuario;
import br.ifms.edu.GestorX.model.Usuario;
import br.ifms.edu.GestorX.securityConfig.SecurityConfig;
import br.ifms.edu.GestorX.service.UsuarioService;

/**
 * Teste não funcional TSNF01 — Segurança e controle de acesso.
 *
 * Cenário: GET /usuarios/{id}/detalhes (retorna CPF) é restrito a ADMIN.
 *   - FUNCIONARIO -> HTTP 403 Forbidden
 *   - ADMIN       -> HTTP 200 OK
 *
 * Usa a SecurityConfig real da aplicação (regras de URL e @EnableMethodSecurity) com o
 * UsuarioService simulado, portanto não depende do banco de dados.
 */
@WebMvcTest(UsuarioController.class)
@Import(SecurityConfig.class)
@DisplayName("TSNF01 — Controle de acesso em GET /usuarios/{id}/detalhes")
class ControleAcessoUsuarioTest {

    private static final long ID_ALVO = 7L;

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UsuarioService usuarioService;

    @BeforeEach
    void prepararUsuarioAlvo() {
        Usuario alvo = new Usuario();
        alvo.setId(ID_ALVO);
        alvo.setNome("Usuário Alvo");
        alvo.setEmail("alvo@gestorx.test");
        alvo.setCpf("12345678901");
        alvo.setTipoUsuario(TipoUsuario.FUNCIONARIO);
        alvo.setCargo("Estoquista");
        alvo.setEstabelecimento("Mercado Teste");

        when(usuarioService.buscarOuFalhar(ID_ALVO)).thenReturn(alvo);
    }

    @Test
    @DisplayName("TSNF01 - FUNCIONARIO tenta acessar funcionalidade de ADMIN: HTTP 403 Forbidden")
    void tsnf01_funcionario_deveReceber403() throws Exception {
        mockMvc.perform(get("/usuarios/{id}/detalhes", ID_ALVO)
                .with(user("funcionario@gestorx.test").roles("FUNCIONARIO")))
                .andExpect(status().isForbidden());

        // A requisição deve ser barrada antes de chegar ao service
        verify(usuarioService, never()).buscarOuFalhar(any());
    }

    @Test
    @DisplayName("TSNF01 - ADMIN acessa funcionalidade de ADMIN: HTTP 200 OK")
    void tsnf01_admin_deveReceber200() throws Exception {
        mockMvc.perform(get("/usuarios/{id}/detalhes", ID_ALVO)
                .with(user("admin@gestorx.test").roles("ADMIN")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(ID_ALVO))
                .andExpect(jsonPath("$.cpf").value("12345678901"))
                .andExpect(jsonPath("$.tipoUsuario").value("FUNCIONARIO"));
    }

    @Test
    @DisplayName("TSNF01 (extra) - Sem autenticação: HTTP 401 Unauthorized")
    void tsnf01_semAutenticacao_deveReceber401() throws Exception {
        mockMvc.perform(get("/usuarios/{id}/detalhes", ID_ALVO))
                .andExpect(status().isUnauthorized());

        verify(usuarioService, never()).buscarOuFalhar(any());
    }
}
