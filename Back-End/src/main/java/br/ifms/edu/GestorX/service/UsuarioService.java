package br.ifms.edu.GestorX.service;

import java.util.List;
import org.springframework.stereotype.Service;
import br.ifms.edu.GestorX.dto.LoginRequestDTO;
import br.ifms.edu.GestorX.dto.UsuarioRequestDTO;
import br.ifms.edu.GestorX.dto.UsuarioResponseDTO;
import br.ifms.edu.GestorX.model.Usuario;

@Service
public interface UsuarioService {

    UsuarioResponseDTO salvar(UsuarioRequestDTO dto);

    UsuarioResponseDTO login(LoginRequestDTO dto);

    List<UsuarioResponseDTO> listar();

    // 🔹 Buscar usuário por ID
    Usuario buscarOuFalhar(Long id);
}
