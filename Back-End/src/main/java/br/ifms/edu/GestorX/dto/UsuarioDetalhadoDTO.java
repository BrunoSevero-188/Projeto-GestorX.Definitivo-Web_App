package br.ifms.edu.GestorX.dto;

import br.ifms.edu.GestorX.model.Usuario;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 🔐 DTO detalhado do usuário
 * 
 * ⚠️ Contém dados sensíveis (CPF)
 * Deve ser usado apenas em endpoints restritos.
 */
@Data
@NoArgsConstructor
public class UsuarioDetalhadoDTO {

    private Long id;
    private String nome;
    private String email;
    private String tipoUsuario;

    // 🔐 Dado sensível
    private String cpf;

    private String cargo;
    private String estabelecimento;

    /**
     * 🔁 Converte Entity → DTO
     */
    public static UsuarioDetalhadoDTO fromEntity(Usuario usuario) {

        UsuarioDetalhadoDTO dto = new UsuarioDetalhadoDTO();

        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setEmail(usuario.getEmail());

        dto.setTipoUsuario(
                usuario.getTipoUsuario() != null
                        ? usuario.getTipoUsuario().name()
                        : null);

        dto.setCpf(usuario.getCpf());
        dto.setCargo(usuario.getCargo());
        dto.setEstabelecimento(usuario.getEstabelecimento());

        return dto;
    }
}