package br.ifms.edu.GestorX.service.impl;

import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import br.ifms.edu.GestorX.dto.LoginRequestDTO;
import br.ifms.edu.GestorX.dto.UsuarioRequestDTO;
import br.ifms.edu.GestorX.dto.UsuarioResponseDTO;
import br.ifms.edu.GestorX.exception.RegraNegocioException;
import br.ifms.edu.GestorX.model.Usuario;
import br.ifms.edu.GestorX.repository.UsuarioRepository;
import br.ifms.edu.GestorX.service.UsuarioService;
import lombok.RequiredArgsConstructor;

/**
 * 📌 Implementação da regra de negócio para usuários.
 * 
 * Responsável por:
 * - Cadastro de usuários
 * - Validações (CPF e Email únicos)
 * - Criptografia de senha
 * - Conversão DTO ↔ Entity
 * - Autenticação manual (opcional)
 */
@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository repository;

    // 🔐 Usado para criptografar e validar senhas
    private final PasswordEncoder passwordEncoder;

    /**
     * 🔹 Cadastra um novo usuário
     * 
     * Etapas:
     * 1. Valida CPF duplicado
     * 2. Valida Email duplicado
     * 3. Converte DTO → Entity
     * 4. Criptografa senha
     * 5. Salva no banco
     * 6. Retorna DTO de resposta
     */
    @Override
    public UsuarioResponseDTO salvar(UsuarioRequestDTO dto) {

        // 🔴 Regra de negócio: CPF deve ser único
        if (repository.existsByCpf(dto.getCpf())) {
            throw new RegraNegocioException("CPF já cadastrado");
        }

        // 🔴 Regra de negócio: Email deve ser único
        if (repository.existsByEmail(dto.getEmail())) {
            throw new RegraNegocioException("Email já cadastrado");
        }

        // 🔧 Converte DTO em entidade
        Usuario usuario = toEntity(dto);

        // 🔐 Criptografa a senha antes de salvar (NUNCA salvar senha pura)
        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));

        // 💾 Persiste no banco
        Usuario salvo = repository.save(usuario);

        // 🔁 Retorna DTO (evita expor entidade diretamente)
        return UsuarioResponseDTO.fromEntity(salvo);
    }

    /**
     * 🔹 Lista todos os usuários
     * 
     * ⚠️ Não retorna dados sensíveis (como senha)
     */
    @Override
    public List<UsuarioResponseDTO> listar() {

        return repository.findAll()
                .stream()
                .map(UsuarioResponseDTO::fromEntity)
                .toList();
    }

    /**
     * 🔹 Busca usuário por ID ou lança exceção
     * 
     * Usado internamente por outros fluxos (ex: detalhes)
     */
    public Usuario buscarOuFalhar(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RegraNegocioException("Usuário não encontrado"));
    }

    /**
     * 🔐 Login manual (opcional)
     * 
     * ⚠️ Só é necessário se NÃO estiver usando Basic Auth ou JWT
     */
    public UsuarioResponseDTO login(LoginRequestDTO dto) {

        // 🔍 Busca usuário pelo email
        Usuario usuario = repository.findByEmail(dto.getEmail())
                .orElseThrow(() ->
                        new RegraNegocioException("Email ou senha inválidos"));

        // 🔐 Compara senha digitada com a criptografada
        if (!passwordEncoder.matches(dto.getSenha(), usuario.getSenha())) {
            throw new RegraNegocioException("Email ou senha inválidos");
        }

        return UsuarioResponseDTO.fromEntity(usuario);
    }

    /**
     * 🔧 Converte DTO → Entity
     * 
     * ⚠️ Não inclui senha aqui (tratada separadamente)
     */
    private Usuario toEntity(UsuarioRequestDTO dto) {

        Usuario usuario = new Usuario();

        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setTipoUsuario(dto.getTipoUsuario());
        usuario.setCpf(dto.getCpf());
        usuario.setCargo(dto.getCargo());
        usuario.setEstabelecimento(dto.getEstabelecimento());

        return usuario;
    }
}