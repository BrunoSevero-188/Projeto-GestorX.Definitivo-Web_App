package br.ifms.edu.GestorX.securityConfig;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
            CorsConfigurationSource corsSource) throws Exception {
        return http
                // API REST sem sessão de navegador: CSRF desativado
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsSource))
                .authorizeHttpRequests(auth -> auth
                        // preflight CORS
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // cadastro inicial (ver pendência: não deixar escolher ADMIN)
                        .requestMatchers(HttpMethod.POST, "/usuarios").permitAll()
                        .requestMatchers("/usuarios/me").authenticated()

                        // rotas públicas
                        .requestMatchers("/auth/**", "/actuator/health").permitAll()

                        // ADMIN
                        .requestMatchers("/usuarios/**").hasRole("ADMIN")

                        // ADMIN + FUNCIONARIO
                        .requestMatchers("/produtos/**").hasAnyRole("ADMIN", "FUNCIONARIO")
                        .requestMatchers("/estoque/**").hasAnyRole("ADMIN", "FUNCIONARIO")
                        .requestMatchers("/movimentos/**").hasAnyRole("ADMIN", "FUNCIONARIO")

                        // qualquer outra precisa de login
                        .anyRequest().authenticated())
                // Basic Auth (testes e Thunder Client)
                .httpBasic(httpBasic -> {
                })
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(
            @Value("${app.cors.allowed-origins:http://localhost:3000}") String[] origins) {

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(origins));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}