package br.ifms.edu.GestorX.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import br.ifms.edu.GestorX.dto.UsuarioRequestDTO;
import br.ifms.edu.GestorX.dto.UsuarioResponseDTO;
import br.ifms.edu.GestorX.enums.TipoUsuario;
import br.ifms.edu.GestorX.exception.RegraNegocioException;
import br.ifms.edu.GestorX.model.Usuario;
import br.ifms.edu.GestorX.repository.UsuarioRepository;
import br.ifms.edu.GestorX.service.impl.UsuarioServiceImpl;

/**
 * Testes unitários TU01–TU03.
 * SUT: UsuarioServiceImpl.salvar().
 *
 * UsuarioRepository e PasswordEncoder são simulados (mocks) para que o teste
 * valide apenas a regra de negócio, sem depender do PostgreSQL nem do BCrypt real.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("UsuarioServiceImpl.salvar() — testes unitários")
class UsuarioServiceImplTest {

    @Mock
    private UsuarioRepository repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UsuarioServiceImpl service;

    private UsuarioRequestDTO dtoValido() {
        UsuarioRequestDTO dto = new UsuarioRequestDTO();
        dto.setNome("Maria Teste");
        dto.setEmail("maria.teste@gestorx.test");
        dto.setSenha("Senha@12345");
        dto.setTipoUsuario(TipoUsuario.FUNCIONARIO);
        dto.setCpf("12345678901");
        dto.setCargo("Estoquista");
        dto.setEstabelecimento("Mercado Teste");
        return dto;
    }

    @Test
    @DisplayName("TU01 - Cadastro de usuário válido: salva e retorna UsuarioResponseDTO")
    void tu01_salvarUsuarioValido_deveSalvarERetornarDTO() {
        UsuarioRequestDTO dto = dtoValido();

        when(repository.existsByCpf(dto.getCpf())).thenReturn(false);
        when(repository.existsByEmail(dto.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(dto.getSenha())).thenReturn("hash-bcrypt-simulado");
        when(repository.save(any(Usuario.class))).thenAnswer(invocacao -> {
            Usuario u = invocacao.getArgument(0);
            u.setId(1L);
            return u;
        });

        UsuarioResponseDTO resposta = service.salvar(dto);

        assertNotNull(resposta);
        assertEquals(1L, resposta.getId());
        assertEquals(dto.getNome(), resposta.getNome());
        assertEquals(dto.getEmail(), resposta.getEmail());
        assertEquals(TipoUsuario.FUNCIONARIO, resposta.getTipoUsuario());
        assertEquals(dto.getCargo(), resposta.getCargo());
        assertEquals(dto.getEstabelecimento(), resposta.getEstabelecimento());

        // A senha deve ser criptografada antes de persistir (nunca salvar senha pura)
        ArgumentCaptor<Usuario> capturado = ArgumentCaptor.forClass(Usuario.class);
        verify(repository).save(capturado.capture());
        assertEquals("hash-bcrypt-simulado", capturado.getValue().getSenha());
        assertNotEquals(dto.getSenha(), capturado.getValue().getSenha());
    }

    @Test
    @DisplayName("TU02 - CPF já cadastrado: lança RegraNegocioException e não salva")
    void tu02_salvarComCpfDuplicado_deveLancarRegraNegocioException() {
        UsuarioRequestDTO dto = dtoValido();

        when(repository.existsByCpf(dto.getCpf())).thenReturn(true);

        RegraNegocioException erro = assertThrows(RegraNegocioException.class, () -> service.salvar(dto));

        assertEquals("CPF já cadastrado", erro.getMessage());
        verify(repository, never()).save(any(Usuario.class));
        verify(passwordEncoder, never()).encode(any());
    }

    @Test
    @DisplayName("TU03 - E-mail já cadastrado: lança RegraNegocioException e não salva")
    void tu03_salvarComEmailDuplicado_deveLancarRegraNegocioException() {
        UsuarioRequestDTO dto = dtoValido();

        when(repository.existsByCpf(dto.getCpf())).thenReturn(false);
        when(repository.existsByEmail(dto.getEmail())).thenReturn(true);

        RegraNegocioException erro = assertThrows(RegraNegocioException.class, () -> service.salvar(dto));

        assertEquals("Email já cadastrado", erro.getMessage());
        verify(repository, never()).save(any(Usuario.class));
        verify(passwordEncoder, never()).encode(any());
    }
}
