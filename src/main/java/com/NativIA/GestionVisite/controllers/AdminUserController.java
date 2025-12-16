package com.NativIA.GestionVisite.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NativIA.GestionVisite.DAO.userRepository;
import com.NativIA.GestionVisite.DTO.Request.userRequest;
import com.NativIA.GestionVisite.Entities.User;
import com.NativIA.GestionVisite.mapper.UserMapper;

@RestController
@RequestMapping("/api/admin")
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
            if (userRepository.findByEmail(req.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email already in use"));
            }
            User u = userMapper.toEntity(req);
            u.setPassword(passwordEncoder.encode(req.getPassword()));
            User saved = userRepository.save(u);
            return ResponseEntity.ok(Map.of("user", userMapper.toResponse(saved)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
