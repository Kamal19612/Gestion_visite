package com.NativIA.GestionVisite.controllers;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NativIA.GestionVisite.DAO.userRepository;
import com.NativIA.GestionVisite.DTO.Request.userRequest;
import com.NativIA.GestionVisite.Entities.User;
import com.NativIA.GestionVisite.Enum.Roles;
import com.NativIA.GestionVisite.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;
@RestController
@RequestMapping("/api/admin")
@Slf4j
public class AdminUserController {
    @Autowired
    private userRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody userRequest req) {
        try {
            // Vérifier que l'utilisateur authentifié est un ADMIN
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Vous devez être authentifié pour créer un utilisateur"));
            }

            // Récupérer l'utilisateur authentifié
            String authenticatedEmail = auth.getName();
            User authenticatedUser = userRepository.findByEmail(authenticatedEmail)
                    .orElse(null);

            // Vérifier que l'utilisateur authentifié est un ADMIN
            if (authenticatedUser == null || !Roles.ADMIN.equals(authenticatedUser.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Seul un administrateur peut créer des utilisateurs"));
            }

            if (userRepository.findByEmail(req.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email already in use"));
            }
            User u = userMapper.toEntity(req);
            
            // L'admin peut spécifier le rôle, sinon par défaut VISITEUR
            if (req.getRole() != null) {
                u.setRole(req.getRole());
            } else {
                u.setRole(Roles.VISITEUR);
            }
            
            u.setPassword(passwordEncoder.encode(req.getPassword()));
            u.setEmailVerified(true); // Les comptes créés par admin sont pré-vérifiés
            User saved = userRepository.save(u);
            
            log.info("Nouvel utilisateur créé par admin {}: {} avec rôle {}", 
                    authenticatedEmail, req.getEmail(), u.getRole());
            
            return ResponseEntity.ok(Map.of("user", userMapper.toResponse(saved), "message", "Utilisateur créé avec succès"));
        } catch (Exception e) {
            log.error("Erreur lors de la création d'utilisateur: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
