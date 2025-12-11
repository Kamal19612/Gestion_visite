package com.NativIA.GestionVisite.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NativIA.GestionVisite.DAO.userRepository;
import com.NativIA.GestionVisite.DTO.Request.LoginRequest;
import com.NativIA.GestionVisite.DTO.Request.userRequest;
import com.NativIA.GestionVisite.DTO.Response.userResponse;
import com.NativIA.GestionVisite.Entities.User;
import com.NativIA.GestionVisite.mapper.UserMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private userRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody userRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email déjà utilisé");
        }
        User u = userMapper.toEntity(request);
        u.setPassword(passwordEncoder.encode(request.getPassword()));
        User saved = userRepository.save(u);
        userResponse resp = userMapper.toResponse(saved);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User u = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (u == null) return ResponseEntity.status(401).body("Invalid credentials");
        if (!passwordEncoder.matches(request.getPassword(), u.getPassword())) return ResponseEntity.status(401).body("Invalid credentials");
        // generate JWT
        String jwt = jwtUtil.generateToken(u);
        userResponse userDto = userMapper.toResponse(u);
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("token", jwt);
        response.put("user", userDto);
        return ResponseEntity.ok(response);
    }

    @Autowired
    private com.NativIA.GestionVisite.security.JwtUtil jwtUtil;

    @Autowired
    private com.NativIA.GestionVisite.security.RevokedTokenService revokedTokenService;

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String tokenValue = header.substring(7);
            try {
                io.jsonwebtoken.Claims claims = jwtUtil.validateAndGetClaims(tokenValue);
                java.util.Date exp = claims.getExpiration();
                long expMillis = exp != null ? exp.getTime() : (System.currentTimeMillis());
                revokedTokenService.revoke(tokenValue, expMillis);
                return ResponseEntity.ok(java.util.Map.of("status", "logged_out"));
            } catch (Exception e) {
                // invalid token
                return ResponseEntity.badRequest().body("Invalid token");
            }
        }
        return ResponseEntity.badRequest().body("No token provided");
    }

}
