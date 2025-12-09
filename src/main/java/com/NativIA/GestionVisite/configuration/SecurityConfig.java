package com.NativIA.GestionVisite.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.NativIA.GestionVisite.security.TokenAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests((requests) -> requests
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/agent/**", "/api/agent-securite/**", "/api/agentsecurite/**").hasAnyRole("AGENT_SECURITE","ADMIN")
                .requestMatchers("/api/secretaire/**").hasAnyRole("SECRETAIRE","ADMIN")
                .requestMatchers("/api/employe/**").hasAnyRole("EMPLOYEUR","ADMIN")
                .requestMatchers("/api/visiteur/**").hasAnyRole("VISITEUR","ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

        @Bean
        public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
        }

        @Autowired
        private TokenAuthenticationFilter tokenAuthenticationFilter;

}
