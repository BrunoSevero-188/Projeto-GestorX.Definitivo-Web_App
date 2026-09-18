package br.ifms.edu.GestorX.dto;

import br.ifms.edu.GestorX.enums.TipoUsuario;
import br.ifms.edu.GestorX.model.Usuario;
import lombok.Data;

/**
 * DTO de saída para usuário
 * ⚠️ Nunca expõe senha
 */
@Data
public class UsuarioResponseDTO {

    private Long id;
    private String nome;
    private String email;
    private TipoUsuario tipoUsuario;

    // Campos da tela
    private String cargo;
    private String estabelecimento;

    /**
     * 🔄 Converte Entity → DTO
     */
    public static UsuarioResponseDTO fromEntity(Usuario usuario) {

        UsuarioResponseDTO dto = new UsuarioResponseDTO();

        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setEmail(usuario.getEmail());
        dto.setTipoUsuario(usuario.getTipoUsuario());

        dto.setCargo(usuario.getCargo());
        dto.setEstabelecimento(usuario.getEstabelecimento());

        return dto;
    }
}