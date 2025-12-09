package com.NativIA.GestionVisite.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class TokenAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RevokedTokenService revokedTokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String tokenValue = header.substring(7);
            try {
                if (revokedTokenService.isRevoked(tokenValue)) {
                    // token revoked -> do not authenticate
                } else {
                    io.jsonwebtoken.Claims claims = jwtUtil.validateAndGetClaims(tokenValue);
                    String email = claims.getSubject();
                    String role = claims.get("role", String.class);
                    // Build a lightweight principal with email as name
                    org.springframework.security.core.userdetails.User principal =
                            new org.springframework.security.core.userdetails.User(email, "", Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role)));
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception e) {
                // invalid token -> ignore and continue unauthenticated
            }
        }

        filterChain.doFilter(request, response);
    }

}
