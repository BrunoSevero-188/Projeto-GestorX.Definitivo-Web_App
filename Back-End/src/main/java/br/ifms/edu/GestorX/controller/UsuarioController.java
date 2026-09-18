package br.ifms.edu.GestorX.controller;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import br.ifms.edu.GestorX.dto.UsuarioDetalhadoDTO;
import br.ifms.edu.GestorX.dto.UsuarioRequestDTO;
import br.ifms.edu.GestorX.dto.UsuarioResponseDTO;
import br.ifms.edu.GestorX.model.Usuario;
import br.ifms.edu.GestorX.service.UsuarioService;



@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    // 🔹 Criar usuário
    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> salvar(
            @RequestBody @Valid UsuarioRequestDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.salvar(dto));
    }

    // 🔹 Listar usuários
    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    // 🔐 Usuário logado
    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UsuarioResponseDTO> me(
            @AuthenticationPrincipal Usuario usuario) {

        return ResponseEntity.ok(UsuarioResponseDTO.fromEntity(usuario));
    }

    // 🔐 Detalhes (com CPF - só ADMIN)
    @GetMapping("/{id}/detalhes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioDetalhadoDTO> buscarDetalhado(@PathVariable Long id) {

        Usuario usuario = service.buscarOuFalhar(id);

        return ResponseEntity.ok(UsuarioDetalhadoDTO.fromEntity(usuario));
    }
}
