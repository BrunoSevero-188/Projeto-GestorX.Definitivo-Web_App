package br.ifms.edu.GestorX.model;

import java.util.Collection;
import java.util.List;
import br.ifms.edu.GestorX.enums.TipoUsuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

// 🔐 IMPORTS DO SPRING SECURITY
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Data
@NoArgsConstructor
@Table(name = "tb_user")
public class Usuario implements UserDetails { // 🔥 IMPLEMENTA

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 3, max = 100)
    private String nome;

    @NotBlank
    @Email
    @Size(max = 150)
    @Column(unique = true)
    private String email;

    @NotBlank
    @Size(min = 8, max = 60)
    private String senha;

    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;

    @NotBlank
    @Column(unique = true)
    private String cpf;

    private String cargo;
    private String estabelecimento;

    // 🔐 MÉTODOS DO SPRING SECURITY

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
            new SimpleGrantedAuthority("ROLE_" + this.tipoUsuario.name())
        );
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}